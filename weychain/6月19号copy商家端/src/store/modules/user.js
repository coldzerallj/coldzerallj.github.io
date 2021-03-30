import { login, PhoneLogin } from '@/api/user';
import { UnreadFlag } from '@/api/notice';

const state = {
	xToken: uni.getStorageSync('xToken') ? uni.getStorageSync('xToken') : '',
	tenantId: uni.getStorageSync('tenantId') ? uni.getStorageSync('tenantId') : '',
	// true 有新消息 false 无新消息
	unreadFlag: false,
	// 店铺状态 数据
	applyProgress: { applyStatus: 1 },
	// 用户信息
	userInfo: {},
};
const mutations = {
	X_TOKEN: (state, xToken) => {
		state.xToken = xToken;
		uni.setStorageSync('xToken', xToken);
	},
	TENANT_ID: (state, tenantId) => {
		state.tenantId = tenantId;
		uni.setStorageSync('tenantId', tenantId);
	},
	unreadFlag: (state, isNew) => {
		state.unreadFlag = isNew;
	},
	applyProgress: (state, applyProgress) => {
		state.applyProgress = applyProgress;
	},
	// 用户信息
	USER_INFO: (state, data) => {
		state.userInfo = data;
	},
};
const actions = {
	// 登录
	login({ commit }, postData) {
		// const { username, password } = userInfo;
		return new Promise((resolve, reject) => {
			login(postData)
				.then((response) => {
					const { data } = response;
					commit('xToken', data.xToken);
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	// 退出
	logout({ commit }) {
		// return new Promise((resolve, reject) => {
		// 	logout()
		// 		.then((response) => {
		// 			commit('xToken', '');
		// 			uni.removeStorageSync('xToken');
		// 			resolve();
		// 		})
		// 		.catch((error) => {
		// 			reject(error);
		// 		});
		// });
		commit('X_TOKEN', '');
		uni.removeStorageSync('xToken');
	},
	// 手机登录
	PhoneLogin({ commit }, postData) {
		return new Promise((resolve, reject) => {
			PhoneLogin(postData)
				.then((response) => {
					const { data } = response;
					commit('X_TOKEN', data);
					uni.setStorageSync('xToken', data);
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	// 是否有新消息
	unreadFlag({ commit }) {
		return new Promise((resolve, reject) => {
			UnreadFlag()
				.then((response) => {
					commit('unreadFlag', response.data);
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	// 入驻状态
	applyProgress({ commit }, data) {
		commit('applyProgress', data);
	},
	// 用户信息
	USER_INFO({ commit }, data) {
		commit('USER_INFO', data);
	},
};
export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
