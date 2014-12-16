# timeseries-samples

A few samples of time-series data management using [influxdb](http://influxdb.com/). The included `mock.js` generates second-resolution percentage data for CPU Utilization and Free Memory.

![](./screen_shot.png)

## a few example queries

Simple select of all value

`select * from mem_series;`

Select of values based on time

`select sample_value from cpu_series where time > '2013-08-12 23:32:01.232'`

95th percentile of value in 5 second intervals

`select percentile(sample_value, 95) from mem_series group by time(5s);`

Standard deviation of value in 5 second intervals

`select stddev(sample_value) from cpu_series group by time(1m);`


## why influxdb

Having done a few systems for time series data in Cassandra, HBase and yes, even Mongo, I was looking for something that would be already optimized for that specific data type. Furthermore, I wanted clean API and support for many of common telemetry aggregate functions:

```count(), min(), max(), mean(), mode(), median(), distinct(), percentile(), histogram(), derivative(), sum(), stddev(), first(), last()```

Additionally: 

* No external dependancies (nope, no zookeeper)
* SQL-like query and built-in UI
* On the fly, downsample aggregate (no need to define windows, just record it and query by ad-hoc period: e.g. 1s, 4s, 2m etc.)
* Clustering support (there is currently a limit of 2M writes per second in 0.9 release, which suppose to be removed in 1.0)
* Pure Golang since 0.9 (plus for me, may not be for others)