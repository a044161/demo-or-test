'use strict';

const path = require('path');

const gulp = require('gulp');
const del = require('del');
const watch = require('gulp-watch');

const _path = require('./gulp/config').path;
const _folder = require('./gulp/config').folder;

const server = require('./gulp/server');
const scripts = require('./gulp/scripts');
const styles = require('./gulp/styles');

gulp.task('watch', function(){
	watch(path.join(_path.src,_folder.js),gulp.series(scripts,gulp.parallel(server.reload)));
	watch(path.join(_path.src,_folder.css),gulp.series(styles,gulp.parallel(server.reload)));
})

gulp.task('clean', function(){
	return del(_path.dist)
})

gulp.task('default', gulp.series('clean',gulp.parallel(scripts,styles,server.dev,'watch')))