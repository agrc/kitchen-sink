module.exports = function (grunt) {
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
