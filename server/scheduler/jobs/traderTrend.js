const fs = require('fs');
const _ = require('lodash');
const repositoryPath = require('../../context').path.repository;
const logger = require('../../logger/logger.js');

module.exports = {
    //Trader Trend of Buyer
    uri: 'http://finance.naver.com/sise/sise_index.nhn?code=KOSPI',
    callback: function (error, res, done) {

        const sel날짜 = '#time';
        const sel투자자별매매동향 = '#contentarea_left > div.box_top_sub > div > dl';
        const sel개인 = 'dd:nth-child(2) > span';
        const sel외국인 = 'dd:nth-child(3) > span';
        const sel기관 = 'dd:nth-child(4) > span';
        const selKOSPIIndex = '#now_value';

        logger.log('[traderTrend.js] Start to collect data.')
        if(error){
            console.log(error);
            logger.log('[traderTrend.js] Error')

        } else{
            let $ = res.$;

            let $투자자별매매동향 = $(sel투자자별매매동향);

            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server

            /*
            Naver
            2018.05.09 장마감
           -414억
           -2,303억
           +2,303억
            */

            if(matchToday(convertYMD($(sel날짜).text()))) {
                let today = new Date();
                today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 0, 0);

                var obj = {
                    'date' : today.getTime(),
                    'date_str' : today,
                    'title' : 'KOSPI',
                    'priceIndex' : convertPriceIndexNum($(selKOSPIIndex).text()),
                    '개인' : convertTraderTrendNum($투자자별매매동향.find(sel개인).text()),
                    '외국인' : convertTraderTrendNum($투자자별매매동향.find(sel외국인).text()),
                    '기관' : convertTraderTrendNum($투자자별매매동향.find(sel기관).text())
                }

                const filePath = repositoryPath + '/traderTrend.json';

                let dataList = JSON.parse(fs.readFileSync(filePath, 'utf8'));

                dataList.push(obj);

                fs.writeFile(filePath, JSON.stringify(dataList), function(err) {
                  logger.log('[traderTrend.js] Success to write data.')

                    if(err) {
                        logger.log('[traderTrend.js] Fail to write data.')

                        return console.log(err);
                    }
                });
            } else {
                logger.log('[traderTrend.js] Stock market is not opened today.')
            }
        }
        done();
    }
}


function convertYMD(str) {
    let ymd = [];
    let temp = '';

    let arr = str.split('.');
    ymd.push(arr[0]);
    ymd.push(arr[1]);
    ymd.push(arr[2][0] + arr[2][1]);
    return ymd;
}

//[2017, 01, 02]
function matchToday(ymdList) {
    let today = new Date();
    return today.getFullYear() == ymdList[0] && today.getMonth() == ymdList[1] - 1 && today.getDate() == ymdList[2];
}

//2,477.71을 변환한다.
function convertPriceIndexNum(str) {
    return str.split(',').join('')*1;
}

//-2,453 억원 을 변환한다.
function convertTraderTrendNum(str) {
    let num = '';
    num += str[0];
    for(let i=1; i<str.length; i++) {
        let temp = str[i]*1
        if(!_.isNaN(temp)) {
            num += temp;
        }
    }
    return num*1;
}
