// gulpfile.mjs

import gulp from 'gulp';
import uglify from 'gulp-uglify';
import cssnano from 'gulp-cssnano';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import browserSyncPackage from 'browser-sync';

const { create: browserSync } = browserSyncPackage;

export const uglifyJs = () =>
  gulp
    .src("dist/js/bundle.js", { allowEmpty: true })
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));


export const concatJs = () =>
  gulp
    .src("src/js/*.js")
    .pipe(concat("bundle.js"))
    .pipe(gulp.dest("dist/js"));


export function minifyCss() {
  return gulp.src('src/css/*.css').pipe(cssnano()).pipe(gulp.dest('dist/css'));
}

export function prefixCss() {
  return gulp
    .src('dist/css/*.css')
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest('dist/css'));
}

export function optimizeImages() {
  return gulp
    .src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
}

export function createSourcemaps() {
  return gulp
    .src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js'));
}

export function serve() {
  const server = browserSync();

  server.init({
    server: {
      baseDir: 'C:/Users/jorda/Documents/BackEnd-Round-II/Project_2_II',
    },
  });

  gulp.watch('src/*.html').on('change', server.reload);
  gulp.watch('src/js/*.js').on('change', server.reload);
}

export const build = gulp.series(
  concatJs,
  uglifyJs,
  gulp.parallel(minifyCss, prefixCss, optimizeImages, createSourcemaps)
);
export default gulp.series(build, serve);