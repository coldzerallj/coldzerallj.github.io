import { ROUTE_NAME } from '@HELPER/const';
import publicPermissionsNotRequired from './public-permissions-not-required';
import publicPermissionsRequired from './public-permissions-required';
import role0Permission from './role-0-permission';
import role1Permission from './role-1-permission';

const { RN_NOT_FOUND } = ROUTE_NAME;

export default [
	...publicPermissionsNotRequired,
	...publicPermissionsRequired,
	{
		path: '/afterlogin',
		component: r =>
			require.ensure([], () => r(require('@VIEWS/after-login')), 'afterlogin'),
		redirect: RN_NOT_FOUND,
		children: [...role0Permission, ...role1Permission],
	},
	{
		path: '*',
		redirect: RN_NOT_FOUND,
	},
];
