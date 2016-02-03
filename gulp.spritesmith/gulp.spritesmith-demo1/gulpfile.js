var gulp = require('gulp');
var del = require('del');
var spritesmith = require('gulp.spritesmith');

var buffer = require('vinyl-buffer'); //虚拟文件的buffer
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream'); //合并多个stream

var concat = require('gulp-concat');

/*
删除
 */
gulp.task('delBuild', function() {
  del.sync('build');
});

gulp.task('delTemp',function(){
  del.sync('temp');
});

/*
产出雪碧图
 */
gulp.task('sprites', function() {
  var spriteData = gulp.src('static/img/*.png')
    .pipe(spritesmith({
      imgName: 'sprites.png',
      cssName: 'sprites.css',
      imgPath: 'static/img/sprites.png',//css中图片的路径
      cssTemplate: 'static/tmpl/_sprites.handlebars'//css模板的路径
    }));

  //直接输出到一个目录下
  // return spriteData.pipe(gulp.dest('build/static/css'));

  //图片和样式两个独立的流控制，输出到不同目录
  var imgStream = spriteData.img
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest('build/static/img'));

  var cssStream = spriteData.css
    .pipe(gulp.dest('temp/static/css'));

  return merge(imgStream, cssStream);
});

/*
将雪碧图进行
 */
gulp.task('concat',function(){
  return gulp.src(['static/css/*.css','temp/static/css/sprites.css'])
  .pipe(concat('main.css'))
  .pipe(csso())//压缩
  .pipe(gulp.dest('build/static/css'));
});

/*
任务执行队列（利用回调函数，依赖同步执行，略显杂乱，希望有更好的方式，像是状态机）
 */
gulp.task('taskQueue',function(){
  gulp.start(['delBuild','delTemp'],function(){
    console.log('=== del end ===');
    gulp.start('sprites',function(){
      console.log('=== sprites end ===');
      gulp.start('concat',function(){
        console.log('=== concat end ===');
        //重复调用任务一定要复写回调，不然将继续执行上一次定义的回调
        gulp.start('delTemp',function(){
          console.log('=== delTemp end ===');
        });
      });
    });
  });
});
