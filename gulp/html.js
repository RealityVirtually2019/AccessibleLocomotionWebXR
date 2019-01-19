import gulp from 'gulp';

const isWatch = process.env.WATCH === 'true';

// Paths to files
const paths = {
  html: {
    src: 'src/*.html',
    dest: 'build/',
  },
};

// copy html files from src to build folder
function html() {
  return gulp.src(paths.html.src).pipe(gulp.dest(paths.html.dest));
}

// Watch file changes by the path and launch related task
function watchFiles() {
  gulp.watch(paths.html.src, html);
}

// Watcher
if (isWatch) watchFiles();

export default html;
