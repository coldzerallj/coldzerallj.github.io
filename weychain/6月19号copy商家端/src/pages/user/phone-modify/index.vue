<template>
	<view class="module-login">
		<view class="login-password" :class="{ 'next-step': !step }">
			<view class="uni-form-item">
				<!-- <text class="iconfont iconshouji"></text> -->
				<input class="uni-input" type="number" :placeholder="placeholderPhone" v-model="phone" />
			</view>
			<view class="uni-form-item">
				<!-- <text class="iconfont iconduanxin"></text> -->
				<input class="uni-input" type="text" placeholder="请输入验证码" v-model="code" />

				<sendCode ref="sendCode" :codeType="codeType" :phone="phone" :disabled="codeDisabled"></sendCode>
			</view>
			<view class="module-button">
				<button type="main" @tap="handleLogin" :class="{ disclick: btnClick }">下一步</button>
				<!-- <p class="text-login">未注册的手机号将自动注册并登录</p> -->
			</view>
		</view>
	</view>
</template>

<script>
import sendCode from '@/pages/components/send-code/send-code.vue';
import { VerifiedUpdatePhoneCode, ChangePhone, loginAgain } from '@/api/index';

export default {
	components: {
		sendCode,
	},
	data() {
		return {
			phone: '',
			code: '',
			userIdCode: '',
			userType: '',
			codeDisabled: false,
			codeType: '2',
			placeholderPhone: '请输入原手机号',
			step: true,
		};
	},
	onLoad: function (options) {
		// console.log('optionsoptionsoptions', options);
		if (options.userIdCode) {
			this.userIdCode = options.userIdCode;
		}
	},
	computed: {
		btnClick() {
			return this.phone.length <= 0 || this.code.length <= 0;
		},
	},

	methods: {
		handleLogin() {
			const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			if (this.phone === '') {
				uni.showToast({
					title: '请输入手机号码',
					duration: 1500,
					icon: 'none',
				});
				return false;
			}
			if (!myreg.test(this.phone)) {
				uni.showToast({
					title: '请输入正确的手机号码',
					duration: 1500,
					icon: 'none',
				});
				return false;
			}
			if (this.code === '') {
				uni.showToast({
					title: '请输入验证码',
					duration: 1500,
					icon: 'none',
				});
				return false;
			}
			uni.showLoading({
				title: '修改中...',
				mask: true,
			});
			const postData = {
				phone: this.phone,
				verifyCode: this.code,
			};
			const changePhnoeData = {
				oldPhone: this.oldPhone,
				newPhone: this.phone,
				code: this.code,
			};
			if (this.codeType === '2') {
				// 解绑原手机
				this.toOldPhone(postData);
			} else {
				// 改绑新手机
				this.toNewPhone(changePhnoeData);
			}
		},
		// 解绑原手机 接口
		toOldPhone(postData) {
			const that = this;
			this.oldPhone = this.phone;
			VerifiedUpdatePhoneCode(postData)
				.then((res) => {
					uni.hideLoading();
					if (res.code === 200 && that.codeType === '2') {
						that.codeType = '3';
						that.placeholderPhone = '请输入新手机号';
						that.phone = '';
						that.code = '';
						that.$refs['sendCode'].isDisabled = false;
						that.$refs['sendCode'].clearCodeTime();
						that.step = false;
						setTimeout(() => {
							that.step = true;
						}, 1000);
					}
				})
				.catch((err) => {
					uni.hideLoading();
					uni.showToast({
						title: err.message,
						icon: 'none',
					});
				});
		},
		// 改绑新手机 接口
		toNewPhone(changePhnoeData) {
			const that = this;
			ChangePhone(changePhnoeData)
				.then((res) => {
					uni.hideLoading();
					uni.showToast({
						title: res.message,
						duration: 1500,
					});
					if (res.code === 200 && that.codeType === '3') {
						that.$refs['sendCode'].isDisabled = false;
						that.$refs['sendCode'].clearCodeTime();
						setTimeout(() => {
							loginAgain();
							uni.navigateBack();
						}, 1500);
					}
				})
				.catch((err) => {
					uni.hideLoading();
					uni.showToast({
						title: err.message,
						icon: 'none',
					});
				});
		},
	},
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}
.module-login {
	padding: 110rpx 48rpx;
}
.login-top {
	text-align: center;
	font-size: 0;
}
.login-top img {
	width: 160rpx;
	height: 160rpx;
	border-radius: 8px;
}
.login-top p {
	font-size: 36rpx;
	font-weight: 400;
	color: rgba(37, 37, 37, 1);
	line-height: 44rpx;
	margin-top: 24rpx;
}
.login-password {
	position: relative;
	padding-top: 94rpx;
	transition: all 1s;

	.uni-form-item {
		background: none;
		align-items: center;
		@include borderCreator('bottom', solid, #ddd);
	}

	.uni-input {
		font-size: $uni-font-size-lg;
		background: none;
	}

	.iconyanjing {
		padding: 0 20rpx;
		font-size: 46rpx;
		color: grey;
	}

	.iconyanjing.uni-eye-active {
		color: #ffc104;
	}

	.block-action {
		padding: $uni-spacing-base 0 0;
		color: $ds-main-color;
	}
	.module-button {
		padding: 96rpx 0 0;
	}

	.module-button button {
		border-radius: $uni-border-radius-lg60;
	}
	.module-button .text-login {
		font-size: 24rpx;
		line-height: 52rpx;
		color: rgba(97, 107, 128, 1);
		text-align: center;
	}
}
.next-step {
	opacity: 0;
	transform: translateX(100vw);
}
.login-footer {
	position: fixed;
	bottom: 40rpx;
	left: 0;
	width: 100%;
	height: 52rpx;
	font-size: 24rpx;
	color: rgba(201, 206, 214, 1);
	line-height: 52rpx;
	text-align: center;
}
.login-footer span {
	color: #12cb8e;
	cursor: pointer;
}
</style>
