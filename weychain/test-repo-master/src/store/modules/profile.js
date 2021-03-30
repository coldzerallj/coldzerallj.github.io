import api from '@API';
import cookie from 'js-cookie';
import { STORE_TYPE, LOGIN_COOKIE_KEY, ROUTE_NAME } from '@HELPER/const';

const { RN_HOME } = ROUTE_NAME;

const {
	LOGIN,
	LOGOUT,
	SET_ROLE_TYPE,
	GET_PROFILE,
	SET_PERMISSIONS_ROUTER,
	SET_PERMISSIONS_FULL,
} = STORE_TYPE;

const state = {
	isLogin: false,
	roleType: null,
	permissions: [],
	permissionsFull: [],
};

const mutations = {
	[SET_PERMISSIONS_ROUTER]: (state, payload) => {
		// 默认 HOME 权限
		const defaultPermissionsRoute = [RN_HOME];
		const all = [...defaultPermissionsRoute, ...payload];
		state.permissions = all;
	},

	[SET_PERMISSIONS_FULL]: (state, payload) => {
		// 保存起服务器返回的整套权限表
		state.permissionsFull = payload;
	},

	[LOGIN]: state => {
		state.isLogin = true;
	},
	[LOGOUT]: state => {
		state.isLogin = false;
	},
	[SET_ROLE_TYPE]: (state, payload) => {
		state.roleType = payload;
	},
};

const actions = {
	[LOGIN]: async ({ commit }, params) => {
		await api.login(params);
		commit(LOGIN);
		cookie.set(LOGIN_COOKIE_KEY, 1);
	},

	[LOGOUT]: async ({ commit }, immediate) => {
		if (!immediate) {
			await api.logout();
		}
		commit(LOGOUT);
		cookie.remove(LOGIN_COOKIE_KEY);
	},

	[GET_PROFILE]: async ({ commit }) => {
		const {
			content: { type, permissions },
		} = await api.getProfile();
		commit(SET_ROLE_TYPE, type);
		commit(SET_PERMISSIONS_ROUTER, queryList(permissions, []));
		commit(SET_PERMISSIONS_FULL, permissions);
		commit(LOGIN);
	},
};

// 将服务器拿回来 用户路由权限‘permissions’ 重新组合成路由钩子要用的路由权限表
function queryList(arr) {
	if (!arr || !arr.length) return;

	const newArr = [];
	arr.map(item => {
		item.childs.map(i => {
			newArr.push(i);
		});
	});
	return newArr;
}

export default {
	state,
	mutations,
	actions,
};
