var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var prettify = require('gulp-html-prettify');
var csso = require('gulp-csso');
var csscomb = require('gulp-csscomb');
var sourcemaps=require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');

gulp.task('default', function() {

    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });

    gulp.watch("./src/index.html").on('change', browserSync.reload);
    gulp.watch("./src/style/**/*.css").on('change', browserSync.reload);
    gulp.watch("./src/js/*.js").on('change', browserSync.reload);
    gulp.watch("./src/pic/*").on('change', browserSync.reload);
    gulp.watch("./src/img/*").on('change', browserSync.reload);
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
    gulp.src('./src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'));
    gulp.src('./src/pic/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/pic'));
});