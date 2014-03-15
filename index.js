var map = require('map-stream'),
	gutil = require('gulp-util'),
	PluginError = gutil.PluginError;

module.exports = function(options){
	if(!options.name){
		// throws error
	}

	return map(function(file, cb){
		if(file.isNull()){
			return cb(null, file);
		}

		if(file.isStream()){
			return cb(new PluginError('gulp-wrap-exports', 'Streaming not supported'));
		}

		var content = file.contents.toString();

		cb(null, file);
	});
};
