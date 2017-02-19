var gulp = require('gulp');
var	uglify = require('gulp-uglify');
var	usemin = require('gulp-usemin');
var	gulpif = require('gulp-if');
var	merge = require('merge-stream');
var environmentVariable = require('../environmentVariable');

gulp.task('js', ['html'], function() {
	var isProd = environmentVariable.getEnv();

	// for prod
	var srcPath = './build/';
	var useMinSteam = gulp.src(srcPath + '**/*.html')
		.pipe(usemin({
			js: [uglify()]
		}))
		.pipe(gulp.dest('./build/'));

	// for dev
	var copyJsStream = gulp.src('./dev/js/**/*.js')
		.pipe(gulpif(!isProd, gulp.dest('./build/js')));

	var copyNodeStream = gulp.src('./node_components/**/*.js')
		.pipe(gulpif(!isProd, gulp.dest('./build/node_components')));


	return merge(useMinSteam, copyJsStream, copyNodeStream);
});
