import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import ArgonDashboard from './plugins/argon-dashboard';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';
import 'vue-search-select/dist/VueSearchSelect.css';

Vue.config.productionTip = false;

Vue.use(VueToast);

Vue.use(ArgonDashboard);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');