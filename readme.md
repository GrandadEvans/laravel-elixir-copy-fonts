# Laravel Elixir Copy Fonts extension
[![License](https://poser.pugx.org/laravel/framework/license.svg)](https://packagist.org/packages/laravel/framework)

## Contents
 * [Introduction](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#introduction)
 * [Installation](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#installation)
 * [Usage format](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#usage-format)
 * [Usage example](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#usage-example)
 * [Arguments](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#arguments)
    * [Defaults](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#defaults)
    * [No Arguments](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#no-arguments)
    * [Single Arguments](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#single-arguments)
    * [Null Arguments](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#null-arguments)
    * [Array of fonts/directories](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#array-of-fontsdirectories)
    * [Output directories](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#output-directories)
 * [Options](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#options)
    * [Limit by filetype](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#limit-by-filetype)
 * [Source and output paths](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#source-and-output-paths)
    * [Paths relative to the gulpfile](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#paths-relative-to-the-gulpfile)
    * [Paths relative to the default source directory](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#paths-relative-to-the-default-source-directory)
    * [Directory Paths](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#directory-paths)
 * [Support](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#support)
 * [License](https://github.com/GrandadEvans/laravel-elixir-copy-fonts#license)

## Introduction
This [Laravel Elixir](https://laravel.com/docs/master/elixir) extension is aimed at simplifying gulpfiles 
(and mine in particular).

Instead of my gulpfile having all sorts of copy calls copying things
like [font-awesome](http://fontawesome.io/) fonts and site fonts to a temporary directory before 
being pushed en-mass to my public folder I thought I'd create a quick 
extension to tidy my code up and make my life easier.

## Installation
First pull the extension in with
```shell
npm -i laravel-elixir-copy-fonts
```
and then add it to your gulpfile
```javascript
require('laravel-elixir-copy-fonts');
```

## Usage format
```javascript
mix.fonts([string|array src [, string dest]])
```

## Usage example
```javascript
elixir(function(mix) {
    mix
        .fonts([
            './bower_components/font-awesome/fonts',
            'custom-fonts'
        ])
        .styles(...)
        .scripts(...);
});
```

## Arguments
Exactly the same as the other Elixir methods such as `mix.styles()`
 and `mix.scripts()` *laravel-elixir-copy-fonts* can accept a 
 variety of data.

### Defaults
Both source and output paths are optional and are set to...
 * Default source directory: `./resources/assets/fonts`
 * Default output directory: `./public/fonts`
 
### No arguments
```javascript
elixir(function(mix) {
    mix.fonts();
});
```
This will copy all fonts recursively from the default source directory
`resources/assets/fonts` to `public/fonts` (the default 
destination)

### Single arguments
```javascript
elixir(function(mix) {
    mix.fonts('./bower_components/font-awesome/fonts');
});
```
All fonts will be recursively copied from this directory to the default
public directory.

### Null arguments
```javascript
elixir(function(mix) {
    mix.fonts(null, './public/css/fonts');
});
```
If you just disagree with me on where to keep font files and you prefer
 to keep them in `public/css/fonts` then you can simple pass `null` in
 as the first argument and it will use the default source path of
 `resources/assets/fonts`...simple.

### Array of fonts/directories
```javascript
elixir(function(mix) {
    mix.fonts([
        './bower_components/font-awesome/fonts',
        'purchased-fonts'
    ]);
});
```
This will copy all fonts recursively from any paths passed as part of
the array to the default output path.

### Output directory
The default output directory is `public/fonts` but an optional 
output directory can be passed as the second argument eg
```javascript
elixir(function(mix) {
    mix.fonts('purchased-fonts', './public/css/fonts');
    //or
    mix.fonts([
        'font-path-1',
        'font-path-2'
    ],
    './public/css/fonts');
});
```

## Options
### Limit by filetype
You can limit the task to specific font types, for instance if you know
 that your target audience will only ever use one font type. In such 
 situations you could pass an options object as the last argument 
 containing the `filetypes` property...as such.
```javascript
elixir(function(mix) {
    mix.fonts(
        'purchased-fonts',    // src directory
        './public/css/fonts', // output directory
        './',                 // base directory
        {
            filetypes: [
                'svg',
                'otf'
            ]                 // limit to just otf and svg fonts
        }
    );
    //or
    mix.fonts(
       'purchased-fonts',    // src directory
       './public/css/fonts', // output directory
       './',                 //  base directory
       {
            filetypes: 'svg' // limit to just svg files
        }
    );
});
```

## Source and output paths
Please take note of the paths used in the example above:
### Paths relative to the gulpfile
A path starting with `./` eg 
`./bower_components/font-awesome/fonts` is relative to your 
gulpfile.js.
### Paths relative to the default source directory
A path not starting with `./` eg `posh-font` will be taken 
as a path relative to the default source, so for this example 
`./resources/assets/fonts/posh-fonts` would be the source path.

### Directory paths
This extension uses the same codebase as methods such as `scripts()`
 (I like to make my life easy) and so it can tell the difference between
directories and files so a source path of `posh-fonts` will become
`posh-fonts/**/*` if it is detected as a directory.

## Support
Oh...erm...support :-/ Just [raise an issue](https://github.com/GrandadEvans/laravel-elixir-copy-fonts/issues])

## License

The *laravel-elixir-copy-fonts* extension is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
