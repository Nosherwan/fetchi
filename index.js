'use strict';

// The value for globalUri should be set before using Fetchi.fetch
var _globalUri = 'http://localhost:8080/';

function _queryStringFromObject(api, data) {
	var queryString = Object.keys(data)
		.map(function (key) {
			return key + '=' + encodeURIComponent(data[key]);
		})
		.join('&');

	queryString = (api && queryString) ? '?' + queryString : (queryString ? queryString : '');

	return api ? (_globalUri + api + queryString) : queryString;
};

function _queryUri(api) {
	return _globalUri + api;
};
/**
 * Convenience method for fetch requests
 * @param {Object} options 
 * @return {Object} promise
 */
function _fetch(options) {
		options = options || {};
		options.method = options.method || 'get';
		options.data = options.data || {};
		var params = {
			method: 'get',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: ''
		};
		var promise = null;

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
					promise = fetch(_queryUri(options.api), params);
					break;
				default:    //should serve for get
					promise = fetch(_queryStringFromObject(options.api, options.data), {
						method: params.method, headers: params.headers
					});
					break;
			}

			return promise.then(function (result) {
				return result.json()
			});
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

	getHTML: function (options) {
		//TODO:	Needs implementation
	},

	getJSON: function (options) {
		//TODO:	Needs implementation
	},

	postJSON: function (options) {
		//TODO:	Needs implementation
	}
};

module.exports = Reesorce;