const gulp = require('gulp')
    , csso = require('gulp-csso')
    , gutil = require('gulp-util')
    , clean  = require('gulp-clean')
    , rigger = require('gulp-rigger')
    , concat = require('gulp-concat')
    , notify = require('gulp-notify')
    , rename = require("gulp-rename")
    , uglify = require('gulp-uglify')
    , svgmin = require('gulp-svgmin')
    , connect = require('gulp-connect')
    , sourcemaps = require('gulp-sourcemaps')
    , minifyHTML = require('gulp-minify-html')
    , autoprefixer = require('gulp-autoprefixer')
    , browserSync = require('browser-sync').create()
    , imageminJpegtran = require('imagemin-jpegtran')
    , imageminPngquant = require('imagemin-pngquant')
    ;

const config = {
    src: {
        img: [
            './img/**/*.png', 
            './pic/**/*.png',
            './img/**/*.jpg', 
            './pic/**/*.jpg',
            './img/**/*.jpeg', 
            './pic/**/*.jpeg'
        ]   
    }
}

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['./index.html']).on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);

    gulp.watch('./css/**/*.css').on('change', browserSync.reload)
});

gulp.task('css', function () {
    gulp.src(['./css/**/*.css'])
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', gutil.log))
        .on('error', notify.onError())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
});


gulp.task('minify-image', function () {
    gulp.src(config.src.img)
        .pipe(imageminJpegtran({
            progressive: true
        })())
        .pipe(imageminPngquant({
            quality: '65-80', 
            speed: 4}
        )())
        .pipe(gulp.dest('./public/img/'));
});

gulp.task('minify-svg', function () {
    return gulp.src(config.src.img)
        .pipe(svgmin())
        .pipe(gulp.dest('./public/img/'));
});

gulp.task('minify-css', function () {
    gulp.src('./css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 30 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('minify-js', function () {
    gulp.src('./js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('minify-html', function () {
    var opts = {
        conditionals: true,
        spare: true
    };

    return gulp.src(['./index.html'])
        .pipe(minifyHTML(opts))
        .pipe(rename({ extname: '.min.html' }))
        .pipe(gulp.dest('./public/'));
});

gulp.task('clean', function() {
    return gulp.src('./public', { read: false }).pipe(clean());
});

// gulp.task('default', ['server']);
gulp.task('production', ['minify-css', 'minify-js', 'minify-image', 'minify-html']);