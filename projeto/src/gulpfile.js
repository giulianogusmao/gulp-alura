const gulp = require('gulp');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const htmlReplace = require('gulp-html-replace');
const browserSync = require('browser-sync').create();

let path = {
    origin: './',
    deploy: './dist/'
}

// limpar pasta de deploy 
gulp.task('clean', () => {
    return gulp
        .src(`${path.deploy}`)
        .pipe(clean());
});

gulp.task('build-img', () => {
    gulp
        .src(`${path.origin}img/**/*`)
        // .pipe(imagemin())
        .pipe(gulp.dest(`${path.deploy}img`));
});

gulp.task('build-js', () => {
    let folder = 'js/';

    gulp
        .src([
            `${path.origin}${folder}jquery.js`,
            `${path.origin}${folder}home.js`,
            `${path.origin}${folder}produto.js`,
        ])
        .pipe(uglify())
        .pipe(concat("bundle.min.js"))
        .pipe(gulp.dest(`${path.deploy}${folder}`));
});

gulp.task('build-css', () => {
    let folder = 'css/';

    gulp
        .src(`${path.origin}${folder}**/*`)
        .pipe(gulp.dest(`${path.deploy}${folder}`));
});

gulp.task('build-html', () => {
    let folder = '';

    gulp
        .src(`${path.origin}${folder}**/*.html`)
        .pipe(htmlReplace({
            scripts: 'js/bundle.min.js'
        }))
        .pipe(gulp.dest(`${path.deploy}${folder}`));
});

gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: './',
            // port: '3000'
        }
    });

    gulp.watch('./**/*.css').on('change', browserSync.reload);
    gulp.watch('./js/*.js').on('change', browserSync.reload);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['clean'], () => gulp.start('build-html', 'build-js', 'build-img', 'build-css'));