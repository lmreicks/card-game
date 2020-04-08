
const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');

const paths = ((projectBase) => ({
  projectBase,
  tsConfig: projectBase + 'tsconfig.json',
  baseDir: projectBase + 'src',
  outDir: 'dist',
  scripts: {
    include: projectBase + '**/*.ts',
    out: 'server.js'
  }
}))('server/');

const tsProject = ts.createProject(paths.tsConfig);

function scripts() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest(paths.outDir));
}

function server(cb) {
    let started = false;
    return nodemon({
        script: paths.outDir + '/' + paths.scripts.out,
        ext: 'js'
    }).on('start', () => {
      if (!started) {
        cb();
        started = true;
      }
    });
}

function watch(done) {
  gulp.watch(paths.scripts.include, scripts);
  done();
}

const serve = gulp.series(scripts, server);
const build = gulp.series(scripts);

module.exports = {
    serve,
    build,
    watch
} 