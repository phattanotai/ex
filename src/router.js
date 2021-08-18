import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '@/layout/DashboardLayout';
import AuthLayout from '@/layout/AuthLayout';

import store from './vuex/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  hashbang: false,
  hash: false,
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('./views/Login.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('./views/Register.vue'),
        },
        {
          path: '/repassword',
          name: 'repassword',
          component: () => import('./views/Repassword.vue'),
        },
      ],
    },
    {
      path: '/admin',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'admin-Dashboard',
          component: () => import('./views/Dashboard.vue'),
        },
        {
          path: '/admin/dashboard',
          name: 'admin-dashboard',
          component: () => import('./views/Dashboard.vue'),
        },
        {
          path: '/admin/items',
          name: 'admin-items',
          component: () => import('./views/Items.vue'),
        },
        {
          path: '/admin/profile',
          name: 'admin-profile',
          component: () => import('./views/UserProfile.vue'),
        },
        {
          path: '/admin/reports',
          name: 'admin-reports',
          component: () => import('./views/Reports.vue'),
        },
        {
          path: '/admin/users',
          name: 'admin-users',
          component: () => import('./views/Users.vue'),
        },
        {
          path: '/admin/vehicles',
          name: 'admin-vehicles',
          component: () => import('./views/Vehicles.vue'),
        },
      ],
    },
    {
      path: '/user',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'user-Dashboard',
          component: () => import('./views/Dashboard.vue'),
        },
        {
          path: '/user/dashboard',
          name: 'user-dashboard',
          component: () => import('./views/Dashboard.vue'),
        },
        {
          path: '/user/items',
          name: 'user-items',
          component: () => import('./views/Items.vue'),
        },
        {
          path: '/user/profile',
          name: 'user-profile',
          component: () => import('./views/UserProfile.vue'),
        },
        {
          path: '/user/reports',
          name: 'user-reports',
          component: () => import('./views/Reports.vue'),
        },
      ],
    },
    {
      path: '/cashier',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'cashier-Dashboard',
          component: () => import('./views/Dashboard.vue'),
        },
        {
          path: '/cashier/dashboard',
          name: 'cashier-dashboard',
          component: () => import('./views/Dashboard.vue'),
        },
        {
          path: '/cashier/items',
          name: 'cashier-items',
          component: () => import('./views/Items.vue'),
        },
        {
          path: '/cashier/profile',
          name: 'cashier-profile',
          component: () => import('./views/UserProfile.vue'),
        },
        {
          path: '/cashier/reports',
          name: 'cashier-reports',
          component: () => import('./views/Reports.vue'),
        },
      ],
    },
    {
      path: 'public',
      redirect: 'public',
      component: DashboardLayout,
      children: [
        {
          path: '/public/profile',
          name: 'profile',
          component: () => import('./views/UserProfile.vue'),
        },
      ],
    },
    {
      path: '*',
      redirect: '/login',
    },
  ],
});

router.beforeEach((to, from, next) => {
  store.dispatch('fetchAccessToken');
  store.dispatch('fetchUserData');
  console.log(to);
  if (from.name && from.path) {
    store.dispatch('fetchFromUrl', {
      name: from.name,
      path: from.path,
    });
  }
  if (
    to.fullPath !== '/login' &&
    to.fullPath !== '/register' &&
    to.fullPath !== '/repassword'
  ) {
    if (!store.getters.getToken) {
      setTimeout(function() {
        next('/login');
      }, 50);
    }
    if (
      to.matched[0].path.toLowerCase() !==
        '/' + store.getters.getUserData.usergroup_name &&
      to.matched[0].path.toLowerCase() !== 'public'
    ) {
      console.log(to);
      setTimeout(function() {
        next('/' + store.getters.getUserData.usergroup_name + '/dashboard');
      }, 100);
    }
  } else if (to.fullPath === '/login') {
    if (store.getters.getToken) {
      setTimeout(function() {
        next('/' + store.getters.getUserData.usergroup_name + '/dashboard');
      }, 100);
    }
  }
  next();
});

export default router;
