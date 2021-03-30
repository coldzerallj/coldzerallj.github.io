import axios from 'axios';
import { eraseEmpty } from '../utils'; // 表单内容用它在提交时去空格也可以

// 子商户列表
// const getStoreList = data => {
// 	axios.defaults.API_TYPE = 'pay';
// 	return `pay/merchant/getMerchantStoreList?storeAliasNo=${data.storeAliasNo}&storeName=${data.storeName}&tradeType=${data.tradeType}&offlineType=${data.offlineType}&storeID=${data.storeID}`;
// };
// const getStoreList = data => {
// 	return axios.post(
// 		`/mbs/v1_0_0/boss/mallBusinessLicense/queryList?id=${data.id}&storeFullName=${data.storeFullName}&shopNo=${data.shopNo}&offlineCollection=${data.offlineCollection}&bizSubjectType=${data.bizSubjectType}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
// 	);
// };
const getStoreList = data => {
	return axios.post(`/mbs/v1_0_0/boss/mallBusinessLicense/queryList`, eraseEmpty(data));
};
// 开通，更新商户比例
const addMerchantStore = data => {
	return axios.post(`/mbs/v1_0_0/boss/mallBusinessLicense/update`, eraseEmpty(data));
};
//  查询某个商户
const getDetail = data => {
	return axios.post(`/mbs/v1_0_0/boss/mallBusinessLicense/getDetail?tenantId=${data.tenantId}&id=${data.id}`);
};

// 获取二维码
const getCodeUrl = data => {
	return axios.post(`/mbs/v1_0_0/boss/mallBusinessLicense/createOfflineCode`, eraseEmpty(data));
};

// 交易流水
// const getFlowList = data => {
// 	return axios.post(
// 		`/mbs/v2_0_0/offlineOrder/queryList?orderNo=${data.orderNo}&merchantName=${data.merchantName}&successStartTime=${data.successStartTime}&successEndTime=${data.successEndTime}`,
// 	);
// };
// 交易流水
const getFlowList = data => {
	return axios.post(
		`/mbs/v2_0_0/offlineOrder/queryList?tenantId=${data.tenantId}&tenantName=${data.tenantName}&startTime=${data.startTime}&endTime=${data.endTime}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
	);
};

// 导出流水
const downLoadList = data => {
	return axios.get(
		`/mbs/v2_0_0/offlineOrder/easyExport?merchantName=${data.merchantName}&orderNo=${data.orderNo}&successEndTime=${data.successEndTime}&successStartTime=${data.successStartTime}`,
	);
};
export default {
	getStoreList,
	getFlowList,
	addMerchantStore,
	getCodeUrl,
	downLoadList,
	getDetail,
};
