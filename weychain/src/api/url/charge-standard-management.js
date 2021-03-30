import axios from 'axios';
import { eraseEmpty } from '../utils'; // 表单内容用它在提交时去空格也可以

// 启用 / 停用
const enableOrNot = (result, arr) => {
	const params = {
		code: result,
		ids: arr,
	};
	return axios.post(`/xxx`, eraseEmpty(params));
};

// 删除
const del = arr => {
	return axios.post(`/xxx`, arr);
};

// 获取缴费标准设置详情
const getChargeStandardSetting = id => {
	return axios.post(`/xxx?id=${id}`);
};

// 获取缴费大类
const getChargeCategory = () => {
	return axios.get(`/xxx`);
};

// 获取缴费科目
const getChargeSubject = () => {
	return axios.get(`/xxx`);
};

// 提交缴费标准
const submitChargeSetting = params => {
	return axios.post(`/xxx`, params);
};

export default {
	del,
	enableOrNot,
	getChargeStandardSetting,
	getChargeCategory,
	getChargeSubject,
	submitChargeSetting,
};
