var gulp = require('gulp');
var postcss = require('gulp-postcss');
var easysp = require('postcss-easysprites');
var del = require('del');

gulp.task('del',function(){
  del(['build']);
});

gulp.task('easysp',function(){
  var opts = {
    imagePath:'build/static/img',
    spritePath:'build/static/img'
    // stylesheetPath:'build/static'
  };
  gulp.src('static/**/*.css')
  .pipe(postcss([easysp(opts)]))
  .pipe(gulp.dest('build/static'));
});

gulp.task('views',function(){
  gulp.src('views/**')
  .pipe(gulp.dest('build/views'));
});

gulp.task('default',['del'],function(){
  gulp.start(['sp','views']);
});
