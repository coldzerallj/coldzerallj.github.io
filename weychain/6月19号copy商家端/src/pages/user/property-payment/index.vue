<template>
	<view class="page-property-payment">
		<view class="module-card">
			<view class="bunk-title">铺位名称</view>
			<view class="bunk-value">吉林东市A馆农贸（B区）E2栋-301</view>
			<view class="card-content">
				<view class="money-title">待缴金额</view>
				<view class="money-value">
					￥269.00
					<view class="action-all">
						全部账单
						<span class="iconfont iconjiantou"></span>
					</view>
				</view>
			</view>
		</view>
		<view class="module-bill">
			<view class="item">
				<view class="item-title">5月账单</view>
				<view class="item-price">¥269.00</view>
				<view class="item-cycle">
					<view class="item-cell">费用周期<span class="item-value">2020-05-01至2020-05-31</span></view>
					<view class="item-cell">待缴金额<span class="item-value">¥51.20</span></view>
					<view class="item-cell">已缴金额<span class="item-value">¥51.20</span></view>
				</view>
				<view class="module-info">
					<view class="info-title">物业服务费（不支持分开缴纳）</view>
					<view class="item-cell">
						商业水费<span class="item-value">¥51.20 <span class="iconfont iconjiantou"></span></span
					></view>
					<view class="item-cell">
						商业电费<span class="item-value">¥51.20 <span class="iconfont iconjiantou"></span></span
					></view>
					<view class="item-cell">
						物业服务费<span class="item-value">¥51.20 <span class="iconfont iconjiantou"></span></span
					></view>
				</view>
			</view>
		</view>
		<view class="module-button">
			<button type="main" class="button-pay" @tap="handleOpenConfirm">直接缴费</button>
		</view>

		<!-- 支付确认弹窗 -->
		<uniPopup ref="popupConfirmPay" type="bottom">
			<view class="popup-confirm-pay">
				<view class="modal-header">
					确认付款
				</view>
				<view class="modal-body">
					<view class="price-num">¥24.80</view>
					<view class="item-cell">
						订单信息<span class="item-value">2020年5月份账单 <span class="iconfont iconjiantou"></span></span
					></view>
					<view class="item-cell">
						付款方式<span class="item-value">微信支付 <span class="iconfont iconjiantou"></span></span
					></view>
				</view>
				<view class="module-button">
					<button type="main" class="button-pay" @tap="handleToPay">立即付款</button>
				</view>
			</view>
		</uniPopup>
		<!-- 支付确认弹窗 -->
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: {
		uniPopup,
	},
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		handleOpenConfirm() {
			this.$refs.popupConfirmPay.open();
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
.page-property-payment {
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
	.module-card {
		// background: #6473de;
		background: $card-property-payment no-repeat center;
		background-size: contain;
		position: relative;
		height: 390rpx;
		margin: 0 0 $uni-spacing-lg;
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
		justify-content: space-between;
		font-size: 54rpx;
		font-weight: bold;
		align-items: flex-end;
	}
	.money-title {
		font-size: $uni-font-size-base;
		margin: 0 0 $uni-spacing-base;
	}
	.action-all {
		font-size: $uni-font-size-base;
		font-weight: normal;
	}
	.module-bill {
		.item-price {
			margin: $uni-spacing-base 0;
			color: $uni-text-price;
			font-weight: bold;
			font-size: 64rpx;
		}
		.info-title {
			font-weight: bold;
			font-size: $uni-font-size-lg;
			color: $uni-text-color-black;
			margin: 0 0 16rpx;
		}
		.module-info {
			padding: 44rpx 0 0;
			.item-cell {
				padding: $uni-spacing-base 0;
				font-size: 30rpx;
				@include borderCreator(bottom, solid, #eceff5);
				&:last-child {
					border-bottom: none;
				}
			}
		}
		.item {
			background: #fff;
			padding: $uni-spacing-lg $uni-spacing-lg 12rpx;
			border-radius: 12rpx;
		}
		.item-title {
			font-size: $uni-font-size-lg;
			font-weight: bold;
			color: $uni-text-color;
		}
	}
	.popup-confirm-pay {
		background: #fff;
		border-radius: 16rpx 16rpx 0 0;
		padding: $uni-spacing-lg $uni-spacing-lg 4rpx;
		.modal-header {
			font-size: $uni-font-size-lg;
			font-weight: bold;
			color: $uni-text-color;
		}
		.price-num {
			margin: 52rpx 0;
			color: $uni-text-price;
			font-weight: bold;
			font-size: 56rpx;
			text-align: center;
		}
	}
	.module-button {
		padding: $uni-spacing-lg 0;
		.button-pay {
			border-radius: 48rpx;
		}
	}
}
</style>
