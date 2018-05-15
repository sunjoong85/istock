<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <div class="container">
      <TraderTrend class="chart-container"/>
      <DramExchange class="chart-container"/>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import TraderTrend from './components/TraderTrend'
import DramExchange from './components/DramExchange'

Chart.defaults.global.defaultFontSize=18;

export default {
  name: 'App',
  components: {
    HelloWorld, TraderTrend, DramExchange
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center

  }
  .chart-container {
    width: 1200px;
    margin-left: 40px;
    margin-right: 40px;
    margin-bottom: 40px;
  }

</style>
