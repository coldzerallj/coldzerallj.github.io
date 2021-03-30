<template>
	<view class="module-login">
		<view class="login-top">
			<img src="../../../static/img/logo.jpg" alt="logo" />
			<p>东市优鲜商户端</p>
		</view>
		<view class="login-password">
			<view class="uni-form-item">
				<!-- <text class="iconfont iconshouji"></text> -->
				<input class="uni-input" type="number" placeholder="请输入正确的手机号码" v-model="phone" />
			</view>
			<view class="uni-form-item">
				<!-- <text class="iconfont iconduanxin"></text> -->
				<input class="uni-input" type="text" placeholder="请输入短信校验码" v-model="code" />

				<sendCode :phone="phone" :disabled="codeDisabled"></sendCode>
			</view>
			<view class="module-button">
				<button type="main" @tap="handleLogin" :class="{ disclick: btnClick }">登录</button>
				<p class="text-login">未注册的手机号将自动注册并登录</p>
			</view>
		</view>
		<!-- footer 登录注册代表同意用户协议，隐私政策 -->
		<view class="login-footer"> 登录注册代表同意<span>用户协议</span>，<span>隐私政策</span> </view>
	</view>
</template>

<script>
import sendCode from '@/pages/components/send-code/send-code.vue';
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
		};
	},
	// onLoad: function (options) {
	// 	// console.log('optionsoptionsoptions', options);
	// 	if (options.userIdCode) {
	// 		this.userIdCode = options.userIdCode;
	// 	}
	// },
	created() {
		this.userIdCode = uni.getStorageSync('userIdCode');
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
				title: '登录中...',
				mask: true,
			});
			const postData = {
				phone: this.phone,
				verifyCode: this.code,
				userIdCode: this.userIdCode,
				userType: '1',
			};
			this.$store
				.dispatch('user/PhoneLogin', postData)
				.then((loginStatus) => {
					uni.hideLoading();
					if (loginStatus.code === 200) {
						uni.setStorageSync('status', '1');
						uni.navigateBack();
						// uni.navigateTo({
						// 	url:
						// 		'/pages/user/identity-confirm/index?userIdCode=' +
						// 		this.userIdCode,
						// });
					} else {
						uni.showToast({
							title: loginStatus.message,
							duration: 1500,
						});
					}
				})
				.catch((err) => {
					uni.hideLoading();
					uni.showToast({
						title: err.message,
						duration: 1500,
					});
				});
		},
	},
};
</script>

<style lang="scss">
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
	padding-top: 94rpx;
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
