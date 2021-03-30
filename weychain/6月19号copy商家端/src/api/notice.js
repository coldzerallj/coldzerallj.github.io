import request from '@/common/request.js';
// 系统消息通知 列表数据
export function Notice() {
	return request.globalRequest('notify/message/list', 'GET');
}
// 系统消息通知-轮询未读通知接口

export function UnreadFlag() {
	return request.globalRequest('notify/message/unreadFlag', 'GET');
}
