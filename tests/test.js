var async = require('../async.js');

var assert = require('assert');

describe('Async', function() {
  var func = function (obj, callback) {
    if ((obj % 2) == 0) callback(null, ++obj);
    else callback(++obj);
  };
  
  it('map1', function (done) {
    async.map([1, 2, 3], func, function (errors, results) {
      assert.equal(errors[0], 2);
      assert.equal(errors[1], 4);
      done();
    });
  });
  
  it('map2', function (done) {
    async.map([2, 4], func, function (errors, results) {
      assert(results[0], 3);
      assert(results[1], 5);
      done();
    });
  });
  
  it('waterfall', function (done) {
    var f1 = function (callback) {
      return callback(null, 1);
    };
    
    var f2 = function (data, callback) {
      return callback(null, data + 2);
    };
    
    var f3 = function (data, callback) {
      return callback(null, data * 2);
    };
    
    async.waterfall([f1, f2, f3], function (errors, results) {
      assert(results, 6);
      done();
    });
  });
});

