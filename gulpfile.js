var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var csso = require('gulp-csso');
var uncss = require('gulp-uncss');
var csscomb = require('gulp-csscomb');
var htmlmin = require('gulp-htmlmin');
var sourcemaps=require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');

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

gulp.task('clean-css', function () {
    return gulp.src('./src/style/base.css')
        .pipe(uncss({
            html: ['./src/index.html']
        }))
        .pipe(gulp.dest('./build/style'));
});

gulp.task('comb-css', function() {
    return gulp.src('./src/styles/base.css')
        .pipe(csscomb())
        .pipe(gulp.dest('./build/style'));
});

gulp.task('prefixer-css', function() {
    gulp.src('./src/style/base.css')
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
    return gulp.src('./src/base.css')
        .pipe(csso())
        .pipe(gulp.dest('./build/style'));
});

gulp.task('minify-html', function() {
    return gulp.src('./src/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./build'));
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
        .pipe(gulp.dest('./build/images'))
});

gulp.task('clean', function () {
    return gulp.src('./tmp', {read: false})
        .pipe(clean());
});