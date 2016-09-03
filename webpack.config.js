/* global __dirname */

var path = require('path');                     //node module to resolve paths

module.exports = {
	devtool: 'inline-source-map',
	output: {
		filename: 'bundle.js',                      //destination file name
		path: path.join(__dirname, 'dist'),     //destination folder
		//publicPath:  '/public/'                    //append this to your url when trying to access app
	},
	module: {                                    //add multiple loaders to process files
		loaders: [
			{
				// Only run .js & .jsx files through Babel
				test: /\.jsx?$/,
				loaders: ['babel'],
				// Skip files outside of your project's app/js directory
				include: [__dirname + '/index.js', __dirname + '/tests/*.js']
				/*[path.resolve(__dirname, 'app/js'),],*/   //comment this out and use the path directly as a string
			},
		]
	}
};
