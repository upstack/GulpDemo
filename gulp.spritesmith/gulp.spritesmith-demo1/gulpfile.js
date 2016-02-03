var gulp = require('gulp');
var del = require('del');
var spritesmith = require('gulp.spritesmith');

var buffer = require('vinyl-buffer'); //虚拟文件的buffer
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream'); //合并多个stream


gulp.task('del', function() {
  del.sync(['build']);
});

gulp.task('sprites', function() {
  var spriteData = gulp.src('static/img/*.png')
    .pipe(spritesmith({
      imgName: 'sprites.png',
      cssName: 'sprites.css',
      imgPath: 'static/img/sprites.png',
      cssTemplate: 'static/tmpl/_sprites.handlebars'
    }));

  //直接输出到一个目录下
  // return spriteData.pipe(gulp.dest('build/static/css'));

  //图片和样式两个独立的流控制，输出到不同目录
  var imgStream = spriteData.img
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest('build/static/img'));

  var cssStream = spriteData.css
    // .pipe(csso())
    .pipe(gulp.dest('build/static/css'));

  return merge(imgStream, cssStream);
});
