<template>
	<!-- 交易明细 -->
	<view>
		<topItem :isType="true"></topItem>
		<view class="detail-list" @click="toDetail(item)">
			<view class="title">收入-交易</view>
			<view class="middle">
				<text class="middle-left">131361361361313</text>
				<text class="middle-right">&plus; &yen; 369.00</text>
			</view>
			<view class="date">df</view>
		</view>
		<view class="detail-list">
			<view class="title">收入-退款</view>
			<view class="middle">
				<text class="middle-left">131361361361313</text>
				<text class="middle-right middle-right-refund">&minus; &yen; 369.00</text>
			</view>
			<view class="date">dsf</view>
		</view>
	</view>
</template>

<script>
import topItem from '@/pages/components/transaction-top';
export default {
	components: {
		topItem,
	},
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		// 去交易详情
		toDetail(item) {
			uni.navigateTo({ url: '/pages/user/business-details/index' });
		},
	},
};
</script>
<style lang="scss" scoped>
page {
	background: $uni-bg-color-grey;
}

.detail-list {
	margin: 32rpx;
	padding: 32rpx 32rpx 24rpx;
	background-color: #fff;
	border-radius: 12rpx;
}

.title {
	font-size: 32rpx;
	color: #141f33;
}
.middle {
	display: flex;
	justify-content: space-between;
	margin-top: 24rpx;
}
.middle-left {
	font-size: 28rpx;
	color: #99a0ad;
}
// 收入-交易
.middle-right {
	font-size: 36rpx;
	color: #12cb8e;
}
// 收入-退款
text.middle-right-refund {
	color: #ff5a47;
}
.date {
	margin-top: 30rpx;
	padding-top: 12rpx;
	font-size: 24rpx;
	color: #99a0ad;
	border-top: 1rpx solid #ebeef5;
}
</style>
