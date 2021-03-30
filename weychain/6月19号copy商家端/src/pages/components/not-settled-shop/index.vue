<template>
	<view class="not-settled-shop">
		<!-- 步骤条 -->
		<storeProgress v-if="applyProgress.applyStatus !== 1"></storeProgress>
		<!-- 未入驻状态 -->
		<view class="not-settle-in" v-if="applyProgress.applyStatus === 1">
			<view class="top-icon">
				<!-- <img src="" alt="not-settled-shop-icon" /> -->
			</view>
			<view class="middle-tips">您的店铺尚未入驻，暂不可出售商品， 请先入驻。</view>
			<view class="settled-btn"><button @click="settled" type="main">申请入驻</button></view>
			<view class="settlement-agreement">
				<checkbox-group @change="checkboxChange">
					<label> <checkbox value="true" style="transform: scale(0.7);" />同意</label><span @click="toProtocol">《入驻协议》</span>
				</checkbox-group>
			</view>
		</view>
		<!-- 运营平台待审核 运营平台审核不通过 -->
		<view class="audit" v-else-if="applyProgress.applyStatus === 2 || applyProgress.applyStatus === 3">
			<view v-show="applyProgress.applyStatus === 2">
				<view class="top-icon">
					<!-- <img src="" alt="not-settled-shop-icon" /> -->
				</view>
				<view class="middle-tips">您的入驻申请已提交，平台审核中， 请耐心等待。</view>
				<view class="settled-btn"><button type="main" @click="checkInfo">查看已提交资料</button></view>
			</view>
			<view class="audit-fail" v-show="applyProgress.applyStatus === 3">
				<view class="middle-title fail-title">您的资料审核未通过，原因如下：</view>
				<view class="fail-reason reason">{{ applyProgress.failureReason }}</view>
				<view class="audit-fail-footer">
					<view class="normal-btn" @click="checkInfo">查看已提交资料</view>
					<view class="active-btn" @click="reApply">重新申请</view>
				</view>
			</view>
		</view>
		<!-- 支付平台待审核  支付平台审核不通过-->
		<view
			class="audit-fail"
			v-else-if="applyProgress.applyStatus === 4 || applyProgress.applyStatus === 5 || applyProgress.applyStatus === 6"
		>
			<view v-show="applyProgress.applyStatus !== 6">
				<view class="top-icon">
					<!-- <img src="" alt="not-settled-shop-icon" /> -->
				</view>
				<view class="middle-tips">您的入驻申请已提交，平台审核中， 请耐心等待。</view>
				<view class="settled-btn"><button type="main" @click="checkInfo">查看已提交资料</button></view>
			</view>
			<view v-show="applyProgress.applyStatus === 6">
				<view class="middle-title fail-title">您的资料审核未通过，原因如下：</view>
				<view class="fail-reason reason">{{ applyProgress.failureReason }}</view>
				<view class="audit-fail-footer">
					<view class="normal-btn" @click="checkInfo">查看已提交资料</view>
					<view class="active-btn" @click="reApply">重新申请</view>
				</view>
			</view>
		</view>
		<!-- 待法人验证 -->
		<view class="verification" v-else-if="applyProgress.applyStatus === 7">
			<view class="middle-title">您的资料审核已通过！</view>
			<view class="reason">
				<view>您的申请资料审核通过，微信支付平台将对你绑定的银行账户进行验证。</view>
				<view>
					请用运营主体法人代表（{{ applyProgress.realName }}）的微信号扫码进行验证（法人微信支付绑定的姓名必须和经营者或者法人相同）
				</view>
			</view>
			<!-- 二维码 -->
			<view class="qr">
				<!-- <img :src="legalValidationUrlImg" alt="qr-code" /> -->
				<canvas @click="previewImage" id="verification-qr" style="width: 210px; height: 210px;" canvas-id="verification-qr"></canvas>
			</view>
			<view class="verification-btn">
				<view class="normal-btn" @click="checkInfo">查看已提交资料</view>
				<view class="active-btn" @click="saveQr('verification-qr')">保存二维码</view>
			</view>
			<!-- <view class="verification-footer">我是法人代表，直接<text @click="openUrl(applyProgress.legalValidationUrl)">去验证</text></view> -->
		</view>
		<!-- 待签约 -->
		<view class="sign" v-else-if="applyProgress.applyStatus === 8">
			<view class="middle-title">您的资金账户已开通，详情如下：</view>
			<view class="card-number">
				二级商户号：<text>{{ applyProgress.subMerchantNo }}</text>
			</view>
			<!-- <view class="card-number">结算银行卡号：<text>sdf</text></view> -->
			<view class="reason">请用超级管理员（{{ applyProgress.superAdminName }}）用微信扫码二维码，完成签约操作。</view>
			<!-- 二维码 -->
			<view class="qr">
				<!-- <img :src="signUrlImg" id="signUrlImg" /> -->
				<canvas @click="previewImage" id="sing-qr" style="width: 210px; height: 210px;" canvas-id="sing-qr"></canvas>
			</view>
			<view class="verification-btn">
				<view class="normal-btn" @click="checkInfo">查看已提交资料</view>
				<view class="active-btn" @click="saveQr('sing-qr')">保存二维码</view>
			</view>
			<!-- <view class="verification-footer">我是超级管理员，直接<text @click="openUrl(applyProgress.signUrl)">去验证</text></view> -->
		</view>
		<!-- <img id="bbbbb" style="display: none;" alt="" /> -->
	</view>
</template>
<script>
// 二维码
import uQRCode from '@/js_sdk/uqrcode.js';
import storeProgress from './store-progress';

export default {
	components: {
		storeProgress,
	},
	data() {
		return {
			agree: false,
			legalValidationUrlImg: '',
			signUrlImg: '',
			// applyProgress: this.$store.state.user.applyProgress,
		};
	},
	computed: {
		applyProgress() {
			return this.$store.state.user.applyProgress;
		},
	},
	// created() {
	watch: {
		applyProgress() {
			// this.$set(this.applyProgress, 'applyStatus', '7');
			// this.createQr('verification-qr', 'http://www.baidu.com', 'legalValidationUrlImg');

			// this.$set()
			if (this.applyProgress.legalValidationUrl) {
				// console.log('222', this.applyProgress);
				// 待法人验证
				this.createQr('verification-qr', this.applyProgress.legalValidationUrl, 'legalValidationUrlImg');
			} else if (this.applyProgress.signUrl) {
				// console.log('333', this.applyProgress);
				// 待签约
				this.createQr('sing-qr', this.applyProgress.signUrl, 'signUrlImg');
			}
		},
	},
	onShow() {},
	onLoad() {},
	methods: {
		settled() {
			// console.log(this.agree, '点击申请入驻按钮');
			if (this.agree) {
				uni.navigateTo({ url: '/pages/user/apply-residence/index' });
			} else {
				uni.showToast({
					title: '请同意协议',
					icon: 'none',
				});
			}
		},
		checkboxChange(e) {
			this.agree = e.detail.value[0];
			// console.log(this.agree, 'this.agree');
		},
		// 入驻协议
		toProtocol() {
			uni.navigateTo({ url: '/pages/user/protocol/index' });
		},
		// 生成二维码
		createQr(id, url, imgUrl) {
			// console.log(66666);
			// console.log(id, url, imgUrl);
			const that = this;
			uQRCode.make({
				canvasId: id,
				componentInstance: this,
				text: url,
				backgroundColor: '#ffffff',
				foregroundColor: '#000000',
				size: 210,
				fileType: 'jpg',
				correctLevel: uQRCode.defaults.correctLevel,
				success: (res) => {
					// console.log(res);
					// res base64
					that[imgUrl] = res;
					// 生成弹出二维码
					// that[imgUrl] = convertCanvasToImage('法人代表长按识别二维码，进入验证页面', res);
					// console.log('sdf', convertCanvasToImage('法人代表长按识别二维码，进入验证页面', res));
				},
			});
		},
		// 去验证
		openUrl() {},
		// 保存二维码
		saveQr(id) {
			uni.showLoading({
				title: '图片保存中...',
			});
			uni.authorize({
				scope: 'scope.writePhotosAlbum',
				success() {
					// console.log('111111');

					uni.saveImageToPhotosAlbum();
				},
			});

			uni.saveImageToPhotosAlbum({
				filePath: this.legalValidationUrlImg || this.signUrlImg,
				success: function () {
					// console.log('save success');
					uni.showToast({ title: '保存图片成功' });
				},
			});
		},
		// 预览二维码
		previewImage() {
			// 预览图片
			uni.showLoading();
			uni.previewImage({
				current: 1,
				urls: this.legalValidationUrlImg || this.signUrlImg,
				complete: function () {
					uni.hideLoading();
				},
			});
		},
		// 查看已提交资料
		checkInfo() {
			uni.navigateTo({
				url: '/pages/user/apply-residence/confirm-detail/index',
			});
		},
		// 重新申请
		reApply() {
			uni.navigateTo({
				url: '/pages/user/apply-residence/index?type=1',
			});
		},
	},
};
</script>
<style lang="scss" scoped>
.not-settle-in {
	text-align: center;
}
.audit-fail-footer,
.verification-btn {
	display: flex;
	justify-content: center;

	view {
		height: 80rpx;
		min-width: 272rpx;
		max-width: 350rpx;
		font-size: 32rpx;
		font-weight: 500;
		line-height: 80rpx;
		border-radius: 40rpx;
		text-align: center;
	}

	.normal-btn {
		color: rgba(37, 37, 37, 1);
		background: rgba(240, 242, 245, 1);
	}
	.active-btn {
		margin-left: 32rpx;
		color: rgba(255, 255, 255, 1);
		background: rgba(255, 71, 113, 1);
	}
}
.top-icon {
	width: 174rpx;
	height: 174rpx;
	margin: 0 auto;
	padding-top: 400rpx;
	background-image: $icon-store;
	background-size: 100%;
	background-repeat: no-repeat;
	background-position: bottom;
	img {
		width: 174rpx;
		height: 174rpx;
	}
}
.middle-tips {
	width: 544rpx;
	height: 88rpx;
	margin: 0 auto;
	margin-top: 40rpx;
	font-size: 32rpx;
	font-weight: 400;
	color: rgba(97, 107, 128, 1);
	line-height: 44rpx;
	text-align: center;
}
.settled-btn {
	margin-top: 90rpx;
	margin-bottom: 32rpx;
	button {
		min-width: 272rpx;
		max-width: 350rpx;
		border-radius: $uni-border-radius-lg60;
	}
}
.settlement-agreement {
	font-size: 24rpx;
	font-weight: 400;
	color: rgba(201, 206, 214, 1);
	line-height: 52rpx;
	span {
		color: #12cb8e;
	}
}
.middle-title {
	font-size: 32rpx;
	font-weight: 400;
	color: rgba(97, 107, 128, 1);
	line-height: 44rpx;
}
.reason {
	font-size: 24rpx;
	font-weight: 400;
	color: rgba(153, 160, 173, 1);
	line-height: 44rpx;
}
// 审核失败
.audit-fail {
	padding: 0 32rpx;

	.fail-title {
		margin-top: 60rpx;
	}
	.fail-reason {
		min-height: 272rpx;
		margin-top: 16rpx;
	}
}
// 待法人验证
.verification {
	padding: 0 32rpx;
	.middle-title {
		margin-top: 56rpx;
	}

	.reason {
		margin-top: 16rpx;

		view + view {
			margin-top: 16rpx;
		}
	}
}

// 二维码
.qr {
	display: flex;
	position: relative;
	margin-top: 68rpx;
	text-align: center;
	height: 420rpx;
	overflow: hidden;
	justify-content: center;
	img {
		width: 420rpx;
		height: 420rpx;
		// position: absolute;
		// left: -60rpx;
		// top: -400rpx;
	}
	#sing-qr,
	#verification-qr {
		// width: 420rpx;
		// height: 420rpx;
		// margin: 0 auto;
		// visibility: hidden;
		// opacity: 0;
		// z-index: -1;
	}
}

.verification-btn {
	margin-top: 150rpx;
}

.verification-footer {
	margin-top: 48rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: rgba(201, 206, 214, 1);
	text-align: center;
	line-height: 52rpx;
	text {
		color: #12cb8e;
	}
}
// 待签约
.sign {
	padding: 0 32rpx;
	.middle-title {
		margin-top: 60rpx;
	}

	.card-number {
		margin-top: 16rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(97, 107, 128, 1);
		line-height: 44rpx;

		text {
			color: #252525;
		}
	}
	.reason {
		margin-top: 32rpx;
	}
}
</style>
