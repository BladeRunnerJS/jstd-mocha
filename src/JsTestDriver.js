/*eslint new-cap:0*/
'use strict';

var TestCaseFactory = require('./TestCaseFactory');
var expect = require('expectations');
var asserts = require('./asserts');
var ASYNC_TYPE = 'async';

function appendMessage(message, expectation) {
	try {
		expectation();
	}
	catch(e) {
		if(!message) {
			throw e;
		}
		else {
			throw new Error(message + ': ' + e.message);
		}
	}
}

function JsTestDriver() {
}

JsTestDriver.installTo = function(target) {
	var jstd = new JsTestDriver();
	for(var methodName in JsTestDriver.prototype) {
		target[methodName] = jstd[methodName].bind(jstd);
	}
};

JsTestDriver.prototype.TestCase = function(name, proto, type) {
	return TestCaseFactory.create(name, proto, type === ASYNC_TYPE);
};

/**
 * The remaining code below was adapted from <https://github.com/vojtajina/karma-jstd/blob/master/jstd-adapter.js>
 * @author  Vojta Jina <vojta.jina@gmail.com>
 */
JsTestDriver.prototype.AsyncTestCase = function (name, proto) {
	return this.TestCase(name, proto, ASYNC_TYPE);
};

JsTestDriver.prototype.ConditionalTestCase = function (name, condition, proto, type) {
	if (condition()) {
		return this.TestCase(name, proto, type);
	}
};

JsTestDriver.prototype.ConditionalAsyncTestCase = function (name, condition, proto) {
	return this.ConditionalTestCase(name, condition, proto, ASYNC_TYPE);
};

JsTestDriver.prototype.assert = function (message, actual) {
	if (arguments.length < 2) {
		actual = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(actual).toBeTruthy();
	});
};

JsTestDriver.prototype.assertTrue = function (message, actual) {
	if (arguments.length < 2) {
		actual = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(actual).toBeTruthy();
	});
};

JsTestDriver.prototype.fail = function (sMessage) {
	throw new Error(sMessage);
};

JsTestDriver.prototype.assertFalse = function (message, actual) {
	if (arguments.length < 2) {
		actual = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(actual).toBeFalsy();
	});
};

JsTestDriver.prototype.$assertEquals = function (message, expected, actual) {
	if (arguments.length < 3) {
		actual = expected;
		expected = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(actual).toEqual(expected);
	});
};

JsTestDriver.prototype.assertEquals = function (/*message, expected, actual*/) {
	asserts.assertEquals.apply(null, arguments);
};

JsTestDriver.prototype.assertNotEquals = function (message, expected, actual) {
	if (arguments.length < 3) {
		actual = expected;
		expected = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(actual).not.toEqual(expected);
	});
};

JsTestDriver.prototype.assertSame = function (message, expected, actual) {
	if (arguments.length < 3) {
		actual = expected;
		expected = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(actual).toBe(expected);
	});
};

JsTestDriver.prototype.assertNotSame = function (message, expected, actual) {
	if (arguments.length < 3) {
		actual = expected;
		expected = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(actual).not.toBe(expected);
	});
};

JsTestDriver.prototype.assertNull = function (message, actual) {
	if (arguments.length < 2) {
		actual = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(actual).toBeNull();
	});
};

JsTestDriver.prototype.assertNotNull = function (message, actual) {
	if (arguments.length < 2) {
		actual = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(actual).not.toBeNull();
	});
};

JsTestDriver.prototype.assertUndefined = function (message, actual) {
	if (arguments.length < 2) {
		actual = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(actual).toBeUndefined();
	});
};

JsTestDriver.prototype.assertNotUndefined = function (message, actual) {
	if (arguments.length < 2) {
		actual = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(actual).not.toBeUndefined();
	});
};

JsTestDriver.prototype.assertNaN = function (message, actual) {
	if (arguments.length < 2) {
		actual = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(isNaN(actual)).toBeTruthy();
	});
};

JsTestDriver.prototype.assertNotNaN = function (message, actual) {
	if (arguments.length < 2) {
		actual = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(isNaN(actual)).toBeFalsy();
	});
};


JsTestDriver.prototype.$assertException = function (message, callback, error) {
	if (arguments.length < 3) {
		error = callback;
		callback = message;
		message = null;
	}

	error = typeof error === 'string' ? new Error(error) : error;

	appendMessage(message, function() {
		if (typeof error === undefined) {
			expect(callback).toThrow();
		} else {
			expect(callback).toThrow(error);
		}
	});
};

JsTestDriver.prototype.assertException = function (/*message, callback, error*/) {
	asserts.assertException.apply(null, arguments);
};

JsTestDriver.prototype.assertNoException = function (message, callback, error) {
	if (arguments.length < 3) {
		error = callback;
		callback = message;
		message = null;
	}

	error = typeof error === 'string' ? new Error(error) : error;

	appendMessage(message, function() {
		if (typeof error === undefined) {
			expect(callback).not.toThrow();
		} else {
			expect(callback).not.toThrow(error);
		}
	});
};

JsTestDriver.prototype.assertArray = function (message, actual) {
	if (arguments.length < 2) {
		actual = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(Array.isArray(actual)).toBeTruthy();
	});
};

JsTestDriver.prototype.assertTypeOf = function (message, expected, type) {
	if (arguments.length < 3) {
		type = expected;
		expected = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(typeof type === expected).toBeTruthy();
	});
};

JsTestDriver.prototype.assertBoolean = function (message, actual) {
	if (arguments.length < 2) {
		actual = message;
		message = null;
	}

	this.assertTypeOf(message, 'boolean', actual);
};

JsTestDriver.prototype.assertFunction = function (message, actual) {
	if (arguments.length < 2) {
		actual = message;
		message = null;
	}

	this.assertTypeOf(message, 'function', actual);
};

JsTestDriver.prototype.assertObject = function (message, actual) {
	if (arguments.length < 2) {
		actual = message;
		message = null;
	}

	this.assertTypeOf(message, 'object', actual);
};

JsTestDriver.prototype.assertNumber = function (message, actual) {
	if (arguments.length < 2) {
		actual = message;
		message = null;
	}

	this.assertTypeOf(message, 'number', actual);
};

JsTestDriver.prototype.assertString = function (message, actual) {
	if (arguments.length < 2) {
		actual = message;
		message = null;
	}

	this.assertTypeOf(message, 'string', actual);
};

JsTestDriver.prototype.assertMatch = function (message, regexp, actual) {
	if (arguments.length < 3) {
		actual = regexp;
		regexp = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(actual).toMatch(regexp);
	});
};

JsTestDriver.prototype.assertNoMatch = function (message, regexp, actual) {
	if (arguments.length < 3) {
		actual = regexp;
		regexp = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(actual).not.toMatch(regexp);
	});
};

JsTestDriver.prototype.assertTagName = function (message, tag, element) {
	if (arguments.length < 3) {
		element = tag;
		tag = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(element.nodeName.toLowerCase() === tag.toLowerCase()).toBeTruthy();
	});
};

JsTestDriver.prototype.assertClassName = function (message, className, element) {
	if (arguments.length < 3) {
		element = className;
		className = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(element.className.split(' ')).toContain(className);
	});
};

JsTestDriver.prototype.assertElementId = function (message, id, element) {
	if (arguments.length < 3) {
		element = id;
		id = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(element.id).toEqual(id);
	});
};

JsTestDriver.prototype.assertInstanceOf = function (message, constructor, actual) {
	if (arguments.length < 3) {
		actual = constructor;
		constructor = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(actual instanceof constructor).toBeTruthy();
	});
};

JsTestDriver.prototype.assertNotInstanceOf = function (message, constructor, actual) {
	if (arguments.length < 3) {
		actual = constructor;
		constructor = message;
		message = null;
	}

	appendMessage(message, function() {
		expect(actual instanceof constructor).toBeFalsy();
	});
};

module.exports = JsTestDriver;
