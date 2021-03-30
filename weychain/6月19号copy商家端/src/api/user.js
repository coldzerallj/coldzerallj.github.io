import request from '@/common/request.js';
export function Login(data) {
	return request.globalRequest('sso/login', 'POST', data);
}
export function Logout(data) {
	return request.globalRequest('', 'POST', data);
}
export function PhoneLogin(data) {
	return request.globalRequest('sso/login', 'POST', data);
}

// 店铺信息详情接口
export function MallBusinessLicens() {
	return request.globalRequest('boss/mallBusinessLicense/selectByUseId', 'POST', '', 2);
}
// 更新店铺信息接口
export function MallBusinessLicenseUpload(data) {
	return request.globalRequest('boss/mallBusinessLicense/upload', 'POST', data);
}

// 资金账户 资金账户明细
export function AccountDetail() {
	return request.globalRequest('boss/capitalAccount/accountDetail', 'GET');
}

// 结算账户详情
export function BankAccountDetail() {
	return request.globalRequest('boss/businessBankAccount/detail', 'GET');
}

// 绑定结算账户
export function BusinessBankAccount(data) {
	return request.globalRequest('boss/businessBankAccount/add', 'POST', data);
}

// 结算账户-店铺信息
export function StoreInfo() {
	return request.globalRequest('boss/businessBankAccount/storeInfo', 'GET');
}

// 交易明细列表
export function TradeList(data) {
	return request.globalRequest('boss/capitalAccount/tradeList', 'GET', data);
}

// 提现
export function Withdraw(data) {
	return request.globalRequest('store/mallWithdraw/withdraw', 'GET', data);
}

// 提现详情
export function MallWithdraw(data) {
	return request.globalRequest('store/mallWithdraw/detail', 'GET', data);
}

// 省市区
export function Region() {
	return request.otherRequest('public/region/list', 'GET');
}

// 银行
export function GetBank() {
	return request.otherRequest('public/bank/getBank', 'GET');
}

// 银行支行
export function BankBranchList(data) {
	return request.otherRequest('public/bank/bankBranchList', 'GET', data);
}
