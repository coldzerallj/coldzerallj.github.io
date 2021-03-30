<template>
	<view class="container page-phone-modify">
		<view class="module-step">
			<view class="item active">1.验证原号码</view>
			<view class="item" :class="{ active: isNewPhone == true }">
				2.绑定新手机
			</view>
		</view>
		<view class="module-form">
			<view class="uni-form-item">
				<view v-if="isNewPhone == false" class="uni-input">{{ phone }}</view>
				<input v-if="isNewPhone == true" class="uni-input" type="text" placeholder="请输入新手机号" v-model="phone" />
				<sendCode :phone="phone" :disabled="codeDisabled"></sendCode>
			</view>
			<view class="uni-form-item">
				<input class="uni-input" type="text" placeholder="请输入验证码" v-model="code" />
			</view>
		</view>
		<view class="module-button">
			<button v-if="isNewPhone == false" type="main" class="button-save" @tap="handleNext">
				下一步
			</button>
			<button v-if="isNewPhone == true" type="main" class="button-save" @tap="handleConfirm">
				完成
			</button>
		</view>

		<view class="phone-tips">
			<view> 温馨提示：</view>
			手机号码修改成功后需要使用新的手机号码进行登录。
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
			phone: '13789855114',
			code: '',
			codeDisabled: false,
			isNewPhone: false,
			timer: null,
		};
	},
	onLoad() {},
	methods: {
		// 验证原手机号码
		handleNext() {
			this.phone = '';
			this.code = '';
			this.codeDisabled = true;
			this.isNewPhone = true;
		},
		// 验证新手机号码
		handleConfirm() {},
	},
};
</script>

<style lang="scss">
page,
.page-phone-modify {
	background: #f5f5f5;
}

.module-step {
	display: flex;

	.item {
		background: #fff;
		width: 50%;
		padding: 16rpx 0;
		text-align: center;
		font-size: $uni-font-size-sm;
		color: #999;
		&.active {
			background: none;
			color: $uni-text-price;
		}
	}
}

.module-form {
	background: #fff;
	padding: 0 28rpx;
	border-bottom: 1px solid #eee;

	.uni-form-item {
		background: none;
		border-radius: 3px;
		align-items: center;
		border-bottom: 1px solid #eee;

		&:last-child {
			border-bottom: none;
		}
	}

	.uni-input {
		padding: 22rpx 0;
		background: none;
	}
}

.module-button {
	padding: 40rpx 80rpx;

	.button-save {
		padding: 2rpx 20rpx;
		border-radius: 28px;
		font-size: 32rpx;
	}
}

.phone-tips {
	padding: 10rpx 28rpx 40rpx;
	font-size: 25rpx;
	color: #999;
}
</style>
