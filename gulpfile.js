'use strict';

/**
 * Module dependencies.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var path = require('path');
var browserSync = require('browser-sync').create();
var karma = require('karma');
var gulpNgConfig = require('gulp-ng-config');

// Configure test constants
gulp.task('config-test', function (done) {
  return gulp.src('config.json')
    .pipe(gulpNgConfig('konux.config', {
      environment: 'test'
    }))
    .pipe(gulp.dest('./app'));
});

// Configure production constants
gulp.task('config-prod', function (done) {
  return gulp.src('config.json')
    .pipe(gulpNgConfig('konux.config', {
      environment: 'prod'
    }))
    .pipe(gulp.dest('./app'));
});

// Sass task
gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(rename(function (file) {
      file.dirname = file.dirname.replace(path.sep + 'scss', path.sep + 'css');
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Live reload changes in browser
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('watch', ['config-prod', 'browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  gulp.watch('app/index.html', browserSync.reload); 
  gulp.watch('app/konux.js', browserSync.reload);
  gulp.watch('app/users/**/*.html', browserSync.reload); 
  gulp.watch('app/users/**/*.js', browserSync.reload);
});

/**
 * Run test once and exit
 */
gulp.task('test', ['config-test'], function (done) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});