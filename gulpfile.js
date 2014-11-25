var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var _ = require('lodash');
var nodemon = require('gulp-nodemon');
var gutil = require('gulp-util');
var clean = require('gulp-clean');

var browserifyTask = function () {
  var browserifyOpts = {
    entries: './client/app.jsx',
    debug: true
  };
  return browserify(browserifyOpts)
    .transform('reactify')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/js'));
};

gulp.task('browserify', browserifyTask);

var cleanTask = function () {
  return gulp.src([ 'public/js/*.js', 'public/css/*.css' ], { read: false })
    .pipe(clean());
};

gulp.task('clean', cleanTask);

var bootstrapCopyTask = function () {
  return gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css')
    .pipe(gulp.dest('public/css'));
};

gulp.task('bootstrap-copy', bootstrapCopyTask);

// for local development
gulp.task('watch', function () {
  var doWatch = _.once(function () {
    // separate watcher for browserification
    gulp.watch('./client/**', [ 'browserify' ]);
    // watcher for restarting app
    var nodemonOpts = { 
      script: 'index.js',
      ext: 'js hbs',
      env: { 'NODE_ENV': 'development' },
      ignore: [
        './node_modules/**',
        './client/**'
      ], 
      nodeArgs: ['--debug'] 
    };
    nodemon(nodemonOpts)
      .on('restart', function () {
        gutil.log('watcher restarted server');
      });
  });
  gulp.start('clean', 'bootstrap-copy', 'browserify', doWatch);
});
