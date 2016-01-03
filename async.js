
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
  
  this.waterfall = function() {
    var jobs = arguments[0];
    if (!(jobs instanceof Array)) return callback(new Error("First argument need to be an array containing function"));

    var callback = (arguments.length > 2) ? arguments[2] : arguments[1];
    var after = function(err, result) {
      if (err) return callback(err);

      var args = [];
      if (jobs.length < 1) return callback(null, result);

      args.push(jobs);
      if (result != undefined) args.push(result);
      args.push(function(err, data) {
        if (err) return callback(err);
        callback(null, data);
      });
      self.waterfall.apply(this, args);
    };

    var job = jobs.shift();

    var args = [];
    if (arguments.length > 2) args.push(arguments[1]);
    args.push(after);

    job.apply(this, args);
  };
  
};

module.exports = new Async();
