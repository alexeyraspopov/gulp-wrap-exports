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

		file.contents = new Buffer(wrapper(file.contents.toString(), options.name).join('\n'));

		cb(null, file);
	});
};

function wrapper(code, name){
	if(/module\.exports\s*=/.test(code)){
		return [
			'!function(module, global, require){',
			'var exports = module.exports;',
			code,
			'global.' + name + ' = module.exports;',
			'}({ exports: {} }, function(){ return this; }(), function(name){ return this[name]; });'
		];
	}

	return [
		'!function(exports, global, require){',
		'global.' + name + ' = exports;',
		code,
		'}({}, function(){ return this; }(), function(name){ return this[name]; });'
	];
}
