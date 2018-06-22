module.exports = (grunt) => {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                presets: ['env'],
                plugins: ['transform-remove-strict-mode']
            },
            src: {
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
                    'packages/*/*.profile.js',
                    'packages/*/tests/_spec/*.js'
                ]
            }
        },
        jasmine: {
            options: {
                vendor: [
                    'node_modules/jasmine-favicon-reporter/vendor/favico.js',
                    'node_modules/jasmine-favicon-reporter/jasmine-favicon-reporter.js',
                    'common/testing/SetUpTests.js',
                    'node_modules/dojo/dojo.js',
                    'common/testing/jasmineAMDErrorChecking.js'
                ],
                host: 'http://localhost:8000',
                keepRunner: false
            },
            maptools: {
                options: {
                    specs: ['packages/map-tools/tests/spec/*.js']
                }
            },
            mousetrap: {
                options: {
                    specs: ['packages/mouse-trap/tests/spec/*.js']
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
