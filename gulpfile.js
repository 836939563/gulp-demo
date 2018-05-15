const gulp = require("gulp");
const uglify = require('gulp-uglify');

const minimist = require('minimist'); // 命令行参数解析引擎
const gulpif = require('gulp-if');

// 获取命令行参数
var knownOptions = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'production'
  }
};

var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('build', function(){
  gulp.src('js/*.js')
    .pipe(
      gulpif(options.env === 'prod', uglify())
    )
    .pipe(gulp.dest('dist/js'))
});

// 任务
gulp.task('demo1', function(){
  console.log("demo1 gulp task");
});

gulp.task('pluginDemo', function(){
  gulp.src('js/*.js')
  .pipe(uglify()) // 插件
  .pipe(gulp.dest('min'))
});

// 执行任务
gulp.task('default', ['demo1', 'pluginDemo']); // 命令行 gulp执行 gulp + 任务名(eg: gulp demo1) 执行单独的task

// 监听
gulp.task('watchTask', function () {
  console.log('watching type2');
});

gulp.watch('js/*.js', function(){
  console.log('watching type1');
});
gulp.watch('js/*.js',   ['watchTask']);