var gulp      = require('gulp'),
    sass      = require('gulp-sass'),
    webserver = require("browser-sync"),
    uglify    = require("gulp-uglify"),
    concat    = require("gulp-concat"),
    nunjucks  = require("gulp-nunjucks-render");

/* ----- Paths to source/build/watch files ----- */

var path = {
  build: {
    html: 'build/',
    css: 'build/css',
    js: 'build/js',
    img: 'build/img',
    fonts: 'build/fonts',
    libs: 'build/libs'
  },
  src: {
    html: ['src/*.html', 'src/templates/pages/*.html'],
    css: 'src/scss/*.scss',
    js: 'src/js/**/*.js',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    libs: 'src/libs/**/*.*'
  },
  watch: {
    html: ['src/*.html', 'src/templates/**/*.html'],
    css: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    libs: 'src/libs/**/*.*'
  }
}

/* ----- Webserver config ----- */
var config = {
    server: "build/",
    notify: false,
    open: true,
    ui: false
};

/* ----- Tasks ----- */

gulp.task("webserver", function () {
    webserver(config);
});

gulp.task('css:build', function () {
  return gulp.src(path.src.css)
  .pipe(sass())
  .pipe(gulp.dest(path.build.css))
  .pipe(webserver.reload({stream: true})) // inject updates by browser-sync
});

// temp (copy html files to build)
// gulp.task('html:copy', function () {
//   return gulp.src(path.src.html)
//   .pipe(gulp.dest(path.build.html))
//   .pipe(webserver.reload({stream: true}))
// });

gulp.task("html:build", function () {
    return gulp.src(path.src.html)
        .pipe(nunjucks({
            path: ['src/templates/']
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(webserver.reload({stream: true}));
});

// temp (copy js files to build)
gulp.task('js:copy', function () {
  return gulp.src(path.src.js)
  .pipe(gulp.dest(path.build.js))
  .pipe(webserver.reload({stream: true}))
});

gulp.task('js:build', function() {
	return gulp.src(path.src.js)
	.pipe(concat('main.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	// .pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(gulp.dest(path.build.js))
	.pipe(webserver.reload({ stream: true }))
});

// temp (copy img files to build)
gulp.task('img:copy', function () {
  return gulp.src(path.src.img)
  .pipe(gulp.dest(path.build.img))
  .pipe(webserver.reload({stream: true}))
});

// copy libs files to build
gulp.task('libs:copy', function () {
  return gulp.src(path.src.libs)
  .pipe(gulp.dest(path.build.libs))
  .pipe(webserver.reload({stream: true}))
});

gulp.task('fonts:build', function () {
  return gulp.src(path.src.fonts)
  .pipe(gulp.dest(path.build.fonts))
  .pipe(webserver.reload({stream: true}))
});

gulp.task('watch', ['webserver', 'css:build', 'html:build', 'img:copy', 'libs:copy', 'js:build', 'fonts:build'], function () {
  gulp.watch(path.watch.html, ['html:build']);
  gulp.watch(path.watch.css, ['css:build']);
  gulp.watch(path.watch.img, ['img:copy']);
  // gulp.watch(path.watch.js, ['js:copy']);
  gulp.watch(path.watch.js, ['js:build']);
  gulp.watch(path.watch.fonts, ['fonts:build']);
  gulp.watch(path.watch.libs, ['libs:copy']);
});
