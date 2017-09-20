const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const jshint = require('gulp-jshint');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

const entryPoint = 'js/main.js';

gulp.task('transpile', function() {
  return browserify(entryPoint, { debug: true })
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('jshint', function() {
  return gulp.src('js/**/*.js')
  .pipe(jshint({ esversion: 6 }))
  .pipe(jshint.reporter('default'));
});


gulp.task('default', ['transpile', 'jshint']);