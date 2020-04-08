const gulp = require('gulp');
const server = require('./server/gulpfile');
const client = require('./app/gulpfile');
const del = require('del');

const clean = () => del(['dist']);

gulp.task('server', gulp.series(clean, server.serve));

gulp.task('default', gulp.series(clean, server.serve, client.serve, gulp.parallel(server.watch, client.watch)))