const { src, dest, watch, series } = require("gulp");
const del = require("del");
const eslint = require("gulp-eslint");
const flowRemoveTypes = require("flow-remove-types");
const through2 = require("through2");

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

function transform(file, _, cb) {
  if (file.isBuffer()) {
    const result = flowRemoveTypes(file.contents.toString(), {
      all: true,
    });
    file.contents = Buffer.from(result.toString());
  }
  cb(null, file);
}

function compile() {
  return src(jsFiles).pipe(through2.obj(transform)).pipe(dest("build"));
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
