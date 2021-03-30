import Vue from 'vue';
import VueI18n from 'vue-i18n';
import customZhCn from './langs/zh-CN.json';
// import customZhTw from './langs/zh-TW.json';
import customEnUs from './langs/en-US.json';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import enLocale from 'element-ui/lib/locale/lang/en';

Vue.use(VueI18n);

// function parseJson(jsonObj, name = '') {
// 	Object.keys(jsonObj).forEach((key, index) => {
// 		let keys = name;
// 		const element = jsonObj[key];
// 		if (
// 			(element.length > 0 && typeof element === 'object') ||
// 			typeof element === 'object'
// 		) {
// 			keys += `${key}.`;
// 			parseJson(element, keys);
// 		} else {
// 			// console.log(`"${keys}${key}": "${element}",`);
// 		}
// 	});
// }

// parseJson(customZhCn);

// 自动根据浏览器系统语言设置语言
// const navLang = navigator.language;
// const localLang = navLang === 'zh-CN' || navLang === 'en-US' ? navLang : false;
// let lang = window.localStorage.lang || localLang || 'en-US';

const lang = 'zh-CN';
Vue.config.lang = lang;

// vue-i18n 6.x+写法
Vue.locale = () => {};
const messages = {
	'zh-CN': { ...customZhCn, ...zhLocale },
	'en-US': { ...customEnUs, ...enLocale },
	// 'zh-TW': JSON.parse(customZhTw)customZhTw,
};
const i18n = new VueI18n({
	locale: lang,
	messages,
});

export default i18n;
