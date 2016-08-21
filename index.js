var url = 'http://localhost:3010/api/';

var Fetchi = {
    queryStringFromObject: function (api, data) {
        var querystring = Object.keys(data)
            .map(function (key) {
                return key + '=' + encodeURIComponent(data[key]);
            })
            .join('&');

        querystring = (api && querystring) ? '?' + querystring : (querystring ? querystring : '');

        return api ? (url + api + querystring) : querystring;
    },

    queryUrl: function (api) {
        return url + api;
    },

    fetch: function (options) {
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
                        params.body = this.queryStringFromObject(null, options.data);
                    } else {
                        params.body = JSON.stringify(options.data);
                    }
                    promise = fetch(this.queryUrl(options.api), params);
                    break;
                default:    //should serve for get
                    promise = fetch(this.queryStringFromObject(options.api, options.data), params);
                    break;
            }

            return promise.then(function(result) {
                return result.json()
            });
        } else {
            console.log('Please atleast provide an api endpoint for fetch to work.');
        }
    }
};

export default Fetchi;