<template>
	<!-- 进度条 -->
	<view class="store-progress">
		<view class="progress-box">
			<view class="step-default by-actice">
				<view class="step-des">
					<view class="step-top">1</view>
					<view class="step-bottom">申请入驻</view>
				</view>
				<view class="step-line"></view>
			</view>
			<view class="step-default" :class="stepsTwo">
				<view class="step-des">
					<view class="step-top">2</view>
					<view class="step-bottom">运营平台审核</view>
				</view>
				<view class="step-line"></view>
			</view>
			<view class="step-default" :class="stepsThird">
				<view class="step-des">
					<view class="step-top">3</view>
					<view class="step-bottom">支付平台审核</view>
				</view>
				<view class="step-line"></view>
			</view>
			<view class="step-default" :class="stepsFour">
				<view class="step-des">
					<view class="step-top">4</view>
					<view class="step-bottom">签约</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
const activeClass = ['by-actice', 'audit-actice', 'fail-active'];
export default {
	data() {
		return {
			// applyProgress: this.$store.state.user.applyProgress.applyStatus,
		};
	},
	computed: {
		applyProgress() {
			return this.$store.state.user.applyProgress.applyStatus;
		},
		stepsTwo() {
			let active = '';
			if (this.applyProgress === 2) {
				active = activeClass[1];
			} else if (this.applyProgress === 3) {
				active = activeClass[2];
			} else if (this.applyProgress > 3) {
				active = activeClass[0];
			}
			return active;
		},
		stepsThird() {
			let active = '';
			if (this.applyProgress === 4 || this.applyProgress === 5) {
				active = activeClass[1];
			} else if (this.applyProgress === 6) {
				active = activeClass[2];
			} else if (this.applyProgress > 6) {
				active = activeClass[0];
			}
			return active;
		},
		stepsFour() {
			let active = '';
			if (this.applyProgress === 7 || this.applyProgress === 8) {
				active = activeClass[1];
			}
			return active;
		},
	},
};
</script>
<style lang="scss" scoped>
.store-progress {
	margin: 0 32rpx;
	padding-top: 16px;
	text-align: center;
}
.progress-box {
	display: flex;
	// justify-content: space-between;
}
.step-default {
	position: relative;
	width: 25%;
}
.step-des {
	position: relative;
	z-index: 1;
}

.step-top {
	width: 32rpx;
	height: 32rpx;
	margin: 0 auto;
	font-size: 20rpx;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	background-color: rgba(201, 206, 214, 1);
	line-height: 28rpx;
	border-radius: 50%;
}
.step-bottom {
	margin-top: 10rpx;
	font-size: 24rpx;
	font-weight: 400;
	color: rgba(201, 206, 214, 1);
	line-height: 33rpx;
}
.step-line {
	position: absolute;
	top: 16rpx;
	left: 50%;
	width: 100%;
	height: 2rpx;
	background: rgba(201, 206, 214, 1);
	z-index: 0;
}
// 通过状态
.by-actice {
	.step-top {
		font-size: 0;
		background-image: $icon-correct;
		background-size: 100%;
	}
	.step-bottom {
		color: #12cb8e;
	}
}
// 审核中
.audit-actice {
	.step-top {
		background-color: #5ed2ff;
	}
	.step-bottom {
		color: #5ed2ff;
	}
}
// 失败状态
.fail-active {
	.step-top {
		font-size: 0;
		background-image: $icon-close;
		background-size: 55%;
		background-color: #ed2727;
		background-position: center;
		background-repeat: no-repeat;
	}
	.step-bottom {
		color: #ed2727;
	}
}
</style>
