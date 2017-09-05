const gulp = require('gulp')
    , clean = require('gulp-clean')
    , imagemin = require('gulp-imagemin')
    , uglify = require('gulp-uglify')
    , concat = require('gulp-concat')
    , htmlReplace = require('gulp-html-replace')
    , jshint = require('gulp-jshint')
    , csslint = require('gulp-csslint')
    , browserSync = require('browser-sync').create();

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
            port: '3000',
            // proxy: "localhost:3000" // carregando browserSync junto com outro servidor. ex.: xampp php
        }
    });

    gulp.watch('./*.html').on('change', browserSync.reload);

    // validando código css
    gulp.watch('./css/*.css').on('change', (event) => {
        gulp
            .src(event.path)
            .pipe(csslint())
            .pipe(csslint.formatter());
            
        browserSync.reload();
    });

    // validando código javascript
    gulp.watch('./js/*.js').on('change', (event) => {
        gulp
            .src(event.path)
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish', { beep: true }));

        browserSync.reload();
    });
});

gulp.task('default', ['clean'], () => gulp.start('build-html', 'build-js', 'build-img', 'build-css'));