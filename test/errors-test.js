/*eslint new-cap:0*/
/*globals TestCase, assertTrue, fail*/
'use strict';

require('..').installTo(global);
var expect = require('expectations');
var JsTestDriverTest = TestCase('JsTestDriver (assertion errors)');

JsTestDriverTest.prototype.testXXX = function() {
  try {
    assertTrue('the-message', false);
    fail('assertion did not fail');
  }
	catch(e) {
    expect(e.name).toEqual('AssertionError');
  }
};
