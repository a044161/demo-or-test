'use strict';

const path = require('path');

const gulp = require('gulp');
const cached = require('gulp-cached');

const _path = require('./config').path;
const _folder = require('./config').folder;

const stream = require('./server').stream;

function scripts(){
	return gulp.src(path.join(_path.src,_folder.js))
		.pipe(cached('scripts'))
		.pipe(gulp.dest(_path.dist))
		.pipe(stream())
}

module.exports = scripts;