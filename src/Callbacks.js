'use strict';

var Promise = require('bluebird');

function Callbacks(stepDescription) {
	this._stepDescription = stepDescription;
	this._requiredCallbacks = 0;
}

Callbacks.prototype.add = function(callback) {
	if(this._requiredCallbacks++ === 0) {
		this._promise = new Promise(function(resolve, reject) {
			this._resolve = resolve;
			setTimeout(reject.bind(null, new Error('\'' + this._stepDescription + '\' timed out after 1000ms.')), 1000);
		}.bind(this));
	}

	return function() {
		callback.apply(arguments);
		if(--this._requiredCallbacks === 0) {
			this._resolve();
		}
	}.bind(this);
};

Callbacks.prototype.resolve = function() {
	return this._promise || Promise.resolve();
};

module.exports = Callbacks;
