/* eslint-disable no-undef */
import request from '@/common/request.js';
import store from '@/store';
//  登录获取验证码
export function GetPhoneCode(data) {
	return request.globalRequest('sso/send_verify_code', 'GET', data);
}
//  旧手机解绑获取验证码
export function SendUpdateOldPhoneCode(data) {
	return request.globalRequest('sms/test/sendUpdateOldPhoneCode', 'GET', data);
}
//  新手机解绑获取验证码
export function SendUpdatePhoneCode(data) {
	return request.globalRequest('sms/test/sendUpdatePhoneCode', 'GET', data);
}
//  解绑原手机
export function VerifiedUpdatePhoneCode(data) {
	return request.globalRequest('sms/test/verifiedUpdatePhoneCode', 'POST', data, 2);
}
//  改绑新手机
export function ChangePhone(data) {
	return request.globalRequest('boss/mallBusinessLicense/changePhone', 'POST', data, 2);
}
//  获取sessionkey
export function GetSessionKey(code) {
	return request.globalRequest('sso/wechat', 'GET', code);
}
//  商家认证
export function MallBusinessLicense(data) {
	return request.globalRequest('boss/mallBusinessLicense/verify', 'POST', data);
}
//  获取用户信息
export function UserInformation() {
	return request.globalRequest('/user/companyUser/getLoginUser', 'GET');
}
//  销售前十商品
export function getSaleGoods(data) {
	return request.globalRequest('store/order/getSaleGoods', 'GET', data);
}
//  每日销售金额
export function getSaleAccount(data) {
	return request.globalRequest('store/order/getSaleAccount', 'GET', data);
}

//  获取店铺入驻状态
export function SettleInStatus() {
	return request.globalRequest('boss/mallBusinessLicense/applyProgress', 'GET');
}
//  重新登陆
export function loginAgain() {
	uni.showLoading({
		title: '登陆中...',
		mask: true,
	});
	uni.login({
		success: (loginCode) => {
			// console.log('loginCode', loginCode);
			const loginData = {
				code: loginCode.code,
				userType: '1',
			};
			GetSessionKey(loginData)
				.then((loginStatus) => {
					// console.log('loginStatus', loginStatus);
					const { userIdCode, status, token } = loginStatus.data;
					store.commit('user/X_TOKEN', token);
					uni.setStorageSync('status', status);
					uni.setStorageSync('userIdCode', userIdCode);
					uni.hideLoading();
					switch (status) {
						case '0':
							// 手机登陆
							store.dispatch('user/applyProgress', { applyStatus: 1 });
							uni.navigateTo({
								url: '/pages/user/new-login/index?userIdCode=' + userIdCode,
							});
							break;
						case '1':
							//  资料齐全 申请入驻
							store.dispatch('user/applyProgress', { applyStatus: 1 });
							uni.navigateTo({
								url: '/pages/user/my-shop/index',
							});
							break;
						case '2':
							//  未完成入驻
							SettleInStatus().then((res) => {
								const { data } = res;
								// 入驻状态 1、未入驻；2、运营平台待审核；3、运营平台审核不通过；
								// 4、支付平台待审核；5、支付平台审核不通过；6、待账户验证；7、待签约；8、正常运营
								if (res.code === 200) {
									store.dispatch('user/applyProgress', data);
									uni.navigateTo({
										url: '/pages/user/my-shop/index',
									});
								}
							});
							break;
						case '3':
							//  已登录
							store.dispatch('user/applyProgress', { applyStatus: 9 });
							UserInformation().then((res) => {
								const { data } = res;
								store.commit('user/TENANT_ID', data.tenantId);
								store.dispatch('user/USER_INFO', data);
							});
							// eslint-disable-next-line no-case-declarations
							const page = getCurrentPages().pop();
							if (page === undefined || page === null) return;
							// 调用实例的onShow,onLoad方法重新加载数据;
							page.onShow();
							page.onLoad();
							break;
					}
				})
				.catch((err) => {
					uni.showToast({
						title: err.message,
						duration: 1500,
					});
				});
		},
	});
}
