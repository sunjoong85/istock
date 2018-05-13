const fs = require('fs');
const path = require('path');

var schedule = require('node-schedule');
var Crawler = require("crawler");
var crawler = new Crawler();

var express = require('express');
var app = express();

app.use(express.static('./www'))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/traderTrend', (req, res) => {
  fs.readFile('./traderTrend.json', 'utf8', (err, contents) => {
    res.send(contents);
  });
});

//#KOSPI_now
//
app.listen(7777, function () {
  console.log('Example app listening on port 7777!');
});

  crawler.queue(require('./job/jobs'));
  
schedule.scheduleJob('0 17 * * 1-5', function(){
  // console.log('run scheduler');

});
