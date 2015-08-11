/*globals describe, it, beforeEach, afterEach, run*/
'use strict';

var asap = require('asap');

function doIt(methodName, testCaseAccessor) {
	it(methodName, function() {
		testCaseAccessor.testCase[methodName]();
	});
}

function doDescribe(TestCase) {
	describe(TestCase.__name, function() {
		var testCaseAccessor = {};
		var testCase;

		beforeEach(function() {
			testCase = new TestCase();
			testCaseAccessor.testCase = testCase;

			if(testCase.setUp) {
				testCase.setUp();
			}
		});

		afterEach(function() {
			if(testCase.tearDown) {
				testCase.tearDown();
			}
		});

		for(var methodName in TestCase.prototype) {
			if(methodName.match(/^test/)) {
				doIt(methodName, testCaseAccessor);
			}
		}
	});
}

function TestCaseFactory() {
	this.testCases = [];

	if(global.run) {
		asap(function() {
			this.registerTestCases();
			run();
		}.bind(this));
	}
}

TestCaseFactory.prototype.create = function(name) {
	var TestCase = function() {
	};
	TestCase.__name = name;
	this.testCases.push(TestCase);

	return TestCase;
};

TestCaseFactory.prototype.registerTestCases = function() {
	for(var i = 0, l = this.testCases.length; i < l; ++i) {
		doDescribe(this.testCases[i]);
	}
	this.testCases = [];
};

module.exports = new TestCaseFactory();
