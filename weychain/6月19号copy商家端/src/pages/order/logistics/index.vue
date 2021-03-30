<template>
	<view class="container page-order-logistics">
		<view class="module-info">
			<view class="info-product"></view>
			<view class="info-company">
				<view class="item">配送企业：顺丰快递</view>
				<view class="item">快递单号：2765302256</view>
				<view class="item">联系电话：95338</view>
			</view>
		</view>
		<view class="module-step">
			<view class="step-list">
				<view class="item"><span class="item-title">已发货</span></view>
				<view class="item"><span class="item-title">运输中</span></view>
				<view class="item active"><span class="item-title">派件中</span></view>
				<view class="item"><span class="item-title">已完成</span></view>
			</view>
			<view class="order-place">
				<view class="place">杭州市</view>
				<view class="place">广州市</view>
			</view>
		</view>

		<view class="module-map">
			<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
		</view>
		<view class="module-details">
			<view class="module-header">物流详情</view>
			<view class="module-content">
				<view class="item" v-for="(item, index) in details" :key="index">
					<view class="item-title">{{ item.title }}</view>
					<view class="item-date">{{ item.date }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'map',
			latitude: 39.909,
			longitude: 116.39742,
			details: [
				{
					title: '订单已签收，期待再次为您服务',
					date: '2020-03-13 12:00:00  ',
				},
				{
					title: '到达目的地网点广东广州公司，快件将很快进行派送',
					date: '2020-03-13 12:00:00  ',
				},
				{
					title: '在广东广州公司进行发出扫描',
					date: '2020-03-13 12:00:00  ',
				},
				{
					title: '在分拨中心广东广州公司进行卸车扫描',
					date: '2020-03-13 12:00:00  ',
				},
				{
					title: '在北京市进行下级地点扫描',
					date: '2020-03-13 12:00:00  ',
				},
				{
					title: '订单已提交，等待付款',
					date: '2020-03-13 12:00:00  ',
				},
			],
			resData: {
				shop: '微企优鲜集团',
				status: '待支付',
				totalPrice: '240',
				sn: '5020200308',
				productList: [
					{
						title: '新鲜好吃的三文鱼',
						tips: '日本进口，400g',
						price: '120',
						count: '2',
					},
					{
						title: '新鲜好吃的三文鱼',
						tips: '日本进口，400g',
						price: '120',
						count: '2',
					},
				],
			},
		};
	},
	onLoad(options) {},
	methods: {},
};
</script>
<style lang="scss">
.page-order-logistics {
	background: #f5f5f5;
	padding: 0 0 100rpx;

	.module-info {
		background: $ds-main-color;
		padding: 52rpx 32rpx;
		color: #fff;

		.iconfont {
			margin-right: 6rpx;
		}

		.status-title {
			font-size: 32rpx;
		}
		.item {
			line-height: 1.8;
		}
	}

	.module-step {
		background: #fff;
		padding: 40rpx;

		.step-list {
			display: flex;
			width: 100%;
		}

		.item {
			position: relative;
			width: 28%;
			padding: 0 0 36rpx;

			&:before {
				background: #ccc;
				position: absolute;
				bottom: 1px;
				left: 40rpx;
				width: 16rpx;
				height: 16rpx;
				border-radius: $uni-border-radius-circle;
				content: '';
				z-index: 1;
				border: 2px solid #fff;
			}

			&:after {
				background: #ccc;
				position: absolute;
				bottom: 6px;
				left: 52rpx;
				right: -52rpx;
				height: 1px;
				content: '';
			}

			&:last-child {
				width: 16%;

				&:after {
					background: none;
				}
			}

			&.active {
				&:before {
					background: $ds-main-color;
				}

				.item-title {
					background: $ds-main-color;
					position: relative;
					color: #fff;
					font-size: 26rpx;

					&:before {
						position: absolute;
						bottom: -16rpx;
						left: 44rpx;
						border-top: 8rpx solid $ds-main-color;
						border-bottom: 8rpx solid transparent;
						border-left: 8rpx solid transparent;
						border-right: 8rpx solid transparent;
						content: '';
					}
				}
			}

			.item-title {
				padding: 6rpx 16rpx;
				border-radius: 20rpx;
				font-size: 24rpx;
				color: #999;
			}
		}
	}

	.order-place {
		display: flex;
		justify-content: space-between;
		padding: 6rpx 16rpx 0;

		.place {
			font-size: 24rpx;
			color: #888;
		}
	}

	.module-details {
		background: #fff;
		padding: 12rpx 24rpx;
		.module-header {
			font-size: 30rpx;
		}
		.item {
			padding: $uni-spacing-base 0;
			border-bottom: 1px solid #eee;
		}
		.item-title {
			margin: 0 0 $uni-spacing-sm;
		}
		.item-date {
			font-size: 24rpx;
			color: #999;
			line-height: 30rpx;
		}
	}
}
</style>
