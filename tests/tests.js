/*global describe, it, console, expect */
/*eslint-disable no-console*/

//'use strict';
var reesorce = require('../index');
var root = 'http://httpbin.org/';
reesorce.setGlobalUri(root);

describe('#reesource.getJSON', function () {
	it('Should make a successful getJSON request', function () {
		reesorce.getJSON('get')
			.then(function (result) {
				expect(result).to.have.property('url');
			})
			.catch(function (err) {
				console.log(err);
			});
	});
});

describe('#reesource.getHTML', function () {
	it('Should make a successful getHTML request', function () {
		reesorce.getHTML('get')
			.then(function (result) {
				expect(result).to.be.a('string');
			})
			.catch(function (err) {
				console.log(err);
			});
	});
});

describe('#reesource.postJSON', function () {
	it('Should make a successful postJSON request', function () {
		reesorce.postJSON('post', {
			data: { name: 'test', type: 'test' }
		})
			.then(function (result) {
				expect(result.json).to.have.property('name');
			})
			.catch(function (err) {
				console.log(err);
			});
	});
});

describe('#reesource.postForm', function () {
	it('Should make a successful postForm request', function () {
		reesorce.postForm('post', {
			data: { name: 'test', type: 'test' }
		})
			.then(function (result) {
				expect(result.form).to.have.property('name');
			})
			.catch(function (err) {
				console.log(err);
			});
	});
});