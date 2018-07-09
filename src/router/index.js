import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const leaflet = r => require.ensure([], () => r(require('@/page/leaflet')), 'leaflet');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/home',
		component: home,
		meta:{auth:true}
	},
	{
		path: '/leaflet',
		component: leaflet,
		meta:{auth:true}
	},
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
