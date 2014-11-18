'use strict';

var PassThrough = require('stream').PassThrough;

function Reque() {
	if (!(this instanceof Reque)) {
		return new Reque();
	}

	PassThrough.call(this);

	this._timeout = 2 * 60 * 1000;

	var self = this;
	this._timeoutCb = function (req) {
		req.abort();
		self.emit('error', new Error('Request timeout. Aborting.'), req);
	};
}

Reque.prototype = Object.create(PassThrough.prototype);

Reque.prototype.request = function request (req) {
	this.emit(this._req ? 'redirect' : 'request', req);

	this._req = req;

	var self = this;

	process.nextTick(function () {
		var timer = setTimeout(self._timeoutCb, self._timeout, self._req);

		req.on('response', function () {
			clearTimeout(timer);
		});
	});

	return this;
};

Reque.prototype.timeout = function timeout (ms, cb) {
	this._timeout = ms;

	if (cb) {
		this._timeoutCb = cb;
	}

	return this;
};

module.exports = Reque;
