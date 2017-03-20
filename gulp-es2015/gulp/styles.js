'use strict';

const path = require('path');

const gulp = require('gulp');
const cached = require('gulp-cached');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const _path = require('./config').path;
const _folder = require('./config').folder;

const stream = require('./server').stream;

function styles(){
	return gulp.src(path.join(_path.src, _folder.css))
		.pipe(cached('styles'))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest(_path.dist))
		.pipe(stream())
};

module.exports = styles;