'use strict';

const gulp = require('gulp');

var browserSync = require('browser-sync');
var bsCreate = browserSync.create();

const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

const del = require('del');

gulp.task('default', gulp.series(clear, gulp.parallel(scripts,watch,server)));

function server(){
	bsCreate.init({
		server:{
			baseDir: 'tmp',
			directory: true
		}
	});
};

function scripts(){
	return gulp.src(['**/*.js'],{cwd:'src'})
		.pipe(babel({
			presets: ['es2015'],
			plugins: ['transform-runtime']
		}))
		.pipe($.cached('scripts'))
		.pipe($.remember('scripts'))
		.pipe($.concat('/scripts/all.js'))
		.pipe(browserify())
		.pipe(gulp.dest('tmp'))
};

function watch(){
	var watcher = gulp.watch('src/**/*.js', gulp.series(scripts,gulp.parallel(bsCreate.reload)));
	watcher.on('change', function(event){
		if(event.type === 'deleted'){
			delete $.cached.caches['scripts'][event.path];
			$.remember.forget('scripts', event.path);
		}
	})
};

function all(){
	return gulp.src(['**/*.html', '**/*.css'],{cwd:'src'})
		.pipe(gulp.dest('tmp'))
}

function clear(){
	return del('tmp')
}