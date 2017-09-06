const gulp = require('gulp');
const usemin = require('gulp-usemin');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const es = require('event-stream');
const minifyHtml = require('gulp-minify-html');
const htmlReplace = require('gulp-html-replace');

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

gulp.task('img', () => {
    gulp
        .src(`${path.origin}img/**/*`)
        // .pipe(imagemin())
        .pipe(gulp.dest(`${path.deploy}img`));
});

gulp.task('usemin', () => {
    let folder = '';

    gulp
        .src(
            // `${path.origin}${folder}index.html`
            `${path.origin}${folder}**/*.html`
        )
        .pipe(usemin({
            htmlmin: minifyHtml({
                empty: true
            }),
            js: [uglify()],
            css: [cssmin()],
        }))
        .pipe(gulp.dest(`${path.deploy}${folder}`));
});

gulp.task('default', ['clean'], () => gulp.start('usemin', 'img'));