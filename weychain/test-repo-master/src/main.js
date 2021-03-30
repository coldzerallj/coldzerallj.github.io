import 'es6-promise/auto';
import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App';
import i18n from '@/i18n';
import * as consts from '@HELPER/const';
import * as filters from './filters';
import * as directives from './directives';
import ElementUI from 'element-ui';
import section from '@SECTION';
import ui from '@UI';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(section);
Vue.use(ui);

Vue.prototype.$ALL_CONST = consts;

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key]);
});

Object.keys(directives).forEach(key => {
	Vue.directive(key, directives[key]);
});

new Vue({
	el: '#app',
	router,
	i18n,
	store,
	render: r => r('App'),
	components: {
		App,
	},
});
