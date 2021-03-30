<template>
	<view class="page-freight-rules">
		<view class="module" v-for="(item, index) in resData" :key="index">
			<view class="module-header">全市配送运费模板<span class="action-add" @tap="handleToModify(item)">修改</span></view>
			<view class="module-body">
				<view class="item-cell">
					运费承担：<span class="item-value" v-if="item.billingMethod"> {{ item.freightPayer ? '买家承担运费' : '商家承担运费' }}</span>
				</view>
				<view class="item-cell">
					计费方式：
					<span class="item-value">{{ item.billingMethod }}</span>
				</view>
				<view class="item-cell">
					配送范围：<span class="item-value">{{ item.distributionScope }}</span>
				</view>
			</view>
			<view class="module-footer" v-if="item.mallFreightRuleList && item.mallFreightRuleList.length > 0">
				<view class="item-title">计费规则</view>
				<view class="item-cell">
					<span class="item-addon">区间订单金额（元）</span><span class="item-value" style="color: #616b80;">运费（元）</span>
				</view>

				<view class="item-cell" v-for="(rule, indexRule) in item.mallFreightRuleList" :key="indexRule">
					<span class="item-addon">
						<input class="item-input item-input-min" v-model="rule.minPrice" type="number" disabled="disabled" />
						<span class="item-middle">到</span>
						<input class="item-input" v-model="rule.maxPrice" type="number" disabled="disabled" />
					</span>
					<span class="item-value">
						<input class="item-input" v-model="rule.freight" type="number" disabled="disabled" />
					</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mallFreightList } from '@/api/freight-rules.js';
export default {
	data() {
		return {
			resData: [{}],
		};
	},
	onShow() {
		mallFreightList({ tenantId: uni.getStorageSync('tenantId') }).then((res) => {
			if (res.code === 200) {
				if (res.data.length > 0) {
					this.resData = res.data;
				}
			} else {
				uni.showToast({
					title: res.message,
					duration: 1200,
					icon: 'none',
				});
			}
		});
	},
	onLoad() {},
	methods: {
		handleToModify(item) {
			if (item.billingMethod) {
				uni.navigateTo({
					url: './add/index?item=' + JSON.stringify(item),
				});
			} else {
				uni.navigateTo({
					url: './add/index',
				});
			}
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
.page-freight-rules {
	padding: $uni-spacing-lg;
	.item-cell {
		display: flex;
		justify-content: space-between;
		padding: 14rpx 0;
		color: $uni-text-color-grey;
		.item-value {
			color: $uni-text-ordermsg;
		}
	}
	.module {
		padding: $uni-spacing-lg;
		background: $uni-bg-color;
		border-radius: 16rpx;
		.module-header {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			padding: 0 0 16rpx;
			font-size: $uni-font-size-lg;
			color: $uni-text-color-black;
			font-weight: bold;
		}
		.action-add {
			font-size: 26rpx;
			font-weight: normal;
			color: $uni-color-main;
		}
		.module-body {
			padding: 0 0 10rpx;
		}
		.module-footer {
			@include borderCreator(top, solid, #ebeef5);
			padding: 28rpx 0 0;
			margin: 16rpx 0 0;
			.item-cell {
				padding: 20rpx 0;
				justify-content: space-between;
				align-items: center;
			}
			.item-middle {
				padding: 0 20rpx;
			}
			.item-addon {
				display: flex;
				width: 70%;
				justify-content: space-between;
				align-items: center;
			}
			.item-value {
				width: 30%;
				padding-left: 32rpx;
				color: $uni-text-price;
				text-align: right;
			}
			.item-input {
				border-radius: 8rpx;
				text-align: center;
				padding: 4rpx 10rpx;
				height: 52rpx;
				font-size: 26rpx;
				background: #f5f7fa;
				color: $uni-text-color-black;
				@include borderCreator('', solid, #ebeef5);
			}
			.iconshanchu {
				margin-left: 12rpx;
				color: $uni-text-price;
				font-size: 34rpx;
				&.none {
					color: #fff;
				}
			}
		}
		.item-title {
			font-size: 30rpx;
			color: $uni-text-color-black;
			font-weight: bold;
			padding: 0 0 12rpx;
		}
	}
}
</style>
