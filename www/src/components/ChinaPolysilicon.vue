<template>
  <div>
    <canvas id='canvas3'></canvas>
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
        label: 'China Polysilicon Price',
        fill: false,
        backgroundColor: chartColors.red,
        borderColor: chartColors.red,
        data: []
      }]
    },

    options: {
      elements: {
        line: {
          tension: 0, // disables bezier curves
        },
        point: {
          radius: 1
        }
      },
      responsive: true,
      title: {
        display: true,
        text: 'China Polysilicon Price',
        fontSize: 15
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
          display: false,
          scaleLabel: {
            display: true,
            labelString: '위안'
          },
          ticks: {
            // stepSize : 0.5
          }
        }]
      }
    }
  };

  let myLine;
  //모바일 사이즈

  export default {
    name: "ChinaPolysilicon",

    mounted: function () {
      var ctx = document.getElementById('canvas3').getContext('2d');
      myLine = new Chart(ctx, config);
      this.getData();
    },

    methods: {
      getData: function () {
        var req = new XMLHttpRequest();
        req.open('GET', '/chinaPoly', true);
        req.onreadystatechange = function (aEvt) {
          if (req.readyState == 4) {
            let data = JSON.parse(req.responseText);

            let labels = [];
            let prices = [];

            data.forEach(function (o) {
              var date = new Date(o.date);
              date = date.getFullYear() + '.' + (date.getMonth() * 1 + 1) + '.' + date.getDate();

              labels.push(date);
              prices.push(o.price);
            })

            config.data.labels = labels;
            config.data.datasets[0].data = prices;

            myLine.update();
          }
        };
        req.send(null);
      }
    }
  }


</script>

<style scoped>

</style>
