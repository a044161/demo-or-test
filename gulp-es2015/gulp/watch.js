'use strict';

const path = require('path');

const gulp = require('gulp');
const watcher = require('gulp-watch');

const _folder = require('./config').folder;
const _path = require('./config').path;
const server = require('./server');
const task_html = require('./html');
const task_js = require('./scripts');
const task_css = require('./styles');

function watch(){
	watcher(path.join(_path.src,_folder.html),gulp.series(task_html,gulp.parallel(server.reload)));
	watcher(path.join(_path.src,_folder.css),gulp.series(task_css,gulp.parallel(server.reload)));
	watcher(path.join(_path.src,_folder.js),gulp.series(task_js,gulp.parallel(server.reload)));
	// watch(path.join(_path.src,_folder.image),gulp.series(scripts,gulp.parallel(server.reload)));
	// watch(path.join(_path.src,_folder.font),gulp.series(scripts,gulp.parallel(server.reload)));
}

module.exports = watch;