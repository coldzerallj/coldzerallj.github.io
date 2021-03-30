import axios from 'axios';
import { eraseEmpty } from '../utils'; // 表单内容用它在提交时去空格也可以

// 账单列表
const getChargeList = (name, period, status) => {
	return `pms/property/charge/list?chargeName=${name}&chargePeriod=${period}&chargeStatus=${status}`;
};

// 账单详情
const getChargeDetail = (id, name, billStatus) => {
	return `pms/property/charge/select?id=${id}&merchantName=${name}&billStatus=${billStatus}`;
};

// 账单详情 - 统计数据
const getChargeCount = id => {
	const params = {
		chargeId: id,
	};
	return axios.post(`pms/property/charge/money`, eraseEmpty(params));
};

// 账单导入
const importCharge = params => {
	return axios.post(`pms/property/chargeDetail/importExcel`, params);
};

// 生成账单
const createBill = id => {
	const params = {
		id,
	};
	return axios.post(`pms/property/chargeSubBill/add`, eraseEmpty(params));
};

// 发送账单
const sendBill = id => {
	return axios.get(`pms/property/message/sendChargeBill?chargeId=${id}`);
};

// 线下收款
const chargeOffLine = (ids, remark, userId) => {
	const params = {
		ids,
		remark,
		userid: userId,
	};
	return axios.post(`pms/property/charge/under`, eraseEmpty(params));
};

// 获取账单的月份和名字
const getChargeNameAndMonth = id => {
	return axios.get(`pms/property/charge/getOne?id=${id}`);
};

export default {
	getChargeList,
	getChargeDetail,
	getChargeCount,
	importCharge,
	createBill,
	sendBill,
	chargeOffLine,
	getChargeNameAndMonth,
};
