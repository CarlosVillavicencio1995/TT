import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueToast);
Vue.use(Vuelidate)
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");