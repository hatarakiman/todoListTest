var gulp = require('gulp');
var	sass = require('gulp-ruby-sass');
var	csso = require('gulp-csso');
var gulpif = require('gulp-if');
var environmentVariable = require('../environmentVariable');

gulp.task('css', function() {
	var isProd = environmentVariable.getEnv();

	return sass('./dev/scss/style.scss')
		.on('error', sass.logError)
		.pipe(gulpif(isProd, csso()))
		.pipe(gulp.dest('./build/css'));
});
