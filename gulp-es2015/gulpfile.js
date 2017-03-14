'use strict';

const gulp = require('gulp');

var browserSync = require('browser-sync');
var bsCreate = browserSync.create();

const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const concat = require('gulp-concat');
const del = require('del');

gulp.task('default', gulp.series(clear, gulp.parallel(server,all,scripts)));

function server(){
	bsCreate.init({
		server:{
			baseDir: 'tmp',
			directory: true
		}
	});

	var watcher = gulp.watch(['html/**/*.html', 'styles/**/*.css', 'scripts/**/*.js'],{cwd:'src'});
    watcher.on('all', function(event, path, stats){
    	scripts()
        bsCreate.reload()
        
    })
};

function all(){
	return gulp.src(['**/*.html', '**/*.css'],{cwd:'src'})
		.pipe(gulp.dest('tmp'))
}

function scripts(){
	return gulp.src(['**/*.js'],{cwd:'src'})
		.pipe(babel({
			presets: ['es2015'],
			plugins: ['transform-runtime']
		}))
		.pipe(concat('/scripts/all.js'))
		.pipe(browserify())
		.pipe(gulp.dest('tmp'))
}

function clear(){
	return del('tmp')
}