<template>
	<view class="property-payment-detail">
		<view class="other-info">
			<view class="item-title">商业电费</view>
			<view class="item-cycle">
				<view class="item-cell">度数<span class="item-value">51.2</span></view>
				<view class="item-cell">每度单价<span class="item-value">0.75/元</span></view>
				<view class="item-cell">计费周期<span class="item-value">2020-05-20至2020-06-20</span></view>
			</view>
			<view class="info-footer">应缴电费<span class="price-num">¥124.80</span></view>
		</view>
		<view class="module-button">
			<button type="main" class="button-pay">确定</button>
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
	background: $uni-bg-color-grey;
}
</style>
<style lang="scss" scoped>
.property-payment-detail {
	padding: $uni-spacing-lg;
	.item-cell {
		display: flex;
		justify-content: space-between;
		padding: 12rpx 0;
		font-size: $uni-font-size-base;
		color: $uni-text-color-grey;
		.item-value {
			color: $uni-text-ordermsg;
		}
	}
	.other-info {
		background: #fff;
		padding: $uni-spacing-lg $uni-spacing-lg;
		border-radius: 12rpx;
		.item-title {
			font-size: $uni-font-size-lg;
			font-weight: bold;
			color: $uni-text-color;

			padding: 0 0 $uni-spacing-sm;
		}
	}
	.info-footer {
		display: flex;
		justify-content: space-between;
		@include borderCreator(top, solid, #ebeef5);
		font-size: $uni-font-size-lg;
		font-weight: bold;
		color: $uni-text-color;

		padding: $uni-spacing-base 0 0;
		margin: $uni-spacing-base 0 0;
		.price-num {
			color: $uni-text-price;
			font-weight: bold;
			font-size: 36rpx;
		}
	}
	.module-button {
		padding: 40rpx 0 $uni-spacing-lg;
		.button-pay {
			border-radius: 48rpx;
		}
	}
}
</style>
