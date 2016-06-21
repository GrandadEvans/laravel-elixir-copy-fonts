var gulp = require('gulp');
var Elixir = require('laravel-elixir');
var config = Elixir.config;
var copy = require('gulp-copy');

var $ = Elixir.plugins;

Elixir.extend('fonts', function (src, output, baseDir) {

    var paths = prepGulpPaths(src, output, baseDir || './');

    new Elixir.Task('fonts', function () {

        this.log(paths.src, paths.output);

        return gulp
                .src(paths.src.path)
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe(new Elixir.Notification('Fonts Copied!'))
                .on('error', function(e) {
                    new Elixir.Notification().error(e, 'Font Copying Has Failed!');
                    this.emit('end');
                });
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  baseDir
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
var prepGulpPaths = function(src, output, baseDir) {
    return new Elixir.GulpPaths()
        .src(src || config.get('assets.fonts.folder'), baseDir)
        .output(output || config.get('public.fonts.outputFolder'), baseDir);
};
