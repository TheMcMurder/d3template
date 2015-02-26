module.exports = function(grunt) {
  // Project configuration.

  grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     config: grunt.file.readJSON('config.json')
  });

  // Load the plugin that provides the watch tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.config('watch', {
        all: {
            files: ['src/**/*', 'index.html'],
            // files: '<%= config.sourceFiles %>',
            tasks: ['change'],
            options: {
                livereload: true,
                spawn: false
            }
        }
  });

   // load the plugin that watches the connect tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.config('connect',{
        local: {
            options: {
                port: 3335,
                hostname: 'localhost',
                livereload: true
            }
        }
  });

  //Load the plugin that lints my JavaScript
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.config('jshint',{
        all: '<%= config.lintFiles %>',
        options:{
          curly: true,
          immed: true,
          newcap: true,
          noarg: true,
          sub: true,
          boss: true,
          eqnull: true
        },
        globals: {}
  });

  // Load the plugin that provides the concat tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.config('concat', {
    dist:{
      src: ['node_modules/d3/d3.js', 'src/**/*.js'],
      dest: 'build/raw.js',
    }
  });

  // Load the plugin that provides the uglify tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // defining my uglify task
  grunt.config('uglify', {
      options: {
        banner: '/*\n*    ©<%= pkg.author%>\n*    <%= pkg.name %>\n*    <%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %> \n*/\n'
      },
      build: {
        src: 'build/raw.js',
        dest: 'build/min.js'
      }
  });


  // Default task(s).
  var defaultTasks;
  defaultTasks = ['lint', 'concat', 'uglify'];
  var changeTasks;
  changeTasks = ['lint', 'concat'];

  var buildTasks = ['lint', 'concat', 'uglify'];

  grunt.registerTask('change', changeTasks);
  grunt.registerTask('server', ['connect:local', 'watch:all']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('build', buildTasks);

  grunt.registerTask('default', defaultTasks);

};