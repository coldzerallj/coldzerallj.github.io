<template>
	<view class="container page-order-detail">
		<view class="module-status">
			<!-- <text class="iconfont icondengdai"></text> -->
			<text class="status-title" v-if="form.orderSubStatus === 11">订单{{ form.deliveryType === 1 ? '待配送' : '待自提' }}</text>
			<text class="status-title" v-else-if="form.orderSubStatus === 5">
				订单{{ form.deliveryType === 1 ? '已确认收货' : '已确认取货' }}
			</text>
			<text class="status-title" v-else>订单{{ zhOrderSubStatus[form.orderSubStatus] }}</text>
		</view>

		<!-- <navigator
			class="module module-logistics"
			:url="'../logistics/index?id=' + '34'"
		>
			<text class="iconfont iconwuliuguanli"></text>
			<view class="item-title">
				感谢您在微企优鲜集团购物，欢迎再次光临
				<text class="iconfont iconjiantou"></text>
			</view>
			<view class="item-tips">2020-03-01 16:01</view>
		</navigator> -->
		<view class="content">
			<view class="module module-address" v-if="form.deliveryType === 1">
				<view class="item-address">{{ form.address }}</view>
				<view class="item-name">{{ form.consignee }}</view>
				<view class="item-phone">{{ form.mobile }}</view>
			</view>
			<view class="module module-address" v-if="form.deliveryType === 2">
				<view class="toShop">
					请等待买家自提
				</view>
			</view>
			<view class="module-product">
				<view class="module-header">
					<text class="module-shop">{{ form.consignee }}</text>
					<text class="module-phoneicon iconfont iconlianxi1" @tap="handlePhone(form.mobile)"></text>
				</view>

				<view class="product-body">
					<navigator :url="'../../index/details/index?id='" v-for="(item, index) in productList" :key="index" class="item-content">
						<productInfo
							:productName="item.productName"
							:specName="item.specName"
							:productQty="item.productQty"
							:price="item.price"
							:thumb="item.picUrl"
							style="width: 100%;"
						></productInfo>
					</navigator>
					<view class="info-body">
						<view class="item">
							<text class="item-addon">商品总额：</text>
							<text class="item-msg">￥{{ form.goodsPrice }}</text>
						</view>
						<view class="item" v-if="form.deliveryType === 1">
							<text class="item-addon">配送费用：</text>
							<text class="item-msg">￥{{ form.freightPrice }}</text>
						</view>
						<view class="item" v-if="form.deliveryType === 1">
							<text class="item-addon">期望送达时间：</text>
							<text class="item-msg">{{ form.expectedDeliveryTime }}</text>
						</view>
						<view class="item" v-if="form.deliveryType === 2">
							<text class="item-addon">自提时间：</text>
							<text class="item-msg">￥{{ form.expectedDeliveryTime }}</text>
						</view>
						<view class="item" v-if="form.deliveryType === 2">
							<text class="item-addon">自提地址：</text>
							<text class="item-msg">{{ form.tenantAddress }}</text>
						</view>
					</view>
				</view>
				<view class="product-footer">
					<text class="module-shop">合计</text>
					<text class="module-total">￥{{ form.orderPrice }}</text>
				</view>
			</view>

			<view class="module-info">
				<view class="module-header">
					<text class="module-shop">订单信息</text>
				</view>
				<view class="info-body">
					<view class="item">
						<text class="item-addon">订单编号：</text>
						<text class="item-msg">{{ form.orderSn }}</text>
					</view>
					<view class="item">
						<text class="item-addon">下单时间：</text>
						<text class="item-msg">{{ form.orderTime }}</text>
					</view>
				</view>
			</view>
			<view class="module-block">
				<view class="block-header">
					<view class="block-icon"> </view>
					<text class="block-title">区块链交易信息</text>
				</view>
				<view class="block-info">
					<view class="item">
						<text class="item-addon">交易ID：</text>
						<text class="block-msg">{{ form.transactionId }}</text>
					</view>
					<view class="item">
						<text class="item-addon">存证ID：</text>
						<text class="block-msg">{{ form.credentialId }}</text>
					</view>
				</view>
			</view>

			<view class="item-footer">
				<!-- <view class="item-info"> -->
				<view>
					<view class="item-price-num">
						合计：
						<text>￥{{ form.orderPrice }}</text>
					</view>
				</view>

				<!-- </view> -->
				<!-- 待接单 -->
				<view class="item-button">
					<!-- 待接单按钮 -->
					<view v-if="form.orderSubStatus === 1">
						<button class="button button-default" type="default" @tap="Rejection(0, form.id)">
							拒单
						</button>
						<button class="button button_bg_main" @tap="Rejection(1, form.id)">
							接单
						</button>
					</view>
					<!-- 备货中按钮 -->
					<view v-if="form.orderSubStatus === 3">
						<button class="button button_bg_main" @tap="Stockup(form.id)">
							备货完成
						</button>
					</view>
					<!-- 备货完成按钮 -->
					<view v-if="form.orderSubStatus === 11 && form.deliveryType === 1">
						<button class="button button_bg_main" @tap="shipment(form.id)">
							去配送
						</button>
					</view>
					<!-- 配送中按钮 -->
					<view v-if="form.orderSubStatus === 4">
						<button class="button button_bg_main">
							查看物流
						</button>
					</view>
					<!-- 已完成按钮 -->
					<view v-if="form.orderSubStatus === 5">
						<button class="button button_bg_main">
							查看评价
						</button>
					</view>
					<!-- 退款按钮 -->
					<view v-if="form.orderSubStatus === 6">
						<!-- <view> -->
						<button class="button button_bg_main" @tap="refund(form)">
							退款
						</button>
					</view>
				</view>
				<!-- 退款后显示金额 -->
				<view class="refund_amount" v-if="form.orderSubStatus === 8">
					<!-- <view class="refund_amount"> -->
					退款金额：
					<text>{{ form.refundAmount }}</text>
				</view>
			</view>
			<!-- 退款弹窗 -->
			<uniPopup ref="popup" type="message" maskClick="false">
				<refundPop @closePop="closePop" @refundConfirm="refundConfirm" :orderPrice="orderPrice" :orderId="orderId" v-if="refundPopShow">
				</refundPop>
			</uniPopup>
		</view>
	</view>
</template>

<script>
import productInfo from '@/pages/components/product-info/product-info.vue';
import order from '../../../api/order';
import { WX_MESSAGE_TEMPLATE } from '@/common/global';
import uniPopup from '../../../components/uni-popup/uni-popup';
import refundPop from '../refund-pop/refund-pop';

export default {
	components: {
		productInfo,
		uniPopup,
		refundPop,
	},
	data() {
		return {
			form: {},
			productList: {},
			zhOrderSubStatus: [
				'待支付', // 0
				'待接单', // 1
				'已拒单', // 2
				'备货中', // 3
				'配送中', // 4
				'已确认收货', // 5
				'申请售后', // 6
				'取消售后', // 7
				'退款完成', // 8
				'取消支付', // 9
				'已支付', // 10
				'备货完成', // 11
				'', // 12
				'订单已取消', // 13
			],
			refundPopShow: false,
			orderPrice: '',
			orderId: '',
		};
	},
	onLoad(options) {
		// const item = JSON.parse(decodeURIComponent(options.item));
		// this.form = item;
		const params = {};
		params.orderSn = options.orderNo;
		order.orderDetails(params).then((res) => {
			this.form = res.data.mallSubOrder;
			this.productList = res.data.mallSubOrderGoodList;
		});
	},
	methods: {
		reproduce() {
			const params = {};
			params.orderSn = this.form.orderSn;
			this.form = {};
			order.orderDetails(params).then((res) => {
				this.form = res.data.mallSubOrder;
				this.productList = res.data.mallSubOrderGoodList;
			});
		},
		orderActionAwait(orderId, actionStatus) {
			// 商家接单/拒单（0拒单 ， 1接单）
			const params = {};
			params.orderId = orderId;
			params.actionStatus = actionStatus;
			return order.orderActionAwait(params);
		},
		Rejection(index, orderId) {
			const me = this;
			uni.requestSubscribeMessage({
				tmplIds: WX_MESSAGE_TEMPLATE,
				success(res) {
					// 接单拒单弹窗
					const status = ['拒绝接单', '同意接单'];
					const orderStatus = status[index];
					uni.showModal({
						title: orderStatus,
						content: '是否' + orderStatus,
						success: (res) => {
							if (res.confirm) {
								me.orderActionAwait(orderId, index).then((res) => {
									uni.showToast({
										title: res.message,
										duration: 1000,
									});
									me.reproduce();
								});
							} else if (res.cancel) {
								// 点击取消
							}
						},
					});
				},
			});
		},
		Stockup(orderId) {
			const me = this;
			uni.requestSubscribeMessage({
				tmplIds: WX_MESSAGE_TEMPLATE,
				success(res) {
					// 备货完成
					uni.showModal({
						title: '订单备货',
						content: '是否备货完成',
						success: (res) => {
							const params = {};
							params.id = orderId;
							order.confirmShipment(params).then((res) => {
								uni.showToast({
									title: res.message,
									duration: 1000,
								});
								me.reproduce();
							});
						},
					});
				},
			});
		},
		shipment(orderId) {
			const me = this;
			uni.requestSubscribeMessage({
				tmplIds: WX_MESSAGE_TEMPLATE,
				success(res) {
					// 商家确认出货
					uni.showModal({
						title: '确认出货',
						content: '是否确认出货',
						success: (res) => {
							if (res.confirm) {
								const params = {};
								params.orderId = orderId;
								order.goodsDelivery(params).then((res) => {
									uni.showToast({
										title: res.message,
										duration: 1000,
									});
									me.reproduce();
								});
							} else if (res.cancel) {
								// 点击取消
							}
						},
					});
				},
			});
		},
		refund(item) {
			// 退款按钮点击开启弹窗
			const that = this;
			this.$refs.popup.open();
			setTimeout(function () {
				that.refundPopShow = true;
			}, 80);
			this.orderPrice = item.orderPrice;
			this.orderId = item.id;
		},
		closePop() {
			// 关闭退款弹窗
			this.refundPopShow = false;
			this.$refs.popup.close();
		},
		refundConfirm(refundAmount, orderId) {
			// 确认退款按钮
			const params = {};
			params.id = orderId;
			params.refundPrice = refundAmount;
			// eslint-disable-next-line eqeqeq
			if (params.refundPrice == '' || params.refundPrice == 0) {
				uni.showToast({
					title: '请输入有效金额',
					duration: 1000,
				});
				return false;
			}
			order.refund(params).then((res) => {
				this.$refs.popup.close();
				uni.showToast({
					title: res.message,
					duration: 1000,
				});
				this.reproduce();
			});
		},
		handlePhone(e) {
			uni.makePhoneCall({
				phoneNumber: e,
			});
		},
	},
};
</script>
<style lang="scss">
.page-order-detail {
	background: #f5f5f5;
	padding: 0 0 100rpx;

	.module-status {
		background: $ds-main-color;
		padding: 36rpx 32rpx 126rpx;
		color: #fff;
		.iconfont {
			margin-right: 6rpx;
		}
		.status-title {
			font-size: 48rpx;
		}
	}
	.content {
		position: relative;
		top: -76rpx;
		padding: 0 32rpx;
	}
	.module,
	.module-product,
	.module-info,
	.module-block {
		background: #fff;
		margin: 0 0 32rpx;
		padding: 32rpx 24rpx;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		border-radius: 16rpx;
	}

	.module-logistics {
		position: relative;
		padding: 32rpx 72rpx;
		.item-tips {
			padding: 6rpx 0 0;
			font-size: 24rpx;
			color: #888;
		}
		.iconwuliuguanli {
			position: absolute;
			top: 36rpx;
			left: 32rpx;
			font-size: 26rpx;
		}
		.iconjiantou {
			position: absolute;
			top: 30rpx;
			right: 16rpx;
		}
	}
	.toShop {
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: 36rpx;
		color: #141f33;
		font-weight: 500;
		height: 156rpx;
		line-height: 156rpx;
	}
	.module-address {
		.item-address {
			color: #141f33;
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			margin-bottom: 8rpx;
		}
		.item-name,
		.item-phone {
			display: inline;
			color: $uni-text-color-grey;
			font-size: $uni-font-size-base;
		}
		.item-name {
			margin-right: 32rpx;
		}
		// .item-phone {
		// 	margin: 8rpx;
		// }
	}

	.module-header {
		height: 40rpx;
		padding-bottom: 32rpx;
		border-bottom: 1px solid #eee;
		display: flex;
		justify-content: space-between;
		line-height: 40rpx;
	}
	.module-shop {
		font-size: $uni-font-size-lg;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
	}
	.product-footer {
		padding-top: 32rpx;
	}
	.module-total {
		font-size: $uni-font-size-lg;
		float: right;
		font-family: PingFangSC-Medium, PingFang SC;
		color: $uni-text-color-black;
		font-weight: 500;
	}
	.module-product {
		background: #fff;
		margin: 0 0 32rpx;

		.product-body {
			// padding: $uni-spacing-sm $uni-spacing-lg;
			border-bottom: 1px solid #eee;
		}

		.media-content {
			flex: 1;
			padding: 0 $uni-spacing-row-base;
		}

		.item-content {
			display: flex;
			padding: $uni-spacing-base 0;
			border-bottom: 1px solid #eee;

			&:last-child {
				border-bottom: none;
			}
		}
	}
	.info-body {
		padding: 32rpx 0 0 0;
	}

	.item {
		margin-bottom: 32rpx;
		color: #888;
		font-size: 26rpx;
	}

	.item-addon {
		font-size: $uni-font-size-base;
		font-weight: 400;
		color: $uni-text-color-grey;
	}
	.item-msg {
		font-size: $uni-font-size-base;
		color: $uni-text-color-black;
		float: right;
	}
	.module-info {
		background: #fff;
	}
	.module-block {
		.block-header {
			height: 40rpx;
			line-height: 40rpx;
			padding-bottom: 32rpx;
			border-bottom: 1px solid #eee;
		}
		.block-icon {
			display: inline-block;
			width: 32rpx;
			height: 32rpx;
			background-image: url('../../../static/img/block.png');
			background-size: 100%;
			vertical-align: middle;
		}
		.block-title {
			display: inline-block;
			margin-left: 16rpx;
		}
		.block-info {
			.item-addon {
				display: block;
				margin-top: 31rpx;
			}
			.block-msg {
				display: block;
				margin-top: 5rpx;
				font-family: PingFangSC-Regular;
				font-size: 28rpx;
				color: #252525;
				word-wrap: break-word;
			}
		}
	}
	.item-footer {
		width: 100%;
		position: fixed;
		// padding: 0 32rpx;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		height: 96rpx;
		line-height: 96rpx;
		background: #fff;
		.item-price-num {
			font-size: $uni-font-size-lg;
			color: $uni-text-color-black;
			font-weight: 500;
			margin-left: 32rpx;
			text {
				color: $uni-text-price;
			}
		}
	}

	.item-button view {
		// display: inline-block;
		margin-top: 18rpx;
		margin-right: 32rpx;
		display: flex;
	}
	.button {
		width: 148rpx;
		height: 60rpx;
		padding: 0;
		text-align: center;
		background: #f0f2f5;
		color: #616b80;
		border-radius: 30rpx;
		font-size: $uni-font-size-base;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		line-height: 60rpx;
		margin-left: 32rpx;
		// float: left;
	}
	.button::after {
		border: none;
	}
	.button_bg_main {
		background: $ds-main-color;
		color: $uni-text-color-white;
	}
	.refund_amount {
		margin-right: 32rpx;
		text {
			line-height: 44rpx;
			color: $uni-text-price;
		}
	}
}
</style>
