import axios from 'axios';
// import { eraseEmpty } from '../utils'; // 表单内容用它在提交时去空格也可以

//  精选商品管理列表
const choiceGoodsManagement = data => {
	return axios.post(`/mbs/v2_0_0/choiceGoodsManagement/list?cardNo=${data.cardNo}&name=${data.name}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`);
};
//  更新启用状态
const choiceUpdateEnable = data => {
	return axios.post(`/mbs/v2_0_0/choiceGoodsManagement/updateEnable?id=${data.id}&enable=${data.enable}`);
};
//  删除卡片
const choiceDelete = data => {
	return axios.post(`/mbs/v2_0_0/choiceGoodsManagement/delete?id=${data.id}`);
};

//  添加消息
const addMallNotice = data => {
	return axios.post(`/mbs/v2_0_0/mallNoticeManagement/add`, data);
};
//  删除消息
const deleteMallNotice = data => {
	return axios.post(`/mbs/v2_0_0/mallNoticeManagement/delete?id=${data.id}`);
};
//  查询消息推送管理
const selectListMallNotice = data => {
	return axios.get(
		`/mbs/v2_0_0/mallNoticeManagement/selectList?messageNo=${data.messageNo}&title=${data.title}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
	);
};
//  编辑消息
const updateMallNotice = data => {
	return axios.post(`/mbs/v2_0_0/mallNoticeManagement/update`, data);
};
export default {
	choiceGoodsManagement,
	choiceUpdateEnable,
	choiceDelete,

	addMallNotice,
	deleteMallNotice,
	selectListMallNotice,
	updateMallNotice,
};
