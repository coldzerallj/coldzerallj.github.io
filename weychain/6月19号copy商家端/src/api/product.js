import request from '@/common/request.js';
import { eraseEmpty } from './utils';

// 拿产品类别列表
const getProductTypeList = (data) => {
	return request.globalRequest(`goods/type/list?tenantId=${data}`, 'GET');
};

// 添加商品
const addProduct = (data) => {
	return request.globalRequest(`goods/add`, 'POST', eraseEmpty(data));
};

// 更新商品
const updateProduct = (data) => {
	return request.globalRequest(`goods/update`, 'POST', eraseEmpty(data));
};

// 拿商品详情
const getProduct = (subjectId) => {
	return request.globalRequest(`/goods/getProduct?subjectId=${subjectId}`, 'GET');
};

// 拿单位列表
const getUnitList = (type) => {
	return request.globalRequest(`common/unit/list?type=${type}`, 'GET');
};

// 拿商家商品列表 onSale 1 在售 0 待上架
const getProducts = (type, search, onSale) => {
	return request.globalRequest(`goods/list?type=${type}&search=${search}&onSale=${onSale}`, 'GET');
};

// 单个 / 批量上下架
const changeSaleStatus = (data) => {
	return request.globalRequest(`goods/changeSaleStatus`, 'POST', data);
};

// 单个 / 批量删除
const productDel = (arr) => {
	return request.globalRequest(`goods/delete`, 'POST', arr);
};

// 单个删除商品类别
const categoryDel = (data) => {
	return request.globalRequest(`goods/type/deleteGoodsType`, 'POST', data, 2);
};

// 添加商品类别
const categoryAdd = (data) => {
	return request.globalRequest(`goods/type/addGoodsType`, 'POST', eraseEmpty(data));
};

// 修改商品类别
const categoryModify = (data) => {
	return request.globalRequest(`goods/type/updateGoodsType`, 'POST', eraseEmpty(data));
};

export default {
	getProductTypeList,
	addProduct,
	updateProduct,
	getUnitList,
	getProduct,
	getProducts,
	changeSaleStatus,
	productDel,
	categoryDel,
	categoryAdd,
	categoryModify,
};
