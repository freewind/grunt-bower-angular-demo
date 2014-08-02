/*global module:false*/
module.exports = function(grunt) {

  var protractorDir = 'node_modules/protractor/bin/';

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    },
    bower: {
      install: {
        options: {
          targetDir: './public/js/lib',
          layout: 'byComponent',
          install: true,
          verbose: true,
          cleanTargetDir: true,
          cleanBowerDir: true,
          bowerOptions: {}
        }
      }
    },
    'http-server': {
        dev: {
            root: "./",
            port: 8282,
            host: "127.0.0.1",
            cache: 10000,
            showDir : true,
            autoIndex: true,
            defaultExt: "html",
            runInBackground: true
        }
    },
    protractor_webdriver: {
      alive: {
        options: {
          path: protractorDir,
          keepAlive: true
        }
      },
      dead: {
        options: {
          path: protractorDir
        }
      }
    },
    protractor: {
      options: {
        configFile: "node_modules/protractor/referenceConf.js", // Default config file
        keepAlive: false, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      test: {
        options: {
          configFile: "test/protractor-conf.js", // Target-specific config file
          args: {} // Target-specific arguments
        }
      },
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    shell: {
      protractor: {
        options: {
          stdout: true
        },
        command: protractorDir + 'webdriver-manager update --standalone --chrome'
      },
      serverForTesting: {
        options: {
          async: true,
          stdout: true,
          failOnError: true
        },
        command: './node_modules/http-server/bin/http-server . -p 8899'
      },
      server: {
        options: {
          stdout: true,
          async: false,
          failOnError: true,
          cache: 0
        },
        command: './node_modules/http-server/bin/http-server . -p 8900'
      },
      ls: {
        options: {
          stdout: true
        },
        command: 'ls'
      }
    },
    waitServer: {
      server: {
        options: {
          url: 'http://localhost:8899',
          fail: function () {console.error('the server had not start'); },
          timeout: 20 * 1000,
          isforce: false,
          interval: 1000,
          print: true
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-protractor-webdriver');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-wait-server');

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('unit-test', ['karma:unit']);
  grunt.registerTask('server', ['shell:server']);
  grunt.registerTask('e2e-test', [
    'http-server', 
    'shell:protractor', 
    'protractor_webdriver:alive',
    'protractor:test']);
  grunt.registerTask('extern-server', ['shell:serverForTesting', 'waitServer:server', 'shell:ls']);
};
