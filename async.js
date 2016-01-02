
var Async = function () {
  this.map = function (array, func, callback) {
    var results = [];
    var errors = [];
    var count = array.length;
    
    for (var i = array.length; i--; ) {
      var object = array[i];
      
      (function(object, index) {
        func(object, function (err, result) {
          count--;
          if (err) return errors[index] = err;
          results[index] = result;
          if (count < 1) return callback((errors.length > 0) ? errors : null, results);
        });
      })(object, i);
    }
  };
  
  this.map = function(items, iterate, callback) {
    var queue = [];
    var results = [];
    var errors = [];    
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      
      (function (item, i) {
        queue.push(item);
        iterate(item, function (error, result) {
          queue.splice(queue.indexOf(item), 1);
          if (error) errors.push(error);
          else results.push(result);
          if (queue.length < 1 && (results.length + errors.length) == items.length) {
            if (errors.length > 0) return callback(errors);
            else return callback(null, results);
          }
        });
      }) (item, i);
    }
  };
  
};

module.exports = new Async();
