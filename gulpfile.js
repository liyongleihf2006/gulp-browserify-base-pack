/**
 * Created by LiYonglei on 2017/8/9.
 */
var gulp = require("gulp");
var path = require("path");
var del=require("del");
var uglify = require("gulp-uglify");
var fs = require("fs");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
/*获取匹配关键词的路径中的文件夹*/
var fl = require("folder-list");
var merge = require("merge-stream");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var sourcemaps= require("gulp-sourcemaps");
var gutil = require("gulp-util");
var combiner = require('stream-combiner2');
var cleanCSS = require("gulp-clean-css");

gulp.task("clean",function(){
    return del("dist/**/*");
});
gulp.task("js",["clean"],function(){
    /*获取匹配关键词中的所有的文件夹*/
    var folders=fl("src/app/**");
    var tasks=folders
        /*映射出跟文件夹下面与其同名(除了后缀)的js文件*/
        .map(function(folder){
            return folder+"/"+path.basename(folder)+".js";
        })
        /*去掉不存在的js文件*/
        .filter(function(filename){
            return fs.existsSync(filename);
        })
        /*对于每一个js文件进行分别操作*/
        .map(function(filename){
            /*以每个上面筛选的js作为入口*/
            var b = browserify({
                entries:filename,
                debug:true
            });
            /*combiner在这里主要为了让错误精准定位便于调试*/
            var combined = combiner.obj([
                /*将browserify打包的数据生成流*/
                b.bundle(),
                /*转化为vinyl流,并以相对于src的路径作为文件的新的路径*/
                source(path.relative("src",filename)),
                /*转化为内存流*/
                buffer(),
                sourcemaps.init({loadMaps:true}),
                /*压缩并改名*/
                uglify(),
                rename(path.relative("src",filename).replace(".js",".min.js")),
                sourcemaps.write("./"),
                gulp.dest("./dist/")
            ]);
            combined.on('error',gutil.log);
            return combined;
        });
    /*让上面的所有的流处理完毕以后输出*/
    return merge(tasks);
});
gulp.task("css",["clean"],function(){
    var folders=fl("src/app/**");
    var tasks=folders.filter(function(folder){
        return fs.existsSync(folder+"/"+path.basename(folder)+".css");
    }).map(function(folder){
        var combined = combiner.obj([
            gulp.src(folder+"/*.css"),
            sourcemaps.init({loadMaps:true}),
            concat(path.relative("src",folder)+"/"+path.basename(folder)+".css"),
            cleanCSS({compatibility: 'ie9'}),
            rename(path.relative("src",folder)+"/"+path.basename(folder)+".min.css"),
            sourcemaps.write("./"),
            gulp.dest("dist")
        ]);
        combined.on('error',gutil.log);
        return combined;
    });
    return merge(tasks);
});
gulp.task("default",["clean","js","css"],function(cb){});