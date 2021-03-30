import axios from 'axios';
const baseURL = process.env.API_ROOT;

export default {
	use() {
		axios.defaults.timeout = 10000;
		axios.defaults.baseURL = baseURL;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.l = 'zh_CN';
	},
};
