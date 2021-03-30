<template>
	<view class="module-product-info">
		<image class="media-object" :src="thumb" mode="widthFix"></image>
		<view class="media-content">
			<view class="media-title">{{ productName }}</view>
			<view class="media-tips">
				{{ specName }}
				<view class="media-count">x{{ productQty }}</view>
			</view>
			<view class="item-price">
				<span class="price-count">￥{{ price }}</span>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * productInfo 商品信息展示
 * @property {String} thumb 商品图片链接
 * @property {String} productName 商品名称
 * @property {String} specName  商品规格

 * @property {Number} productQty 商品数量
 * @property {Number} price 商品价格
 * @example <productInfo :thumb="" :title="" :tips="" :count="" :price=""></productInfo>
 */
export default {
	props: {
		thumb: {
			type: String,
			default: 'https://img13.360buyimg.com/n1/jfs/t1/98527/32/18678/410306/5e97c828Ed2dca4a3/01a16e691bd5f008.jpg',
		},
		productName: {
			type: String,
			default: '',
		},
		specName: {
			type: String,
			default: '',
		},
		productQty: {
			type: Number,
			default: 1,
		},
		price: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {};
	},
	methods: {},
};
</script>

<style lang="scss">
.module-product-info {
	display: flex;
	width: 100%;
	.media-object {
		width: 120rpx;
		height: 120rpx;
		// height: auto;
	}

	.media-content {
		display: flex;
		height: 120rpx;
		flex: 1;
		flex-flow: column;
		justify-content: space-between;
		padding-left: $uni-spacing-base;
	}
	.media-title {
		margin: 0 0 8rpx;
		line-height: 36rpx;
		font-size: 28rpx;
		color: $uni-text-color-black;
	}
	.media-tips {
		font-size: $uni-font-size-sm;
		color: #99a0ad;
		width: 100%;
		height: 32rpx;
		line-height: 32rpx;
	}

	.media-count {
		float: right;
		color: #12cb8e;
		font-size: 32rpx;
	}

	.item-price {
		// position: absolute;
		// bottom: 0;
		height: 44rpx;
		line-height: 44rpx;
	}

	.price-count {
		color: $uni-text-price;
		font-size: $uni-font-size-base;
	}

	.item-number {
		float: right;
	}
}
</style>
