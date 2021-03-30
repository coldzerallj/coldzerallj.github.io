<template>
	<view class="login-password">
		<view class="uni-form-item">
			<text class="iconfont iconwode"></text>
			<input
				v-model="name"
				class="uni-input"
				type="text"
				placeholder="请输入用户名/手机号"
			/>
		</view>
		<view class="uni-form-item">
			<text class="iconfont iconmima"></text>
			<input
				v-model="password"
				class="uni-input"
				placeholder="请输入登录密码"
				:password="hidePassword"
			/>
			<switch
				color="#1ABC9C"
				style="transform: scale(0.8);"
				@change="changePassword"
			/>
		</view>
		<view class="block-action" style="text-align: right;">
			<navigator url="../find-password/index">忘记密码</navigator>
		</view>
		<view class="module-button">
			<button type="main" @tap="handleLogin">登录</button>
		</view>
	</view>
</template>
<script>
// import { LoginPassword } from '@/api/index.js';
export default {
	data() {
		return {
			name: '',
			password: '',
			hidePassword: true,
		};
	},
	methods: {
		// 切换密码显示
		changePassword() {
			this.hidePassword = !this.hidePassword;
		},
		handleLogin() {
			if (this.name === '') {
				uni.showToast({
					title: '请输入用户名/手机号',
					duration: 1500,
					icon: 'none',
				});
				return false;
			}
			if (this.password === '') {
				uni.showToast({
					title: '请输入登录密码',
					duration: 1500,
					icon: 'none',
				});
				return false;
			}
			// 账号登录
			const postData = {
				mobilePhone: '',
				userName: this.name,
				password: this.password,
			};

			this.$store
				.dispatch('user/login', postData)
				.then(() => {})
				.catch((err) => {
					uni.showToast({
						title: err.data,
						duration: 1500,
					});
				});
			const data = {
				result: true,
				data: '成功',
			};
			this.$emit('loginResult', data);
		},
	},
};
</script>

<style lang="scss">
.login-password {
	.uni-form-item {
		background: none;
		align-items: center;
		@include borderCreator('bottom', solid, #ddd);
	}

	.uni-input {
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
		padding: 50rpx 0 0;
	}

	.module-button button {
		border-radius: $uni-border-radius-lg60;
	}
}
uni-switch .uni-switch-wrapper {
	display: block;
}
</style>
