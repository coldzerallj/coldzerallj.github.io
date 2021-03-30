<template>
	<view class="container page-order-search">
		<view class="page-search-container">
			<!-- #ifdef APP-PLUS -->
			<view class="top_view"></view>
			<!-- #endif -->
			<view class="app-header fixed-top">
				<!-- #ifndef MP-WEIXIN -->

				<view class="iconfont iconfanhui" @tap="goBack()"></view>
				<!-- #endif -->
				<view class="search-content">
					<text class="iconfont iconsousuo"></text>
					<input class="search-input" type="text" placeholder="商品名称/商品编号/订单编号" />
				</view>
				<view class="search-button">确定</view>
			</view>

			<view class="module-product">
				<view :key="index" v-for="(item, index) in orderList" class="item">
					<view class="item-header">
						<text class="item-shop">{{ item.shop }}</text>
						<text class="item-status">{{ item.status }}</text>
					</view>

					<view class="item-body">
						<navigator
							:key="pIndex"
							:url="'../order/detail/index?id=' + item.sn"
							v-for="(product, pIndex) in item.productList"
							class="item-content"
						>
							<productInfo
								:title="product.title"
								:tips="product.tips"
								:count="product.count"
								:price="product.price"
								style="width: 100%;"
							></productInfo>
						</navigator>
					</view>
					<view class="item-footer">
						<view class="item-info">
							<view class="item-number">订单编号：{{ item.sn }}</view>
							<view class="item-price-num">
								应付金额：
								<text>￥{{ item.totalPrice }}</text>
							</view>
						</view>
						<view class="item-button">
							<button class="button button-default" type="default" @tap="handleReject(item)">
								取消订单
							</button>
							<button class="button button-danger" type="default" @tap="handleAccept(item)">
								立即付款
							</button>
						</view>
					</view>
				</view>
			</view>

			<view class="fixed-bottom module-button">
				<button type="main" class="button">全部提走</button>
			</view>
		</view>
	</view>
</template>
<script>
import productInfo from '@/pages/components/product-info/product-info.vue';
export default {
	components: {
		productInfo,
	},
	data() {
		return {
			orderList: [
				{
					shop: '微企商铺一号店',
					status: '待支付',
					totalPrice: '240',
					sn: '5020200308',
					productList: [
						{
							title: '新鲜好吃的三文鱼新鲜好吃的三文鱼新鲜好吃的三文鱼新鲜好吃的三文鱼新鲜好吃的三文鱼',
							tips: '日本进口，400g',
							price: 120,
							count: 2,
						},
						{
							title: '新鲜好吃的三文鱼新鲜好吃的三文鱼新鲜好吃的三文鱼',
							tips: '日本进口，400g',
							price: 120,
							count: 2,
						},
					],
				},
				{
					shop: '微企商铺一号店',
					status: '已完成',
					totalPrice: '240',
					sn: '5020200308',
					productList: [
						{
							title: '新鲜好吃的三文鱼',
							tips: '日本进口，400g',
							price: 120,
							count: 2,
						},
						{
							title: '新鲜好吃的三文鱼',
							tips: '日本进口，400g',
							price: 120,
							count: 2,
						},
					],
				},
			],
		};
	},

	onLoad() {},
	methods: {},
};
</script>
<style lang="scss" scoped>
page {
	background: #f5f5f5;
}
/*  #ifdef  APP-PLUS  */
@include mobileStatusBar(#fff);
.page-order-search {
	padding: var(--status-bar-height) 0 0;
}
/*  #endif  */
.page-search-container {
	padding: 104rpx 0;
	.app-header {
		background: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		display: flex;
		padding: 20rpx $uni-spacing-base;
		.iconfanhui {
			padding-right: 14rpx;
			line-height: 64rpx;
			font-size: 38rpx;
		}
		.search-content {
			display: flex;
			flex: 1;
			@include borderCreator('', solid, #ddd);
			border-radius: 32rpx;
			align-items: center;
			padding: 2rpx 16rpx;
			margin-right: 16rpx;
		}

		.iconsousuo {
			color: $uni-text-color-grey;
		}

		.search-input {
			font-size: $uni-font-size-sm;
			margin-left: 12rpx;
			flex: 1;
		}

		.search-button {
			padding-left: 8rpx;
			line-height: 64rpx;
			font-size: $uni-font-size-base;
			color: $uni-color-main;
		}
	}

	.module-header {
		background: #f5f5f5;
		padding: 20rpx 24rpx 16rpx;
		font-size: 28rpx;
	}
}
.module-product {
	.item {
		background: #fff;
		margin: 0 0 20rpx;

		@include borderCreator(top, solid, #eee);
		@include borderCreator(bottom, solid, #eee);
	}

	.item-header {
		padding: 24rpx $uni-spacing-row-base;
		@include borderCreator(bottom, solid, #eee);
	}

	.item-status {
		float: right;
		color: #888;
	}

	.item-body {
		padding: $uni-spacing-sm $uni-spacing-lg;
		@include borderCreator(bottom, solid, #eee);
	}

	.item-content {
		display: flex;
		padding: $uni-spacing-base 0;
		@include borderCreator(bottom, solid, #eee);
		&:last-child {
			border-bottom: none;
		}
	}
	.item-footer {
		display: flex;
		padding: 16rpx $uni-spacing-base;
		align-items: center;
	}

	.item-info {
		color: #888;
	}

	.item-number {
		font-size: $uni-font-size-sm;
		margin: 0 0 4rpx;
	}

	.item-price-num {
		font-size: $uni-font-size-sm;

		text {
			color: $uni-text-price;
		}
	}

	.item-button {
		display: flex;
		flex: 1;
		justify-content: flex-end;
	}

	.button {
		margin: 0;
		font-size: $uni-font-size-sm;
		margin-left: 20rpx;
	}
}
.module-button {
	background: #fff;
	padding: 16rpx 60rpx;
	border-top: 1px solid #eee;
	.button {
		margin: 0 auto;
		padding: 2rpx 0;
		font-size: 30rpx;
		border-radius: 30px;
	}
}
</style>
