import Vue from 'vue';
import App from './App';
import store from './store';
import * as filters from './filters';
import 'js_sdk/ican-H5Api';

Object.keys(filters).forEach((key) => {
	Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;
App.mpType = 'app';
Vue.prototype.goBack = function () {
	uni.navigateBack({
		delta: 1,
	});
};

// vue实例挂载
const app = new Vue({
	store,
	...App,
});
app.$mount();
