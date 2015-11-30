/*eslint new-cap:0*/
/*globals AsyncTestCase, assertEquals*/
'use strict';

require('..').installTo(global);
var AsyncTest = AsyncTestCase('Async Tests');

AsyncTest.prototype.testQueue = function(queue) {
	var state = 0;

	queue.call('Step 1: assert the starting condition holds', function() {
		assertEquals(0, state);
	});

	queue.call('Step 2: increment our variable', function() {
		++state;
	});

	queue.call('Step 3: assert the variable\'s value changed', function() {
		assertEquals(1, state);
	});
};

AsyncTest.prototype.testAsyncCallbacks = function(queue) {
	var state = 0;

	queue.call('Step 1: schedule the window to increment our variable 5 seconds from now.', function(callbacks) {
		var myCallback = callbacks.add(function() {
			++state;
		});
		setTimeout(myCallback, 1);
	});

	queue.call('Step 2: then assert our state variable changed', function() {
		assertEquals(1, state);
	});
};
