import gulp from 'gulp';

const paths = {
    src: 'src/assets/*.*',
    dest: 'build/assets',
  };
 
function copy() {
    return gulp.src(paths.src).pipe(gulp.dest(paths.dest));
      
}

export default copy;
