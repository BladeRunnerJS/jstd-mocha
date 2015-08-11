# jstd-mocha

Run your JsTestDriver tests directly within Mocha. This project borrows source code from [karma-jstd](https://github.com/vojtajina/karma-jstd). There is, as yet, no support for `AsyncTestCase` or `ConditionalAsyncTestCase`.


## Usage

```js
require('jstd-mocha').installTo(global);
var x;

TestCase.prototype.setUp = function() {
	x = true;
};

TestCase.prototype.testThatXIsTrue = function() {
	assertTrue('x should have been set to true in setUp()', x);
};
```

## Running The tests

Because JsTestDriver tests are added to the test-case after it's created, _jstd-mocha_ needs to be nudged once all of the tests have been registered, so you can't just run `mocha test` as you normally might &mdash; assuming your tests are all inside a `test` directory.

Instead, you can either use the `--delay` flag, as follows:

```sh
mocha test --delay
```

or create a `jstd-register.js` file in your own project having these contents:

```js
require('jstd-mocha/register');
```

and then run the tests like this:

```sh
mocha test jstd-register
```

This second way of doing things is particularly useful if you are planning to run your Mocha tests in a browser using the [karma-mocha](https://github.com/karma-runner/karma-mocha) plug-in.