import axios from 'axios';
import { eraseEmpty } from '../utils'; // 表单内容用它在提交时去空格也可以

// 查询模板列表
const getTplList = () => {
	return `mbs/v2_0_0/act/tpl/list?`;
};

// 获取触发型活动列表
const getOprTriggerActList = data => {
	return `mbs/v2_0_0/oprTriggerAct/list?id=${data.id}&status=${data.status}&name=${data.name}&startTime=${data.startTime}&endTime=${data.endTime}&actStartTime=${data.actStartTime}&actEndTime=${data.actEndTime}`;
};

// 添加触发型活动接口
const addOprTriggerAct = params => {
	return axios.post(`mbs/v2_0_0/oprTriggerAct/add`, params);
};
// 添加报名型活动接口
const addSignupAct = params => {
	return axios.post(`mbs/v2_0_0/signupAct/add`, eraseEmpty(params));
};

// 修改触发型活动接口
const uploadOprTriggerAct = params => {
	return axios.post(`mbs/v2_0_0/oprTriggerAct/upload`, params);
};

// 查看触发型详情
const selectOprTriggerAct = id => {
	return axios.get(`mbs/v2_0_0/oprTriggerAct/select?id=${id}`);
};

// 优惠券发行申请列表(不分页)
const getOprProdPubApply = params => {
	return axios.post(`mbs/v2_0_0/oprProdPubApply/list`);
};

// 优惠券发行申请列表(分页)
const getOprProdPubApplyList = data => {
	return axios.get(`mbs/v2_0_0/oprProdPubApply/selectList?pageSize=${data.pageSize}&pageNum=${data.pageNum}`);
};

// 优惠券发行申请列表(分页)-筛选已过期
const getOprProdPubUsableList = data => {
	return axios.get(`mbs/v2_0_0/oprProdPubApply/usableList?pageSize=${data.pageSize}&pageNum=${data.pageNum}`);
};

// 获取触发型活动记录列表
const getSelectList = data => {
	return `mbs/v2_0_0/act/log/selectList?activityId=${data.activityId}&actStatus=${data.actStatus}&activityName=${data.activityName}&templateType=1&startTime=${data.startTime}&endTime=${data.endTime}`;
};

// 获取报名型活动列表
const getSignupActList = data => {
	return `mbs/v2_0_0/signupAct/selectList?id=${data.id}&actStatus=${data.actStatus}&templateId=${data.templateId}&startTime=${data.startTime}&endTime=${data.endTime}&actStartTime=${data.actStartTime}&actEndTime=${data.actEndTime}`;
};

// 获取报名型活动记录列表
const getActSelectList = data => {
	return `mbs/v2_0_0/act/log/selectList?activityId=${data.activityId}&actStatus=${data.actStatus}&activityName=${data.activityName}&templateType=3&startTime=${data.startTime}&endTime=${data.endTime}`;
};

// 获取报名型活动详情
const getSignUpDetails = id => {
	return axios.post(`mbs/v2_0_0/signupAct/getDetail?id=${id}`);
};
// 修改触发型活动接口
const updateSignupAct = params => {
	return axios.post(`mbs/v2_0_0/signupAct/update`, eraseEmpty(params));
};

// 触发型活动上下架
const oprTriggerActGrounding = params => {
	return axios.post(`mbs/v2_0_0/oprTriggerAct/grounding?id=${params.id}&status=${params.status}`);
};
// 报名型活动上下架
const AcginpstuStatus = params => {
	return axios.post(`mbs/v2_0_0/signupAct/update/status?id=${params.id}&actStatus=${params.status}`);
};

// 获取数字优惠券产品列表，只获取上架状态，并且是平台发布的数字优惠券(只给 优惠券发行阶段里面的 sectionTable 组件用)
const getDigitalProductListForCouponIssueForm = data => {
	return axios.get(`mbs/v2_0_0/oprDigitalProd/useAbleList?pageSize=${data.pageSize}&pageNum=${data.pageNum}`);
};
// 优惠券!!!发行!!!记录
const getCouponIssueList = (name, id, number, ranger) => {
	return `mbs/v2_0_0/property/charge/list?name=${name}&id=${id}&number=${number}&ranger=${ranger}`;
};

// 优惠券!!!发放!!!记录
const getCouponIssueRecordList = (name, id, couponNo, transactionNo, orderNo) => {
	return `mbs/v2_0_0/property/charge/list?name=${name}&id=${id}&couponNo=${couponNo}&transactionNo=${transactionNo}&orderNo=${orderNo}`;
};

// 查看适用店铺
const getSuitStoreList = (name, id) => {
	return `mbs/v2_0_0/suitStore/list?tenantName=${name}&tenantId=${id}`;
};

// 数字优惠券详情
const getDigitalProductDetail = id => {
	return axios.get(`/property/message/sendChargeBill?chargeId=${id}`);
};

// 新建数字优惠券
const addDigitalProduct = params => {
	return axios.get(`/property/message/sendChargeBill`, eraseEmpty(params));
};

// 更改数字产品状态
const changeDigitalProductStatus = id => {
	const params = {
		id,
	};
	return axios.post(`/property/message/sendChargeBill`, eraseEmpty(params));
};

export default {
	getTplList,
	getOprTriggerActList,
	addOprTriggerAct,
	getOprProdPubApply,
	getSelectList,
	uploadOprTriggerAct,
	selectOprTriggerAct,
	getSignupActList,
	getActSelectList,
	getDigitalProductListForCouponIssueForm,
	getSuitStoreList,
	getCouponIssueList,
	getCouponIssueRecordList,
	//
	getDigitalProductDetail,
	addDigitalProduct,
	changeDigitalProductStatus,

	addSignupAct,
	getSignUpDetails,
	updateSignupAct,
	oprTriggerActGrounding,
	AcginpstuStatus,
	getOprProdPubApplyList,
	getOprProdPubUsableList,
};
