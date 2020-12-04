import Vue from "vue";
import router from "./router";
import store from "./store";
import Root from "./components/Root/component.vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import VueToast from "vue-toast-notification";
import VueSession from 'vue-session'

Vue.use(VueSession)
Vue.use(BootstrapVue);
Vue.use(axios)
Vue.config.productionTip = false;
Vue.use(VueToast);

axios.defaults.baseURL = "http://localhost:8081/api";
Vue.prototype.$axios = axios;
Vue.prototype.$store = store;
 

new Vue({
    router,
    store,
    render: (h) => h(Root),
}).$mount("#app");
