/*eslint new-cap:0*/
/*globals TestCase, assert*/
'use strict';

require('..').installTo(global);
var JsTestDriverTest = TestCase('JsTestDriver (second suite)');

JsTestDriverTest.prototype.test = function() {
	assert(true);
};
