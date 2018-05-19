/* eslint-disable no-unused-vars */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'

Vue.use(ElementUI)
axios.defaults.withCredentials = true

var url=window.location.host;
var baseURL='';
if(url.indexOf('192.168.1.116')>=0){
  baseURL='http://192.168.1.116:8124'
}else{
  baseURL='http://61.143.227.36:8124'
}

Vue.prototype.$axios = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  // baseURL: baseURL,
  baseURL:'http://localhost:56968'
})

Vue.prototype.$axios.interceptors.request.use(config => {
  var token = sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config;
}, err => {
  return Promise.reject(err);
})

Vue.prototype.$axios.interceptors.response.use(res => {
  return res;
}, err => {
  var token=sessionStorage.getItem('token')
  switch (err.response.status) {
    case 401:
      if(!token){
        vm.$message.error('用户未登录')
        setTimeout(() => {
          router.replace('/')
        }, 4000);
      }else{
        vm.$message.error(err.response.data.Message)
      }
      
  }
  return Promise.reject(err)
})
Vue.prototype.$qs = qs
Vue.prototype.$numberFormatter = function numberFormatter(params) {
  return Number(params).toFixed(2)
}


Vue.config.productionTip = false

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

