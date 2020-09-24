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

function build() {
  const tasks = series(lint, clean, compile);
  watch(jsFiles, tasks);
}

exports.lint = lint;
exports.clean = clean;
exports.compile = compile;
exports.build = build;
exports.default = build;
