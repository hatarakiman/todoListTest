var gulp = require('gulp');
var jade = require('gulp-jade');

gulp.task('html', function() {

	return gulp.src('./dev/html-template/**/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('./build/'));
});
