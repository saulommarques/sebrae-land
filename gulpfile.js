'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const precss = require('precss');
const cssnano = require('cssnano');
const pug = require('gulp-pug');
const uglify = require('gulp-uglify');
const del = require('del');
const babel = require('gulp-babel');

const processors = [
    precss(),
    autoprefixer(),
    cssnano()
];

// create web server with browserSync
function server() {
    browserSync.init({
        watch: true,
        port: 8080,
        open: true,
        server: './dist/'
    });
}

// generate HTML files
function html() {
    return gulp.src('./src/assets/views/*.pug')
      .pipe(pug())
      .pipe(gulp.dest('./dist'));
}

// compiling to final style
function styles() {
    return gulp.src('./src/assets/stylesheets/style.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist/assets/stylesheets/'));
}

// compiling to final javascript
function scripts() {
    return gulp.src('./src/assets/javascripts/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/javascripts/'));
}

// images to dist
function images() {
    return gulp.src('./src/assets/images/**/*')
        .pipe(gulp.dest('./dist/assets/images'));
}

// fonts to dist
function fonts() {
    return gulp.src('./src/assets/fonts/**/*')
        .pipe(gulp.dest('./dist/assets/fonts'));
}

// audios to dist
function audios() {
    return gulp.src('./src/assets/audios/**/*')
        .pipe(gulp.dest('./dist/assets/audios'));
}

// videos to dist
function videos() {
    return gulp.src('./src/assets/videos/**/*')
        .pipe(gulp.dest('./dist/assets/videos'));
}

// Json to dist
function data() {
    return gulp.src('./src/assets/data/**/*')
        .pipe(gulp.dest('./dist/assets/data'));
}

function watch() {
    gulp.watch('./src/assets/views/**/*.pug', html);
    gulp.watch('./src/assets/stylesheets/**/*.css', styles);
    gulp.watch('./src/assets/javascripts/**/*.js', scripts);
    gulp.watch('./src/assets/images/**/*', images);
    gulp.watch('./src/assets/fonts/**/*', fonts);
    gulp.watch('./src/assets/audios/**/*', audios);
    gulp.watch('./src/assets/videos/**/*', videos);
    gulp.watch('./src/assets/data/**/*', data);

    gulp.watch(['./src/**'], browserSync.reload({stream: true}));
}

function clean() {
    return del('./dist');
}

const build = [
    html,
    styles,
    scripts,
    images,
    fonts,
    audios,
    videos,
    data
]

gulp.task('default', gulp.series(clean, build, gulp.parallel(server, watch)));
