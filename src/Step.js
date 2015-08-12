'use strict';

var Callbacks = require('./Callbacks');

function Step(description, step) {
	this._description = description;
	this._step = step;
}

Step.prototype.resolve = function() {
	var callbacks = new Callbacks(this._description);
	this._step(callbacks);
	return callbacks.resolve();
};

module.exports = Step;
