<template>
    <div >
        <canvas id='canvas'></canvas>
    </div>
</template>

<script>
    const chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };

    let config = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: '개인',
                fill: false,
                backgroundColor: chartColors.red,
                borderColor: chartColors.red,
                data: [],
                yAxisID : 'y-axis-1'

            }, {
                label: '외국인',
                fill: false,
                backgroundColor: chartColors.blue,
                borderColor: chartColors.blue,
                data: [],
                yAxisID : 'y-axis-1'
            },
                {
                    label: '기관',
                    fill: false,
                    backgroundColor: chartColors.yellow,
                    borderColor: chartColors.yellow,
                    data: [],
                    yAxisID : 'y-axis-1'
                },
                {
                    label: 'KOSPI',
                    fill: false,
                    backgroundColor: chartColors.grey,
                    borderColor: chartColors.grey,
                    borderDash : [5],
                    data: [],
                    yAxisID: 'y-axis-2'
                }]
        },

        options: {
            elements: {
                line: {
                    tension: 0, // disables bezier curves
                }
            },
            responsive: true,
          // maintainAspectRatio : false,
          title: {
                display: true,
                text: '투자자별매매동향(KOSPI)',
                fontSize : 20
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: '매매동향/억원'
                    },
                    id: 'y-axis-1'
                },
                    { display: true,
                        position: 'right',
                        id: 'y-axis-2',
                        scaleLabel: {
                            display: true,
                            labelString : 'KOSPI'
                        },
                        ticks: {
                            stepSize : 50
                        }
                    }]
            }
        }
    };

    let myLine;
    //모바일 사이즈

    export default {
        name: "TraderTrend",

        mounted: function() {
            var ctx = document.getElementById('canvas').getContext('2d');
            myLine = new Chart(ctx, config);
            this.getData();
        },

        methods: {
            getData : function() {
                var req = new XMLHttpRequest();
                req.open('GET', '/traderTrend', true);
                req.onreadystatechange = function (aEvt) {
                    if (req.readyState == 4) {
                        let data = JSON.parse(req.responseText);

                        let label = [];
                        let indivisual = [];
                        let foreigner = [];
                        let institutional = [];
                        let kospiPriceIndexes = [];

                        data.forEach(function(o) {
                            var d = new Date(o.date);
                            d = d.getFullYear() + '.' + (d.getMonth()*1+1) + '.' + d.getDate();

                            label.push(d);
                            indivisual.push(o.개인);
                            foreigner.push(o.외국인);
                            institutional.push(o.기관);
                            kospiPriceIndexes.push(o.priceIndex);
                        })

                        config.data.labels = label;
                        config.data.datasets[0].data = indivisual;
                        config.data.datasets[1].data = foreigner;
                        config.data.datasets[2].data = institutional;
                        config.data.datasets[3].data = kospiPriceIndexes;

                        myLine.update();

                        if(req.status == 200){
                        }
                    }
                };
                req.send(null);
            }
        }
    }

</script>

<style scoped>

</style>
