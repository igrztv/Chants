module.exports = function (grunt) {

	grunt.initConfig({
		shell: {
			options: {
				stdout: false,
				stderr: false
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
				tasks: ['sass'],
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
	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('default', ['concurrent']);
	grunt.registerTask('prodution', ['shell']);

};
