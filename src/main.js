import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
// fontawesome图标🆒全局植入
import { library } from '@fortawesome/fontawesome-svg-core'
// https://fontawesome.com/icons?d=gallery&s=solid
import { faCoffee,faAmbulance } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCoffee,faAmbulance)
Vue.component('icon', FontAwesomeIcon)

Vue.config.productionTip = false;

Vue.use(ElementUI);

router.beforeEach((to,from,next) => {
	// if(to.matched.some( m => m.meta.auth)){
  	if (to.meta.auth) {
    	// 根据业务需要修改登陆判断条件
	    if (store.state.isLogin) {
	      	next()
	    } else {
	      	Message('请先登录！')
	      	next({
	      		path: '/',
	      		// query:{ Rurl: to.fullPath}
	      	})
	    }
	}else{
		next()
	}
})

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
