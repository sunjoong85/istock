<template>
  <div id="app" class="page-container">
    <md-app md-mode="fixed">  <!-- fixed reveal -->
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

      <md-app-content>
        <TraderTrend class="chart-container"/>
        <DramExchange class="chart-container"/>
      </md-app-content>

    </md-app>
  </div>

</template>

<script>
  import TraderTrend from './components/TraderTrend'
  import DramExchange from './components/DramExchange'

  Chart.defaults.global.defaultFontSize = 14;

  export default {
    name: 'App',
    data() {
      return {
        menuVisible: true,
        drawerType: 'clipped'
      }
    },

    components: {
      TraderTrend, DramExchange
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

  .page-container {
    height: 100vh
  }

  .md-app {
    /*// max-height: 100%;*/
    height: 100%;
    border: 1px solid rgba(#000, .12);
  }

  .md-app-toolbar {
    height: 5vh;
  }

  // Demo purposes only
  .md-drawer {
    width: 20vw;  //todo media query
    /*height: 100vh; //max height : screen size*/
  }

  @media screen and (max-width: 600px) {
    .md-drawer {
      width: 60vw;  //todo media query
      /*height: 100vh; //max height : screen size*/
    }
  }
</style>
