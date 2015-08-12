/*eslint new-cap:0*/
/*globals TestCase, assert*/
'use strict';

var expect = require('expectations');
require('..').installTo(global);

TestCase('Inline Test Cases', {
	testInlineTestsAreRun: function() {
		expect(function() {
			assert(false);
		}).toThrow(Error);
	}
});
