<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <TraderTrend/>
    <DramExchange/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import TraderTrend from './components/TraderTrend'
import DramExchange from './components/DramExchange'

Chart.defaults.global.defaultFontSize=20;

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
</style>
