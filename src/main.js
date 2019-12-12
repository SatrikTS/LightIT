import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './routes'

// Vue.config.productionTip = false;

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
Vue.use(VueRouter)

import './base.scss';
import './styles/product-list.scss';
import './styles/registration.scss';
import './styles/authorization.scss';
import './styles/popup.scss';
import './styles/review-item.scss';
import './styles/raiting.scss';
import './styles/review-post.scss';

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
