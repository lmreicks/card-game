
const gulp = require('gulp');
const { series } = gulp;
const browserify = require('browserify');
const ts = require('gulp-typescript');
const browserSync = require('browser-sync');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const watchify = require('watchify');
const sass = require('gulp-sass');

const path = ((projectBase) => ({
  projectBase,
  tsConfig: projectBase + 'tsconfig.json',
  html: {
    include: projectBase + 'src/' + '**/*.html',
    dest: 'dist/public'
  },
  scss: {
    include: projectBase + 'src/scss/*.scss',
    dest: 'dist/public/css'
  },
  assets: {
    include: projectBase + 'src/assets/*',
    dest: 'dist/public/assets'
  },
  baseDir: 'dist',
  outDir: 'dist/public',
  scripts: {
    include: projectBase + '**/*.ts',
    out: 'bundle.js',
    entry: projectBase + 'src/index.ts'
  }
}))('app/');

const b = watchify(browserify({
  baseDir: '.',
  debug: true,
  entries: [path.scripts.entry],
  cache: {},
  packageCache: {}
}));

function html() {
  return gulp.src(path.html.include)
    .pipe(gulp.dest(path.html.dest))
}

function css() {
  return gulp.src(path.scss.include)
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(path.scss.dest));
}

function assets() {
  return gulp.src(path.assets.include).pipe(gulp.dest(path.assets.dest))
}

const tsProject = ts.createProject(path.tsConfig);

// function scripts() {
//   return tsProject.src()
//     .pipe(tsProject())
//     .js.pipe(gulp.dest(path.outDir));
// }

// function reload(done) {
//   browserSync.reload();
//   done();
// }

// function server(done) {
//   browserSync.init({
//     server: {
//       baseDir: path.baseDir
//     }
//   });
//   done();
// }

function bundle() {
  return b
  .plugin(tsify)
  .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts']
  })
  .bundle()
  .pipe(source(path.scripts.out))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(path.outDir));
}

function watch(done) {
  gulp.watch(path.scripts.include, bundle);
  gulp.watch(path.html.include, html);
  gulp.watch(path.scss.include, css);
  gulp.watch(path.assets.include, assets);

  done();
}

const serve = series(bundle, html, css, assets);
const build = series(bundle, html, css, assets);

module.exports = {
  serve,
  build,
  watch
}
