/**
 * Created by Administrator on 2017/5/20.
 */

//引入本地安装的gulp
var gulp = require("gulp"); //返回一个对象
var less = require("gulp-less");
var cssmin = require("gulp-cssmin");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var htmlmin = require("gulp-htmlmin");
var autoprefixer = require("gulp-autoprefixer");
var rev = require("gulp-rev");
var revCollector = require("gulp-rev-collector");
var useref = require("gulp-useref");
var gulpif = require("gulp-if");
//返回值是一个对象 借助此对象 可以实现任务清单的定制


//定义任务
gulp.task("less", function () {
// console.log('learn');
//借助gulp.src 来制定less文件位置--registry=https://registry.npm.taobao.org
    gulp.src("./public/less/*.less")
    //借助gulp插件实现less传css的操作
        .pipe(less())
        .pipe(cssmin())
        .pipe(autoprefixer())//增加私有化前缀 webkit
        .pipe(rev())
        .pipe(gulp.dest("./release/public"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("./release/rev"))
})
//处理图片(压缩图片)
gulp.task("image", function () {
    gulp.src("./public/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./release/public/images"))
})



//压缩js
gulp.task("js", function () {
    gulp.src("./scripts/*js")
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./release/public"))
})
//压缩html
gulp.task("html", function () {
    gulp.src(["./index.html", "./view/*.html"],{base:"./"})
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true, minifyCSS: true, minifyJS: true}))
        .pipe(gulp.dest("./release"))
})
//css 替换操作
gulp.task("rev",function () {
    gulp.src(["./release/rev/*.json","./release/**/*.html"],{base:"./release"})
        .pipe(revCollector())
        .pipe(gulp.dest("./release"))
})
gulp.task("useref",function () {
    gulp.src("./index.html")
        .pipe(useref())
        .pipe(gulpif("*.js",uglify()))
        .pipe(gulp.dest("./release"));
})
