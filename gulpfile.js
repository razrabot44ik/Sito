'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();

gulp.task('css', function () {
  return gulp.src('Source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('Source/css/'));
});

gulp.task('server', function () {
  server.init({
    server: 'Source/',
  
  });

  gulp.watch('Source/sass/**/*.{sass,scss}', gulp.series('css'));
  gulp.watch('Source/*.html').on('change', server.reload);
});

gulp.task('start', gulp.series('css', 'server'));
