#!/bin/bash

supervisorctl start workspace

# restart nginx, needed on frist deploy
sudo service nginx restart
