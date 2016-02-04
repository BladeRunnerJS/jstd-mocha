# jstd-mocha

Run your JsTestDriver tests directly within Mocha. This project borrows source code from [karma-jstd](https://github.com/vojtajina/karma-jstd).

[![Build Status](https://travis-ci.org/BladeRunnerJS/jstd-mocha.png)](https://travis-ci.org/BladeRunnerJS/jstd-mocha)

## Usage

After installing with `npm install --save-dev jstd-mocha` you can run JsTestDriver tests like this:

```js
require('jstd-mocha').installTo(global);

var MyTestCase = TestCase('JsTestDriver (first suite)');

MyTestCase.prototype.setUp = function() {
	this.x = true;
};

MyTestCase.prototype.testThatXIsTrue = function() {
	assertTrue('x should have been set to true in setUp()', this.x);
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

This second way of doing things is particularly useful if you are planning to run your Mocha tests in a browser using the [karma-mocha](https://github.com/karma-runner/karma-mocha) plug-in. Take a look at this project's [`package.json`](https://github.com/BladeRunnerJS/jstd-mocha/blob/master/package.json) and [`karma.conf.js`](https://github.com/BladeRunnerJS/jstd-mocha/blob/master/karma.conf.js) for examples of this.


## Migrating to Mocha

Since jstd-mocha is mostly just a thin wrapper around Mocha and [expectations](https://www.npmjs.com/package/expectations), it isn't too hard to permanently change your tests so they run directly in Mocha. Additionally, since Mocha has an identical API to Jasmine for everything but asynchronous tests, and since [expectations](https://www.npmjs.com/package/expectations) is a port of the Jasmine assertion API, tests should also be runnable in Jasmine too.

There are some caveats however. The more complex assertions (e.g. `assertEquals()`) aren't completely compatible with their Jasmine counterparts (e.g. `.toEqual()`), so we instead map these through to the assertion library that ships with js-test-driver by default.

However, you can migrate your tests over to using 100% Jasmine compatible expectations by using these assertions instead:

  * `$assertEquals()` instead of `assertEquals()` (uses the same definition of object equality as `.toEqual()`).
  * `$assertException()` instead of `assertException()` (if an argument is provided, expects that argument to be _equal_ to the error that will be thrown, rather than expecting a string containing only the type of the error that will be thrown).

Once you've done this for all tests, the final conversion can be done completely mechanically.
