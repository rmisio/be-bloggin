'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('css-sprite');

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      options: {
        nospawn: true,
        livereload: LIVERELOAD_PORT
      },
      css_sprite: {
        files: ['<%= yeoman.app %>/images/sprite/**/*.png'],
        tasks: ['css_sprite', 'sass:server'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server']
      },
      livereload: {
        options: {
          livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
        },
        files: [
          '{.tmp,<%= yeoman.app %>}/*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
          '<%= yeoman.app %>/scripts/templates/*.{ejs,mustache,hbs}',
          'test/spec/**/*.js'
        ]
      },
      jst: {
        files: [
          '<%= yeoman.app %>/scripts/templates/*.ejs'
        ],
        tasks: ['jst']
      },
      test: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js', 'test/spec/**/*.js'],
        tasks: ['test:true']
      },
      processhtml: {
        files: ['<%= yeoman.app %>/*.html'],
        tasks: ['processhtml:server']
      },
      svg: {
        files: ['<%= yeoman.app %>/images/svg-sprite/{,*/}*.svg'],
        tasks: ['svgstore', 'processhtml:server']
      }
    },
    connect: {
      options: {
        port: grunt.option('port') || SERVER_PORT,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              mountFolder(connect, 'test'),
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      },
      test: {
        path: 'http://localhost:<%= connect.test.options.port %>'
      }
    },
    clean: {
      dist: ['.tmp', '<%= yeoman.dist %>/*'],
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%= connect.test.options.port %>/index.html']
        }
      }
    },
    sass: {
      options: {
        sourceMap: true,
        includePaths: ['app/bower_components']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },
    css_sprite: {
      options: {
        cssPath: '../images/',
        processor: 'scss',
        template: 'bin/css-sprite/templates/scss.mustache'
      },
      sprite: {
        options: {
          style: '<%= yeoman.app %>/styles/_sprite.scss'
        },
        src: '<%= yeoman.app %>/images/sprite/**/*.png',
        dest: '<%= yeoman.app %>/images/sprite'
      }
    },
    svgstore: {
      options: {
        prefix: 'Svg-',
        svg: {
          style: 'display: none'
        },
      },
      all: {
        files: {
          '<%= yeoman.app %>/images/sprite.svg': ['<%= yeoman.app %>/images/svg-sprite/{,*/}*.svg']
        }
      }
    },
    processhtml: {
      options: {
        commentMarker: 'process',
        process: true
      },
      server: {
        files: [{
          expand: true,
          src: ['<%= yeoman.app %>/*.html'],
          dest: '.tmp',
          flatten: true
        }]
      },
      dist: {
        files: "<%= processhtml.server.files %>"
      }
    },
    requirejs: {
      dist: {
        // Options: :
        options: {
          almond: true,
          replaceRequireScript: [{
            files: ['<%= yeoman.dist %>/index.html'],
            module: 'main'
          }],
          modules: [{name: 'main'}],
          baseUrl: '<%= yeoman.app %>/scripts',
          mainConfigFile: '<%= yeoman.app %>/scripts/main.js',
          dir: '.tmp/scripts',
          optimize: 'none',
          useStrict: true
          // paths: {
          //   'templates': '../../.tmp/scripts/templates',
          //   'jquery': '../../<%= yeoman.app %>/bower_components/jquery/dist/jquery',
          //   'underscore': '../../<%= yeoman.app %>/bower_components/lodash/dist/lodash',
          //   'backbone': '../../<%= yeoman.app %>/bower_components/backbone/backbone'
          // },
          // TODO: Figure out how to make sourcemaps work with grunt-usemin
          // https://github.com/yeoman/grunt-usemin/issues/30
          //generateSourceMaps: true,
          // required to support SourceMaps
          // http://requirejs.org/docs/errors.html#sourcemapcomments
          // preserveLicenseComments: false,
          // useStrict: true,
          // wrap: true
          //uglify2: {} // https://github.com/mishoo/UglifyJS2
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: ['{,*/}*.{png,jpg,jpeg}', '!sprite/*'],
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          // cwd: '<%= yeoman.app %>',
          cwd: '.tmp',
          src: '*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/{,*/}*.*',
            'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*.*'
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= yeoman.dist %>/.htaccess'
        }]
      }
    },
    bower: {
      all: {
        rjsConfig: '<%= yeoman.app %>/scripts/main.js'
      }
    },
    jst: {
      options: {
        amd: true
      },
      compile: {
        files: {
          '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/templates/*.ejs'],
          '<%= yeoman.app %>/scripts/templates.js': ['<%= yeoman.app %>/scripts/templates/*.ejs']
        }
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/main.js': [
            '.tmp/scripts/main.js'
          ]
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '/styles/fonts/{,*/}*.*',
            'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*.*'
          ]
        }
      }
    }
  });

  grunt.registerTask('createDefaultTemplate', function () {
    grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve' + (target ? ':' + target : '')]);
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
    }

    if (target === 'test') {
      return grunt.task.run([
        'clean:server',
        'svgstore',
        'processhtml:server',
        'createDefaultTemplate',
        'jst',
        'css_sprite',
        'sass:server',
        'connect:test',
        'open:test',
        'watch'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'svgstore',
      'processhtml:server',
      'createDefaultTemplate',
      'jst',
      'css_sprite',
      'sass:server',
      'connect:livereload',
      'open:server',
      'watch'
    ]);
  });

  grunt.registerTask('test', function (isConnected) {
    isConnected = Boolean(isConnected);
    var testTasks = [
        'clean:server',
        'svgstore',
        'processhtml:server',
        'createDefaultTemplate',
        'jst',
        'sass',
        'connect:test',
        'mocha',
      ];

    if(!isConnected) {
      return grunt.task.run(testTasks);
    } else {
      // already connected so not going to connect again, remove the connect:test task
      testTasks.splice(testTasks.indexOf('connect:test'), 1);
      return grunt.task.run(testTasks);
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'createDefaultTemplate',
    'jst',
    'svgstore',
    'processhtml:dist',
    'css_sprite',
    'sass:dist',
    'useminPrepare',
    'imagemin',
    'htmlmin',
    'concat',
    'cssmin',
    'uglify:generated',
    'copy',
    'requirejs',
    'uglify:dist',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
