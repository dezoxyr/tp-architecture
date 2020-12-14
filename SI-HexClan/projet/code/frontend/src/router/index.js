import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home/component.vue";
import Login from "../components/Login/component.vue";
import Register from "../components/Register/component.vue";
import Reservation from "../components/Reservation/component.vue";


Vue.use(VueRouter);

const routes = [
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/reservation",
        name: "Reservation",
        component: Reservation
    },
    {
        path: "/",
        name: "Home",
        component: Home,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
