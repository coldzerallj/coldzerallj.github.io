<template>
	<view class="property-payment-all">
		<view class="module-info">
			<view class="info-block" v-for="(item, index) in resData" :key="index">
				<view class="info-header">{{ item.year }}</view>
				<view class="info-body">
					<view class="item" v-for="(date, indexDate) in item.list" :key="indexDate" @tap="handleToPay(item)">
						<view class="item-title">{{ date.date }}月账单</view>
						<view class="item-content">
							<span class="item-price">¥{{ date.price }}</span>
							<view class="item-status">
								<span v-if="date.status == 1">已缴费</span>
								<span v-else style="color: #ff4771;">未缴费</span>
								<span class="iconfont iconjiantou"></span
							></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			resData: [
				{
					year: '2020',
					list: [
						{
							date: '5',
							status: 0,
							price: 50,
						},
						{
							date: '4',
							status: 1,
							price: 50,
						},
					],
				},
				{
					year: '2019',
					list: [
						{
							date: '5',
							status: 1,
							price: 50,
						},
						{
							date: '4',
							status: 1,
							price: 50,
						},
					],
				},
			],
		};
	},
	onLoad() {},
	methods: {
		handleToPay() {
			uni.navigateTo({
				url: '../detail/index',
			});
		},
	},
};
</script>
<style lang="scss">
page {
	background: $uni-bg-color-grey;
}
</style>
<style lang="scss" scoped>
.property-payment-all {
	.info-header {
		padding: $uni-spacing-base $uni-spacing-lg 18rpx;
		font-size: $uni-font-size-lg;
		color: $uni-text-color;
		font-weight: bold;
	}
	.info-body {
		background: #fff;
		padding: 0 $uni-spacing-lg;
		.item {
			padding: $uni-spacing-lg 0;
			@include borderCreator(bottom, solid, #eceff5);
			&:last-child {
				border-bottom: none;
			}
		}
		.item-content {
			display: flex;
			justify-content: space-between;
			font-size: $uni-font-size-base;
			color: $uni-text-color-grey;
		}
		.item-title {
			margin: 0 0 16rpx;
			color: $uni-text-color-grey;
			font-size: $uni-font-size-base;
		}
		.item-price {
			color: $uni-text-price;
			font-size: $uni-font-size-lg;
			font-weight: bold;
		}
		.item-status {
			font-size: $uni-font-size-sm;
			color: $uni-text-ordermsg;
		}
		.iconjiantou {
			position: relative;
			top: 2rpx;
		}
	}
}
</style>
