import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home.vue"),
  },
  {
    path: "/9*9",
    name: "Nine",
    component: () => import("../views/nine.vue"),
  },
  {
    path: "/10*10",
    name: "Ten",
    component: () => import("../views/ten.vue"),
  },
  {
    path: "/15*15",
    name: "Fifty",
    component: () => import("../views/fifty.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
