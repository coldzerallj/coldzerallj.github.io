<template>
	<view class="container page-password-modify">
		<view class="module-form">
			<view class="uni-form-item">
				<view class="title">旧密码：</view>
				<input class="uni-input" placeholder="请输入旧密码" />
			</view>
			<view class="uni-form-item">
				<view class="title">新密码：</view>
				<input
					class="uni-input"
					placeholder="请输入新密码(6至24位数字或字母)"
				/>
			</view>
			<view class="uni-form-item">
				<view class="title">确认密码：</view>
				<input class="uni-input" placeholder="请再次输入密码" />
			</view>
		</view>
		<view class="module-button">
			<button type="main" class="button-save">完成</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {},
};
</script>

<style lang="scss">
.uni-form-item {
	background: #fff;
	padding: $uni-spacing-sm 0;
	border-bottom: 1px solid #eee;
	.title {
		width: 140rpx;
		padding: 20rpx 16rpx;
	}

	.uni-input {
		padding: 14rpx;
	}
	.iconjiantou {
		width: 80rpx;
		line-height: 80rpx;
		color: #777;
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
</style>
