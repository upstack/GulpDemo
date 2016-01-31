var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
const del = require('del');

gulp.task('del',function(){
  del(['build']);
});

gulp.task('autoprefixer',['del'],function(){
  gulp.src('static/*.css')
  .pipe(postcss([autoprefixer({cascade:false,add:false})]))
  .pipe(gulp.dest('build'));
});

gulp.task('debug',function(){
  var info = autoprefixer({ browsers: ['last 1 version'] }).info();
  console.log(info);
});
