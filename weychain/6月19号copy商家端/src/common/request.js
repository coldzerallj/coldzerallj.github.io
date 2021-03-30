import urlConfig from './config.js';
import { APIVERSION } from './global';
import { loginAgain } from '@/api/index.js';
const request = {};
const headers = {};

request.globalRequest = (url, method, data, power) => {
	/* 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分 */
	switch (power) {
		case 1:
			headers['Content-Type'] = 'multipart/form-data';
			break;
		case 2:
			headers['Content-Type'] = 'application/x-www-form-urlencoded';
			break;
		default:
			headers['Content-Type'] = 'application/json';
			break;
	}
	// 请求头携带的登录凭证
	headers['X-Token'] = uni.getStorageSync('xToken');

	const baseUrl = urlConfig + 'mms/' + APIVERSION;
	// H5页面跨域访问处理
	// #ifdef H5
	// baseUrl = '/api';
	// #endif
	return uni
		.request({
			url: baseUrl + url,
			method,
			data: data,
			dataType: 'json',
			header: headers,
		})
		.then((res) => {
			// 返回请求结果
			// console.log('resresres', res);
			const { code } = res[1].data;
			const status = uni.getStorageSync('status');
			// //  token过期
			if ((code === 301 || code === 403) && status !== '0') {
				loginAgain();
			}
			return res[1].data;
		})
		.catch((parmas) => {
			switch (parmas.code) {
				// 判断状态码
				case 401:
					uni.clearStorageSync();
					break;
				default:
					uni.showToast({
						title: parmas.message,
					});
					return Promise.reject();
			}
		});
};

// public 无需token url 无前缀
request.otherRequest = (url, method, data, power) => {
	/* 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分 */
	switch (power) {
		case 1:
			headers['Content-Type'] = 'multipart/form-data';
			break;
		case 2:
			headers['Content-Type'] = 'application/x-www-form-urlencoded';
			break;
		default:
			headers['Content-Type'] = 'application/json';
			break;
	}
	// 请求头携带的登录凭证
	// headers['X-Token'] = uni.getStorageSync('xToken');

	const baseUrl = urlConfig;
	// H5页面跨域访问处理
	// #ifdef H5
	// baseUrl = '/api';
	// #endif
	return uni
		.request({
			url: baseUrl + url,
			method,
			data: data,
			// dataType: 'json',
			// header: headers,
		})
		.then((res) => {
			// 返回请求结果
			// console.log('resresres', res);
			return res[1].data;
		})
		.catch((parmas) => {
			switch (parmas.code) {
				// 判断状态码
				case 401:
					uni.clearStorageSync();
					break;
				default:
					uni.showToast({
						title: parmas.message,
					});
					return Promise.reject();
			}
		});
};
export default request;
