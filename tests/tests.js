/*global describe, it, console, expect */
/*eslint-disable no-console*/

//'use strict';
var reesorce = require('../index');
var root = 'http://apiv3.iucnredlist.org/api/v3/';
reesorce.setGlobalUri(root);

describe('#reesource.getJSON', function () {
	it('Should make a successful getJSON request', function () {
		reesorce.getJSON('version')
			.then(function (result) {
				expect(result).to.have.property('version');
			})
			.catch(function (err) {
				console.log(err);
			});
	});
});

describe('#reesource.getHTML', function () {
	it('Should make a successful getHTML request', function () {
		reesorce.getHTML('version')
			.then(function (result) {
				expect(result).to.be.a('string');
			})
			.catch(function (err) {
				console.log(err);
			});
	});
});