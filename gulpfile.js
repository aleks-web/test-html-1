// * Модули * //
// ?src - взять
// ?dest - положить
// ?watch - слежка за изменениями в файлах
// ?parallel - позволяет запускать параллельно какие-нибудь таски (обновление браузера и слежка за файлами)

const { src, dest, watch, parallel } = require('gulp'),   // Gulp

    scss = require('gulp-sass')(require('sass')),         // sass
    concat = require('gulp-concat'),                      // concat - соеденить скрипты
    browserSync = require('browser-sync').create(),       // browserSync - слежка за страницей
    uglify = require('gulp-uglify-es').default,           // gulp-uglify-es - работа с js файлами
    autoprefixer = require('gulp-autoprefixer'),          // gulp-autoprefixer - префиксы для браузеров
    fileinclude = require('gulp-file-include');           // gulp-file-include - для импорта html в html


    const dirApp = "app/";
    const dirDist = "dist/";

// Переменные путей
const dir = {
    // Дирректории приложения
    appScss: dirApp + "assets/scss/",
    appImg: dirApp + "assets/img/",
    appFonts: dirApp + "assets/fonts/",
    appJs: dirApp + "assets/js/",
    appCss: dirApp + "assets/css/",
    app: dirApp,

    // Итоговые дирректории
    dist: dirDist,
    distCss: dirDist + "assets/css/",
    distJs: dirDist + "assets/js/",
    distFonts: dirDist + "assets/fonts/",
    distImg: dirDist + "assets/img/"
}

// За какой папкой следить
function browsersync() {
    browserSync.init({
        server: {
            baseDir: `${dir.dist}`,
        }
    });
}

// Обработка стилей sass
function sass() {
    return src([`${dir.appScss}` + 'style.scss'])
        .pipe(scss())
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version']
        }))
        .pipe(dest(`${dir.appCss}`))
        .pipe(dest(`${dir.distCss}`))
        .pipe(browserSync.stream())
}

function style() {
    return src([`${dir.appCss}` + '*/*.*', `${dir.appCss}` + '*.*'])
        .pipe(dest(`${dir.distCss}`))
        .pipe(browserSync.stream())
}

// Обработка скриптов
function scripts() {
    return src([`${dir.appJs}` + '*.js', `${dir.appJs}` + '*/*.js'])
        .pipe(uglify())
        .pipe(dest(`${dir.distJs}`))
        .pipe(browserSync.stream())
}

// Обработчик html
function html() {
    return src(`${dir.app}` + '*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest(`${dir.dist}`))
        .pipe(browserSync.stream())
}

function fonts() {
    return src([`${dir.appFonts}` + '*/*.*', `${dir.appFonts}` + '*.*'])
        .pipe(dest(`${dir.distFonts}`));
}

function image() {
    return src([`${dir.appImg}` + '*.*', `${dir.appImg}` + '*/*.*'])
        .pipe(dest(`${dir.distImg}`));
}


// Слежка за файлами
function watching() {
    watch([`${dir.appScss}` + '**/*.scss'], sass);
    watch([`${dir.appJs}` + '*.js', `${dir.appJs}` + '*/*.js'], scripts);
    watch([`${dir.app}` + '**/*.html']).on('change', html);
}

// Забилдить проект
function build() {
    fonts();
    image();
    sass();
    style();
    scripts();
    html();
}

exports.sass = sass;
exports.html = html;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.build = build;

exports.default = parallel(html, scripts, sass, browsersync, watching);