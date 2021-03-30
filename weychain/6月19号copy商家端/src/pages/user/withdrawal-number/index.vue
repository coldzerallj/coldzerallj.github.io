<template>
	<!-- 提现单号 -->
	<view>
		<topItem :isType="false"></topItem>
		<view class="detail-list">
			<view class="title">提现<text :class="textClass[0]">处理中</text></view>
			<view class="middle">
				<text class="middle-left">131361361361313</text>
				<text class="middle-right">￥369.00</text>
			</view>
			<view class="date">df</view>
		</view>
		<view class="detail-list">
			<view class="title">提现<text :class="textClass[1]">成功</text></view>
			<view class="middle">
				<text class="middle-left">131361361361313</text>
				<text class="middle-right">￥369.00</text>
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
		return {
			textClass: ['', 'suc-text', 'fail-text'],
		};
	},
	onLoad() {},
	methods: {},
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

	text {
		float: right;
		font-size: 28rpx;
		color: #616b80;
	}
}
// 成功
text.suc-text {
	color: #12cb8e;
}
// 失败
text.fail-text {
	color: #ff5a47;
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
.middle-right {
	font-size: 36rpx;
	color: #99a0ad;
}
.date {
	margin-top: 30rpx;
	padding-top: 12rpx;
	font-size: 24rpx;
	color: #99a0ad;
	border-top: 1rpx solid #ebeef5;
}
</style>
