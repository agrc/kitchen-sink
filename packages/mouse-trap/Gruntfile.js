module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    var bumpFiles = [
        'package.json',
        'package-lock.json'
    ];
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
                    cwd: '_src',
                    src: ['*.js'],
                    dest: './'
                }, {
                    expand: true,
                    cwd: 'tests/_spec',
                    src: ['*.js'],
                    dest: 'tests/spec'
                }]
            }
        },
        bump: {
            options: {
                files: bumpFiles,
                commitFiles: bumpFiles,
                push: false
            }
        },
        connect: {
            main: {
                options: {
                    base: '../../'
                }
            } // eslint-disable-line camelcase
        },
        eslint: {
            options: {
                configFile: '../../.eslintrc'
            },
            main: {
                src: [
                    '_src/*.js',
                    'Gruntfile.js',
                    'agrc.profile.js',
                    'tests/_spec/*.js'
                ]
            }
        },
        jasmine: {
            main: {
                options: {
                    specs: ['tests/spec/*.js'],
                    vendor: [
                        'node_modules/jasmine-favicon-reporter/vendor/favico.js',
                        'node_modules/jasmine-favicon-reporter/jasmine-favicon-reporter.js',
                        'tests/SetUpTests.js',
                        '../../node_modules/dojo/dojo.js',
                        '../../common/testing/jasmineAMDErrorChecking.js'
                    ],
                    host: 'http://localhost:8000',
                    keepRunner: true
                }
            }
        },
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            files: [
                'Gruntfile.js',
                '_src/**/*.*',
                'tests/**/*.*',
                '!tests/spec/**/*.*'
            ],
            tasks: [
                'jasmine:main:build',
                'babel',
                'eslint'
            ],
            options: {
                livereload: true
            }
        }
    });

    // Default task.
    grunt.registerTask('default', [
        'build',
        'jasmine:main:build',
        'connect',
        'watch'
    ]);

    grunt.registerTask('test', [
        'build',
        'connect',
        'jasmine'
    ]);

    grunt.registerTask('build', [
        'eslint',
        'babel'
    ]);
};
