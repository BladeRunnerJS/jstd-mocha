/*eslint new-cap:0*/
/*globals TestCase, assert*/
'use strict';

var expect = require('expectations');
require('..').installTo(global);

TestCase('JsTestDriver (third suite)', {
	testInlineTestsAreRun: function() {
		expect(function() {
			assert(false);
		}).toThrow(Error);
	}
});
