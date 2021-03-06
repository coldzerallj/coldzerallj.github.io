import { ROUTE_NAME } from '@HELPER/const';

const { RN_LOGIN, RN_NOT_FOUND } = ROUTE_NAME;
const routeComLogin = r => require.ensure([], () => r(require('@VIEWS/login')), 'routeComLogin');
const routeComNotFound = r => require.ensure([], () => r(require('@VIEWS/not-found')), 'routeComNotFound');

export default [
	{
		path: `/${RN_LOGIN}`,
		name: RN_LOGIN,
		component: routeComLogin,
	},
	{
		path: `/${RN_NOT_FOUND}`,
		name: RN_NOT_FOUND,
		component: routeComNotFound,
	},
];
