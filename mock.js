"use strict";

var influx = require('influx'),
    os = require('os'),
    uuid = require('node-uuid');

// default credentials for local DB
var db = influx({
      host : 'localhost',
      port : 8086,
      username : 'test',
      password : 'test',
      database : 'test'
});



var sendDate = function(name, value){

  var obj = {
    sample_id: uuid.v4(),
    sample_time: new Date(),
    sample_source: os.hostname(),
    sample_value: value
  };

  db.writePoint(name, obj, function(err) {
    if(err) throw err;
  });

}


var mockData = function(){

  sendDate('mem_series', os.freemem());
  sendDate('cpu_series', os.loadavg()[0]);

  setTimeout(mockData, 1000);

}

var printQueries = function(){

  console.log('Series:');
  console.log('   mem_series');
  console.log('   cpu_series');

  console.log('Sample Queries:');
  console.log('   select * from mem_series;');
  console.log('   select stddev(sample_value) from mem_series group by time(5s);');
  console.log('   select percentile(sample_value, 95) from mem_series group by time(30s);');

}

printQueries();
mockData();



