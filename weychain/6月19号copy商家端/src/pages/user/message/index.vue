<template>
	<view class="container page-message">
		<view class="module-list">
			<view class="item" v-for="(item, index) in list" :key="index">
				<!-- <navigator :url="'/pages/order/detail/index?id=' + item.id"> -->
				<view class="item-content">
					<view class="item-title">订单消息</view>
					<view class="item-tips">{{ item.msgContent }}</view>
					<view class="item-footer">
						<view class="item-number">{{ item.createdTime }}</view>
					</view>
				</view>
				<!-- </navigator> -->
			</view>
		</view>
	</view>
</template>

<script>
import { Notice } from '@/api/notice.js';
export default {
	data() {
		return {
			list: [],
		};
	},
	onLoad() {},
	onShow() {
		const that = this;
		// 系统消息通知 接口
		Notice()
			.then((res) => {
				if (res.code === 200) {
					that.list = res.data;
				} else {
					uni.showToast({
						title: res.message,
						duration: 1500,
						icon: 'none',
					});
				}
			})
			.catch((err) => {
				uni.showToast({
					title: err.message,
					duration: 1500,
					icon: 'none',
				});
			});

		// 取消 有消息 状态
		this.$store.commit('user/unreadFlag', false);
	},
	methods: {
		// 点击查看详情
		viewDetail(item) {
			// console.log(item, 'item');
			uni.navigateTo({
				url: '/pages/order/detail/index?id=' + item.extra.orderNo,
			});
		},
	},
};
</script>

<style lang="scss">
page {
	background: $uni-bg-color-grey;
}
.page-message {
	padding: 0 0 24rpx;
	.item {
		padding: 24rpx 32rpx 0;
		.item-header {
			font-size: 24rpx;
			text-align: center;
			color: #999;
			margin: 0 0 20rpx;
		}
		.item-content {
			background: #fff;
			padding: 32rpx 32rpx 24rpx;
			border-radius: 12rpx;
		}
		.item-title {
			font-size: 32rpx;
			font-weight: 500;
			color: rgba(20, 31, 51, 1);
			line-height: 45rpx;
		}
		.item-tips {
			margin-top: 24rpx;
			padding-bottom: 32rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: rgba(153, 160, 173, 1);
			line-height: 40rpx;
			border-bottom: 1rpx solid rgba(235, 238, 245, 1);
		}
		.item-number {
			margin-top: 12rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: rgba(153, 160, 173, 1);
			line-height: 33rpx;
		}
		.item-footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.item-button {
			font-size: 24rpx;
			margin: 0;
		}
	}
}
</style>
