const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const jshint = require('gulp-jshint');
const buffer = require('vinyl-buffer');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

const entryPoint = 'js/main.js';

gulp.task('concat', function(){
	return gulp.src('js/**/*.js')
	.pipe(concat('all.js'))
	.pipe(gulp.dest('./dist/js'))
});

gulp.task('transpile', function() {
  return browserify(entryPoint, { debug: true })
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .pipe(source('all.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('jshint', function() {
  return gulp.src('js/**/*.js')
    .pipe(jshint({ esversion: 6 }))
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('htmlmin', function(){
	return gulp.src('*.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('./dist'))
})

gulp.task('default', ['transpile', 'concat', 'jshint', 'sass', 'htmlmin']);