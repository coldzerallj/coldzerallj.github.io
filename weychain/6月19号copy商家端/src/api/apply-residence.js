import request from '@/common/request.js';

// 入驻资料详情-商家信息
export function mallBusinessInfo(data) {
	return request.globalRequest('boss/mallBusinessLicense/findInfo', 'POST', data, 2);
}
// 入驻资料详情-经营者信息
export function managerInfo(data) {
	return request.globalRequest('boss/manager/findInfo', 'POST', data, 2);
}
// 入驻资料-经营品类
export function bizCategory() {
	return request.globalRequest('boss/category/allBizCategoryList', 'POST', 2);
}
// 入驻资料-入驻申请
export function mallBusinessLicenseEenter(data) {
	return request.globalRequest('boss/mallBusinessLicense/enter', 'POST', data);
}
//  铺位号查找
export function getAreaList(data) {
	return request.globalRequest('property/area/getAreaList', 'GET', data);
}
