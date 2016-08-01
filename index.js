"use strict";

var gulp = require('gulp');
var Elixir = require('laravel-elixir');

/**
 * Extend Laravel Elixir so that it can call the fonts task
 */
Elixir.extend('fonts', function (src, output, baseDir, options) {

    // Retrieve the paths that should be used
    const paths = prepGulpPaths(src, output, baseDir, options);

    // Create the task itself
    new Elixir.Task('fonts', function () {
        return gulpTask.call(this, paths);
    })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});

/**
 * If specific file types have been passed in then set up the gulp.src() filter string
 *
 * @param   {String|Array}   types
 *
 * @returns {string}
 */
const filterByFileTypes = (types) => {
    let typeString = '';

    if (types.length) {
        // Is the types variable an array (all arrays are objects in javascript etc etc)
        typeString = (typeof types === "object") ? '{'+types.join(',')+'}' : types ;
        typeString = '/**/*.' + typeString;
    }

    return typeString;
};

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array|null}  src
 * @param  {string|null}        baseDir
 * @param  {string|null}        output
 *
 * @return {GulpPaths}
 */
let prepGulpPaths = (src, output, baseDir, options) => {
    let config = addFontProperty();
    let typeString = '';

    baseDir = baseDir || './';
    typeString = filterByFileTypes(options.filetypes);

    return new Elixir.GulpPaths()
        .src(src || config.get('assets.fonts.folder') + typeString, baseDir)
        .output(output || config.get('public.fonts.outputFolder'), baseDir);
};

/**
 * As the fonts property is not in the config by default we can add it here
 *
 * @returns {*}
 */
let addFontProperty = () => {
    Elixir.config.fonts = {

        /*
         |----------------------------------------------------------------
         | Font Source Folder
         |----------------------------------------------------------------
         |
         | This property sets the name of the folder, not the full path,
         | for your font source files (or the fonts themselves). It
         | then gets affixed to the "assetsPath".
         |
         */

        folder: 'fonts',

        /*
         |----------------------------------------------------------------
         | Fonts Output Folder
         |----------------------------------------------------------------
         |
         | Once your fonts have been copied, they will be saved to your
         | configured directory. This property represents the name of
         | the folder within that location.
         |
         */

        outputFolder: 'fonts',
    };

    // Now that we have added the fonts property we can return the new config object
    return Elixir.config;
};

/**
 * Run the actual task
 *
 * @param paths
 *
 * @returns {*}
 */
var gulpTask = function (paths) {

    // The this.log statement will print the information messages when the task is run
    this.log(paths.src, paths.output);

    return (
        gulp
            .src(paths.src.path)
            .pipe(gulp.dest(paths.output.baseDir))
            .on('error', function (e) {
                new Elixir.Notification().error(e, 'Font Copying Has Failed!');
                this.emit('end');
            })
            .pipe(new Elixir.Notification('Fonts Copied!'))
    );
};
