import gulp from 'gulp';
import clean from './gulp/clean';
import html from './gulp/html';
import scripts from './gulp/scripts';
import server from './gulp/server';
import copy from "./gulp/copy";

// Complex tasks
const build = gulp.series(clean, gulp.parallel(html, copy, scripts));

export { scripts, server, build };

export default gulp.parallel(build, server);
