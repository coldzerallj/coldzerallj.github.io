// ***
// 登录 cookie key name
// ***
export const LOGIN_COOKIE_KEY = 'DA476D63DC8EB3504DF1A5C168CBE366';

// ***
// vux 类型
// ***
export const STORE_TYPE = {
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT',
	GET_PROFILE: 'GET_PROFILE',
	SET_ROLE_TYPE: 'SET_ROLE_TYPE',
	SET_PERMISSIONS_ROUTER: 'SET_PERMISSIONS_ROUTER',
	SET_PERMISSIONS_FULL: 'SET_PERMISSIONS_FULL',
};

// ***
// 角色
// ***
export const ROLE_0 = 0;
export const ROLE_1 = 1;

// ***
// 菜单导航组名称 (显示路由的界面入口)
// ***
export const NAV_GROUP = {
	TASK_MANAGEMENT: 'taskManagement',
	ROLES_MANAGEMENT: 'rolesManagement',
};

// ***
// 路由名
// ***
export const ROUTE_NAME = {
	RN_HOME: 'home',
	RN_LOGIN: 'login',
	RN_NOT_FOUND: 'notFound',

	// test
	// role_0 // task management
	RN_ROLE0_TM_LIST: 'role0-tm-list',
	RN_ROLE0_TM_FORM: 'role0-tm-form',
	RN_ROLE0_TM_DETAIL: 'role0-tm-detail',
	RN_ROLE0_TM_REPORT: 'role0-tm-report',

	// role_0 // roles management
	RN_ROLE0_RM_LIST: 'role0-rm-list',
	RN_ROLE0_RM_FORM: 'role0-rm-form',
	RN_ROLE0_RM_DETAIL: 'role0-rm-detail',
	RN_ROLE0_RM_REPORT: 'role0-rm-report',

	// role_1 // task management
	RN_ROLE1_TM_LIST: 'role1-tm-list',
	RN_ROLE1_TM_FORM: 'role1-tm-form',
	RN_ROLE1_TM_DETAIL: 'role1-tm-detail',
	RN_ROLE1_TM_REPORT: 'role1-tm-report',

	// role_1 // roles management
	RN_ROLE1_RM_LIST: 'role1-rm-list',
	RN_ROLE1_RM_FORM: 'role1-rm-form',
	RN_ROLE1_RM_DETAIL: 'role1-rm-detail',
	RN_ROLE1_RM_REPORT: 'role1-rm-report',
};

// ***
// 不需要权限的路由表
// ***
export const NO_PERMISSIONS_REQUIRED_ROUTES_MAP = [
	ROUTE_NAME.RN_LOGIN,
	ROUTE_NAME.RN_NOT_FOUND,
];
