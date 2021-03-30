<template>
	<!-- 结算账户详情 -->
	<view>
		<!-- 账户类型 -->
		<view class="list-box">
			<view class="list-top">账户类型</view>
			<view class="list-content">{{ accountType[accountData.accountType] }}</view>
		</view>
		<!-- 开户银行 -->
		<view class="list-box">
			<view class="list-top">开户银行</view>
			<view class="list-content">{{ accountData.bankName }}</view>
		</view>
		<!-- 开户银行全称 -->
		<view class="list-box">
			<view class="list-top">开户银行全称</view>
			<view class="list-content">{{ accountData.bankFullName }}</view>
		</view>
		<!-- 银行账号 -->
		<view class="list-box">
			<view class="list-top">银行账号</view>
			<view class="list-content">{{ bankNo }}</view>
		</view>
		<!-- footer -->
		<view class="footer">
			<view class="footer-btn">
				<button type="main" @click="sub">改绑</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			accountData: {},
			// 账户类型：1、对私；2、对公,
			accountType: ['', '对私账户', '对公账户'],
		};
	},
	computed: {
		bankNo() {
			const getaccountNo = this.accountData.accountNo;
			if (getaccountNo) {
				const getStr = `${getaccountNo.substr(0, 4)} ${getaccountNo.substr(4, 4)} ${getaccountNo.substr(8, 4)} ${getaccountNo.substr(
					12,
					4,
				)} ${getaccountNo.substr(16, 3)}`;
				return getStr;
			} else {
				return '';
			}
		},
	},
	onLoad() {},
	onShow() {
		let getData = uni.getStorageSync('businessBankAccount');
		if (getData) {
			getData = JSON.parse(getData);
			this.accountData = getData;
		}
	},
	methods: {
		// 改绑
		sub() {
			uni.navigateTo({ url: '/pages/user/change-account/index' });
		},
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

span.riht-bottom {
	float: right;
}

// footer
.footer {
	position: fixed;
	width: 100%;
	bottom: 40rpx;
}

.footer-btn {
	margin: 0 32rpx;
	margin-top: 48rpx;

	button {
		border-radius: 48rpx;
	}
}
</style>
