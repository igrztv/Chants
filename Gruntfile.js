module.exports = function (grunt) {

	grunt.initConfig({
		requirejs: { /* grunt-contrib-requirejs */
			build: { /* Подзадача */
				options: {
					almond: true,
					baseUrl: 'public_html/js',
					mainConfigFile: 'public_html/js/main.js',
					name: 'main',
					optimize: 'none',
					out: 'public_html/js/build/main.js'
				}
			}
		},
		concat: { /* grunt-contrib-concat */
			build: { /* Подзадача */
				separator: ';\n',
				src: [
					'public_html/js/lib/almond.js',
					'public_html/js/build/main.js'
				],
				dest: 'public_html/js/build.js'
			}
		},
		uglify: { /* grunt-contrib-uglify */
			build: { /* Подзадача */
				files: {
					'public_html/js/build.min.js': ['public_html/js/build.js']
				}
			}
		},
		cssmin: {
			build: {
				files: [{
					expand: true,
					cwd: 'public_html/css',
					src: ['*.css', '!*.min.css'],
					dest: 'public_html/css',
					ext: '.min.css'
				}]
			}
		},
		shell: {
			options: {
				stdout: true,
				stderr: true
			},
			server: {
				command: 'java -cp uMove-1.0-jar-with-dependencies.jar main.Main 8081'
			}
		},
		fest: {
			templates: {
				files: [{
					expand: true,
					cwd: 'templates',
					src: '*.xml',
					dest: 'public_html/js/tmpl'
				}],
				options: {
					template: function (data) {
						return grunt.template.process(
							'define(function () { return <%= contents %> ; });',
							{data: data}
						);
					}
				}
			}
		},
		sass: {
			build: {
				options: {                       // Target options
					style: 'compressed'
				},
				files: [{					
					expand: true,
					cwd: 'public_html/css', /* исходная директория */
					src: '*.css', /* имена шаблонов */
					dest: 'public_html/css', /* результирующая директория */
					ext: '.min.css'
				}]				
			},
			css: { /* Цель */
				files: [{
					expand: true,
					cwd: 'public_html/sass', /* исходная директория */
					src: '*.scss', /* имена шаблонов */
					dest: 'public_html/css', /* результирующая директория */
					ext: '.css'
				}]
			}
		},
		watch: {///следим за изменением файлов и выполняем конкретный таск
			sass: {
				files: ['**/*.scss'],
				tasks: ['sass:css'],
				options: {
					atBegin: true
				}
			},
			fest: {
				files: ['templates/*.xml'],
				tasks: ['fest'],
				options: {
					interrupt: true,
					atBegin: true
				}
			},
			server: {
				files: [
					'public_html/js/**/*.js',
					'public_html/css/**/*.css'
				],
				options: {
					livereload: true
				}
			}
		},
		concurrent: {
			target: ['watch', 'shell'],
			options: {
				logConcurrentOutput: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-fest');
	//grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-sass');
	//grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['concurrent']);
	grunt.registerTask('build', ['fest', 'requirejs:build', 'concat:build', 'uglify:build', 'sass:build']);
	grunt.registerTask('prod', ['shell']);

};
