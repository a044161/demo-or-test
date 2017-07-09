"use strict";

const path = require("path");

const gulp = require("gulp");
const cached = require("gulp-cached");
const env = require("gulp-environment");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const nano = require("gulp-cssnano");
const sourcemaps = require("gulp-sourcemaps");

const _path = require("./config").path;
const _file_type = require("./config").file_type;

const stream = require("./server").stream;

/**
 * PostCSS
 * 
 */

const postcss = require("gulp-postcss");

/* PostCSS end */

function stylesSCSS() {
  return gulp
    .src(path.join(_path.src, _file_type.css))
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(
      env.if.production(
        nano({
          zindex: false,
          reduceIdents: false
        })
      )
    )
    .pipe(cached("styles"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(_path.dist))
    .pipe(stream());
}

function stylesPostCSS() {
  return gulp
    .src(path.join(_path.src, _file_type.css))
    .pipe(postcss([require("precss")]))
    .pipe(cached("styles"))
    .pipe(gulp.dest(_path.dist))
    .pipe(stream());
}

function stylesStylus() {}

module.exports = {
  scss: stylesSCSS,
  postcss: stylesPostCSS,
  stylus: stylesStylus
};