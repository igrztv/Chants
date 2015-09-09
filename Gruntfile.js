
module.exports = function(grunt)
{
	grunt.initConfig({
		concat:
		{
			options: { separator: ';' },
			foo: {
				src: ['js/first.js', 'js/second.js' ],
				dest: 'js/foo.js'
			},
			bar: {}
		},
		any_other_name: 'hello'
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	
	grunt.registerTask('defaul', ['concat']);
};