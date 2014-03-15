# [gulp](https://github.com/wearefractal/gulp)-wrap-exports

> Wrap CommonJS module in IIFE and create global variable

## Install

	npm install --save-dev gulp-wrap-exports

## Example

	var gulp = require('gulp'),
		wrap = require('gulp-wrap-exports');

	gulp.task('default', function(){
		return gulp.src('fn-module.js')
			.pipe(wrap({ name: 'fn' }))
			.pipe(gulp.dest('dest/'));
	});

Example input:

	exports.processing = function(){};

Example output (`name: 'module'`):

	!function(exports, global){
		global.module = exports;
		
		exports.processing = function(){};
		
	}({}, function(){ return this; }());

## Options

String `name` - valid name of global variable which should be available in browser.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) (c) Alexey Raspopov
