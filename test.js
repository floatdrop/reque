/* global it */

'use strict';

var Reque = require('./index.js');
var PassThrough = require('stream').PassThrough;
var assert = require('assert');

it('should create Reque without new', function () {
	assert.ok(Reque());
});

it('should create instance of PassThrough stream', function () {
	var reque = new Reque();
	assert.ok(reque instanceof PassThrough);
});
