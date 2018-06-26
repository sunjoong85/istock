const schedule = require('node-schedule');
let crawler = require("crawler");

crawler = new crawler();

const traderTrendJob =  require('./jobs/traderTrend');
const dramExchangeJob = require('./jobs/dramExchange');
const chinaPolysilicon = require('./jobs/chinaPolysilicon');

module.exports = {
    run : function() {
        schedule.scheduleJob('0 17 * * 1-5', function(){
            crawler.queue(traderTrendJob);
        });

        schedule.scheduleJob('0 13 * * 1-5', function(){
            crawler.queue(dramExchangeJob);
        });

      schedule.scheduleJob('0 8 * * 1-5', function(){
             crawler.queue(chinaPolysilicon);
      });
    }
}
