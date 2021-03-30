<template>
	<view>
		<!-- 暂无资金账户 -->
		<view class="no-fund" v-if="isStatus === 1">
			<view class="mall-img"> </view>
			<text>暂无资金账户</text>
		</view>
		<!-- 资金账户 -->
		<view class="is-fund" v-else>
			<view class="fund-card">
				<view class="card-box">
					<view class="card-top">
						<view class="card-top-item">
							<view>
								<img src="" alt="" />
								<text>{{ userPhone }}</text>
							</view>
						</view>
						<view>
							<view class="last-balance">冻结余额</view>
							<view class="last-balance-num">&yen;&nbsp;{{ freezeBalance }}</view>
						</view>
					</view>
					<view class="card-bottom">
						<view class="real-balance">可用余额</view>
						<view class="card-real">
							<view class="real-balance-num">&yen;&nbsp;{{ realBalance }}</view>
							<view class="car-boottom-right" @click="checkTransac"><text>交易明细</text><span class="iconfont iconjiantou"> </span></view>
						</view>
					</view>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="fund-btn">
				<!-- 按钮类型 提现 重新绑定 查看详情-->
				<button type="main" @click="foundBtn">{{ btnType[isStatus] }}</button>
			</view>
			<!-- 查看详情 结算账户绑定验证中，请验证通过后提现 -->
			<!-- 重新绑定 结算账户绑定失败，请改绑后提现 -->
			<view class="fund-reason">结算账户绑定失败，请改绑后提现</view>
		</view>
	</view>
</template>
<script>
import { AccountDetail, BankAccountDetail } from '@/api/user';
export default {
	data() {
		return {
			// 状态 1: 暂无资金账户 2：验证中 查看详情 3：验证成功 提现 4：验证失败 重新绑定
			isStatus: 1,
			btnType: ['', '', '查看详情', '提现', '重新绑定'],
			// 可用余额
			realBalance: 0,
			userPhone: this.$store.state.user.userInfo.mobile,
			// 冻结余额
			freezeBalance: 0,
		};
	},
	created() {
		const that = this;
		// 资金账户 资金账户明细
		AccountDetail().then((res) => {
			if (res.code === 200) {
				const getData = res.data;
				that.realBalance = getData.availableBalance;
				that.freezeBalance = getData.availableBalance;
			}
		});
		// 结算账户详情
		BankAccountDetail().then((res) => {
			if (res.code === 200 && res.data) {
				// 状态 1:暂无资金账户 2：验证中 查看详情 3：验证成功 提现 4：验证失败 重新绑定
				switch (res.data.status) {
					case 2:
						that.isStatus = 2;
						break;
					case 3:
						that.isStatus = 3;
						break;
					case 4:
						that.isStatus = 4;
						break;
				}
				const getData = JSON.stringify(res.data);
				uni.setStorage('businessBankAccount', getData);
			}
		});
	},
	methods: {
		// 点击按钮
		foundBtn() {
			// 状态 1:待验证 2：验证中 查看详情 3：验证成功 提现 4：验证失败 重新绑定
			let url = '';
			switch (this.isStatus) {
				case 3:
					url = '/pages/user/withdrawal/index';
					break;
				case 4:
					url = '/pages/user/change-account/index';
					break;
				case 2:
					url = '/pages/user/account-details/index';
					break;
			}
			uni.navigateTo({ url });
		},
		// 点击交易明细
		checkTransac() {
			uni.navigateTo({ url: '/pages/user/transaction-details/index' });
		},
	},
};
</script>
<style lang="scss" scoped>
page {
	background-color: $uni-bg-color-grey;
}
// 暂无资金账户
.no-fund {
	display: flex;
	flex-direction: column;
	align-items: center;

	text {
		margin-top: 24rpx;
		font-size: 32rpx;
		font-weight: 400;
		color: rgba(97, 107, 128, 1);
		line-height: 44rpx;
	}
}
.mall-img {
	margin-top: 168rpx;
	width: 272rpx;
	height: 272rpx;
	background-image: $icon-capital-account-none;
	background-size: 100%;
	background-repeat: no-repeat;
}

// 资金账户
.fund-card {
	padding: 72rpx 32rpx 0;
}
.card-box {
	box-sizing: border-box;
	width: 686rpx;
	height: 320rpx;
	padding: 32rpx;
	background-image: $card-capital-account;
	background-size: 102%;
	background-repeat: no-repeat;
	background-position: center;
	border-radius: 16rpx;
}
.card-top,
.card-real {
	display: flex;
	justify-content: space-between;
}
.card-top-item {
	img {
		width: 64rpx;
		height: 64rpx;
		overflow: hidden;
	}
	text {
		padding-top: 16rpx;
		margin-left: 10rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		line-height: 33rpx;
	}
}
.last-balance {
	font-size: 28rpx;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	line-height: 40rpx;
}
.last-balance-num {
	margin-top: 16rpx;
	font-size: 36rpx;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
	line-height: 50rpx;
}
.card-real {
	align-items: flex-end;
}
.real-balance {
	margin-top: 32rpx;
	font-size: 28rpx;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	line-height: 40rpx;
}
.card-real {
	margin-top: 16rpx;
}
.real-balance-num {
	font-size: 54rpx;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
	line-height: 75rpx;
}
.car-boottom-right {
	color: rgba(255, 255, 255, 1);
	text {
		margin-right: 10rpx;
		font-size: 28rpx;
		font-weight: 400;
		line-height: 40rpx;
	}
}

// 按钮
.fund-btn {
	margin-top: 154rpx;

	button {
		width: 272rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin: 0 auto;
		border-radius: 40px;
	}
}
.fund-reason {
	margin-top: 32rpx;
	font-size: 28rpx;
	text-align: center;
	font-weight: 400;
	color: rgba(153, 160, 173, 1);
	line-height: 44rpx;
}
</style>
