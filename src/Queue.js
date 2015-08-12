'use strict';

var Promise = require('bluebird');
var Step = require('./Step');

function resolveStep(step) {
	return function() {
		return step.resolve();
	};
}

function Queue() {
	this._steps = [];
}

Queue.prototype.call = function(description, step) {
	this._steps.push(new Step(description, step));
};

Queue.prototype.resolve = function() {
	return this._steps.reduce(function(cur, next) {
		return cur.then(resolveStep(next));
	}, Promise.resolve());
};

module.exports = Queue;
