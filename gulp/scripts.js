import gulp from 'gulp';
import gulpIf from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import log from 'fancy-log';
// JS
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';

// Mode
const isDev = process.env.NODE_ENV === 'development';
const isWatch = process.env.WATCH === 'true';

const paths = {
  scripts: {
    entry: ['src/js/index.js', 'src/js/components.js'],
    dest: 'build/js/',
  },
};

const bundler = browserify({
  entries: paths.scripts.entry,
  debug: isDev, // sourcemaps
  cache: {},
  packageCache: {},
}).transform(babelify, {
  sourceMaps: isDev,
});

function scripts() {
  return bundler
    .bundle()
    .on('error', e => log.error(`Browserify error:: ${e.message}`))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulpIf(isDev, sourcemaps.init({ loadMaps: true })))
    .pipe(gulpIf(!isDev, uglify()))
    .pipe(gulpIf(isDev, sourcemaps.write('./')))
    .pipe(gulp.dest(paths.scripts.dest));
}

if (isWatch) {
  bundler.plugin(watchify);
  bundler.on('update', scripts);
  bundler.on('log', msg => log(`Browserify:: ${msg}`));
}

export default scripts;
