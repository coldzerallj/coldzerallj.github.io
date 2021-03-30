import axios from 'axios';
import { eraseEmpty } from '../../utils'; // 表单内容用它在提交时去空格也可以

const sectionTableDefaultApiTool = (url, params) => {
	params = eraseEmpty(params);
	return axios.get(url, params);
};
const sectionTableDefaultApiToolPost = (url, params) => {
	params = eraseEmpty(params);
	return axios.post(url, params);
};

export default {
	sectionTableDefaultApiTool,
	sectionTableDefaultApiToolPost,
};
