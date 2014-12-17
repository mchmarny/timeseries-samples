#!/bin/bash

# this is only for testing, obviously you'll use something more
# secure than test/test/test, right?

# add db
curl -X POST 'http://localhost:8086/db?u=root&p=root' \
     -d '{"name": "test"}'

# add db user
curl -X POST 'http://localhost:8086/db/test/users?u=root&p=root' \
  -d '{"name": "test", "password": "test"}'