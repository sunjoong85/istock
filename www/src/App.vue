<template>
  <div id="app" class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">

        <!-- viewport에 따라 사라지도록 하기-->

        <md-button class="md-icon-button" v-if="!menuVisible" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>

        <span class="md-title">Sunjoong85 Playground</span>
      </md-app-toolbar>

      <md-app-drawer :md-permanent="drawerType" :md-active.sync="menuVisible">  <!----><!-- permanent-->
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>show_chart</md-icon>
            <span class="md-list-item-text">Investment Factors</span>
          </md-list-item>
          <md-list-item>
            <md-icon>bar_chart</md-icon>
            <span class="md-list-item-text">D3</span>
          </md-list-item>

          <md-list-item>
            <md-icon>highlight</md-icon>
            <span class="md-list-item-text">Experiments</span>
          </md-list-item>


          <md-list-item>
            <md-icon>perm_identity</md-icon>
            <span class="md-list-item-text">About</span>
          </md-list-item>

        </md-list>
      </md-app-drawer>

      <md-app-content >

        <div class="chart-container">
          <TraderTrend/>
        </div>
        <div class="chart-container">
          <DramExchange />
        </div>

        <div class="chart-container">
          <ChinaPolysilicon />
        </div>

      </md-app-content>

    </md-app>
  </div>

</template>

<script>
  import TraderTrend from './components/TraderTrend'
  import DramExchange from './components/DramExchange'
  import ChinaPolysilicon from "./components/ChinaPolysilicon";

  Chart.defaults.global.defaultFontSize = 10;

  export default {
    name: 'App',
    data() {
      return {
        menuVisible: true,
        drawerType: 'clipped'
      }
    },

    components: {
      TraderTrend, DramExchange, ChinaPolysilicon
    },

    mounted() {

      var e = document.documentElement,
        g = document.getElementsByTagName('body')[0],
        x = window.innerWidth || e.clientWidth || g.clientWidth,
        mobile = false;

      if (x <= 480) {
        // console.log("mobile size");
        mobile = true;
        this.menuVisible = false;
        this.drawerType = null;
      }

    }

  }
</script>

<style lang="scss">

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .chart-container {
    margin: auto;
    width: 75vw;
    height: 50vh;
    position:relative;
    flex : 1;
    justify-content: center;
    flex-wrap: wrap;
  }

  .page-container {
  }

  .md-app {
    border: 1px solid rgba(#000, .12);
    max-height: 800px;
  }


  .md-app-toolbar {
   // height: 5vh;
  }

  .md-app-content {
    display:flex;
    flex-direction:column;
    padding: 0;
    /*height: 100%;*/
  }
  // Demo purposes only
  .md-drawer {
    width: 20vw;  //todo media query
  }


  @media screen and (max-width: 600px) {
    .md-drawer {
      width: 60vw;

    }

    .chart-container {
      margin: auto;
      width: 95vw;
      height: 50vh;
      position:relative;
      flex : 1;
      justify-content: center;
      flex-wrap: wrap;
    }
  }


</style>
