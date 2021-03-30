<template>
	<view class="container">
		<view class="module-info">
			<view class="iconfont iconwancheng"></view>
			<view class="info-tips">支付成功</view>
			<view class="info-price">
				<text class="addon">付款方式：</text>
				<text class="price">2020年05月份水费账单</text>
			</view>
			<view class="info-price">
				<text class="addon">收款方：</text>
				<text class="price">国发投资有限公司</text>
			</view>
		</view>
		<view class="module-button">
			<navigator open-type="switchTab" class="item item-order" url="../index">
				查看明细
			</navigator>
			<navigator open-type="switchTab" class="item item-index" url="../../index/index">
				完成
			</navigator>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			orderNo: '',
			amount: '',
		};
	},
	onLoad(options) {
		this.orderNo = options.orderNo;
		this.amount = options.amount;
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.module-info {
	background: #fff;
	padding: 150rpx 0 80rpx;
	text-align: center;

	.iconwancheng {
		display: block;
		font-size: 120rpx;
		color: $uni-color-main;
		line-height: 160rpx;
	}
	.info-tips {
		margin: 0 0 64rpx;
		font-size: $uni-font-size-lg;
		color: $uni-text-color;
	}
	.info-price {
		display: flex;
		margin: 0 0 20rpx;
		color: $uni-text-color-grey;
	}
	.addon {
		width: 35%;
		text-align: right;
		font-size: $uni-font-size-base;
	}
	.price {
		width: 65%;
		text-align: left;
		font-size: $uni-font-size-base;
		padding-left: 20rpx;
	}
}
.module-button {
	background: #fff;
	padding: 0 0 72rpx;
	display: flex;
	justify-content: center;
	.item {
		background: $uni-color-main;
		width: 260rpx;
		text-align: center;
		padding: 18rpx 0;
		margin: 0 20rpx;
		color: #fff;
		font-size: $uni-font-size-lg;
		border-radius: 40rpx;
	}
	.item-order {
		background: #f0f2f5;
		color: $uni-text-color;
	}
}
</style>
