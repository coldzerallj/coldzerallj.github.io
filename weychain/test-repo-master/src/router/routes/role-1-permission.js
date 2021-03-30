import { ROLE_1, ROUTE_NAME } from '@HELPER/const';

const {
	RN_ROLE1_TM_LIST,
	RN_ROLE1_TM_FORM,
	RN_ROLE1_TM_DETAIL,
	RN_ROLE1_TM_REPORT,
	RN_ROLE1_RM_LIST,
	RN_ROLE1_RM_FORM,
	RN_ROLE1_RM_DETAIL,
	RN_ROLE1_RM_REPORT,
} = ROUTE_NAME;

// task-management
const taskManagmentList = r =>
	require.ensure(
		[],
		() => r(require('@VIEWS/role-1/task-management/list')),
		'taskManagmentList',
	);
const taskManagmentDetail = r =>
	require.ensure(
		[],
		() => r(require('@VIEWS/role-1/task-management/detail')),
		'taskManagmentDetail',
	);
const taskManagmentForm = r =>
	require.ensure(
		[],
		() => r(require('@VIEWS/role-1/task-management/form')),
		'taskManagmentForm',
	);
const taskManagmentReport = r =>
	require.ensure(
		[],
		() => r(require('@VIEWS/role-1/task-management/report')),
		'taskManagmentReport',
	);

// roles-management
const rolesManagmentList = r =>
	require.ensure(
		[],
		() => r(require('@VIEWS/role-1/roles-management/list')),
		'rolesManagmentList',
	);
const rolesManagmentDetail = r =>
	require.ensure(
		[],
		() => r(require('@VIEWS/role-1/roles-management/detail')),
		'rolesManagmentDetail',
	);
const rolesManagmentForm = r =>
	require.ensure(
		[],
		() => r(require('@VIEWS/role-1/roles-management/form')),
		'rolesManagmentForm',
	);
const rolesManagmentReport = r =>
	require.ensure(
		[],
		() => r(require('@VIEWS/role-1/roles-management/report')),
		'rolesManagmentReport',
	);

export default [
	// task-management
	{
		path: `/${RN_ROLE1_TM_LIST}`,
		name: RN_ROLE1_TM_LIST,
		component: taskManagmentList,
		meta: {
			requireAuth: true,
			role: [ROLE_1],
		},
		children: [
			{
				path: `/${RN_ROLE1_TM_LIST}/${RN_ROLE1_TM_FORM}`,
				name: RN_ROLE1_TM_FORM,
				component: taskManagmentForm,
				meta: {
					requireAuth: true,
				},
			},
			{
				path: `/${RN_ROLE1_TM_LIST}/${RN_ROLE1_TM_DETAIL}`,
				name: RN_ROLE1_TM_DETAIL,
				component: taskManagmentDetail,
				meta: {
					requireAuth: true,
				},
			},
		],
	},
	{
		path: `/${RN_ROLE1_TM_REPORT}`,
		name: RN_ROLE1_TM_REPORT,
		component: taskManagmentReport,
		meta: {
			requireAuth: true,
			role: [ROLE_1],
		},
	},
	// roles-management
	{
		path: `/${RN_ROLE1_RM_LIST}`,
		name: RN_ROLE1_RM_LIST,
		component: rolesManagmentList,
		meta: {
			requireAuth: true,
			role: [ROLE_1],
		},
		children: [
			{
				path: `/${RN_ROLE1_RM_LIST}/${RN_ROLE1_RM_FORM}`,
				name: RN_ROLE1_RM_FORM,
				component: rolesManagmentForm,
				meta: {
					requireAuth: true,
				},
			},
			{
				path: `/${RN_ROLE1_RM_LIST}/${RN_ROLE1_RM_DETAIL}`,
				name: RN_ROLE1_RM_DETAIL,
				component: rolesManagmentDetail,
				meta: {
					requireAuth: true,
				},
			},
		],
	},
	{
		path: `/${RN_ROLE1_RM_REPORT}`,
		name: RN_ROLE1_RM_REPORT,
		component: rolesManagmentReport,
		meta: {
			requireAuth: true,
			role: [ROLE_1],
		},
	},
];
