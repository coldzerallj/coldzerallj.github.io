<template>
	<view class="login-password">
		<view class="uni-form-item">
			<text class="iconfont iconshouji"></text>
			<input
				class="uni-input"
				type="number"
				placeholder="输入手机号"
				v-model="phone"
			/>
		</view>
		<view class="uni-form-item">
			<text class="iconfont iconduanxin"></text>
			<input
				class="uni-input"
				type="text"
				placeholder="短信验证码"
				v-model="code"
			/>

			<sendCode :phone="phone" :disabled="codeDisabled"></sendCode>
		</view>
		<view class="block-action">
			未注册的手机号将自动注册
			<navigator url="../find-password/index" style="float: right;">
				忘记密码
			</navigator>
		</view>
		<view class="module-button">
			<button type="main" @tap="handleLogin">登录</button>
		</view>
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
			codeDisabled: false,
		};
	},
	methods: {
		handleLogin() {
			const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			if (!myreg.test(this.phone)) {
				uni.showToast({
					title: '请输入有效的手机号码',
					duration: 1500,
					icon: 'none',
				});
				return false;
			}
			if (this.code === '') {
				uni.showToast({
					title: '请输入短信验证码',
					duration: 1500,
					icon: 'none',
				});
				return false;
			}

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
</style>
