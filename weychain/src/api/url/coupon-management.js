import axios from 'axios';
import { eraseEmpty } from '../utils'; // 表单内容用它在提交时去空格也可以
import { DIGITAL_PRODUCT_ON_SHELF, ORGANIZATION_TYPE_PLATFORM } from '@/helper/const';

// 获取数字优惠券产品列表
const getDigitalProductList = (id, status, pubOrgType, pageNum, pageSize) => {
	return axios.get(`mbs/v2_0_0/oprDigitalProd/list?id=${id}&status=${status}&pubOrgType=${pubOrgType}&pageNum=${pageNum}&pageSize=${pageSize}`);
};

// 获取数字优惠券产品列表，只获取上架状态，并且是平台发布的数字优惠券(只给 优惠券发行阶段里面的 sectionTable 组件用)
const getDigitalProductListForCouponIssueForm = () => {
	return `mbs/v2_0_0/oprDigitalProd/list?id=&status=${DIGITAL_PRODUCT_ON_SHELF}&pubOrgType=${ORGANIZATION_TYPE_PLATFORM}`;
};

// 优惠券!!!发行!!!记录
const getCouponIssueList = (productName, productId, applyNo, startPublishTime, endPublishTime) => {
	return `mbs/v2_0_0/oprProdPubApply/selectList?productName=${productName}&productId=${productId}&applyNo=${applyNo}&startPublishTime=${startPublishTime}&endPublishTime=${endPublishTime}`;
};

// 优惠券!!!发放!!!记录
const getCouponIssueRecordList = (productName, productId, productCode, tradeNo, orderNo, pageNum, pageSize) => {
	return axios.get(
		`mbs/v2_0_0/oprDigitalProdGrant/selectList?productName=${productName}&productId=${productId}&productCode=${productCode}&tradeNo=${tradeNo}&orderNo=${orderNo}&pageNum=${pageNum}&pageSize=${pageSize}`,
	);
};

// 更改数字产品状态
const changeDigitalProductStatus = id => {
	return axios.post(`mbs/v2_0_0/oprDigitalProd/grounding?id=${id}`);
};

// 新建数字优惠券
const addDigitalProduct = params => {
	return axios.post(`mbs/v2_0_0/oprDigitalProd/add`, eraseEmpty(params));
};

// 查看适用店铺
const getSuitStoreList = (productId, name, id, pageNum, pageSize) => {
	return axios.get(`mbs/v2_0_0/suitStore/list?productId=${productId}&tenantName=${name}&tenantId=${id}&pageNum=${pageNum}&pageSize=${pageSize}`);
};

// 数字优惠券详情
const getDigitalProductDetail = id => {
	return axios.get(`mbs/v2_0_0/oprDigitalProd/select?id=${id}`);
};

// 数字优惠券详情
const updateDigitalProductDetail = params => {
	return axios.post(`mbs/v2_0_0/oprDigitalProd/upload`, eraseEmpty(params));
};

// 获取优惠券交易流水
const getTradeAccount = data => {
	return `mbs/v2_0_0/tradeAccount/page?productType=${data.productType}&tradeStartTime=${data.tradeStartTime}&tradeEndTime=${data.tradeEndTime}&tradeNo=${data.tradeNo}&orderNo=${data.orderNo}&tradeType=${data.tradeType}&tradeSubType=${data.tradeSubType}&tradeState=${data.tradeState}&payeeId=${data.payeeId}&payerId=${data.payerId}&productCode=${data.productCode}`;
};

// 新建优惠券发行申请
const addCouponIssue = params => {
	return axios.post(`mbs/v2_0_0/oprProdPubApply/add`, eraseEmpty(params));
};

// 适用商家列表（设置优惠券黑名单用）
const suitStoreQueryList = (storeFullName, tenantId, pageNum, pageSize) => {
	return axios.get(`mbs/v2_0_0/suitStore/queryList?storeFullName=${storeFullName}&tenantId=${tenantId}&pageNum=${pageNum}&pageSize=${pageSize}`);
};

// 优惠券核销记录
const oprDigitalProdSettlementQueryList = data => {
	return `mbs/v2_0_0/oprDigitalProdSettlement/queryList?settleTimeStart=${data.startTime}&settleTimeEnd=${data.endTime}&tradeNo=${data.tradeNo}&orderNo=${data.orderNo}&productCode=${data.productNo}&productId=${data.productId}&settleState=${data.settFeeSattus}&pubOrgName=${data.issueOrgName}&pubOrgId=${data.issueOrgId}&storeId=${data.storeId}&storeName=${data.storeName}`;
};

export default {
	getDigitalProductList,
	getDigitalProductListForCouponIssueForm,
	getSuitStoreList,
	getCouponIssueList,
	getCouponIssueRecordList,
	changeDigitalProductStatus,
	addDigitalProduct,
	getDigitalProductDetail,
	updateDigitalProductDetail,
	getTradeAccount,
	addCouponIssue,
	suitStoreQueryList,
	oprDigitalProdSettlementQueryList,
};
