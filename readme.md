[![License](https://poser.pugx.org/laravel/framework/license.svg)](https://packagist.org/packages/laravel/framework)
# Laravel Elixir Copy Fonts extension

This extension is aimed at simplifying gulpfiles (and mine in
particular).

Instead of my gulpfile having all sorts of copy calls copying things
like font-awesome fonts and site fonts to a temporary directory before 
being pushed en-mass to my public folder I thought I'd create a quick 
extension to tidy my code up and make my life easier.

## Installation
First pull the extension in with
```sh
npm -i laravel-elixir-copy-fonts
```
and then add it to your gulpfile
```js
require('laravel-elixir-copy-fonts');
```

## Usage format
```fonts([string|array src [, string dest]])```

## Usage example
```js
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
Exactly the same as the other Elixir methods such as ```mix.styles()```
 and ```scripts()``` laravel-elixir-copy-fonts can accept a variety of 
 data.

### Defaults
Both source and output paths are optional and are set to...
Default source directory: './resources/assets/fonts'
Default output directory: './public/fonts'
 
### No Arguments
```js
elixir(function(mix) {
    mix.fonts();
 });
```
This will copy all fonts recursively from the default source directory
'resources/assets/fonts' to the default destination 'public/fonts'.
 
### Single arguments
```js
elixir(function(mix) {
    mix.fonts('./bower_components/font-awesome/fonts');
 });
```
All fonts will be recursively copied from this directory to the default
public directory.

### Array of fonts/directories
```js
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
The default output directory is 'public/fonts' but an optional output
directory can be passed as the second argument eg
```js
elixir(function(mix) {
    mix.fonts('purchased-fonts', './public/css/fonts);
    //or
    mix.fonts([
        'font-path-1',
        'font-path-2'
    ],
    './public/css/fonts');
 });
```

## Source and output paths
Please take note of the paths above:
### Paths relative to the gulpfile.js
A path starting with './' eg './bower_components/font-awesome/fonts'
is relative to your gulpfile.js.
### Paths relative to the default source directory
A path not starting with './' eg 'posh-font' will be taken as a path
relative to the default source, so for this example it would be
'./resources/assets/fonts/posh-fonts'.
### Directory paths
This extension uses the same codebase as methods such as 'scripts' (I 
like to make my life easy) and so it can tell the difference between
directories and files so a source path of 'posh-fonts' will become
'posh-fonts/**/*' if it is detected as a directory.

## Support
Oh...erm...support :-/ Just [raise an issue](https://github.com/GrandadEvans/laravel-elixir-copy-fonts/issues])


## License

The laravel-elixir-copy-fonts extension is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
