import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach }, // /coaches/c1/contact
      ],
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true },
      beforeEnter: async (_,_2,next) =>{
        await store.dispatch('coaches/loadCoaches', { foreceRefresh: true });
        if(await store.getters['coaches/isCoach']){
          next('/coaches');
        }else{
          next();
        }
      }
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    console.log(store.getters['coaches/isCoach']);
    next('/auth?redirect=register');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});
export default router;