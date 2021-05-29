import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import ('../views/Home.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import ('../views/Login.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import ('../views/Signup.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/email',
      name: 'Mail',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Mail.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/calendar',
      name: 'Calendar',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Calendar.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/university',
      name: 'University',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/University.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects',
      name: 'Projects',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Projects.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/travel',
      name: 'Travel',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Travel.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/bookmarks',
      name: 'SavedPages',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/SavedPages.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/code_websites',
      name: 'Code_Websites',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Code_Websites.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/design_websites',
      name: 'Design_Websites',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Design_Websites.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// Guards
router.beforeEach((to, from, next) => {
  // Check for requiredAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Route requires auth
    // Check if not logged in
    if (!firebase.auth().currentUser) {
      // Go to login page
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if logged in
    if (firebase.auth().currentUser) {
      // Go to dashboard
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next()
    }
  } else {
    // Proceed to route
    next()
  }
})


export default router
