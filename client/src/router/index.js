import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import HomeCust from "../views/HomeCust.vue";
import OrderCust from "../views/OrderCust.vue";
import OrderDetail from "../views/OrderDetail.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/cust/order/:id",
            component: OrderDetail
        },
        {
            path: "/cust",
            name: "cust",
            children: [
                {
                    path: "login",
                    name: "custlogin",
                    component: Login
                },
                {
                    path: "register",
                    name: "custregister",
                    component: Register
                },
                {
                    path: "home",
                    name: "homecust",
                    component: HomeCust
                },
                {
                    path: "order",
                    name: "orercust",
                    component: OrderCust
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.access_token && localStorage.access_token !== undefined;
    if (!isAuthenticated && to.path === "/") {
        next("/cust/login");
    } else if (!isAuthenticated && to.name !== "custlogin" && to.name !== "custregister") {
        next("/cust/login");
    } else if (isAuthenticated && (to.name === "custlogin" || to.name === "custregister")) {
        next("/cust/home");
    } else {
        next();
    }
});

export default router;
