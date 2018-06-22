module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        sass: {
            options: { sourceMap: true },
            main: {
                files: [{
                    expand: true,
                    cwd: 'resources',
                    src: ['*.scss'],
                    dest: 'resources',
                    ext: '.css'
                }]
            }
        }
};
