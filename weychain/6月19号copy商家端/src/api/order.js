import request from '@/common/request.js';

// 订单列表
const getOrderList = (data) => {
	return request.globalRequest('store/order/list', 'GET', data);
};
// 订单详情
const orderDetails = (data) => {
	return request.globalRequest('store/order/orderDetails', 'GET', data);
};
// 接单拒单
const orderActionAwait = (data) => {
	return request.globalRequest('store/order/action/await', 'GET', data);
};

// 确认出货,备货完成
const confirmShipment = (data) => {
	return request.globalRequest('store/order/confirmShipment', 'POST', data, 2);
};
// 配送商品
const goodsDelivery = (data) => {
	return request.globalRequest('store/order/goodsDelivery', 'POST', data, 2);
};
// 商家退款
const refund = (data) => {
	return request.globalRequest('store/order/refund', 'POST', data, 2);
};

export default {
	getOrderList,
	orderDetails,
	orderActionAwait,
	confirmShipment,
	goodsDelivery,
	refund,
};
