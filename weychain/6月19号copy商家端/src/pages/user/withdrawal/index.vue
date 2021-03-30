<template>
	<!-- 提现 -->
	<view>
		<!-- 到账账户 -->
		<view class="list-box">
			<view class="list-top">到账账户</view>
			<view class="list-content" v-show="isStatus === 3">
				工商银行（4545）
				<span class="riht-bottom"><span class="iconfont iconjiantou"> </span></span>
			</view>
			<view class="list-content no-bing" v-show="isStatus !== 3">
				{{ bindTips }}
				<span class="riht-bottom right-bing">{{ bindRightBtn }}</span>
			</view>
		</view>
		<!-- 提现金额（元） -->
		<view class="list-box">
			<view class="list-top withdrawal-money">提现金额（元）</view>
			<view class="list-content">
				<input type="text" placeholder="请输入xxxx" />
				<span v-show="isStatus === 3" class="riht-bottom all-withdrawal" @click="allWithdrawal">全部提现</span>
			</view>
		</view>
		<view class="tips">可提现金额：<text>4555.00</text>元</view>
		<!-- footer -->
		<view class="footer">
			<view class="footer-top" @click="checkRecord">查看提现记录</view>
			<view class="footer-btn">
				<button type="main" :class="{ 'sub-none': isStatus !== 3 }" @click="sub">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
const bindBtnArr = ['', '立即绑定', '', '', '重新绑定', ''];
const bindTipsArr = ['', '提现账户未绑定，请绑定后提现', '结算账户绑定验证中，请验证通过后提现', '', '提现账户绑定失败，请重新绑定', ''];
export default {
	data() {
		return {
			// 状态 1: 暂无资金账户 2：验证中 查看详情 3：验证成功 提现 4：验证失败 重新绑定
			isStatus: 3,
		};
	},
	computed: {
		// 绑定失败 提示语
		bindTips() {
			return bindTipsArr[this.isStatus];
		},
		// 绑定失败 按钮
		bindRightBtn() {
			return bindBtnArr[this.isStatus];
		},
	},
	onLoad() {},
	onShow() {
		let getData = uni.getStorageSync('businessBankAccount');
		if (getData) {
			getData = JSON.parse(getData);
			this.accountData = getData;
			switch (getData.status) {
				case 2:
					this.isStatus = 2;
					break;
				case 3:
					this.isStatus = 3;
					break;
				case 4:
					this.isStatus = 4;
					break;
			}
		}
	},
	methods: {
		// 查看提现记录
		checkRecord() {
			uni.navigateTo({ url: '/pages/user/withdrawal-number/index' });
		},
		// 提交
		sub() {},
		// 全部提现
		allWithdrawal() {},
	},
};
</script>
<style lang="scss" scoped>
page {
	background: #fff;
}

.list-box {
	padding: 32rpx;
}
.list-box + .list-box {
	margin-top: 32rpx;
}
.list-top {
	font-size: 28rpx;
	color: #616b80;
}
.list-content {
	margin-top: 16rpx;
	font-size: 32rpx;
	color: #252525;
	padding-bottom: 18rpx;
	border-bottom: 1rpx solid #eceff5;
}

.list-content input {
	padding-right: 100rpx;
}
span.riht-bottom {
	float: right;
}
// 提现金额（元）
.withdrawal-money {
	font-size: 28rpx;
	color: #616b80;
}

// 可提现金额：4555.00元
.tips {
	margin-left: 32rpx;
	font-size: 24rpx;
	color: #616b80;

	text {
		font-size: 24rpx;
		color: #12cb8e;
	}
}

// 全部提现
.all-withdrawal {
	margin-top: -16px;
	font-size: 24rpx;
	color: #ff4771;
}

// 绑定按钮
.no-bing {
	font-size: 28rpx;
	color: #99a0ad;
}
.right-bing {
	margin-top: -4px;
	padding: 10rpx 18rpx;
	font-size: 28rpx;
	color: #ffffff;
	background: #ff4771;
	border-radius: 30rpx;
}

// footer
.footer {
	position: fixed;
	width: 100%;
	bottom: 40rpx;
}

.footer-top {
	font-size: 28rpx;
	color: #ff4771;
	text-align: center;
}
.footer-btn {
	margin: 0 32rpx;
	margin-top: 48rpx;

	button {
		border-radius: 48rpx;
	}
}

.sub-none {
	opacity: 0.4;
	pointer-events: none;
}
</style>
