const gulp = require('gulp'),
      imagemin = require('gulp-imagemin'),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat');

let path = {
    origin: './',
    deploy: './dist/'
}

gulp.task('build-img', () => {
    return gulp
        .src(`${path.origin}img/**/*`)
        .pipe(imagemin())
        .pipe(gulp.dest(`${path.deploy}img`));
});

gulp.task('js', () => {    
    return gulp
        .src(`${path.origin}js/**/*.js`)
        .pipe(uglify())
        .pipe(concat("bundle.min.js"))
        .pipe(gulp.dest(`${path.deploy}js`));
});

gulp.task('default', ['js']);