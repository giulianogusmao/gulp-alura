const gulp = require('gulp')
    , clean = require('gulp-clean')                             // exclui diretório
    , imagemin = require('gulp-imagemin')                       // minimifica imagens
    , uglify = require('gulp-uglify')                           // minimifica scripts js
    , concat = require('gulp-concat')                           // concatena scripts
    , sass = require('gulp-sass')                               // processa o arquivo scss para css
    , cssmin = require('gulp-cssmin')                           // minimifica css
    , htmlReplace = require('gulp-html-replace')                // substitui blocos de scripts do html pelo bundle
    , jshint = require('gulp-jshint')                           // valida erros e qualidade dos scripts
    , csslint = require('gulp-csslint')                         // valida erros e qualidade do css
    , rename = require('gulp-rename')                           // renomeia arquivos
    , autoprefixer = require('gulp-autoprefixer')               // inclui prefixos de suporte do css ex.: -webkit-transition
    , es = require('event-stream')
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

gulp.task('img', () => {
    gulp
        .src(`${path.origin}img/**/*`)
        // .pipe(imagemin())
        .pipe(gulp.dest(`${path.deploy}img`));
});

gulp.task('js', () => {
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

gulp.task('sass', () => {
    return gulp
        .src(`${path.origin}sass/**/*.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`${path.origin}css/`));
});

gulp.task('css', ['sass'], () => {
    let folder = 'css/';

    es
        .merge([
            gulp.src(`${path.origin}${folder}**/*`),
        ])
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest(`${path.deploy}${folder}`));
});

gulp.task('html', () => {
    let folder = '';

    gulp
        .src(`${path.origin}${folder}**/*.html`)
        .pipe(htmlReplace({
            scripts: 'js/bundle.min.js',
            cssIndex: 'css/index.min.css',
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

    // atualizando o css apartir dos arquivos sass
    gulp.watch('./sass/*.scss').on('change', (event) => {
        gulp.start('sass');
    });

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

gulp.task('default', ['clean'], () => gulp.start('html', 'js', 'img', 'css'));