<template>
	<view class="page-property-payment">
		<navigator v-for="(item, index) in storeList" class="module-card" :url="'./index?id=' + item.id" :key="index">
			<view class="bunk-title">铺位名称</view>
			<view class="bunk-value">{{ item.label }}</view>
			<view class="card-content">
				<view class="money-value">
					<view class="action-all">
						查看账单
						<span class="iconfont iconjiantou"></span>
					</view>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
export default {
	data() {
		return {
			storeList: [
				{
					id: 1,
					label: '吉林东市A馆农贸（B区）E2栋-301',
				},
				{
					id: 2,
					label: '吉林东市A馆农贸（B区）E2栋-302',
				},
			],
		};
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
.page-property-payment {
	padding: $uni-spacing-lg;
	.module-card {
		// background: #6473de;
		background: $card-property-payment no-repeat center;
		background-size: contain;
		position: relative;
		height: 390rpx;
		margin: 0 0 $uni-spacing-sm;
		box-sizing: border-box;
		padding: 40rpx $uni-spacing-lg;
		border-radius: 16rpx;
		color: #fff;
	}
	.bunk-title {
		margin: 0 0 18rpx;
	}
	.card-content {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: $uni-spacing-lg;
	}
	.money-value {
		display: flex;
		justify-content: flex-end;
		font-size: 54rpx;
		font-weight: bold;
		align-items: flex-end;
	}
	.action-all {
		font-size: $uni-font-size-base;
		font-weight: normal;
	}
}
</style>
