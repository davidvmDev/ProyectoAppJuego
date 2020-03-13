module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'js/main.js',
				dest: 'js/main.min.js'
			}
		},
		cssmin: {
			main: {
				files: {
					'css/main.min.css': [ 'css/main.css' ]
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', [ 'uglify' ]);

	grunt.loadNpmTasks('grunt-contrib-cssmin');
};