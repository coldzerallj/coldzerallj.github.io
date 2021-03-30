<template>
	<view class="container page-order-list">
		<unoccupancy v-if="status == '2' || status == '1' || status == '0'" :type="status"></unoccupancy>
		<view class="page-order-container">
			<!-- #ifdef APP-PLUS -->
			<view class="top_view"></view>
			<!-- #endif -->
			<view class="fixed-top">
				<view class="app-header">
					<!-- #ifndef MP-WEIXIN -->
					<view class="app-title">订单</view>
					<!-- #endif -->
					<view class="search-content">
						<text class="iconfont iconsousuo" />
						<input class="search-input" type="text" placeholder="搜索订单号或商品" v-model="keyword" @input="handleSearchOrder" />
					</view>
					<navigator class="action-msg" url="../user/message/index">
						<!-- <text class="iconfont iconxiaoxi" /> -->
						<text class="icon-message"></text>
					</navigator>
				</view>

				<!-- 导航栏 agents导航栏标题 -->

				<view class="tab-button">
					<navTab ref="navTab" :tabTitle="tabTitle" @changeTab="changeTab"></navTab>
				</view>
			</view>

			<view class="module-order">
				<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
				<swiper style="min-height: 100vh;" :current="currentTab" @change="swiperTab">
					<swiper-item v-for="(listItem, listIndex) in tabTitle" :key="listIndex">
						<scroll-view
							style="height: 100%;"
							scroll-y="true"
							:scroll-top="scrolTop"
							@scroll="scroll"
							@scrolltolower="loadMore"
							scroll-with-animation
						>
							<!-- <view class="scrollView"> -->
							<view :id="'top' + listIndex" class="top-block"></view>
							<!-- // 二级导航 -->
							<secTab
								class="secTab"
								ref="secTab"
								:tabTitle="secTabTitle"
								@changeSecTab="changeSecTab"
								:tabIndex="orderSubStatusIndex"
								v-if="secTabShow"
							></secTab>
							<view class="content tab-body">
								<view class="item" v-for="(item, index) in orderList" v-show="orderList.length > 0" :key="index">
									<view class="item-header">
										<view class="item-hear-top">
											<text class="item-shop">{{ item.consignee }}</text>
											<text class="item-status" v-if="item.orderSubStatus === 11">
												{{ item.deliveryType === 1 ? '待配送' : '待自提' }}
											</text>
											<text class="item-status" v-else-if="item.orderSubStatus === 5">
												{{ item.deliveryType === 1 ? '已确认收货' : '已确认取货' }}
											</text>
											<text class="item-status" v-else>
												{{ zhOrderSubStatus[item.orderSubStatus] }}
											</text>
										</view>
										<view class="item-hear-middle">
											<view class="number">订单编号：{{ item.orderNo }}</view>
										</view>
										<view class="item-hear-bottom">
											<view class="orderTime">下单时间：{{ item.orderTime }}</view>
										</view>
									</view>

									<view class="item-body">
										<navigator
											:key="pIndex"
											:url="'./detail/index?orderNo=' + item.orderNo"
											v-for="(product, pIndex) in item.productList"
											class="item-content"
										>
											<!-- :thumb="product.picUrl" -->

											<productInfo
												:productName="product.productName"
												:specName="product.specName"
												:productQty="product.productQty"
												:price="product.price"
												:thumb="product.picUrl"
												style="width: 100%;"
											></productInfo>
										</navigator>
									</view>
									<view class="middle_info" v-if="item.deliveryType === 1">
										<view class="middle_item">
											<text class="item_title">期望送达时间</text>
											<text class="item_msg">{{ item.expectedDeliveryTime }}</text>
										</view>
										<view class="middle_item">
											<text class="item_title">送货地址</text>
											<text class="item_msg">{{ item.address }}</text>
										</view>
									</view>
									<view class="middle_info" v-if="item.deliveryType === 2">
										<view class="middle_item">
											<text class="item_title">自提时间</text>
											<text class="item_msg">{{ item.expectedDeliveryTime }}</text>
										</view>
									</view>
									<view class="item-footer">
										<!-- <view class="item-info"> -->
										<view>
											<view class="item-price-num">
												合计：
												<text>￥{{ item.orderPrice }}</text>
											</view>
										</view>

										<!-- </view> -->
										<!-- 待接单 -->
										<view class="item-button">
											<!-- 待接单按钮 -->
											<view v-if="item.orderSubStatus === 1">
												<button class="button button-default" type="default" @tap="Rejection(0, item.orderId)">
													拒单
												</button>
												<button class="button button_bg_main" @tap="Rejection(1, item.orderId)">
													接单
												</button>
											</view>
											<!-- 备货中按钮 -->
											<view v-if="item.orderSubStatus === 3">
												<button class="button button_bg_main" @tap="Stockup(item.orderId)">
													备货完成
												</button>
											</view>
											<!-- 备货完成按钮 -->
											<view v-if="item.orderSubStatus === 11 && item.deliveryType === 1">
												<button class="button button_bg_main" @tap="shipment(item.orderId)">
													去配送
												</button>
											</view>
											<!-- 配送中按钮 -->
											<view v-if="item.orderSubStatus === 4">
												<button class="button button_bg_main" @tap="orderActionAwait(item.orderId, '1')">
													查看物流
												</button>
											</view>
											<!-- 已完成按钮 -->
											<view v-if="item.orderSubStatus === 5">
												<button class="button button_bg_main" @tap="orderActionAwait(item.orderId, '1')">
													查看评价
												</button>
											</view>
											<!-- 退款按钮 -->
											<view v-if="item.orderSubStatus === 6">
												<!-- <view> -->
												<button class="button button_bg_main" @tap="refund(item)">
													退款
												</button>
											</view>
										</view>
										<!-- 退款后显示金额 -->
										<view class="refund_amount" v-if="item.orderSubStatus === 8">
											退款金额：
											<text>{{ item.refundAmount }}</text>
										</view>
									</view>
								</view>
							</view>
							<!-- 上拉加载组件 -->
							<uniLoadMore :status="loadStatus" class="uniLoadMore" v-if="orderList.length !== 0 && showNone"></uniLoadMore>
							<!-- 上拉加载组件 -->
							<!-- <view class="noCard" > -->
							<pageInfoNone
								v-if="orderList.length === 0 && showNone"
								:noneContent="{ icon: 'icondingdan', tips: '暂无相关订单' }"
								:needChangRouter="false"
							></pageInfoNone>

							<!-- </view> -->
							<!-- </view> -->
						</scroll-view>
					</swiper-item>
				</swiper>
				<!-- <tabBar4 :currentPage="currentPage"></tabBar4> -->
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
import navTab from '../components/navTab/navTab';
import productInfo from '@/pages/components/product-info/product-info.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import order from '../../api/order.js';
import pageInfoNone from '../components/page-info-none/page-info-none.vue';
import refundPop from './refund-pop/refund-pop';
import { WX_MESSAGE_TEMPLATE } from '@/common/global';
// 二级导航
import secTab from './secTab';
import uniPopup from '../../components/uni-popup/uni-popup';

import unoccupancy from '@/pages/components/un-occupancy/index';

export default {
	components: {
		navTab,
		productInfo,
		uniLoadMore,
		pageInfoNone,
		// 二级导航
		secTab,
		uniPopup,
		refundPop,
		unoccupancy,
	},
	data() {
		return {
			loadStatus: 'more',
			// currentPage: 'longIndex',
			currentTab: 0, // sweiper所在页
			tabTitle: [
				{
					name: '全部',
					id: 1,
				},
				{
					name: '待接单',
					id: 2,
				},
				{
					name: '处理中',
					id: 3,
				},
				{
					name: '已完成',
					id: 4,
				},
				{
					name: '售后订单',
					id: 5,
				},
			], // 导航栏格式
			secTabTitle: [
				{
					name: '备货中',
					id: 1,
				},
				{
					name: '待配送',
					id: 2,
				},
				{
					name: '配送中',
					id: 3,
				},
				{
					name: '待自提',
					id: 4,
				},
			],
			orderList: [],
			// orderStatus： 0-待支付、2-处理中、4-已完成、6-售后中、8-已取消、10已支付',
			orderStatus: ['', '0', '2', '4', '6'],
			orderStatusIndex: 0,
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
			orderSubStatus: ['3', '5', '4', '6'],
			orderSubStatusIndex: 0,
			saveList: [],
			secTabShow: false,
			showNone: false,
			timer: null,
			scrolTop: 5,
			nowTop: 0,
			nowHeight: 0,
			keyword: '',
			refundPopShow: false,
			orderPrice: '',
			orderId: '',
			status: '',
		};
	},
	onShow(e) {
		const params = {};
		params.orderStatus = this.orderStatus[this.orderStatusIndex];
		params.orderStatus === '2' ? (params.orderSubStatus = this.orderSubStatus[this.orderSubStatusIndex]) : false;
		params.keyword = this.keyword;

		order.getOrderList(params).then((res) => {
			this.orderList = res.data;
			this.showNone = true;
			// if (this.orderList.length < 10) {
			// 	this.loadStatus = 'nomore';
			// }
		});
		this.status = uni.getStorageSync('status');
	},
	onPullDownRefresh(e) {
		// 下拉刷新
		this.keyword = '';
		const params = {};
		this.loadStatus = 'more';
		params.orderStatus = this.orderStatus[this.orderStatusIndex];
		params.keyword = this.keyword;
		// 二级导航
		params.orderStatus === '2' ? (params.orderSubStatus = this.orderSubStatus[this.orderSubStatusIndex]) : false;
		order.getOrderList(params).then((res) => {
			this.orderList = res.data;
			this.goTop();
			uni.stopPullDownRefresh();
			// if (this.orderList.length < 10) {
			// 	this.loadStatus = 'nomore';
			// } else {
			// 	this.loadStatus = 'more';
			// }
		});
	},
	methods: {
		// 输入框事件实时查询，两个字符以上
		handleSearchOrder(e) {
			this.keyword = e.detail.value;
			if (this.keyword.length >= 2 || this.keyword.length <= 0) {
				uni.showLoading({
					title: '加载中...',
					mask: true,
				});
				const params = {};
				params.orderStatus = this.orderStatus[this.orderStatusIndex];
				params.keyword = this.keyword;

				// 二级导航
				params.orderStatus === '2' ? (params.orderSubStatus = this.orderSubStatus[this.orderSubStatusIndex]) : false;
				order.getOrderList(params).then((res) => {
					uni.hideLoading();
					this.orderList = res.data;
					this.showNone = true;
				});
			}
		},
		setOrderList(params) {
			return order.getOrderList(params).then((res) => {
				this.orderList = res.data;
				// if (this.orderList.length < 10) {
				// 	this.loadStatus = 'nomore';
				// 	this.orderListmore = true;
				// }
			});
		},
		changeTab(index) {
			this.currentTab = index;
		},
		// swiper 滑动
		swiperTab: function (e) {
			this.secTabShow = false;
			this.orderList = [];
			this.showNone = false;
			this.loadStatus = 'more';
			// const status = ['', '2', '4', '6', '8'];
			const index = e.detail.current; // 获取索引
			this.orderStatusIndex = index;
			this.$refs.navTab.longClick(index);
			// 滑动，点击切换时请求
			const params = {};
			params.orderStatus = this.orderStatus[index];
			params.keyword = this.keyword;
			// 二级导航
			this.orderStatus[index] === '2'
				? ((this.secTabShow = true), (params.orderSubStatus = this.orderSubStatus[this.orderSubStatusIndex]))
				: (this.secTabShow = false);
			this.setOrderList(params).then((res) => {
				this.showNone = true;
			});
		},
		changeSecTab(index) {
			this.orderSubStatusIndex = index;
			const params = {};
			params.orderStatus = this.orderStatus[this.orderStatusIndex];
			params.orderSubStatus = this.orderSubStatus[this.orderSubStatusIndex];
			params.keyword = this.keyword;
			this.setOrderList(params);
		},
		scroll: function (e) {
			// 获取scroll高度，滑动距离
			const nowT = e.detail.scrollTop;
			const nowH = e.detail.scrollHeight;
			this.nowTop = nowT;
			this.nowHeight = nowH;
		},
		goTop: function (e) {
			// 一键回到顶部
			this.scrolTop = 0;
		},
		loadMore: function (e) {
			// 上拉加载
			// if (this.loadStatus === 'nomore') {
			// 	return false;
			// }
			let nowList = [];
			let newList = [];
			let lastOrderId = '';
			this.loadStatus = 'loading';
			nowList = this.orderList;
			// 获取最后一个订单id
			lastOrderId = nowList[nowList.length - 1].orderId;
			const params = {};
			params.maxId = lastOrderId;
			params.orderStatus = this.orderStatus[this.orderStatusIndex];
			params.keyword = this.keyword;
			// 二级导航
			const { orderSubStatusIndex } = this;
			params.orderStatus === '2' ? (params.orderSubStatus = this.orderSubStatus[orderSubStatusIndex]) : false;
			// console.log(params, '上拉');
			order.getOrderList(params).then((res) => {
				if (res.data.length === 0) {
					this.loadStatus = 'nomore';
					return false;
				}
				newList = nowList.concat(res.data);
				this.orderList = newList;
				// if (res.data.length < 10) {
				// 	this.loadStatus = 'nomore';
				// } else {
				// 	this.loadStatus = 'more';
				// }
			});
		},
		reproduce() {
			// 操作后刷新列表回到同样位置
			const params = {};
			const nowT = this.nowTop;
			const orderNum = this.orderList.length;
			params.orderStatus = this.orderStatus[this.orderStatusIndex];
			const { orderSubStatusIndex } = this;
			params.orderStatus === '2' ? (params.orderSubStatus = this.orderSubStatus[orderSubStatusIndex]) : false;
			params.pageSize = orderNum;
			order.getOrderList(params).then((res) => {
				// 刷新列表
				this.orderList = res.data;
				// 回到点击位置
				this.scrolTop = nowT;
				while (this.nowTop < nowT) {
					this.scrolTop = nowT;
				}
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
							if (res.confirm) {
								const params = {};
								params.id = orderId;
								order.confirmShipment(params).then((res) => {
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
			this.orderId = item.orderId;
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
	},
};
</script>

<style lang="scss">
.module-order {
	width: 100vw;
	font-size: 28upx;
	min-height: 100vh;
	overflow: hidden;
	color: #6b8082;
	position: relative;
}

.noCard {
	width: 90%;
	height: 200upx;
	margin: auto;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #999999;
	box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.1);
	border-radius: 10upx;
}

.top_view {
	height: var(--status-bar-height);
	width: 100%;
	position: fixed;
	background-color: #fff;
	top: 0;
	z-index: 999;
}
/*  #ifdef  APP-PLUS  */
.page-order-list {
	padding: var(--status-bar-height) 0 0;
	.fixed-top {
		top: var(--status-bar-height);
	}
}
/*  #endif  */
.app-header {
	background: #fff;
	display: flex;
	padding: 20rpx $uni-spacing-base;
	align-items: center;
	.app-title {
		padding-right: 20rpx;
		font-size: $uni-font-size-lg;
		font-weight: bold;
	}

	.iconfanhui {
		padding-right: 14rpx;
		line-height: 64rpx;
		font-size: 36rpx;
	}

	.search-content {
		background: #f0f2f5;
		display: flex;
		flex: 1;
		border-radius: 32rpx;
		align-items: center;
		padding: 12rpx $uni-spacing-base;
		margin-right: 16rpx;
		justify-content: center;
	}

	.iconsousuo {
		color: $uni-text-ordermsg;
		font-size: $uni-font-size-base;
	}

	.search-input {
		margin-left: 12rpx;
		flex: 1;
	}

	.iconxiaoxi {
		color: $ds-main-color;
		font-size: 36rpx;
	}

	.icon-message {
		@include iconBase64Background($icon-message, 32rpx, 32rpx);
	}
}

.page-order-container {
	padding: 110rpx 0 0;

	.modal-accept {
		text-align: center;

		.modal-content {
			background: #fff;
			padding: 60rpx 32rpx;
		}

		.iconwancheng {
			display: block;
			margin: 0 0 24rpx;
			color: $ds-main-color;
			font-size: 100rpx;
			line-height: 80rpx;
		}

		.modal-title {
			font-size: 36rpx;
			color: #444;
			font-weight: bold;
		}

		.modal-tips {
			font-size: 26rpx;
			color: #999;
			margin: 0 0 50rpx;
		}
	}

	.tab-button {
		/* #ifdef H5 */
		top: 88rpx;
		/* #endif */
		background: #fff;
		display: flex;
	}

	.tab-body {
		padding: 0 32rpx;
		border-radius: 16rpx;
		.item {
			background: #fff;
			margin: 0 0 20rpx;
			padding: 32rpx 24rpx;
			@include borderCreator(top, solid, #eee);
			@include borderCreator(bottom, solid, #eee);
		}

		.item-header {
			@include borderCreator(bottom, solid, #eee);
			.item-hear-top {
				height: 44rpx;
				line-height: 44rpx;
				margin-bottom: 16rpx;
				.item-shop {
					font-size: $uni-font-size-lg;
					font-weight: 500;
					color: $uni-text-color-black;
				}
				.item-status {
					float: right;
					color: $uni-text-price;
					font-size: $uni-font-size-sm;
				}
			}
			.item-hear-middle,
			.item-hear-bottom {
				height: 32rpx;
				line-height: 32rpx;
				margin-bottom: 16rpx;
			}
			.number {
				font-size: $uni-font-size-sm;
				color: $uni-text-ordermsg;
			}
			.orderTime {
				font-size: $uni-font-size-sm;
				color: $uni-text-ordermsg;
			}
		}
		.item-body {
			// padding: $uni-spacing-sm $uni-spacing-lg;
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
			position: relative;
			display: flex;
			justify-content: space-between;
			height: 96rpx;
			line-height: 96rpx;
			.item-price-num {
				font-size: $uni-font-size-lg;
				color: $uni-text-color-black;
				font-weight: 500;
				text {
					color: $uni-text-price;
				}
			}
		}

		.item-button view {
			// display: inline-block;
			margin-top: 18rpx;
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
			text {
				line-height: 44rpx;
				color: $uni-text-price;
			}
		}
	}
}
.top-block {
	width: 100%;
	height: 88rpx;
}
.uni-load-more {
	padding-bottom: $uni-spacing-base;
}
.scrollView {
	height: 100%;
	overflow-y: scroll;
}
// .uniLoadMore{
// 	position: absolute;
// }
.middle_info {
	.middle_item {
		display: flex;
		justify-content: space-between;
		height: 96rpx;
		line-height: 96rpx;
		.item_title {
			display: inline-block;
			// height: 45rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #141f33;
			// line-height: 45rpx;
		}
		.item_msg {
			display: inline-block;
			// height: 45rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(153, 160, 173, 1);
			// line-height: 45rpx;
		}
	}
}
</style>
