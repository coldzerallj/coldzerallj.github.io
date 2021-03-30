<template>
	<view class="container page-setting">
		<view class="module">
			<!-- <navigator class="item"> -->
			<!-- <navigator class="item" url="../password-modify/index"> -->
			<!-- <span class="left-icon edit-pass"></span>修改密码
				<span class="item-rigth-tips">
					<span class="iconfont iconjiantou"></span>
				</span>
			</navigator> -->
			<navigator class="item" url="../phone-modify/index">
				<span class="left-icon rebing-phone"></span>重新绑定手机
				<span class="item-rigth-tips">
					<!-- 137****5114 -->
					<span class="iconfont iconjiantou"></span>
				</span>
			</navigator>
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
page {
	background-color: #fff;
}
.page-setting {
	.item {
		// padding: 24rpx 24rpx;
		padding-bottom: 20rpx;
		font-size: 36rpx;
		color: #616b80;
		// line-height: 40rpx;
		border-bottom: 1px solid #ebeef5;
		overflow: hidden;
	}

	.item + .item {
		margin-top: 32rpx;
	}

	.iconjiantou {
		font-size: 40rpx;
	}

	.item-rigth-tips {
		color: #999;
		float: right;
	}
}
.module {
	padding: 0 56rpx;
}

.left-icon {
	display: inline-block;
	width: 34rpx;
	height: 38rpx;
	margin-right: 24rpx;
	background-repeat: no-repeat;
	background-size: 100%;
	vertical-align: bottom;
}
.edit-pass {
	background-image: $icon-rebing-phone;
}
.rebing-phone {
	background-image: $icon-rebing-phone;
}
</style>
