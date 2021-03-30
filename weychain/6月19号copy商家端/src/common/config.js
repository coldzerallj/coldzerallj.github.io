let URL_CONFIG = '';
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	URL_CONFIG = 'https://dssxapi.weychain.com:60443/';
	// URL_CONFIG = 'https://dssxapi.weychain.com/mms/';
	// URL_CONFIG = 'http://10.10.10.169:8820/';
	// URL_CONFIG = 'http://wellwell.wang:3210/mock/124/';
} else {
	// 生产环境
	// URL_CONFIG = 'http://wellwell.wang:3210/mock/124/';
	URL_CONFIG = 'https://dssxapi.weychain.com:60443/';
	// URL_CONFIG = 'https://dssxapi.weychain.com/mms/';
}

export default URL_CONFIG;
