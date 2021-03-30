<template>
	<view>
		<view class="refund_box">
			<view class="refund_top">
				<view class="refund_title">
					是否确定退款
				</view>
				<view class="close_pop" @tap="closePop"> </view>
			</view>
			<view class="refund_moddle">
				<view class="refun_content">
					输入想要退款的金额
				</view>
			</view>
			<view class="input">
				<view class="refund_input">
					<input type="digit" min="0.01" @input="lim" v-model="refundAmount" />
				</view>
				<view class="btn" @tap="all"> 全部 </view>
			</view>
			<view class="refund_foot">
				<button @click="refundConfirm">确认退款</button>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		orderPrice: {
			type: Number,
			default: 0,
		},
		orderId: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			refundAmount: '',
		};
	},
	methods: {
		lim(e) {
			const that = this;
			// 允许输入一个小数点
			e.detail.value = e.detail.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
			// 允许输入两位小数
			e.detail.value = e.detail.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
			// 如果金额没有小数点，并且值不等于空，则返回浮点数
			if (e.detail.value.indexOf('.') < 0 && e.detail.value !== '') {
				e.detail.value = parseFloat(e.detail.value);
				// 如果第一位为小数点，则转换为0. 只保留一个小数点
			} else if (e.detail.value.indexOf('.') === 0) {
				e.detail.value = e.detail.value.replace(/[^$#$]/g, '0.');
				e.detail.value = e.detail.value.replace(/\.{2,}/g, '.');
			}
			// 这里计时器必须使用，不然input框中不会显示校验过的值，只显示你输入的值
			if (e.detail.value >= that.orderPrice) {
				e.detail.value = that.orderPrice;
			}
			if (e.detail.value <= 0) {
				e.detail.value = 0;
			}
			setTimeout(() => {
				that.refundAmount = e.detail.value;
			}, 80);
			// 这里计时器必须使用，不然input框中不会显示校验过的值，只显示你输入的值
		},
		all() {
			this.refundAmount = this.orderPrice;
		},
		closePop() {
			this.refundAmount = '';
			this.$emit('closePop');
		},
		refundConfirm() {
			this.$emit('refundConfirm', this.refundAmount, this.orderId);
			this.refundAmount = '';
		},
	},
};
</script>
<style lang="scss">
.refund_box {
	width: 710rpx;
	background: #fff;
	border-radius: 16rpx;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 0 12rpx;
	.refund_top {
		height: 140rpx;
		border-bottom: 1rpx solid #ebeef5;
		position: relative;
		.refund_title {
			font-size: 32rpx;
			font-weight: 500;
			color: #141f33;
			line-height: 140rpx;
			text-align: center;
		}
		.close_pop {
			width: 32rpx;
			height: 32rpx;
			background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAZNJREFUSA3Fl7FVwzAQhnVyAyUFM4QOqixAwQgUWSA7QAfswAIUjEDBAi54pOGRygOkSEllC/8WQg7R2XfGBhXW2b77P51kyRIVRXGw2X5cOaITsvZ+fjp7NhOUfLU+d1W1JOfej48O7yh/ebtxxlx7FpU1fDE/mz2Oyc5f15c19MEYl0GXjLm1yDRCXAYHOMZnv7N+QqEGpkX31m0oo/x48BQULDAtxhTdOza8A7pomCHTTkflmEu06nGORRIQvdOWVGMHDClpYAqrid0DD4VroGAkwVq4FtoJlsKHQHvBfXC8b69IuP+ap72rH9vVXsRfuaz8W78Melu+5IrAEE3DPU4Lhb8YDGceLs8UOijWV39/FWfMZxsarctaBE5Dwx9too+Lg/o/2kTTqQsadikSnzAY7Zrtao2gxjfAk+AhQtqYPbBWIGSAWhO7A9YEtoFtW6rxDZYGtCGcLdFqwBJHDsI979OkZodfVk9hs+2FdKuQGp7ZC4tjxRRQNAZzndk6Ly3OMrHF42Qa9dJwMOm/Dm2fcJ3xTK9CvOkAAAAASUVORK5CYII=');
			background-size: 100% 100%;
			position: absolute;
			top: 32rpx;
			right: 12rpx;
		}
	}
	.refund_moddle {
		padding-top: 32rpx;
		text-align: center;
		.refun_content {
			font-size: 28rpx;
			font-weight: 400;
			color: #99a0ad;
		}
	}
	.input {
		text-align: center;
		position: relative;
		width: 160rpx;
		margin: 24rpx auto;
		.refund_input {
			border-bottom: 2rpx solid #ebeef5;
			input {
				font-size: 36rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #616b80;
				line-height: 50rpx;
			}
		}
		.btn {
			position: absolute;
			top: -3rpx;
			right: -100rpx;
			width: 64rpx;
			height: 52rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #ff4771;
			line-height: 52rpx;
		}
	}
	.refund_foot {
		button {
			margin: 129rpx auto 36rpx;
			width: 230rpx;
			height: 80rpx;
			background: #ff4771;
			color: #fff;
			line-height: 80rpx;
			border-radius: 40rpx;
		}
	}
}
</style>
