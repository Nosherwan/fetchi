var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};
// Karma configuration
module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['mocha', 'chai'],
		reporters: ['progress'],
		port: 9876,
		colors: false,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false,
		autoWatchBatchDelay: 300,
		plugins: [
			'karma-mocha',
			'karma-chai',
			'karma-chrome-launcher',
			'karma-webpack',
			'karma-sourcemap-loader'
		],
		files: [
			// all files ending in...
			'./node_modules/whatwg-fetch/fetch.js',
			'./tests/*.js'
			// each file acts as entry point for the webpack configuration
		],
		preprocessors: {
			// add webpack as preprocessor
			'./tests/*.js': ['webpack', 'sourcemap']
		},
		webpack: webpackConfig
		// karma watches the test entry points
		// (you don't need to specify the entry option)
		// webpack watches dependencies
		// webpack configuration
		,
		webpackMiddleware: {
			// webpack-dev-middleware configuration
			// i. e.
			stats: 'errors-only'
		}
	});
};
