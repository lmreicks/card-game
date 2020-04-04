
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
    browserSync.init({
      port: 3002, //this can be any port, it will show our app
      proxy: 'http://localhost:8999', //this is the port where express server works
      ui: { port: 3003 }, // UI, can be any port
      reloadDelay: 1000 //Important, otherwise syncing will not work
    });
    return nodemon({
        script: paths.outDir + '/' + paths.scripts.out,
        ext: 'js html css'
    }).on('start', () => {
      if (!started) {
        cb();
        started = true;
      }
    })
    .on('reload', browserSync.reload())
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