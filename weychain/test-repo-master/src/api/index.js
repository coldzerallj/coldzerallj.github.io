import config from './config';
import interceptor from './interceptor';

config.use();
interceptor.use();

import user from './url/user';

export default {
	...user,
};
