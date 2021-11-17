import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home.vue"),
  },
  {
    path: "/easy",
    name: "Easy",
    component: () => import("../views/easy.vue"),
  },
  {
    path: "/middle",
    name: "Middle",
    component: () => import("../views/middle.vue"),
  },
  {
    path: "/hard",
    name: "Hard",
    component: () => import("../views/hard.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
