'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const prettify = require('gulp-html-prettify');
const csso = require('gulp-csso');
const csscomb = require('gulp-csscomb');
const sourcemaps=require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const pump = require('pump');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const newer = require ('gulp-newer');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
    gulp.watch("./src/**/*.*").on('change', browserSync.reload);
});

gulp.task('html-prettify', function() {
    gulp.src('./src/index.html')
        .pipe(prettify({indent_char: ' ', indent_size: 2}))
        .pipe(gulp.dest('./build/'))
});

gulp.task('comb-css', function() {
    return gulp.src('./src/styles/*.css')
        .pipe(csscomb())
        .pipe(gulp.dest('./build/style'));
});

gulp.task('prefixer-css', function() {
    gulp.src('./src/style/*.css')
        .pipe(autoprefixer({
            browsers: ['last 25 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./build/style'))
});

gulp.task('sourcemap-css', function () {
    return gulp.src('./src/style/base.css')
        .pipe(sourcemaps.init())
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/style'));
});

gulp.task('minify-css', function () {
    return gulp.src('./src/*.css')
        .pipe(csso())
        .pipe(gulp.dest('./build/style'));
});

gulp.task('minify-js', function (cb) {
    pump([
            gulp.src('./src/js/*.js'),
            uglify(),
            gulp.dest('./build/js')
        ],
        cb
    );
});

gulp.task('concat-js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('minify-img', function() {
    gulp.src('./src/img/**')
        .pipe(newer('./build/img'))
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'));
    gulp.src('./src/pic/**')
        .pipe(newer('./build/pic'))
        .pipe(imagemin())
        .pipe(gulp.dest('./build/pic'));
});

gulp.task('build', ['html-prettify', 'prefixer-css', 'comb-css', 'minify-js', 'concat-js', 'minify-img']);