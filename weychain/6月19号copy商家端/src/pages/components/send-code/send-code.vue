<template>
	<view class="module-send-code">
		<text class="button-code" :class="{ disclick: phone <= 0 }" @click="handleGetCode" v-show="!isDisabled">
			获取验证码
		</text>
		<text class="code-tips" v-show="isDisabled">{{ getCodeTitle }}</text>
	</view>
</template>

<script>
/**
 * productInfo 商品信息展示
 * @property {String} phone 手机号码
 * @property {Boolean} disabled 判断是否能点击
 * @example <sendCode :phone></sendCode>
 */
import { GetPhoneCode, SendUpdateOldPhoneCode, SendUpdatePhoneCode } from '@/api/index.js';
export default {
	props: {
		phone: {
			type: String,
			default: '',
		},
		phoneCorrect: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		codeType: {
			type: String,
			default: '1',
		},
	},
	data() {
		return {
			isDisabled: this.disabled,
			getCodeTitle: '',
			timeStart: '',
			timeEnd: '',
			second: '',
		};
	},
	watch: {
		// 监听props变化
		disabled(val) {
			this.isDisabled = !val;
		},
	},
	created() {
		if (uni.getStorageSync('nowTime')) {
			this.timeEnd = uni.getStorageSync('nowTime');
			this.timeStart = new Date().getTime();
			this.second = parseInt((this.timeStart - this.timeEnd) / 1000);
			// console.log('间隔时间', this.second);
		}

		if (uni.getStorageSync('time') && uni.getStorageSync('time') !== 0 && this.second < 60 && this.second > 0) {
			this.Interval();
		} else {
			// console.log('超时重置');
			uni.setStorageSync('nowTime', '');
			uni.setStorageSync('time', '60');
		}
	},
	methods: {
		/** 获取手机验证码**/
		handleGetCode() {
			const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			if (!myreg.test(this.phone)) {
				uni.showToast({
					title: '请输入正确的手机号码',
					duration: 1000,
					icon: 'none',
				});
				return false;
			}
			if (this.timer) {
				clearInterval(this.timer);
			}
			if (!uni.getStorageSync('nowTime')) {
				uni.setStorageSync('nowTime', new Date().getTime());
			}
			uni.setStorageSync('time', '60');
			this.Interval();
		},
		Interval() {
			if (!this.isDisabled) {
				let time = uni.getStorageSync('time');
				this.isDisabled = true;
				this.getCodeTitle = time + '秒重新获取';
				this.timer = setInterval(() => {
					time--;
					uni.setStorageSync('time', time);
					this.getCodeTitle = uni.getStorageSync('time') + '秒重新获取';
					// console.log(this.getCodeTitle);
					if (time === 0) {
						clearInterval(this.timer);
						this.getCodeTitle = '';
						this.isDisabled = false;
					}
				}, 1000);
				this.GetCode();
			}
		},
		GetCode() {
			const code = {
				phone: this.phone,
			};
			switch (this.codeType) {
				case '1':
					GetPhoneCode(code).then((codeStatus) => {
						if (codeStatus.code === 200) {
							uni.showToast({
								title: '发送成功',
								duration: 1500,
							});
						} else {
							uni.showToast({
								title: codeStatus.message,
								duration: 1500,
								icon: 'none',
							});
						}
					});
					break;
				case '2':
					SendUpdateOldPhoneCode(code).then((codeStatus) => {
						if (codeStatus.code === 200) {
							uni.showToast({
								title: '发送成功',
								duration: 1500,
							});
						} else {
							uni.showToast({
								title: codeStatus.message,
								duration: 1500,
								icon: 'none',
							});
						}
					});
					break;
				case '3':
					SendUpdatePhoneCode(code).then((codeStatus) => {
						if (codeStatus.code === 200) {
							uni.showToast({
								title: '发送成功',
								duration: 1500,
							});
						} else {
							uni.showToast({
								title: codeStatus.message,
								duration: 1500,
								icon: 'none',
							});
						}
					});
					break;
			}
			// GetPhoneCode(code).then((codeStatus) => {
			// 	// if (codeStatus.code === 200) {
			// 	// 	uni.showToast({
			// 	// 		title: codeStatus.message,
			// 	// 		duration: 1500,
			// 	// 	});
			// 	// } else {
			// 	// 	uni.showToast({
			// 	// 		title: codeStatus.message,
			// 	// 		duration: 1500,
			// 	// 	});
			// 	// }
			// });
		},
		clearCodeTime() {
			uni.setStorageSync('time', '0');
			clearInterval(this.timer);
		},
	},
	beforeDestroy() {
		if (this.timer) {
			clearInterval(this.timer);
		}
	},
};
</script>

<style lang="scss">
.module-send-code {
	.button-code {
		// padding: 8rpx 14rpx;
		font-size: $uni-font-size-lg;
		border-radius: 4px;
		color: #ff4771;
		// @include borderCreator('', solid, #ddd);
		&.active {
			color: $uni-color-main;
		}
		&.disclick {
			color: rgba(201, 206, 214, 1);
			pointer-events: none;
		}
	}

	.code-tips {
		@extend .button-code;
		color: #bbb;
	}
}
</style>
