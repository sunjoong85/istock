const schedule = require('node-schedule');
let crawler = require("crawler");

crawler = new crawler();

const traderTrendJob =  require('./jobs/traderTrend');
const dramExchangeJob = require('./jobs/dramExchange');

module.exports = {
    run : function() {
console.log("start to run")
            crawler.queue(traderTrendJob);
            crawler.queue(dramExchangeJob);

        schedule.scheduleJob('0 17 * * 1-5', function(){
            crawler.queue(traderTrendJob);
        });

        schedule.scheduleJob('0 13 * * 1-5', function(){
            crawler.queue(dramExchangeJob);
        });
    }
}
