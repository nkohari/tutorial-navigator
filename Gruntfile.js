module.exports = function (grunt) {
  var path = require('path');
  var join = path.join;
  var fs = require('fs');
  var read = fs.readFileSync;

  var DEV_PATH = 'tutorial-navigator/development';
  var BASE_PATH = 'tutorial-navigator/tutorial-navigator';

  var pkg = require('./package');
  var path = require('path');

  var minor_version = pkg.version.replace(/\.(\d)*$/, '');
  var major_version = pkg.version.replace(/\.(\d)*\.(\d)*$/, '');

  var styleFiles = [
    'css/tutorial-navigator.styl'
  ];

  function  rename_release (v) {
    return function (d, f) {
      var dest = path.join(d, f.replace(/(\.min)?\.(js|css)$/, '-'+ v + '$1.$2'));
      return dest;
    };
  }

  function node_bin (bin) {
    return path.join('node_modules', '.bin', bin);
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      build: {
        src: ['src/app.js'],
        dest: 'build/tutorial-navigator.standalone.js',
        options: {
          browserifyOptions: {
            extensions: ['.jsx'],
            standalone: 'TutorialNavigator',
            transform: [
               ["babelify", { loose: "all"}], [ 'reactify' , {'es6': true}]
            ]
          }
        }
      },
      noConflict:{
        src: ['src/app.js'],
        dest: 'build/tutorial-navigator.standalone.noconflict.js',
        options: {
          browserifyOptions: {
            extensions: ['.jsx'],
            standalone: 'TutorialNavigator',
            transform: [
               ["babelify", { loose: "all"}], [ 'reactify' , {'es6': true}]
            ]
          },
          exclude : ['react' ]
        }
      }
    },
    clean: {
      build: ['build/']
    },
    copy: {
      release: {
        files: [
          { expand: true, flatten: true, src: 'build/*', dest: 'release/', rename: rename_release(pkg.version) },
          { expand: true, flatten: true, src: 'build/*', dest: 'release/', rename: rename_release(minor_version) },
          { expand: true, flatten: true, src: 'build/*', dest: 'release/', rename: rename_release(major_version) }
        ]
      },
      release_dev: {
        files: [
          { expand: true, flatten: true, src: 'build/*', dest: 'release/' },
        ]
      }
    },
    env: {
      build: {
        NODE_ENV: "production"
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      noConflict: {
        files: {
          'build/tutorial-navigator.standalone.noconflict.min.js': ['build/tutorial-navigator.standalone.noconflict.js'],
        }
      },
      build: {
        files: {
          'build/tutorial-navigator.standalone.min.js': ['build/tutorial-navigator.standalone.js'],
        }
      }
    },
    connect: {
      dev: {
        options: {
          keepalive: true,
          hostname: '*',
          port: 8990,
          base: ['.', 'example', 'vendor/react']
        }
      },
    },
    stylus: {
        dev: {
          options: {
            compress: false
          },
          src: styleFiles,
          dest: 'build/tutorial-navigator.css'
        }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'build/tutorial-navigator.min.css': ['build/tutorial-navigator.css']
        }
      }
    },
    watch: {
      stylus: {
        files: styleFiles,
        tasks: ['stylus:build']
      }
    },
    aws_s3: {
      options: {
        accessKeyId:     process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET,
        bucket:          process.env.S3_BUCKET,
        region:          process.env.S3_REGION,
        uploadConcurrency: 5,
        params: {
          CacheControl: 'public, max-age=300'
        },
        // debug: true <<< use this option to test changes
      },
      clean_dev: {
        files: [
          { action: 'delete', dest: DEV_PATH + '/tutorial-navigator.css' },
          { action: 'delete', dest: DEV_PATH + '/tutorial-navigator.min.css' },
          { action: 'delete', dest: DEV_PATH + '/tutorial-navigator.standalone.js' },
          { action: 'delete', dest: DEV_PATH + '/tutorial-navigator.standalone.min.js' }
        ]
      },
      publish_dev: {
        files: [
          {
            expand: true,
            cwd:    'release/',
            src:    ['**'],
            dest:   DEV_PATH
          }
        ]
      },
      clean: {
        files: [
          { action: 'delete', dest: BASE_PATH + '-' + pkg.version + '.js' },
          { action: 'delete', dest: BASE_PATH + '-' + pkg.version + '.min.js' },
          { action: 'delete', dest: BASE_PATH + '-' + major_version + '.js' },
          { action: 'delete', dest: BASE_PATH + '-' + major_version + '.min.js' },
          { action: 'delete', dest: BASE_PATH + '-' + minor_version + '.js' },
          { action: 'delete', dest: BASE_PATH + '-' + minor_version + '.min.js' }
        ]
      },
      publish: {
        files: [
          {
            expand: true,
            cwd:    'release/',
            src:    ['**'],
            dest:   'tutorial-navigator/'
          }
        ]
      }
    },
    http: {
      purge_js_dev: {
        options: {
          url: process.env.CDN_ROOT + '/' + DEV_PATH + '/',
          method: 'DELETE'
        }
      },
      purge_js: {
        options: {
          url: process.env.CDN_ROOT + '/' + BASE_PATH + '-' + pkg.version + '.js',
          method: 'DELETE'
        }
      },
      purge_js_standalone: {
        options: {
          url: process.env.CDN_ROOT + '/' + BASE_PATH + '.standalone-' + pkg.version + '.js',
          method: 'DELETE'
        }
      },
      purge_js_standalone_noconflict: {
        options: {
          url: process.env.CDN_ROOT + '/' + BASE_PATH + '.standalone.noconflict-' + pkg.version + '.js',
          method: 'DELETE'
        }
      },
      purge_js_min: {
        options: {
          url: process.env.CDN_ROOT + '/' + BASE_PATH + '-' + pkg.version + '.min.js',
          method: 'DELETE'
        }
      },
      purge_major_js: {
        options: {
          url: process.env.CDN_ROOT + '/' + BASE_PATH + '-' + major_version + '.js',
          method: 'DELETE'
        }
      },
      purge_major_js_standalone: {
        options: {
          url: process.env.CDN_ROOT + '/' + BASE_PATH + '.standalone-' + major_version + '.js',
          method: 'DELETE'
        }
      },
      purge_major_js_standalone_noconflict: {
        options: {
          url: process.env.CDN_ROOT + '/' + BASE_PATH + '.standalone.noconflict-' + major_version + '.js',
          method: 'DELETE'
        }
      },
      purge_major_js_min: {
        options: {
          url: process.env.CDN_ROOT + '/' + BASE_PATH +  '-' + major_version + '.min.js',
          method: 'DELETE'
        }
      },
      purge_minor_js: {
        options: {
          url: process.env.CDN_ROOT + '/' + BASE_PATH + '-' + minor_version + '.js',
          method: 'DELETE'
        }
      },
      purge_minor_js_standalone: {
        options: {
          url: process.env.CDN_ROOT + '/' + BASE_PATH + '.standalone-' + minor_version + '.js',
          method: 'DELETE'
        }
      },
      purge_minor_js_standalone_noconflict: {
        options: {
          url: process.env.CDN_ROOT + '/' + BASE_PATH + '.standalone.noconflict-' + minor_version + '.js',
          method: 'DELETE'
        }
      },
      purge_minor_js_min: {
        options: {
          url: process.env.CDN_ROOT + '/' + BASE_PATH + '-' + minor_version + '.min.js',
          method: 'DELETE'
        }
      },
      purge_css: {
       options: {
         url: process.env.CDN_ROOT + '/' + BASE_PATH + '-' + pkg.version + '.css',
         method: 'DELETE'
       }
      },
      purge_css_min: {
       options: {
         url: process.env.CDN_ROOT + '/' + BASE_PATH + '-' + pkg.version + '.min.css',
         method: 'DELETE'
       }
      },
      purge_major_css: {
       options: {
         url: process.env.CDN_ROOT + '/' + BASE_PATH + '-' + major_version + '.css',
         method: 'DELETE'
       }
      },
      purge_major_css_min: {
       options: {
         url: process.env.CDN_ROOT + '/' + BASE_PATH + '-' + major_version + '.min.css',
         method: 'DELETE'
       }
      },
      purge_minor_css: {
       options: {
         url: process.env.CDN_ROOT + '/' + BASE_PATH + '-' + minor_version + '.css',
         method: 'DELETE'
       }
      },
      purge_minor_css_min: {
       options: {
         url: process.env.CDN_ROOT + '/' + BASE_PATH + '-' + minor_version + '.min.css',
         method: 'DELETE'
       }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-http');
  grunt.loadNpmTasks("grunt-env");

  grunt.registerTask('build-both',            ['env:build', 'clean:build', 'stylus', 'cssmin', 'browserify:build', 'browserify:noConflict', 'uglify:build', 'uglify:noConflict' ]);
  grunt.registerTask('build-no-conflict',     ['env:build', 'clean:build', 'stylus', 'cssmin', 'browserify:noConflict', 'uglify:noConflict' ]);
  grunt.registerTask('build',                 ['env:build', 'clean:build', 'stylus', 'cssmin', 'browserify:build', 'uglify:build' ]);
  grunt.registerTask('dev-no-conflict',       ['clean:build', 'stylus', 'browserify:noConflict', 'connect:dev', 'watch' ]);
  grunt.registerTask('dev',                   ['clean:build', 'stylus', 'browserify:build', 'connect:dev', 'watch' ]);
  grunt.registerTask('purge_cdn_dev',         ['http:purge_js_dev']);
  grunt.registerTask('cdn_dev',               ['build-both', 'copy:release_dev', 'aws_s3:clean_dev', 'aws_s3:publish_dev', 'purge_cdn_dev']);
  grunt.registerTask('purge_cdn',             ['http:purge_js', 'http:purge_js_standalone', 'http:purge_js_standalone_noconflict', 'http:purge_js_min', 'http:purge_major_js', 'http:purge_major_js_standalone', 'http:purge_major_js_standalone_noconflict', 'http:purge_major_js_min', 'http:purge_minor_js', 'http:purge_minor_js_standalone', 'http:purge_minor_js_standalone_noconflict',  'http:purge_minor_js_min', 'http:purge_css', 'http:purge_css_min', 'http:purge_major_css', 'http:purge_major_css_min', 'http:purge_minor_css', 'http:purge_minor_css_min']);
  grunt.registerTask('cdn',                   ['build-both', 'copy:release', 'aws_s3:clean', 'aws_s3:publish', 'purge_cdn']);
  grunt.registerTask('default',               ['build']);
};
