import axios from 'axios';
import { eraseEmpty } from '../utils'; // 表单内容用它在提交时去空格也可以

// 获取店铺列表
// const getStoreList = data => {
// 	return axios.post(`/mbs/v1_0_0/boss/mallBusinessLicense/queryList`, eraseEmpty(data));
// };
const getStoreList = data => {
	return axios.post(`/mbs/v1_0_0/boss/mallBusinessLicense/queryStoreList`, eraseEmpty(data));
};

// 获取店铺对应的商品列表
const getProductList = data => {
	return axios.post(`/mbs/v2_0_0/goods/productList`, eraseEmpty(data));
};
// 新增精选商品卡片
const goodsManagementAdd = data => {
	return axios.post(`/mbs/v2_0_0/choiceGoodsManagement/add`, eraseEmpty(data));
};
// 获取卡片详情
const goodsManagementDetails = data => {
	return axios.post(`/mbs/v2_0_0/choiceGoodsManagement/detail?id=${data.id}`);
};
// 编辑卡片详情
const goodsManagementUpdate = data => {
	return axios.post(`/mbs/v2_0_0/choiceGoodsManagement/update`, eraseEmpty(data));
};
export default {
	goodsManagementAdd,
	getStoreList,
	getProductList,
	goodsManagementDetails,
	goodsManagementUpdate,
};
