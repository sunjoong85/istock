var schedule = require('node-schedule');
var Crawler = require("crawler");

var crawler = new Crawler();

var express = require('express');
var app = express();

app.get('/', function(req, res) {
  let contents = fs.readFileSync('./투자자별매매동향.json', 'utf8');
  res.send(contents);
});


app.listen(7777, function () {
  console.log('Example app listening on port 7777!');
});



schedule.scheduleJob('0 20 * * 1-5', function(){
  console.log('run scheduler');

  crawler.queue(require('./job/jobs'));
});
