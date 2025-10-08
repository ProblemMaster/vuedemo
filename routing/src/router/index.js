import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About',
      },
    },
    {
      path: '/my',
      name: 'My View',
      component: () => import('../views/MyView.vue'),
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../views/NoShow.vue'),
      meta: {
        title: '404',
      },
    },
  ],
})

router.beforeEach((to) => {
  document.title = to.meta?.title ?? to.name
})
export default router
