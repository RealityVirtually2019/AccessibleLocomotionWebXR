import del from 'del';

// Remove all files from build folder
function clean() {
  return del([
    // js
    'build/js/**',
    // html
    'build/*.html',
  ]);
}

export default clean;
