'use strict';

const gulp = require('gulp');

var browserSync = require('browser-sync');
var bsCreate = browserSync.create();

const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

const del = require('del');



function server(){
	bsCreate.init({
		server:{
			baseDir: 'tmp',
			directory: true
		}
	});

	gulp.watch('src/**/*.js',gulp.series('scripts'));
	gulp.watch('src/**/*.css',gulp.series('styles'));
};

gulp.task('scripts',function(){
	return gulp.src(['**/*.js'],{cwd:'src'})
		.pipe(babel({
			presets: ['es2015'],
			plugins: ['transform-runtime']
		}))
		.pipe($.cached('scripts'))
		.pipe($.remember('scripts'))
		.pipe($.concat('scripts/app.js'))
		.pipe(browserify())
		.pipe(gulp.dest('tmp'))
});

gulp.task('styles', function(){
	return gulp.src(['**/*.css'], {cwd: 'src'})
		.pipe($.cached('styles'))
		.pipe($.remember('styles'))
		.pipe(gulp.dest('tmp'))
});

gulp.task('all', function(){
	return gulp.src(['**/*.html'],{cwd:'src'})
		.pipe(gulp.dest('tmp'))
});

function clear(){
	return del('tmp')
}

gulp.task('default', gulp.series(clear, gulp.parallel('scripts','styles',server,'all')));