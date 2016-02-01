var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sprites = require('postcss-sprites').default;
var del = require('del');

var opts = {
  stylesheetPath:'build/static',//由sp任务复写
  spritePath:'build/static/img',
  groupBy:function(image){
    if(image.url.indexOf('icon') > 0){
      return Promise.resolve('icon');
    }
    return Promise.reject();
  }
}
gulp.task('del',function(){
  del(['build']);
});

gulp.task('sp',function(){
  gulp.src('static/**/*.css')
  .pipe(postcss([sprites(opts)]))
  .pipe(gulp.dest('build/static'));
});

gulp.task('views',function(){
  gulp.src('views/**')
  .pipe(gulp.dest('build/views'));
})

gulp.task('default',['del'],function(){
  gulp.start(['sp','views']);
})
