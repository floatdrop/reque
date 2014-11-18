'use strict';

var PassThrough = require('stream').PassThrough;

function Reque() {
	if (!(this instanceof Reque)) {
		return new Reque();
	}

	PassThrough.call(this);

	this.defaultTimeout = 60 * 1000;
}

Reque.prototype = Object.create(PassThrough.prototype);

Reque.prototype.request = function request () {
	return this;
};

Reque.prototype.timeout = function timeout () {
	return this;
};

module.exports = Reque;
