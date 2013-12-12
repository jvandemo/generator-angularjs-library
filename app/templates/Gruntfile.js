module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ''
            },
            library: {
                src: [
                    'src/<%= config.libraryName.camelized %>/<%= config.libraryName.camelized %>.prefix',
                    'src/<%= config.libraryName.camelized %>/<%= config.libraryName.camelized %>.js',
                    'src/<%= config.libraryName.camelized %>/directives/**/*.js',
                    'src/<%= config.libraryName.camelized %>/filters/**/*.js',
                    'src/<%= config.libraryName.camelized %>/services/**/*.js',
                    'src/<%= config.libraryName.camelized %>/<%= config.libraryName.camelized %>.suffix'
                ],
                dest: 'dist/<%= config.libraryName.slugified %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%%= pkg.name %> <%%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            jid: {
                files: {
                    'dist/<%= config.libraryName.slugified %>.min.js': ['<%%= concat.library.dest %>']
                }
            }
        },
        jshint: {
            beforeConcat: {
                src: ['gruntfile.js', '<%= config.libraryName.camelized %>/**/*.js']
            },
            afterConcat: {
                src: [
                    '<%%= concat.library.dest %>'
                ]
            },
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    angular: true
                },
                globalstrict: false
            }
        },
        watch: {
            options: {
                livereload: true
            },
            files: [
                'Gruntfile.js',
                'src/**/*'
            ],
            tasks: ['default']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint:beforeConcat', 'concat', 'jshint:afterConcat', 'uglify']);
    grunt.registerTask('livereload', ['default', 'watch']);

};