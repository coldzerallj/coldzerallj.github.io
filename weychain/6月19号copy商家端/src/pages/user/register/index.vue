<template>
	<view class="module-register">
		<view>
			<view class="uni-form-item">
				<text class="iconfont iconshouji"></text>
				<input
					class="uni-input"
					type="text"
					placeholder="请输入手机号"
					v-model="phone"
					@blur="handleCheckPhone"
				/>

				<text class="iconfont iconwancheng" v-show="isPhoneCorrect"></text>
			</view>
			<view class="uni-form-item">
				<text class="iconfont iconduanxin"></text>
				<input
					class="uni-input"
					type="text"
					placeholder="短信验证码"
					v-model="code"
				/>

				<sendCode
					:phone="phone"
					:disabled="codeDisabled"
					:phoneCorrect="isPhoneCorrect"
				></sendCode>
			</view>
			<view class="uni-form-item">
				<text class="iconfont iconmima"></text>
				<input
					class="uni-input"
					placeholder="设置登录密码"
					:password="hidePassword"
				/>
				<switch
					color="#1ABC9C"
					style="transform: scale(0.8);"
					@change="changePassword"
				/>
			</view>
			<view class="block-action">
				<label>
					<checkbox class="block-checkbox" :checked="isAgree" />
					已阅读并同意
				</label>
				《
				<text class="text" @tap="handleCheck">用户服务协议</text>
				》
			</view>
		</view>
		<view class="module-button">
			<button type="primary" @tap="handleSure">确认</button>
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
			isPhoneCorrect: false,
			isAgree: false,
			phone: '',
			code: '',
			codeDisabled: false,
			hidePassword: true,
		};
	},
	onLoad(options) {},
	methods: {
		handleCheckPhone() {
			const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			if (!myreg.test(this.phone)) {
				uni.showToast({
					title: '请输入有效的手机号码',
					duration: 1000,
					icon: 'none',
				});
				this.isPhoneCorrect = false;
			} else {
				this.isPhoneCorrect = true;
			}
		},
		changePassword() {
			this.hidePassword = !this.hidePassword;
		},
		handleSure() {
			if (this.phone === '') {
				uni.showToast({
					title: '请输入手机号',
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
		},
	},
};
</script>

<style lang="scss">
.module-register {
	padding: 52rpx;

	.block-action {
		padding: $uni-spacing-base 0 0;
		color: $uni-text-color-grey;
		line-height: 40rpx;
		.text {
			color: $ds-main-color;
		}
	}
	.iconwancheng {
		color: $ds-main-color;
		font-size: 42rpx;
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
	.block-checkbox {
		position: relative;
		top: -1px;
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
