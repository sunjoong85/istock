const fs = require('fs');
const _ = require('lodash');

const repositoryPath = require('../../context').path.repository;

/*
 DDR4 8Gb (1G*8) 2133/2400 MHz	9.15	8.35	9.15	8.35	8.856
-0.27 %	Historical Price Chart
  DDR4 4Gb (512M*8) 2133/2400 MHz	4.60	3.95	4.60	3.95	4.137
0.00 %	Historical Price Chart
  DDR3 4Gb 512Mx8 1600/1866MHz	3.75	3.20	3.75	3.20	3.306
-0.09 %	Historical Price Chart
 */

module.exports = {
    //Trader Trend of Buyer
    uri: 'https://www.dramexchange.com/',
    callback: function (error, res, done) {

        const sel_ddr4_8gb = '#tb_NationalDramSpotPrice > tr:nth-child(2) > td:nth-child(6)';
        const sel_ddr4_4gb = '#tb_NationalDramSpotPrice > tr:nth-child(3) > td:nth-child(6)';
        const sel_ddr3_4gb = '#tb_NationalDramSpotPrice > tr:nth-child(4) > td:nth-child(6)';

        if(error){
            console.log(error);
        } else{
            let $ = res.$;

            let today = new Date();
            today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 30, 0);

            var obj = {
                'date': today.getTime(),
                'date_str': today,
                'title': 'DRAM_EXCHANGE',
                'ddr4_8gb': ($(sel_ddr4_8gb).text()*1),
                'ddr4_4gb': ($(sel_ddr4_4gb).text()*1),
                'ddr3_4gb': ($(sel_ddr3_4gb).text()*1)
            }

            const filePath = repositoryPath + '/dramExchange.json';

            let dataList = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            dataList.push(obj);

            fs.writeFile(filePath, JSON.stringify(dataList), function(err) {
                if(err) {
                    return console.log(err);
                }
            });
        }
        done();
    }
}
