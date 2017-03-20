'use strict';

const path = require('path');

const gulp = require('gulp');
const del = require('del');
const watch = require('gulp-watch');

const _path = require('./gulp/config').path;
const _folder = require('./gulp/config').folder;

const server = require('./gulp/server');
const task_html = require('./gulp/html');
const task_scripts = require('./gulp/scripts');
const task_styles = require('./gulp/styles');
const task_watch = require('./gulp/watch');

gulp.task('clean', function(){
	return del(_path.dist)
})

gulp.task('default', gulp.series('clean',gulp.parallel(task_html,task_scripts, task_styles,server.dev,task_watch)))