import axios from 'axios';
import store from '@STORE';
import router from '../router';
import whitelist from './white-list';
import { STORE_TYPE, ROUTE_NAME } from '@HELPER/const';

const { LOGOUT } = STORE_TYPE;
const { RN_LOGIN } = ROUTE_NAME;

let link = null;
function getPathname(url) {
	if (!link) {
		link = document.createElement('a');
	}
	link.href = url;
	let { pathname } = link;
	if (pathname && pathname[0] !== '/') {
		pathname = '/' + pathname;
	}
	return pathname;
}

export default {
	use() {
		axios.interceptors.request.use(
			config => {
				return config;
			},
			error => {
				return Promise.reject(error);
			},
		);

		axios.interceptors.response.use(
			response => {
				const {
					content,
					result,
					errorMsg,
					intErrorCode,
					errorCode,
					property,
				} = response.data;
				const { url } = response.config;
				const pathname = getPathname(url);

				response = Object.assign({}, response, {
					content,
					result,
					errorMsg,
					intErrorCode,
					errorCode,
				});

				const isPass = whitelist.some(val => {
					if (typeof val === 'string') {
						return val === pathname;
					} else {
						return val.test(pathname);
					}
				});

				if (result === 'error') {
					if (!isPass && errorMsg) {
						this.$message.error(errorMsg);
					} else {
						return Promise.reject({
							content,
							errorMsg,
							errorCode: errorCode,
							code: errorCode,
							property,
						});
					}
				}
				return response;
			},
			err => {
				if (err && err.response) {
					const { status } = err.response;

					if (status === 401 || status === 403) {
						store.dispatch(LOGOUT);
						router.replace({
							name: RN_LOGIN,
							query: {
								redirect: router.currentRoute.fullPath,
							},
						});
					}
					if (status >= 400) {
						return Promise.reject({
							errorMsg: '请求出错',
						});
					}
				}
				return Promise.reject({
					errorMsg: '请求超时或未联网，请检查网络连接',
				});
			},
		);
	},
};
