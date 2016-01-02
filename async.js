
var Async = function () {
  var self =this;
  
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
  
  this.parallel = function (jobs, callback) {
    if (!(jobs instanceof Array)) return callback(new Error("First argument need to be an array containing function"));

    var job = jobs.shift();
    job(function (err, result) {
      if (err) return callback(err);
      
      if (jobs.length < 1) return callback(null, [result]);
      
      self.parallel(jobs, function (err, data) {
        if (err) return callback(err);
        data.push(result);
        callback(null, data);
      });
    });
  };
  
};

module.exports = new Async();
