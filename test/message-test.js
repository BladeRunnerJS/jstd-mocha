'use strict';

var expect = require('expectations');
var JsTestDriver = require('../src/JsTestDriver');

describe('optional message parameter', function() {
  var test = new JsTestDriver();

  it('rethrows the error if no message is provided', function() {
    expect(function() {
      test.assertEquals('a', 'b');
    }).toThrow('expected "b" to equal "a"');
  });

  it('appends the message to the error if a message is provided', function() {
    expect(function() {
      test.assertEquals('msg', 'a', 'b');
    }).toThrow('msg: expected "b" to equal "a"');
  });
});
