module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    var bumpFiles = [
        'package.json',
        'bower.json'
    ];
    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                presets: ['latest'],
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
            uses_defaults: {}
        },
        eslint: {
            options: {
                configFile: '.eslintrc'
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
                        'bower_components/jasmine-favicon-reporter/vendor/favico.js',
                        'bower_components/jasmine-favicon-reporter/jasmine-favicon-reporter.js',
                        'bower_components/jasmine-jsreporter/jasmine-jsreporter.js',
                        'tests/SetUpTests.js',
                        'bower_components/dojo/dojo.js',
                        'tests/jsReporterSanitizer.js',
                        'tests/jasmineAMDErrorChecking.js'
                    ],
                    host: 'http://localhost:8000',
                    keepRunner: true
                }
            }
        },
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {sourceMap: true},
            main: {
                files: [{
                    expand: true,
                    cwd: 'resources',
                    src: ['*.scss'],
                    dest: 'resources',
                    ext: '.css'
                }]
            }
        },
        watch: {
            files: [
                'Gruntfile.js',
                '_src/**/*.*',
                'resources/**/*.*',
                'tests/**/*.*',
                '!tests/spec/**/*.*'
            ],
            tasks: [
                'jasmine:main:build',
                'sass',
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
        'sass',
        'babel',
        'connect',
        'jasmine:main:build',
        'eslint',
        'watch'
    ]);

    grunt.registerTask('travis', [
        'eslint'
        // 'connect'
        // TODO: run jasmine tests via headless chrome
        // esri 4.x doesn't support PhantomJS
    ]);
};
