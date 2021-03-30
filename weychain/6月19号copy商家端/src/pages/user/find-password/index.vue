<template>
	<view class="module-find-password">
		<view>
			<view class="uni-form-item">
				<text class="iconfont iconshouji"></text>
				<input
					class="uni-input"
					type="text"
					placeholder="请输入手机号"
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
			<view class="uni-form-item">
				<text class="iconfont iconmima"></text>
				<input
					class="uni-input"
					placeholder="请输入新的登录密码"
					:password="hidePassword"
				/>
				<switch
					color="#1ABC9C"
					style="transform: scale(0.8);"
					@change="changePassword"
				/>
			</view>
			<view class="block-action">
				<!-- <navigator url="../index/index">已阅读并同意<text><<用户服务协议>></text></navigator> -->
			</view>
		</view>
		<view class="module-button"><button type="primary">确认</button></view>
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
			hidePassword: true,
		};
	},
	onLoad(options) {},
	methods: {
		changePassword: function () {
			this.hidePassword = !this.hidePassword;
		},
	},
};
</script>

<style lang="scss">
.module-find-password {
	padding: 52rpx;

	.block-action {
		color: $ds-main-color;
	}

	.block-register {
		padding: 32rpx 0 0;
		text-align: center;
		color: $ds-main-color;
	}

	.module-button {
		padding: 50rpx 0 0;
	}

	.module-button button {
		background: $ds-main-color;
		border-radius: 60rpx;
	}
	.uni-form-item {
		background: none;
		border-radius: 3px;
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
}
</style>
