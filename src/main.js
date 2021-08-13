import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vant from 'vant';
import 'vant/lib/index.css';
import { getTimer } from './utils/common'

Vue.use(Vant);
Vue.prototype.getTimer = getTimer
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
