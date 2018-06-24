<template>
  <canvas id='canvas2'></canvas>
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
        label: 'DDR4 8Gb',
        fill: false,
        backgroundColor: chartColors.red,
        borderColor: chartColors.red,
        borderWidth: 1,

        data: []
      }, {
        label: 'DDR4 4Gb',
        fill: false,
        backgroundColor: chartColors.blue,
        borderColor: chartColors.blue,
        borderWidth: 1,
        data: []
      },
        {
          label: 'DDR3 4Gb',
          fill: false,
          backgroundColor: chartColors.yellow,
          borderColor: chartColors.yellow,
          borderWidth: 1,

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
      maintainAspectRatio: false,

      title: {
        display: true,
        text: 'DRAM Exchange Index',
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
          display: true,
          scaleLabel: {
            display: true,
            labelString: '달러/$'
          },
          ticks: {
            stepSize: 0.5
          }
        }]
      }
    }
  };

  let myLine;
  //모바일 사이즈

  export default {
    name: "DramExchange",

    mounted: function () {
      var ctx = document.getElementById('canvas2').getContext('2d');
      myLine = new Chart(ctx, config);
      this.getData();
    },

    methods: {
      getData: function () {
        var req = new XMLHttpRequest();
        req.open('GET', '/dramExchange', true);
        req.onreadystatechange = function (aEvt) {
          if (req.readyState == 4) {
            let data = JSON.parse(req.responseText);

            let label = [];
            let ddr4_8gb = [];
            let ddr4_4gb = [];
            let ddr3_4gb = [];

            data.forEach(function (o) {
              var d = new Date(o.date);
              d = d.getFullYear() + '.' + (d.getMonth() * 1 + 1) + '.' + d.getDate();

              label.push(d);
              ddr4_8gb.push(o.ddr4_8gb);
              ddr4_4gb.push(o.ddr4_4gb);
              ddr3_4gb.push(o.ddr3_4gb);
            })

            config.data.labels = label;
            config.data.datasets[0].data = ddr4_8gb;
            config.data.datasets[1].data = ddr4_4gb;
            config.data.datasets[2].data = ddr3_4gb;

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
