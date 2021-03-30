import axios from 'axios';
import { eraseEmpty } from '../utils'; // 表单内容用它在提交时去空格也可以

// 获取广告位列表
const oprAdPlacementList = data => {
	return axios.get(`/mbs/v2_0_0/oprAdPlacement/queryList?pageSize=${data.pageSize}&pageNum=${data.pageNum}`);
};
// 编辑广告位
const oprAdvertisingUpdate = data => {
	return axios.post(`/mbs/v2_0_0/oprAdPlacement/updateByEntity`, eraseEmpty(data));
};
// 上下架广告位
const oprAdPlacementUpdateStatus = data => {
	return axios.post(`/mbs/v2_0_0/oprAdPlacement/updateStatus?id=${data.id}&status=${data.status}`);
};
// 设置/查看广告列表
const oprAdvertisingList = data => {
	return axios.get(`/mbs/v2_0_0/oprAdvertising/queryList?pageSize=${data.pageSize}&pageNum=${data.pageNum}&adPlacementId=${data.adPlacementId}`);
};
// 添加广告
const oprAdvertisingAdd = data => {
	return axios.post(`/mbs/v2_0_0/oprAdvertising/add?adPlacementId=${data.adPlacementId}`, eraseEmpty(data));
};
// 编辑广告
const oprAdvertisingUpdateByEntity = data => {
	return axios.post(`/mbs/v2_0_0/oprAdvertising/updateByEntity`, data);
};
// 上下架广告
const oprAdvertisingUpdateStatus = data => {
	return axios.post(`/mbs/v2_0_0/oprAdvertising/updateStatus?id=${data.id}&status=${data.status}`);
};
// 删除广告
const oprAdvertisingDelete = data => {
	return axios.get(`/mbs/v2_0_0/oprAdvertising/delete?id=${data.id}`);
};
export default {
	oprAdPlacementList,
	oprAdvertisingUpdate,
	oprAdPlacementUpdateStatus,
	oprAdvertisingList,
	oprAdvertisingAdd,
	oprAdvertisingUpdateByEntity,
	oprAdvertisingUpdateStatus,
	oprAdvertisingDelete,
};
