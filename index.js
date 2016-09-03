/*eslint-disable no-console*/

'use strict';

// The value for globalUri should be set before using Reesorce.fetch
var _globalUri = '';

function _queryStringFromObject(api, data) {
	var queryString = Object.keys(data)
		.map(function (key) {
			return key + '=' + encodeURIComponent(data[key]);
		})
		.join('&');

	queryString = (api && queryString) ? '?' + queryString : (queryString ? queryString : '');

	return api ? (_globalUri + api + queryString) : queryString;
}

function _queryUri(api) {
	return _globalUri + api;
}


function _defaultOptions(endPoint, options) {
	var defaultOptions = options || {};
	defaultOptions.api = endPoint;
	defaultOptions.method = defaultOptions.method || 'get';
	defaultOptions.data = defaultOptions.data || {};
	return defaultOptions;
}

/**
* Convenience method for fetch requests
* @param {Object} options 
* @return {Object} promise
*/
function _fetch(options) {
	if (!_globalUri) throw new Error('Please set a global uri via setGlobalUri.');
	var params = { method: '', headers: {} };

	params.method = options.method;
	if (options.type === 'json') {
		params.headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		};
	}

	if (options.authorization) {
		params.headers['Authorization'] = options.authorization;
	}

	if (options.api) {
		switch (options.method) {
		case 'post':
		case 'put':
			params.method = options.method;
			if (options.type !== 'json') {
				params.headers['Content-Type'] = 'application/x-www-form-urlencoded';
				params.body = _queryStringFromObject(null, options.data);
			} else {
				params.body = JSON.stringify(options.data);
			}
			return fetch(_queryUri(options.api), params);
		default:    //should serve for get
			return fetch(_queryStringFromObject(options.api, options.data), {
				method: params.method, headers: params.headers
			});
		}
	} else {
		console.log('Please atleast provide an api endpoint for fetch to work.');
	}
}

var Reesorce = {
	/**
	 * GlobalUri setter method for fetch requests
	 * @return {string} uri 
	 */
	setGlobalUri: function (uri) {
		_globalUri = uri;
	},

	getHTML: function (endPoint, options) {
		options = _defaultOptions(endPoint, options);
		return _fetch(options)
			.then(function (result) {
				return result.ok ? result.text() : result;
			});
	},

	getJSON: function (endPoint, options) {
		options = _defaultOptions(endPoint, options);
		options.type = 'json';
		return _fetch(options)
			.then(function (result) {
				return result.ok ? result.json() : result;
			});
	},

	postJSON: function (endPoint, options) {
		options = _defaultOptions(endPoint, options);
		options.type = 'json';
		options.method = 'post';
		return _fetch(options)
			.then(function (result) {
				return result.ok ? result.json() : result;
			});
	},

	postForm: function(endPoint, options){
		options = _defaultOptions(endPoint, options);
		options.type = 'urlencoded';
		options.method = 'post';
		return _fetch(options)
			.then(function (result) {
				return result.ok ? result.json() : result;
			});
	}
	
};

module.exports = Reesorce;