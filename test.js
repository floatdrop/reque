/* global describe, it, before, after */

'use strict';

var Reque = require('./index.js');
var PassThrough = require('stream').PassThrough;
var assert = require('assert');

var http = require('http');

function req(url) {
	return http.get(url || 'http://google.com');
}

it('should create Reque without new', function () {
	assert.ok(Reque());
});

it('should create instance of PassThrough stream', function () {
	var reque = new Reque();
	assert.ok(reque instanceof PassThrough);
});

it('should emit request on first call', function (done) {
	var reque = new Reque();

	var first = req();

	reque.on('request', function (req) {
		assert.equal(req, first);
		done();
	});

	reque.on('redirect', done);

	reque.request(first);
});

it('should emit redirect on second call', function (done) {
	var reque = new Reque();

	var first = req();
	var second = req();

	reque.on('redirect', function (req) {
		assert.equal(req, second);
		done();
	});

	reque.request(first);
	reque.request(second);
});

describe('timeout', function () {
	var server;

	before(function (done) {
		server = http.createServer();
		server.listen(1234, done);
	});

	after(function (done) {
		server.close();
		done();
	});

	it('should emit error', function (done) {
		var reque = new Reque();

		var first = req('http://0.0.0.0:1234');

		reque.on('error', function (err, req) {
			assert.ok(err);
			assert.equal(err.message, 'Request timeout. Aborting.');
			assert.equal(req, first);
			done();
		});

		reque
			.request(first)
			.timeout(10);
	});
});
