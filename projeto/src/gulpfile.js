const gulp = require('gulp');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

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

gulp.task('build-img', ['clean'], () => {
    gulp
        .src(`${path.origin}img/*.png`)
        .pipe(imagemin())
        .pipe(gulp.dest(`${path.deploy}img`));
});

gulp.task('build-js', ['clean'], () => {    
    gulp
        .src(`${path.origin}js/**/*.js`)
        .pipe(uglify())
        .pipe(concat("bundle.min.js"))
        .pipe(gulp.dest(`${path.deploy}js`));
});

gulp.task('default', ['build-js', 'build-img']);