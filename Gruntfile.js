/*!
 * Gruntfile for Bootstrappify
 * https://furplag.github.io/bootstrappify
 * Copyright 2014+ furplag
 * Licensed under MIT (https://github.com/furplag/bootstrappify/blob/master/LICENSE)
 * Based on Bootstrap (http://getbootstrap.com)
 */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var configBridge = grunt.file.readJSON('./grunt/configBridge.json', { encoding: 'utf8' });

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
      ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
      ' * Copyright 2014 <%= pkg.author %>\n' +
      ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
      ' * <%= pkg.description %>\n' +
      ' * Based on Bootstrap (http://getbootstrap.com)\n' +
      ' */\n',

    // Task configuration.
    clean: {
      bower: 'bower_components',
      dist: 'dist',
      docs: 'docs/dist',
      'docs-bower': 'docs/libs'
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      core: {
        src: 'js/*.js'
      },
      test: {
        options: {
          jshintrc: 'js/tests/unit/.jshintrc'
        },
        src: ['js/tests/**/*.js', '!js/tests/vendor/*.js']
      },
      assets: {
        src: ['docs/assets/js/src/*.js', 'docs/assets/js/*.js', '!docs/assets/js/**/*.min.js']
      }
    },

    jscs: {
      options: {
        config: 'js/.jscsrc'
      },
      core: {
        src: '<%= jshint.core.src %>'
      },
      test: {
        src: '<%= jshint.test.src %>'
      },
      assets: {
        options: {
          requireCamelCaseOrUpperCaseIdentifiers: null
        },
        src: '<%= jshint.assets.src %>'
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>\n',
        stripBanners: false
      },
      dist: {
        src: 'js/<%= pkg.name %>.*.js',
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        preserveComments: 'some'
      },
      core: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      },
      docsJs: {
        src: 'docs/assets/js/src/*.js',
        dest: 'docs/assets/js/docs.min.js'
      }
    },

    qunit: {
      options: {
        inject: 'js/tests/unit/phantom.js'
      },
      files: 'js/tests/index.html'
    },

    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        src: 'less/<%= pkg.name %>.less',
        dest: 'dist/css/<%= pkg.name %>.css'
      },
      compileDocs: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'docs.css.map',
          sourceMapFilename: 'docs/assets/css/src/docs.css.map'
        },
        src: 'less/docs/docs.less',
        dest: 'docs/assets/css/src/docs.css'
      }
    },

    autoprefixer: {
      options: {
        browsers: configBridge.config.autoprefixerBrowsers
      },
      core: {
        options: {
          map: true
        },
        src: 'dist/css/<%= pkg.name %>.css'
      },
      docs: {
        src: 'docs/assets/css/src/docs.css'
      }
    },

    csslint: {
      options: {
        csslintrc: 'less/.csslintrc'
      },
      dist: [
        'dist/css/<%= pkg.name %>.css'
      ],
      docs: {
        options: {
          ids: false,
          'overqualified-elements': false
        },
        src: 'docs/assets/css/src/docs.css'
      }
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        noAdvanced: true
      },
      minifyCore: {
        src: 'dist/css/<%= pkg.name %>.css',
        dest: 'dist/css/<%= pkg.name %>.min.css'
      },
      docs: {
        src: [
          'docs/libs/css/jquery.fullPage.css',
          'docs/libs/css/pygments.css',
          'docs/assets/css/src/docs.css'
        ],
        dest: 'docs/assets/css/docs.min.css'
      }
    },

    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: 'dist/css/*.css'
      }
    },

    csscomb: {
      options: {
        config: 'less/.csscomb.json'
      },
      dist: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/'
      },
      docs: {
        src: 'docs/assets/css/src/docs.css',
        dest: 'docs/assets/css/src/docs.css'
      }
    },

    copy: {
      docs: {
        src: 'dist/*/*',
        dest: 'docs/'
      }
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },

    jekyll: {
      docs: {

      }
    },

    validation: {
      options: {
        charset: 'utf-8',
        doctype: 'HTML5',
        failHard: true,
        reset: true,
        relaxerror: [
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'Element img is missing required attribute src.',
          'Attribute autocomplete not allowed on element input at this point.',
          'Attribute autocomplete not allowed on element button at this point.'
        ]
      },
      files: {
        src: ['_gh_pages/**/*.html', '!_gh_pages/**/respond-proxy.html']
      }
    },

    watch: {
      src: {
        files: 'js/*.js',
        tasks: ['jshint:core', 'qunit', 'concat']
      },
      test: {
        files: ['js/tests/**/*.js', '!js/tests/vendor/*.js'],
        tasks: ['jshint:test', 'qunit']
      },
      less: {
        files: 'less/**/*.less',
        tasks: 'less'
      },
      dev: {
        files: ['less/**/*.less', 'js/*.js', 'docs/assets/js/src/*.js'],
        tasks: ['dist', 'docs']
      },
      'pre-prod': {
        files: ['less/**/*.less', 'js/*.js', 'docs/assets/js/src/*.js'],
        tasks: ['test']
      }
    },

    sed: {
      versionNumber: {
        pattern: (function () {
          var old = grunt.option('oldver');
          return old ? RegExp.quote(old) : old;
        })(),
        replacement: grunt.option('newver'),
        recursive: true
      }
    },

    exec: {
      npmUpdate: {
        command: 'npm update'
      }
    },

    'bower-install-simple': {
      options: {
        color: true,
        directory: 'bower_components'
      },
      docs: {
        options: {
          production: false
        }
      },
      prod: {
        options: {
          production: true
        }
      }
    },

    bowercopy: {
      options: {
        srcPrefix: 'bower_components'
      },
      docs: {
        options: {
          destPrefix: 'docs/libs'
        },
        files: {
          'css/bootstrap.css.map': 'bootstrap/dist/css/bootstrap.css.map',
          'css/bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css',
          'css/jquery.fullPage.css': 'fullpage.js/jquery.fullPage.css',
          'css/pygments.css': 'pygments/css/pastie.css',
          'fonts/glyphicons-halflings-regular.eot': 'bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
          'fonts/glyphicons-halflings-regular.svg': 'bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
          'fonts/glyphicons-halflings-regular.ttf': 'bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
          'fonts/glyphicons-halflings-regular.woff': 'bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
          'js/bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js',
          'js/webfont.js': 'components-webfontloader/webfont.js',
          'js/html5shiv.min.js': 'html5shiv/dist/html5shiv.min.js',
          'js/jquery.min.js': 'jquery/dist/jquery.min.js',
          'js/jquery.min.map': 'jquery/dist/jquery.min.map',
          'js/jquery-1x/jquery.min.js': 'jquery-1x/dist/jquery.min.js',
          'js/jquery-1x/jquery.min.map': 'jquery-1x/dist/jquery.min.map',
          'js/jquery.easings.min.js': 'fullpage.js/vendors/jquery.easings.min.js',
          'js/jquery.fullPage.min.js': 'fullpage.js/jquery.fullPage.min.js',
          'js/jquery.slimscroll.min.js': 'fullpage.js/vendors/jquery.slimscroll.min.js',
          'js/modernizr.js': 'modernizr/modernizr.js',
          'js/respond-proxy.html': 'respond-minmax/cross-domain/respond-proxy.html',
          'js/respond.min.js': 'respond-minmax/dest/respond.min.js',
          'js/respond.proxy.gif': 'respond-minmax/cross-domain/respond.proxy.gif',
          'js/respond.proxy.js': 'respond-minmax/cross-domain/respond.proxy.js'
        }
      }
    }
  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['jekyll', 'validation']);

  var runSubset = function (subset) {
    return !process.env.TWBS_TEST || process.env.TWBS_TEST === subset;
  };
  var isUndefOrNonZero = function (val) {
    return val === undefined || val !== '0';
  };

  // Test task.
  var testSubtasks = [];
  // Skip core tests if running a different subset of the test suite
  if (runSubset('core')) {
    testSubtasks = testSubtasks.concat(['dist-css', 'dist-js', 'csslint:dist', 'test-js', 'docs']);
  }
  // Skip HTML validation if running a different subset of the test suite
  if (runSubset('validate-html') &&
      // Skip HTML5 validator on Travis when [skip validator] is in the commit message
      isUndefOrNonZero(process.env.TWBS_DO_VALIDATOR)) {
    testSubtasks.push('validate-html');
  }

  grunt.registerTask('test', testSubtasks);
  grunt.registerTask('test-js', ['jshint:core', 'jshint:test', 'jscs:core', 'jscs:test', 'qunit']);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify:core']);

  // CSS distribution task.
  grunt.registerTask('less-compile', ['bower-install-simple:prod', 'less:compileCore']);
  grunt.registerTask('dist-css', ['less-compile', 'autoprefixer:core', 'usebanner', 'csscomb:dist', 'cssmin:minifyCore']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean:dist', 'dist-css', 'dist-js']);

  // Default task.
  grunt.registerTask('default', ['clean:dist', 'test']);

  // Version numbering task.
  // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
  // This can be overzealous, so its changes should always be manually reviewed!
  grunt.registerTask('change-version-number', 'sed');

  // Docs task.
  grunt.registerTask('bower-docs', ['bower-install-simple:docs', 'bowercopy:docs']);
  grunt.registerTask('docs-css', ['less:compileDocs', 'autoprefixer:docs', 'csscomb:docs', 'bower-docs', 'cssmin:docs']);
  grunt.registerTask('lint-docs-css', ['csslint:docs']);
  grunt.registerTask('docs-js', 'uglify:docsJs');
  grunt.registerTask('lint-docs-js', ['jshint:assets', 'jscs:assets']);
  grunt.registerTask('docs', ['docs-css', 'lint-docs-css', 'docs-js', 'lint-docs-js', 'clean:docs', 'copy:docs']);

};
