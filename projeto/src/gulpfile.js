const gulp = require('gulp');
const usemin = require('gulp-usemin');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const es = require('event-stream');
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

gulp.task('build-img', () => {
    gulp
        .src(`${path.origin}img/**/*`)
        // .pipe(imagemin())
        .pipe(gulp.dest(`${path.deploy}img`));
});

// gulp.task('build-js', () => {
//     let folder = 'js/';

//     gulp
//         .src([
//             `${path.origin}${folder}jquery.js`,
//             `${path.origin}${folder}home.js`,
//             `${path.origin}${folder}produto.js`,
//         ])
//         .pipe(uglify())
//         .pipe(concat("bundle.min.js"))
//         .pipe(gulp.dest(`${path.deploy}${folder}`));
// });

// gulp.task('build-css', () => {
//     let folder = 'css/';

//     gulp
//         .src(`${path.origin}${folder}**/*`)
//         .pipe(gulp.dest(`${path.deploy}${folder}`));
// });

// gulp.task('build-html', () => {
//     let folder = '';

//     gulp
//         .src(`${path.origin}${folder}**/*.html`)
//         .pipe(htmlReplace({
//             js: 'js/bundle.min.js'
//         }))
//         .pipe(gulp.dest(`${path.deploy}${folder}`));
// });

gulp.task('build-usemin', () => {
    let folder = '';

    es.merge([
            gulp.src(
                `${path.origin}${folder}index.html`
            ),
            // gulp.src(
            //     `${path.origin}${folder}produto.html`,
            // )
        ])
        .pipe(usemin({
            js: [uglify()],
            css: [cssmin()],
        }))
        .pipe(gulp.dest(`${path.deploy}${folder}`));
});

// gulp.task('default', ['clean'], () => gulp.start('build-html', 'build-js', 'build-img', 'build-css'));
gulp.task('default', ['clean'], () => gulp.start('build-usemin', 'build-img'));