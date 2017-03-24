'use strict';

const path = require('path');

const gulp = require('gulp');
const htmlReplace = require('gulp-html-replace');
const fileInclude = require('gulp-file-include');
const inject = require('gulp-inject');
const cached = require('gulp-cached');

const _path = require('./config').path;
const _folder = require('./config').folder;

const stream = require('./server').stream;

function html(){
	return gulp.src(path.join(_path.src,_folder.html))
			.pipe(fileInclude({
				prefix: '@@',
				basePath: path.join(_path.src,_folder.html)
			}))
			.pipe(cached('html'))
			.pipe(gulp.dest(_path.dist))
			.pipe(stream())
}

module.exports = html;