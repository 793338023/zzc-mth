const gulp = require("gulp");
const markdown = require("gulp-markdown");
const through2 = require("through2");
const inject = require("gulp-inject");
const rimraf = require("rimraf");
const merge2 = require("merge2");
const { renderer, tocObj } = require("./util/toc");
const { getProjectPath, getCurrPath, injection } = require("./util/utils");

const packageJson = require(getProjectPath("package.json"));
const { customParams = {} } = packageJson;
const { theme = "markdown6", packageDir = "dist" } = customParams;
let rootPath = getProjectPath("src");
let themePath = `${getCurrPath("themes")}/${theme}.css`;
let cssPath = `${getCurrPath("css")}/**/*.css`;
let coverCssPath = `${getProjectPath("css")}/**/*.css`;
let mdPath = `${rootPath}/**/*.md`;

// md转html
function mdToHtml() {
  let cssPaths = [themePath, cssPath];
  if (coverCssPath !== cssPath) {
    cssPaths.push(coverCssPath);
  }
  const sources = gulp.src(cssPaths);
  return gulp
    .src(mdPath)
    .pipe(gulp.dest(packageDir))
    .pipe(
      markdown({
        headerIds: false,
        renderer: renderer
      })
    )
    .pipe(
      through2.obj(function(file, encoding, next) {
        let dir = tocObj.toHTML();
        let preindex = file.path.lastIndexOf("\\");
        let lastIndex = file.path.lastIndexOf(".html");
        let name = file.path.substring(preindex + 1, lastIndex);
        const content = file.contents.toString(encoding);
        file.contents = Buffer.from(injection(content, name, dir));
        this.push(file);
        next();
      })
    )
    .pipe(
      inject(sources, {
        starttag: "<!-- inject:FileContent:{{ext}} -->",
        endtag: "<!-- endinject -->",
        relative: true,
        transform: function(filePath, file) {
          if (filePath.slice(-3) === ".js") {
            return "<script>" + file.contents.toString("utf8") + "</script>";
          }
          if (filePath.slice(-4) === ".css") {
            return "<style>" + file.contents.toString("utf8") + "</style>";
          }
          // 将文件内容作为字符串返回
          return file.contents.toString("utf8");
        }
      })
    )
    .pipe(gulp.dest(packageDir));
}

gulp.task("default", () => {
  rimraf.sync(packageDir);
  const mdToHtmlTask = mdToHtml();
  // 静态资源
  const assetsTask = gulp
    .src([
      rootPath + "/**/*.jpg",
      rootPath + "/**/*.png",
      rootPath + "/**/*.svg"
    ])
    .pipe(gulp.dest(packageDir));
  return merge2([mdToHtmlTask, assetsTask]);
});
