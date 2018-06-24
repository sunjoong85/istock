const fs = require('fs');
const path = require('path');
const repositoryPath = require('./context').path.repository;

const scheduler = require('./scheduler/scheduler');
scheduler.run();

const express = require('express');
const app = express();


app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/traderTrend', (req, res) => {
  fs.readFile('repository/traderTrend.json', 'utf8', (err, contents) => {
    res.send(contents);
  });
});

app.get('/dramExchange', (req, res) => {
    fs.readFile('repository/dramExchange.json', 'utf8', (err, contents) => {
        res.send(contents);
    });
});

//#KOSPI_now
//
app.listen(7777, function () {
  console.log('Example app listening on port 7777!');
});
