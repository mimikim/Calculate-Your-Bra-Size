// Include Gulp
var gulp = require('gulp');

// Include Plugins
var sass         = require('gulp-sass'),
    jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename'),
    changed      = require('gulp-changed');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('assets/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('assets/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            // add susy
            includePaths: ['node_modules/susy/sass']
        }).on('error', sass.logError))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    gulp.src(['assets/js/vendor/**']).pipe(gulp.dest('dist/js/vendor'));
    return gulp.src('assets/js/*.js')
        .pipe(rename('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('assets/js/*.js', ['lint', 'scripts']);
    gulp.watch('assets/scss/**', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);