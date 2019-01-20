// Server
const browserSync = require('browser-sync').create();

const paths = {
  dest: 'build/',
};

export default function server() {
  browserSync.init({
    server: {
      baseDir: paths.dest,
      directory: false,
    },
    // watch files
    files: [`${paths.dest}**/*.*`],
    open: false,
    notify: false,
  });
}
