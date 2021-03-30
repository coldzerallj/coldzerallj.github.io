import request from '@/common/request.js';
//  运费管理-全部运费
export function mallFreightList(data) {
	return request.globalRequest('freight/mallFreight/list', 'GET', data);
}
//  运费管理-新增运费
export function mallFreightSave(data) {
	return request.globalRequest('freight/mallFreight/save', 'POST', data);
}
