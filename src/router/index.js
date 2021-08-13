import Vue from "vue";
import VueRouter from "vue-router";

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

const routes = [
  {
    path: "/article/:id",
    name: "Article",
    component: () =>
      import("../views/Article.vue"),
    meta: {
      title: '文章详情'
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/Login.vue"),
    meta: {
      title: '登录'
    }
  },
  {
    path: "/mine",
    name: "Mine",
    component: () =>
      import("../views/Mine.vue"),
    meta: {
      title: '我的'
    }
  },
  {
    path: "/history",
    name: "History",
    component: () =>
      import("../views/History.vue"),
    meta: {
      title: '历史记录'
    }
  },
  {
    path: "/:first?/:second?",
    name: "Index",
    component: () =>
      import("../views/Index.vue"),
    meta: {
      title: '首页'
    }
  }
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  base: process.env.BASE_URL,
  routes,
});

export default router;
