const path = require('path');
const browserSyncPattern = ['./*.html', './styles/*.css'];

module.exports = function (grunt) {
  const stylesPattern = [
    'styles/**/*.scss'
  ];
  const stylesPatternMain = ['./styles/shellbryson.scss'];
  const versionPath = './'

  grunt.config.init({
    watch: {
      options: {
        cwd: './',
        interval: 200,
        spawn: false
      },
      styles: {
        files: stylesPattern,
        tasks: ['styles']
      }
    },
    sass: {
      build: {
        files: {
          './styles/shellbryson.css': stylesPatternMain
        }
      }
    },
    browserSync: {
      bsFiles: {
        src : [
          './styles/shellbryson.css',
          './index.html'
        ]
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "./"
        }
      }
    }
  });

  grunt.registerTask('version', [], () => {
    const obj = grunt.file.readJSON('package.json');
    const version = obj.version;
    const project = obj.name;
    const filePath = versionPath + "version.txt";
    grunt.log.writeln(`Project: ${project}` );
    grunt.log.writeln(`Version: ${version}` );
    grunt.log.writeln("");
    grunt.log.writeln(`Write version: ${filePath}`);
    grunt.file.write(filePath, version);
  });

  grunt.registerTask('styles', [], () => {
    grunt.loadNpmTasks('grunt-sass');
    grunt.task.run('sass',);
  });

  grunt.registerTask('default', [], () => {
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.task.run('browserSync', 'version', 'styles', 'watch');
  });
};
