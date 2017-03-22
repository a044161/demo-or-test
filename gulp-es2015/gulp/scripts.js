'use strict';

const path = require('path');

const gulp = require('gulp');
const cached = require('gulp-cached');
const babel = require('gulp-babel');
const rollup = require('rollup-stream');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const _path = require('./config').path;
const _folder = require('./config').folder;

const stream = require('./server').stream;

function scripts(){
	return rollup({entry: path.join(_path.src, _folder.app_entry)})
		.pipe(source(_folder.app_entry))
		.pipe(buffer())
		.pipe(babel({
			presets: ['es2015','stage-0']
		}))
		.pipe(gulp.dest(_path.dist))
		.pipe(stream())
}

module.exports = scripts;