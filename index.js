var map = require('map-stream'),
	gutil = require('gulp-util'),
	PluginError = gutil.PluginError;

module.exports = function(options){
	if(!options.name){
		throw new PluginError('gulp-wrap-exports', 'Variable not specified');
	}

	if(/^[^A-z0-9$_]+$/.test(options.name)){
		throw new PluginError('gulp-wrap-exports', 'Incorrect global variable name');
	}

	return map(function(file, cb){
		if(file.isNull()){
			return cb(null, file);
		}

		if(file.isStream()){
			return cb(new PluginError('gulp-wrap-exports', 'Streaming not supported'));
		}

		file.contents = new Buffer([
			'!function(exports, global){',
			'global.' + options.name + ' = exports;',
			file.contents.toString(),
			'}({}, function(){ return this; }())'
		].join('\n'));

		cb(null, file);
	});
};
