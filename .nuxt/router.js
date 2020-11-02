import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2d69335f = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _3ae9b654 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _22855c94 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _6fc75814 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _1a63bb18 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _219a59a2 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _56919b61 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _2d69335f,
    children: [{
      path: "",
      component: _3ae9b654,
      name: "home"
    }, {
      path: "/login",
      component: _22855c94,
      name: "login"
    }, {
      path: "/register",
      component: _22855c94,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _6fc75814,
      name: "profile"
    }, {
      path: "/settings",
      component: _1a63bb18,
      name: "settings"
    }, {
      path: "/editor/:slug?",
      component: _219a59a2,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _56919b61,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
