<template>
	<view class="container page-user">
		<navigator class="userinfo">
			<span class="iconfont iconyonghuming"></span>
			<view class="info-content">
				<view v-if="status === '0'" class="user-name" @tap="loginPone">登录/注册</view>
				<view v-else class="user-name">阿花来了</view>
			</view>
		</navigator>
		<view class="info-list">
			<view class="info-list-cells">
				<view @tap="fornext('myshop')" class="item">
					<span class="item-icon icon-store"></span>
					我的店铺
					<span></span>
					<span class="item-rigth-tips">
						<span class="iconfont iconjiantou"></span>
					</span>
				</view>
				<navigator class="item" url="./fund-account/index">
					<span class="item-icon icon-account"></span>
					资金账户
					<span class="item-rigth-tips">
						<span class="iconfont iconjiantou"></span>
					</span>
				</navigator>
				<view @tap="fornext('Propayment')" class="item">
					<span class="item-icon icon-pay"></span>
					物业缴费
					<span class="item-rigth-tips">
						<span class="iconfont iconjiantou"></span>
					</span>
				</view>
				<view class="item" @tap="fornext('freightRules')">
					<span class="item-icon icon-freight"></span>
					运费管理
					<span class="item-rigth-tips">
						<span class="iconfont iconjiantou"></span>
					</span>
				</view>
				<navigator class="item">
					<span class="item-icon icon-about"></span>
					关于
					<span class="item-rigth-tips">
						<span class="iconfont iconjiantou"></span>
					</span>
				</navigator>
				<navigator class="item" url="/pages/user/setting/index">
					<span class="item-icon icon-setting"></span>
					安全设置
					<span class="item-rigth-tips">
						<span class="iconfont iconjiantou"></span>
					</span>
				</navigator>

				<!-- <view class="item" @tap="handleLoginOut">
					<span class="item-icon icon-sign-out"></span>
					退出登录
					<span class="item-rigth-tips">
						<span class="iconfont iconjiantou"></span>
					</span>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			resData: {},
			userInfo: {},
			hasUserInfo: false,
			status: '',
		};
	},
	onLoad() {},
	created() {
		this.status = uni.getStorageSync('status');
	},
	methods: {
		handleLoginOut() {
			const that = this;
			uni.showModal({
				title: '',
				content: '确认是否退出登录 ？',
				success: (res) => {
					if (res.confirm) {
						// window.console.log('用户点击确定');
						that.$store.dispatch('user/logout');
						uni.navigateTo({
							url: './new-login/index',
						});
					} else if (res.cancel) {
						// window.console.log('用户点击取消');
					}
				},
			});
		},
		fornext(type) {
			const status = uni.getStorageSync('status');
			switch (status) {
				case '0':
					uni.navigateTo({ url: '/pages/user/new-login/index' });
					break;
				case '1':
					uni.navigateTo({ url: '/pages/user/my-shop/index' });
					break;
				case '2':
					uni.navigateTo({ url: '/pages/user/my-shop/index' });
					break;
				case '3':
					if (type === 'myshop') {
						uni.navigateTo({ url: '/pages/user/my-shop/index' });
					} else if (type === 'account') {
						uni.navigateTo({ url: '/pages/user/my-shop/index' });
					} else if (type === 'Propayment') {
						uni.navigateTo({ url: '/pages/user/property-payment/all/index' });
					} else if (type === 'freightRules') {
						uni.navigateTo({ url: '/pages/user/freight-rules/index' });
					}

					break;
			}
		},
		// 登录/注册
		loginPone() {
			uni.navigateTo({ url: '/pages/user/new-login/index' });
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
.userinfo {
	background: $uni-color-main;
	display: flex;
	align-items: center;
	padding: 60rpx $uni-spacing-lg 120rpx;
	color: #fff;
	.iconyonghuming {
		background: #fff;
		border-radius: $uni-border-radius-circle;
		text-align: center;
		line-height: 110rpx;
		@include iconBase64Background($icon-user-image, 80rpx, 80rpx);
	}
	.info-content {
		position: relative;
		flex: 1;
		font-size: 40rpx;
		color: #fff;
		padding-left: $uni-spacing-base;
	}

	.user-name {
		font-size: 32rpx;
		margin: 0 0 4rpx;
	}
}

.info-list {
	position: relative;
	top: -72rpx;
	padding: 0 $uni-spacing-lg $uni-spacing-lg;
	.info-list-cells {
		background: $uni-bg-color;
		border-radius: 16rpx;
	}
	.item {
		padding: $uni-spacing-lg;
		overflow: hidden;
		font-size: $uni-font-size-lg;
		color: $uni-text-color-black;
		&:last-child {
			border-bottom: none;
		}
	}
	.item-icon {
		position: relative;
		top: -2px;
		margin-right: 14rpx;
		vertical-align: middle;
	}
	.icon-store {
		@include iconBase64Background($icon-user-store, 44rpx, 44rpx);
	}
	.icon-account {
		@include iconBase64Background($icon-user-account, 44rpx, 44rpx);
	}
	.icon-pay {
		@include iconBase64Background($icon-user-pay, 44rpx, 44rpx);
	}
	.icon-setting {
		@include iconBase64Background($icon-user-setting, 44rpx, 44rpx);
	}
	.icon-about {
		@include iconBase64Background($icon-user-about, 44rpx, 44rpx);
	}
	.icon-freight {
		@include iconBase64Background($icon-user-freight, 44rpx, 44rpx);
	}

	.iconjiantou {
		font-size: $uni-font-size-base;
		color: $uni-text-color-grey;
	}

	.item-rigth-tips {
		float: right;
	}
}
</style>
