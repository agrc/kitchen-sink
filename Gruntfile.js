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
                    `packages/${packageName}/node_modules/dojo/dojo.js`
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
            maptools: getJasmineTaskConfig('map-tools'),
            mousetrap: getJasmineTaskConfig('mouse-trap')
        },
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            files: [
                'packages/*/_src/**/*.*',
                'packages/*/resources/**/*.*',
                'packages/*/tests/**/*.*',
                '!packages/*/tests/spec/**/*.*'
            ],
            tasks: [
                'eslint',
                'newer:babel',
                'jasmine:maptools:build',
                'jasmine:mousetrap:build'
            ],
            options: {
                livereload: true
            }
        }
    });

    grunt.registerTask('default', [
        'babel',
        'connect',
        'jasmine:maptools:build',
        'jasmine:mousetrap:build',
        'eslint',
        'watch'
    ]);

    grunt.registerTask('test', [
        'eslint',
        'connect',
        'jasmine'
    ]);

    grunt.registerTask('travis', [
        'test'
        // TODO: run dojo build to test that all packages can be built
    ]);
};
