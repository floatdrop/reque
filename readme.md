# reque [![Build Status](https://travis-ci.org/floatdrop/reque.svg?branch=master)](https://travis-ci.org/floatdrop/reque)

> Simplified way to handle ClientRequest objects on redirects and timeouts

![maxresdefault](https://cloud.githubusercontent.com/assets/365089/5086026/b45e412c-6f39-11e4-847f-2c07bc2a4874.jpg)

## Usage

```js
var Reque = require('reque');
var reque = new Reque();

// Get request

reque
	.request(req) // emits `request` event
	.timeout(30 * 1000); // sets timeout value

// Some time later

reque.request(req); // emits `redirect` event
```

## API

### Reque()

Returns instance of PassThrough `Stream`.

Creates `Reque` object, that will count redirects.

### Reque.request(req)

Stores ClientRequest object `req`. Emits `request` on first call.

If it was already called `redirect` event will be emitted.

### Reque.timeout(time, [callback])

Sets timeout for every request, that passed to `request` method. Calls `callback` on timeout.

If `callback` is omitted, then `error` event will be fired.
