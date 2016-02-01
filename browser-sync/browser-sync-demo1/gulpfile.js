var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var del = require('del');

gulp.task('server',['views','static'],function(){
  browserSync.init({
    server:{
      //根路径
      baseDir:'build/views',
      //建立路由
      routes:{
        '/third':'views/sec'
      },
      //中间件
      middleware: function(req,res,next){
        console.log('hi middleware');
        next();
      }
    }
  });
  //监听变化并reload
  gulp.watch('static/css/**',['static']).on('change',browserSync.reload);
  gulp.watch('views/*.html',['views']).on('change',browserSync.reload);
});

gulp.task('del',function(){
  del.sync(['build']);
});

gulp.task('static',function(){
  return gulp.src('static/css/*.css')
  .pipe(gulp.dest('build/static/css'))
  .pipe(browserSync.stream());
});

gulp.task('views',function(){
  return gulp.src('views/**')
  .pipe(gulp.dest('build/views'))
  .pipe(browserSync.stream());//加入到BS流中
});

gulp.task('default',['server']);
