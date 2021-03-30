import axios from 'axios';
import { eraseEmpty } from '../utils'; // 表单内容用它在提交时去空格也可以

// 登入
const login = params => {
	params = eraseEmpty(params);
	return axios.post('/login', params);
};

// 用户信息
const getProfile = () => {
	return axios.get('/profile');
};

// 登出
const logout = () => {
	return axios.get('/logout2', {});
};

export default {
	login,
	getProfile,
	logout,
};
