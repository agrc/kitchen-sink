const chalk = require('chalk');
const Client = require('ssh2').Client;
const del = require('del');
const dotenv = require('dotenv');
const fs = require('fs');
const globby = require('globby');
const ora = require('ora');
const path = require('path');
const yazl = require('yazl');
const yargs = require('yargs');

yargs
  .command(
    'clean [artifacts]',
    'clean build artifacts',
    yargs => {
      yargs.positional('artifacts', {
        describe: 'folder locations to clean',
        type: 'array',
        alias: 'd',
        default: [path.join('.', 'deploy')]
      });
    },
    async argv => {
      console.log(`${chalk.yellow('cleaning')}`);

      if (!Array.isArray(argv.artifacts)) {
        argv.artifacts = [argv.artifacts];
      }

      const folderDelete = ora('removing files').start();
      if (!argv.dryRun) {
        const deletedPaths = await del(argv.artifacts);

        folderDelete.succeed(`removed ${chalk.red(deletedPaths.length)} items`);
      } else {
        folderDelete.info(`would have removed ${chalk.red(argv.artifacts.length)} items`);
      }
    }
  )
  .option('dry-run', {
    type: 'boolean',
    description: "don't actually do anything"
  })
  .command(
    'zip [src] [dest] [name]',
    'compress files into one location',
    yargs => {
      yargs
        .positional('src', {
          describe: 'the parent folder of the application to compress',
          type: 'string',
          alias: 's',
          default: './build'
        })
        .positional('dest', {
          describe: 'the parent folder to place the compress file',
          type: 'string',
          alias: 'd',
          default: path.join('.', 'deploy')
        })
        .positional('name', {
          describe: 'the name of the compressed file',
          type: 'string',
          alias: 'n',
          default: 'deploy.zip'
        });
    },
    async argv => {
      console.log(`${chalk.yellow('compressing')}`);

      if (!fs.existsSync(argv.dest)) {
        const createDest = ora('creating zip file destination').start();

        if (!argv.dryRun) {
          fs.mkdirSync(argv.dest);
          createDest.succeed(`created ${chalk.cyan(argv.dest)}`);
        } else {
          createDest.info(`would have created ${chalk.cyan(argv.dest)}`);
        }
      }

      const zipFilePath = path.join(argv.dest, argv.name);
      const zippingFiles = ora(`adding files to ${zipFilePath}`).start();

      const zipFile = new yazl.ZipFile();
      const paths = await globby([`${path.join(argv.src, '**', '*.*')}`]);

      zippingFiles.text = `adding ${chalk.cyan(paths.length)} items to ${chalk.magenta(argv.name)}`;

      const baseDir = path.normalize(argv.src);
      if (!argv.dryRun) {
        paths.forEach(filePath => {
          let parent = filePath.slice(baseDir.length);
          zipFile.addFile(filePath, parent);
        });

        zipFile.outputStream
          .pipe(fs.createWriteStream(zipFilePath))
          .on('close', () => zippingFiles.succeed(`added ${chalk.green(paths.length)} items to ${chalk.magenta(zipFilePath)}`));
        zipFile.end();
      } else {
        zippingFiles.info(`would have added ${chalk.green(paths.length)} items to ${chalk.magenta(zipFilePath)}`);
      }
    }
  )
  .option('dry-run', {
    type: 'boolean',
    description: "don't actually do anything"
  })
  .command(
    'unzip [dest] [name]',
    'decompress files',
    yargs => {
      yargs
        .positional('dest', {
          describe: 'the parent folder of the compressed file',
          type: 'string',
          alias: 'd',
          default: 'app'
        })
        .positional('name', {
          describe: 'the name of the compressed file',
          type: 'string',
          alias: 'n',
          default: 'deploy.zip'
        });
    },
    async argv => {
      console.log(`${chalk.yellow('decompressing')}`);

      dotenv.config();

      const command = `cd ${argv.dest}; unzip -oq ${argv.name}; rm ${argv.name}`;
      const connection = createConnection();
      if (!connection) {
        return;
      }

      const openingConnection = ora('opening connection').start();

      connection
        .on('ready', () => {
          openingConnection.succeed('the connection is ready');

          const unzippingFiles = ora(`unzipping ${chalk.cyan(argv.name)}`);
          connection.exec(command, (err, stream) => {
            if (err) {
              openingConnection.fail(err.message);

              return;
            }

            stream
              .on('close', (code, signal) => {
                if (code !== 0) {
                  unzippingFiles.fail(`Error with ssh exec! code: ${code}, signal: ${signal}`);
                }

                connection.end();
                process.exit();
              })
              .on('finish', () => {
                unzippingFiles.succeed(`unzipped ${chalk.magenta(argv.name)}`);
              })
              .on('data', data => {
                console.log('STDOUT: ' + data);
              })
              .stderr.on('data', data => {
                console.log('STDERR: ' + data);
              });
          });
        })
        .on('error', err => {
          openingConnection.fail(`the connection failed. ${err.message}`);
        });
    }
  )
  .command(
    'ship [src] [dest]',
    'send the deployment to the destination via sftp',
    yargs => {
      yargs
        .positional('src', {
          describe: 'the parent folder or file to ship',
          type: 'string',
          alias: 's',
          default: path.join('.', 'deploy', 'deploy.zip')
        })
        .positional('dest', {
          describe: 'the folder to place the src',
          type: 'string',
          alias: 'd',
          default: 'app'
        });
    },
    argv => {
      console.log(`${chalk.yellow('shipping')}`);

      dotenv.config();

      const connection = createConnection();
      if (!connection) {
        return;
      }

      const openingConnection = ora('opening connection').start();

      connection
        .on('ready', () => {
          openingConnection.succeed('the connection is ready');

          connection.sftp((err, sftp) => {
            if (err) {
              openingConnection.fail(err.message);

              return;
            }

            openingConnection.succeed('sftp is ready');
            const sendingFiles = ora(`sending ${chalk.magenta(argv.src)}`).start();

            const readStream = fs.createReadStream(argv.src);

            readStream.on('error', err => {
              sendingFiles.fail(`failed to find source files. ${err.message}`);

              connection.end();
              process.exit();
            });

            const writeStream = sftp.createWriteStream(path.join(argv.dest, path.basename(argv.src)));

            writeStream
              .on('finish', () => {
                sendingFiles.succeed(`${chalk.magenta(argv.src)} deployed to server`);
              })
              .on('close', () => {
                connection.end();
                process.exit();
              })
              .on('error', err => {
                console.log('error');
                sendingFiles.fail(`failed to write to destination. ${err.message}`);
              });

            if (!argv.dryRun) {
              readStream.pipe(writeStream);
            } else {
              sendingFiles.info(`would have deployed ${chalk.magenta(argv.src)} to server`);

              connection.end();
              process.exit();
            }
          });
        })
        .on('error', err => {
          openingConnection.fail(`the connection failed. ${err.message}`);
        });
    }
  )
  .option('dry-run', {
    type: 'boolean',
    description: "don't actually do anything"
  }).argv;

function createConnection() {
  const connecting = ora(`gathering connection information`).start();
  // cannot use the same connection for sftp() and exec() ¯\_(ツ)_/¯
  const client = new Client();

  try {
    client.connect({
      host: process.env.SSH_HOST,
      username: process.env.SSH_USERNAME,
      password: process.env.SSH_PASSWORD
    });
  } catch (err) {
    connecting.fail(`failed to find credentials: ${err.message}`);

    return;
  }

  connecting.succeed('credentials gathered');

  return client;
}
