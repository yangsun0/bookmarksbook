const { src, dest, watch, series } = require("gulp");
const del = require("del");
const flowRemoveTypes = require("gulp-flow-remove-types");
const eslint = require("gulp-eslint");

const jsFiles = "src/**/*.js";

function lint() {
  return src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function clean() {
  return del("build/**");
}

function compile() {
  return src(jsFiles)
    .pipe(flowRemoveTypes({ all: true }))
    .pipe(dest("build"));
}

const build = series(lint, clean, compile);

function devServer() {
  build();
  watch(jsFiles, build);
}

exports.lint = lint;
exports.clean = clean;
exports.compile = compile;
exports.build = build;
exports.default = devServer;
