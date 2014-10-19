'use strict';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');

var minimist = require('minimist');
var options = minimist(process.argv.slice(2), {
  string: 'docver',
  default: {
    docver: require('./package.json').version || '0.0.0'
  }
});

var handleErr = function(err) {
  console.log(err.message);
  process.exit(1);
};

gulp.task('static', function() {
  return gulp.src([
    'test/*.js',
    'lib/**/*.js',
    'index.js',
    'gulpfile.js'
  ])
  .pipe(plugins.jshint('.jshintrc'))
  .pipe(plugins.jshint.reporter('jshint-stylish'))
  .pipe(plugins.jshint.reporter('fail'))
  .pipe(plugins.jscs())
  .on('error', handleErr)
  .pipe(plugins.eslint())
  .pipe(plugins.eslint.format())
  .pipe(plugins.eslint.failOnError());
});

gulp.task('test', function(cb) {
  gulp.src([
    'lib/**/*.js',
    'index.js'
  ])
  .pipe(plugins.istanbul({
    includeUntested: true
  }))
  .on('finish', function() {
    gulp.src(['test/*.js'])
      .pipe(plugins.plumber())
      .pipe(plugins.mocha({
        reporter: 'spec',
        timeout: 100000
      }))
      .pipe(plugins.istanbul.writeReports())
      .on('end', cb);
  });
});

gulp.task('coveralls', ['test'], function() {
  return gulp.src('coverage/lcov.info').pipe(plugins.coveralls());
});

/* docs folders */
var currDocVerFolder = 'docs/' + options.docver;
var latestDocFolder = 'docs/latest';

gulp.task('clean-docs', function(cb) {
  del([currDocVerFolder + '/**'], cb);
});

gulp.task('clean-docs:latest', function(cb) {
  del([latestDocFolder + '/**'], cb);
});

gulp.task('docs', ['clean-docs'], function() {
  return gulp.src([
    './index.js',
    './lib/*.js',
    'README.md'
  ])
  .pipe(plugins.jsdoc.parser({ plugins: ['plugins/markdown'] }))
  .pipe(plugins.jsdoc.generator(currDocVerFolder));
});

gulp.task('docs:latest', ['version-readme', 'clean-docs:latest', 'docs'], function() {
  return gulp.src([currDocVerFolder + '/**'])
    .pipe(gulp.dest(latestDocFolder));
});

gulp.task('version-readme', function() {
  return gulp.src(['README.md'])
    .pipe(plugins.replace(/(\/|@)\d+\.\d+\.\d+/g, '$1' + options.docver))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['static', 'test']);
