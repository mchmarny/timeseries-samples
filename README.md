# timeseries-samples

After a pretty positive experience with [influxdb](http://influxdb.com/) I wanted to create a super simple telemetry producer (this one in Node.js) to spotlight a few types of time series data query in influxdb. To get us some live data, the included `mock.js` generate second-resolution metric data for CPU Utilization and Free Memory on your local machine.

![](./screen_shot.png)

## Sample queries

Select of values based on arbitrary time window.

```select sample_value from cpu_series where time > '2013-08-12 23:32:01.232' and time < 2013-08-12 23:22:055.134```

On the fly 90th percentile of value in 5 second intervals. No windowing or period tables required. 

`select percentile(sample_value, 90) from mem_series group by time(5s);`

Standard deviation of value in 5 second intervals. Again, all ad-hoc, downsampling with no priori declarations. 

`select stddev(sample_value) from cpu_series group by time(1m);`


## Why influxdb

Having done a few time series systems in Cassandra, HBase and yes, even Mongo, I was looking for something that would be already optimized for that specific data type. Furthermore, I wanted clean API as well as support for many of common telemetry aggregate functions:

```count(), min(), max(), mean(), mode(), median(), distinct(), percentile(), histogram(), derivative(), sum(), stddev(), first(), last()```

Additionally: 

* Open source (MIT), hosted on [GitHub](https://github.com/influxdb/influxdb/)
* No external dependancies (nope, no zookeeper)
* SQL-like query and built-in UI
* On the fly, downsample aggregate (no need to define windows, just record it and query by ad-hoc period: e.g. 1s, 4s, 2m etc.)
* Clustering support (there is currently a limit of 2M writes per second in 0.9 release, which suppose to be removed in 1.0)
* Pure Golang since 0.9 (plus for me, may not be for others)
