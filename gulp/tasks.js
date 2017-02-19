var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var environmentVariable = require('./environmentVariable');

gulp.task('watch', function() {
  gulp.watch('./dev/scss/**/*.scss', ['css']);
  gulp.watch('./dev/js/**/*.js', ['js']);
  gulp.watch('./dev/html-template/**/*', ['html']);
});

gulp.task('build', function(callback) {
  runSequence(
    'clean',
    [
      'css',
      'js',
      'html'
    ],
    callback
  );
});

gulp.task('build-prod', function(callback) {
  environmentVariable.setEnv(true);

  runSequence(
    'build',
    callback
  );
});

gulp.task('dev', function(callback) {

  runSequence(
    'clean',
    'build',
    [
      'watch',
      'connect'
    ],
    callback
  );
});


gulp.task('default', ['build-prod', 'connect']);
