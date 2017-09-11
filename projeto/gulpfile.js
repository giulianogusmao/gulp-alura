const gulp = require('gulp')
    , usemin = require('gulp-usemin')
    , clean = require('gulp-clean')
    , uglify = require('gulp-uglify')
    , autoprefixer = require('gulp-autoprefixer')
    , htmlReplace = require('gulp-html-replace');

let path = {
origin: 'src',
deploy: 'dist'
};

// limpar pasta de deploy 
gulp.task('clean', () => {
return gulp
    .src(path.deploy)
    .pipe(clean());
});

gulp.task('img', () => {
gulp
    .src(`${path.origin}/img/**/*`)
    // .pipe(imagemin())
    .pipe(gulp.dest(`${path.deploy}/img`));
});

gulp.task('usemin', () => {
return gulp
    .src(`${path.origin}/**/*.html`)
    .pipe(usemin({
        js: [uglify],
        css: [autoprefixer]
    }))
    .pipe(gulp.dest(path.deploy));
});

gulp.task('default', ['clean'], () => gulp.start('img', 'usemin'));