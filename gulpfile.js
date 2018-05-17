"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var server = require("browser-sync").create();
var run = require("run-sequence");
var del = require("del");
var rename = require("gulp-rename");
var jsminify = require("gulp-minify");

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html", ["html"]);
  gulp.watch("source/js/*.js", ["script"]);
  gulp.watch("build/*.html").on("change", server.reload);
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "!source/img/icon-**",
    "!source/img/logo-footer.svg",
    "!source/img/logo-htmlacademy.svg",
    "source/js/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("copy-pin", function () {
  return gulp.src("source/img/icon-map-pin.svg")
  .pipe(gulp.dest("build/img"));
});

gulp.task("clean", function () {
    return del("build");
  });

gulp.task("sprite", function () {
  return gulp.src([
    "source/img/icon-*.svg",
    "source/img/logo-footer.svg",
    "source/img/logo-htmlacademy.svg"
  ])
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function() {
  gulp.src([
    "source/img/*.jpg",
    "source/img/*.png"
  ])
    .pipe(webp())
    .pipe(gulp.dest("build/img"))
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("script", function () {
  return gulp.src([
    "source/js/*.js",
    "!source/js/**.min.js"
  ])

  .pipe(jsminify({
    ext:{
        src:".js",
        min:".min.js"
    }
  }))
  .pipe(gulp.dest("build/js"));
});

var minify = require('gulp-minify');

gulp.task("build", function(done) {
  run("clean", "copy", "copy-pin","style", "sprite", "webp", "html", "script", done);
});
