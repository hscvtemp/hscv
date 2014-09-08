module.exports = function(grunt) {

  // time-grunt plugin to display the execution time of grunt tasks, not essential.
  require('time-grunt')(grunt);

  // All configuration goes here
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      // Concantenate JS
      concat: {
        dist: {
          src: [
            'app/js/libs/*.js', // All JS in the libs folder
            'app/js/global.js'  // This specific file
          ],
          dest: 'app/js/build/production.js',
        }
      },

      // Uglify JS
      uglify: {
        dist: {
          src: 'app/js/build/production.js',
          dest: 'app/js/build/production.min.js'
        }
      },

      watch: {
        options: {
          livereload: true,
          spawn: false // speeds up watch task
        },
        scripts: {
          files: ['app/js/*.js'],
          tasks: ['concat', 'uglify']
        },
        sass: {
          files: ['app/sass/{,**/}*.{scss,sass}'],
          tasks: ['compass:dist']
        },
        templates: {
          files: ['app/*.html']
        }
      },

      // Compass
      compass: {
        options: {
          config: 'config.rb',
          bundleExec: true
        },
        dist: {
          options: {
            environment: 'production'
          }
        },
        dev: {
          options: {
            environment: 'development'
          }
        }
      },

      // Run a server
      connect: {
        server: {
          options: {
            port: 9001,
            base: 'app',
            keepalive: false, // Set to false so this task does not block following tasks.
            livereload: true
          }
        }
      }

  });

  // @TODO
  // - image compression: grunt-imagemin, grunt-contrib-compress, grunt-zopfli, shrinkwrap
  // - grunt-concurrent for speed
  // - grunt-newer
  // - grunt-uncss
  //  Gemfile

  // Load all tasks.
  require('load-grunt-tasks')(grunt);

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['concat', 'uglify', 'compass:dev', 'connect:server', 'watch']);
  grunt.registerTask('release', ['concat', 'uglify', 'compass:dist']);

};
