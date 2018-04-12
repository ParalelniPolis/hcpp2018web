var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  concat = require('gulp-concat'),
  postcss = require('gulp-postcss'),
  cssnano = require('cssnano'),
  reporter = require('postcss-reporter'),
  cssnext = require('postcss-cssnext'),
  uglify = require('gulp-uglify');

gulp.task('styles', function () {
  var processors = [
    cssnext({browsers: ['last 10 versions']}),
    cssnano({
      discardComments: {
        removeAll: true
      }
    }),
    reporter()
  ];
  return gulp.src(['./assets/css/*.css', './assets/plugins/custom-google-map/ggl-map-main.css'])
    .pipe(concat('styles.css'))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./assets/public/css'))
    .pipe(livereload());
});

gulp.task('scripts', function() {
  return gulp.src([
      './node_modules/es6-promise/dist/es6-promise.js',
      './node_modules/whatwg-fetch/fetch.js',
      './assets/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/public/js'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch(['./assets/css/*.css', './assets/js/*.js'], ['styles', 'scripts']);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js handlebars coffee',
    stdout: false,
    ignore: ['assets/css/*', 'assets/js/*', 'assets/plugins/*', 'assets/public/*']
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'styles',
  'scripts',
  'develop',
  'watch'
]);
