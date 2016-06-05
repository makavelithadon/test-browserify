var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    cached = require('gulp-cached'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    lec = require('gulp-line-ending-corrector'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

browserSync.init({server: {
            baseDir: './'
        }});

gulp.task('browserify', function() {
  return browserify('./js/app.js')
    .bundle()
    .pipe(source('bundle.js')) // gives streaming vinyl file object
    .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
    .pipe(uglify()) // now gulp-uglify works
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {

    gulp.watch('./js/**/*.js', ['browserify']);
});

gulp.task('default', ['watch']);
