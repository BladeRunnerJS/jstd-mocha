'use strict';

// this mirrors the `AssertionError` class in the 'expectations' library
var AssertionError = function(message){
  this.message = message;
	this.name = 'AssertionError';
};
AssertionError.prototype = Object.create(Error.prototype);
AssertionError.prototype.toString = function(){
  return this.message;
};

module.exports = AssertionError;
