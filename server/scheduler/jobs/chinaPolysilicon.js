const fs = require('fs');
const _ = require('lodash');
const repositoryPath = require('../../context').path.repository;
const logger = require('../../logger/logger.js');

module.exports = {
    //Trader Trend of Buyer
    uri: 'http://www.sunsirs.com/uk/prodetail-463.html',
    callback: function (error, res, done) {

        const sel = 'body > div > div > div.main > div.l-body > table > tbody > tr:nth-child(2) > td:nth-child(3)';

        logger.log('[chinaPolysilicon.js] Start to callect data.');

        if(error){
            logger.log('[chinaPolysilicon.js] Error')
            console.log(error);
        } else{
            let $ = res.$;

            let today = new Date();
            //하루 후행적임
            today = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 8, 0, 0);

            var obj = {
                'date': today.getTime(),
                'date_str': today,
                'title': 'China Polysilicon Price',
                'price': ($(sel).text()*1),
            };

            const filePath = repositoryPath + '/chinaPolysilicon.json';

            let dataList = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            dataList.push(obj);

            fs.writeFile(filePath, JSON.stringify(dataList), function(err) {
              logger.log('[chinaPolysilicon.js] Success to write data.')

                if(err) {
                    logger.log('[chinaPolysilicon.js] Fail to write data.')

                    return console.log(err);
                }
            });
        }
        done();
    }
}
