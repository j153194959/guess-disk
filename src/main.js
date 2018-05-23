// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import axios from 'axios'
import global_ from './components/tool/Global'
import '../static/lib/burial-site/td-h5-website-sdk-3.1.2'

FastClick.attach(document.body)

// ios 由其它事件外连 click事件需要触发两次
const notNeed = FastClick.notNeeded(document.body)
Vue.prototype.iosClick = function (dom) {
  dom.click()
  if (!notNeed) {
    dom.click()
  }
}

require('es6-promise').polyfill()
Vue.prototype.$ajax = axios
// 设置默认值
// axios.defaults.baseURL = 'http://192.20.102.41:8080/marketIndex'
axios.defaults.baseURL = 'https://estock.xyzq.com.cn/coin/marketIndex'
// axios.defaults.headers.get['X-Token'] = 'ceshi'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.prototype.GLOBAL = global_

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
