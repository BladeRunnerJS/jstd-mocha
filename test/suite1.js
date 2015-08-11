/*eslint new-cap:0*/
/*globals TestCase, assert*/
'use strict';

var expect = require('expectations');
require('..').installTo(global);
var JsTestDriverTest = TestCase('JsTestDriver (first suite)');

var tearDownCount = 0;

JsTestDriverTest.prototype.setUp = function() {
	this.someProp = 'val';
};

JsTestDriverTest.prototype.tearDown = function() {
	tearDownCount++;
};

JsTestDriverTest.prototype.testThatSetUpIsInvokedBeforeTheFirstTest = function() {
	expect(this.someProp).toEqual('val');
};

JsTestDriverTest.prototype.testThatTearDownHasBeenInvokedOnceByTheSecondTest = function() {
	expect(tearDownCount).toEqual(1);
};

JsTestDriverTest.prototype.testThatSimpleAssertionsWork = function() {
	assert(true);
	assert('should be true', true);

	expect(function() {
		assert(false);
	}).toThrow(Error);
};
