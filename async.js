
var Async = function () {
  this.parallel = function (array, func, callback) {
    var results = [];
    var errors = [];
    var count = array.length;
    
    for (var i = array.length; i--; ) {
      var object = array[i];
      
      (function(object, index) {
        func(object, function (err, result) {
          if (err) return errors[index] = err;
          results[index] = result;
          if (--count < 1) return callback((errors.length > 0) ? errors : null, results);
        });
      })(object, i);
    }
  };
  
};

module.exports = new Async();
