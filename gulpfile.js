const gulp = require('gulp'),
  sass = require('gulp-sass'),
  cssnano = require('gulp-cssnano'),
imagemin    = require('gulp-imagemin'),
  autoprefixer = require('gulp-autoprefixer'),
  pngquant    = require('imagemin-pngquant');


gulp.task('img', function() {
  return gulp.src('./src/img/*')
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('public/img')); // Выгружаем на продакшен
});

gulp.task('sass', ()=>(
  gulp.src('./src/sass/*')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(cssnano())
    .pipe(gulp.dest('./public'))
));

gulp.task('js', ()=>(
  gulp.src('./src/js/*')
    .pipe(gulp.dest('./public'))
));

gulp.task('lib', ()=>(
  gulp.src('./src/libs/*')
    .pipe(gulp.dest('./public'))
));

gulp.task('fonts', ()=>(
  gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./public/fonts'))
));

gulp.task('watch',['sass','img', 'js', 'lib', 'fonts'], ()=> {
  gulp.watch('./src/sass/*', ['sass']);
  gulp.watch('./src/img/*', ['img']);
  gulp.watch('./src/js/*', ['js']);
  gulp.watch('./src/libs/*', ['lib']);
  gulp.watch('./src/fonts/*', ['fonts']);
});