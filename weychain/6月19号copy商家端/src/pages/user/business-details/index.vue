<template>
	<!-- 交易详情 -->
	<view>
		<view class="detail-box">
			<view class="content">
				<!-- 支付流水号： -->
				<view class="con-title">
					<text class="con-left">支付流水号：</text>
					<text class="con-right">df</text>
				</view>
				<!-- 业务类型： -->
				<view class="con-title">
					<text class="con-left">业务类型：</text>
					<text class="con-right">df</text>
				</view>
				<!-- 收支类型： -->
				<view class="con-title">
					<text class="con-left">收支类型：</text>
					<text class="con-right">dsf</text>
				</view>
				<!-- 交易时间： -->
				<view class="con-title">
					<text class="con-left">交易时间：</text>
					<text class="con-right">fds</text>
				</view>
				<!-- 关联订单号： -->
				<view class="con-title">
					<text class="con-left">关联订单号：</text>
					<text class="con-right">df</text>
				</view>
				<!-- 收支金额： -->
				<view class="con-title">
					<text class="con-left">收支金额：</text>
					<text class="con-right con-right-color">fdf</text>
				</view>
				<!-- 账户结余： -->
				<view class="con-title">
					<text class="con-left">账户结余：</text>
					<text class="con-right con-right-color">df</text>
				</view>
				<!-- 备注： -->
				<view class="con-title">
					<text class="con-left">备注：</text>
					<text class="con-right">sdf</text>
				</view>
			</view>
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
<style lang="scss" scoped>
page {
	background: #f5f7fa;
}
.detail-box {
	padding: 32rpx;
}
.content {
	padding: 32rpx;
	background-color: #fff;
}

.con-title + .con-title {
	margin-top: 24rpx;
}
.con-left {
	min-width: 168rpx;
	font-size: 28rpx;
	color: #616b80;
	text-align: right;
}
.con-right {
	font-size: 24rpx;
	color: #99a0ad;
}

.con-right-color {
	color: #12cb8e;
}
</style>
