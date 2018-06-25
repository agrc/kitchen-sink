module.exports = (grunt) => {
    require('load-grunt-tasks')(grunt);

    const getJasmineTaskConfig = (packageName) => {
        return {
            options: {
                host: 'http://localhost:8000',
                summary: true,
                vendor: [
                    'node_modules/jasmine-favicon-reporter/vendor/favico.js',
                    'node_modules/jasmine-favicon-reporter/jasmine-favicon-reporter.js',
                    'common/testing/SetUpTests.js',
                    'node_modules/dojo/dojo.js'
                ],
                specs: [
                    `packages/${packageName}/tests/spec/*.js`,
                    'common/testing/jasmineAMDErrorChecking.js'
                ],
                outfile: `packages/${packageName}/_SpecRunner.html`
            }
        };
    };

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                presets: ['env'],
                plugins: ['transform-remove-strict-mode']
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'packages',
                    src: ['*/_src/*.js'],
                    rename: (dest, src) => {
                        return `packages/${src.replace('_src/', '')}`;
                    }
                }, {
                    expand: true,
                    cwd: 'packages',
                    src: ['*/tests/_spec/*.js'],
                    rename: (dest, src) => {
                        return `packages/${src.replace('_spec', 'spec')}`;
                    }
                }]
            }
        },
        connect: {
            main: {
                options: {
                    base: './'
                }
            }
        },
        eslint: {
            options: {
                configFile: '.eslintrc'
            },
            main: {
                src: [
                    'packages/*/_src/*.js',
                    'Gruntfile.js',
                    'packages/*/*.profile.js',
                    'packages/*/tests/_spec/*.js'
                ]
            }
        },
        exec: {
            main: {
                cmd: 'node node_modules/jasmine/bin/jasmine.js --config=common/testing/jasmine.json'
            },
            debug: {
                cmd: 'DEBUG=true node node_modules/jasmine/bin/jasmine.js --config=common/testing/jasmine.json'
            }
        },
        jasmine: {
            maptools: getJasmineTaskConfig('map-tools'),
            mousetrap: getJasmineTaskConfig('mouse-trap')
        },
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: { sourceMap: true },
            main: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: 'packages/*/resources/**/*.scss',
                    ext: '.css'
                }]
            }
        },
        watch: {
            files: [
                'common/**/*.js',
                'packages/*/_src/**/*.*',
                'packages/*/resources/**/*.*',
                'packages/*/tests/**/*.*',
                '!packages/*/tests/spec/**/*.*'
            ],
            tasks: [
                'newer:babel:main',
                'newer:sass:main',
                'jasmine:maptools:build',
                'jasmine:mousetrap:build',
                'eslint'
            ],
            options: {
                livereload: true
            }
        }
    });

    grunt.registerTask('default', [
        'babel:main',
        'sass:main',
        'connect',
        'jasmine:maptools:build',
        'jasmine:mousetrap:build',
        'eslint',
        'watch'
    ]);

    grunt.registerTask('test', [
        'eslint',
        'connect',
        'jasmine',
        'exec:main'
    ]);

    grunt.registerTask('travis', [
        'babel:main',
        'sass:main',
        'test'
        // TODO: run dojo build to test that all packages can be built
    ]);

    grunt.registerTask('e2e', [
        'connect',
        'exec:main'
    ]);

    grunt.registerTask('e2edebug', [
        'connect',
        'exec:debug'
    ]);
};
