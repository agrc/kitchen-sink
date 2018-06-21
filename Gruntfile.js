module.exports = (grunt) => {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        connect: {
            main: {
                options: {
                    base: '.'
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
                    'packages/*/Gruntfile.js',
                    'packages/*/agrc.profile.js',
                    'packages/*/tests/_spec/*.js'
                ]
            }
        },
        jasmine: {
            main: {
                options: {
                    specs: ['packages/*/tests/spec/*.js'],
                    vendor: [
                        'node_modules/jasmine-favicon-reporter/vendor/favico.js',
                        'node_modules/jasmine-favicon-reporter/jasmine-favicon-reporter.js',
                        'common/testing/SetUpTests.js',
                        'node_modules/dojo/dojo.js',
                        'common/testing/jasmineAMDErrorChecking.js'
                    ],
                    host: 'http://localhost:8000',
                    keepRunner: false
                }
            }
        },
        pkg: grunt.file.readJSON('package.json')
    });

    grunt.registerTask('test', [
        'eslint',
        'connect',
        'jasmine'
    ]);
};
