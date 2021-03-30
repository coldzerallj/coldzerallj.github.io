import { ROUTE_NAME } from '@HELPER/const';

const { RN_HOME } = ROUTE_NAME;

export default [
	{
		path: '/',
		name: RN_HOME,
		meta: {
			requireAuth: true,
		},
	},
];
