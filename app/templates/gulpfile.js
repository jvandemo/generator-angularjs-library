var gulp = require('gulp'),
    karma = require('karma').server,
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sourceFiles = [
      'src/<%= config.libraryName.camelized %>/<%= config.libraryName.camelized %>.prefix',
      'src/<%= config.libraryName.camelized %>/<%= config.libraryName.camelized %>.js',
      'src/<%= config.libraryName.camelized %>/directives/**/*.js',
      'src/<%= config.libraryName.camelized %>/filters/**/*.js',
      'src/<%= config.libraryName.camelized %>/services/**/*.js',
      'src/<%= config.libraryName.camelized %>/<%= config.libraryName.camelized %>.suffix'
    ];

gulp.task('build', function() {
  gulp.src(sourceFiles)
    .pipe(concat('<%= config.libraryName.slugified %>.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('<%= config.libraryName.slugified %>.min.js'))
    .pipe(gulp.dest('./dist'))
});

/**
 * Run test once and exit
 */
gulp.task('test-src', function (done) {
  karma.start({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-concatenated', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-concatenated.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-minified', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-minified.conf.js',
    singleRun: true
  }, done);
});
