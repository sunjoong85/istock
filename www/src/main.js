// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css'
import App from './App'


Vue.config.productionTip = false;

Vue.use(VueMaterial);


new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
