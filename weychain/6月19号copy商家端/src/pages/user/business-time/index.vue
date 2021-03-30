<template>
	<view class="business-time">
		<!-- 编辑联系电话 -->
		<view class="phone" v-if="type == 1">
			<view class="time-box">
				<view class="time-title">编辑店铺联系电话</view>
				<input type="text" v-model="phone" />
			</view>
		</view>
		<!-- 编辑店铺简介 -->
		<view class="intro" v-if="type == 2">
			<view class="time-box">
				<view class="time-title">编辑店铺简介</view>
				<textarea v-model="intro"></textarea>
			</view>
		</view>
		<!-- 编辑营业时间 -->
		<view v-if="type == 3">
			<!-- 时间列表 -->
			<view class="time-box" v-for="(item, index) in tiemData" :key="index">
				<view class="time-title">营业时间{{ index + 1 }}</view>
				<view class="choose-time">
					<view class="start-time">
						<picker mode="time" :value="item.startT" start="00:01" end="23:59" @change="bindTimeChange($event, item, 'startT')">
							<view class="time-input">
								<input type="text" disabled="disabled" :value="item.startT" placeholder="开始时间" />
							</view>
						</picker>
					</view>
					<view class="time-middle">至</view>
					<view class="end-time">
						<picker mode="time" :value="item.endT" start="00:01" end="23:59" @change="bindTimeChange($event, item, 'endT')">
							<view class="time-input">
								<input type="text" disabled="disabled" :value="item.endT" placeholder="结束时间" />
							</view>
						</picker>
					</view>
					<!-- 删除时间 -->
					<view class="del-time" @click="delTime(item, index)" v-if="index > 0"></view>
				</view>
			</view>
			<!-- 添加时间 -->
			<view class="add-time"><text @click="addTime">+添加时间</text></view>
		</view>
		<!-- 提交按钮 -->
		<view class="sub-btn"><button type="main" @click="submitTime">提交</button></view>
	</view>
</template>
<script>
import { MallBusinessLicenseUpload } from '@/api/user';
export default {
	data() {
		return {
			tiemData: [{ startT: '', endT: '' }],
			// type 1 编辑联系电话 2 编辑店铺简介 3 编辑营业时间
			type: 0,
			intro: '',
			phone: '',
		};
	},
	onShow() {
		this.storeData = JSON.parse(uni.getStorageSync('storeData'));
		this.intro = this.storeData.storeBriefDesc ? this.storeData.storeBriefDesc : '';
		this.phone = this.storeData.shopContactNo ? this.storeData.shopContactNo : '';
		if (this.storeData.bizTimeRange) {
			const getBizTimeRange = this.storeData.bizTimeRange.split(',');
			// console.log(getBizTimeRange, 'getBizTimeRange');
			getBizTimeRange.map((item, index) => {
				this.tiemData[index] = {
					startT: item.split('~')[0],
					endT: item.split('~')[1],
				};
			});
		}
	},
	onLoad(options) {
		if (options.type) {
			// type 1 编辑联系电话 2 编辑店铺简介 3 编辑营业时间
			// console.log(options.type, 'type');
			this.type = options.type;
			switch (this.type) {
				case '1':
					// console.log(options.type, 'type');
					uni.setNavigationBarTitle({ title: '编辑联系电话' });
					break;
				case '2':
					// console.log(options.type, 'type编辑店铺简介');
					uni.setNavigationBarTitle({ title: '编辑店铺简介' });
					break;
				case '3':
					// console.log(options.type, 'type编辑营业时间');
					uni.setNavigationBarTitle({ title: '编辑营业时间' });
					break;
			}
		}
	},
	methods: {
		// 提交
		submitTime() {
			// console.log('提交');
			const that = this;
			uni.showLoading({
				title: '提交中...',
				mask: true,
			});
			let postData = {};
			let tiemData = [];

			const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;

			switch (this.type) {
				case '1':
					if (!this.phone) {
						uni.showToast({
							title: '电话不能为空',
							duration: 1500,
						});
						return false;
					}
					if (!myreg.test(this.phone)) {
						uni.showToast({
							title: '请输入正确的手机号码',
							duration: 1500,
							icon: 'none',
						});
						return false;
					}

					this.storeData.shopContactNo = this.phone;

					postData = { shopContactNo: this.phone };
					break;
				case '2':
					if (!this.intro) {
						uni.showToast({
							title: '简介不能为空',
							duration: 1500,
						});
						return false;
					}
					this.storeData.storeBriefDesc = this.intro;

					postData = { storeShortName: this.intro };
					break;
				case '3':
					this.tiemData.map((item) => {
						tiemData.push(`${item.startT}~${item.endT}`);
					});
					tiemData = tiemData.join(',');

					this.storeData.bizTimeRange = tiemData;
					postData = { bizTimeRange: tiemData };
					break;
			}

			MallBusinessLicenseUpload(postData)
				.then((res) => {
					uni.hideLoading();

					uni.showToast({
						title: res.message,
						duration: 1500,
					});

					uni.setStorageSync('storeData', JSON.stringify(that.storeData));

					uni.navigateBack();
				})
				.catch((err) => {
					uni.hideLoading();

					uni.showToast({
						title: err.message,
						duration: 1500,
					});
				});
		},
		// 时间选择
		bindTimeChange: function (e, item, key) {
			item[key] = e.target.value;
		},
		// 添加时间
		addTime() {
			this.tiemData.push({ startT: '', endT: '' });
		},
		// 删除时间
		delTime(item, index) {
			this.tiemData.splice(index, 1);
		},
	},
};
</script>
<style lang="scss" scoped>
page {
	background-color: $uni-bg-color-grey;
}
.business-time {
	margin-bottom: 140rpx;
}
// 时间列表
.time-box {
	padding: 32rpx;
	margin-top: 24rpx;
	background-color: #fff;
}
.time-title {
	font-size: 28rpx;
	font-weight: 500;
	color: rgba(97, 107, 128, 1);
	line-height: 40rpx;
}
.choose-time {
	display: flex;
	padding-top: 16rpx;

	.time-input {
		width: 234rpx;
		padding-bottom: 17rpx;
		border-bottom: 2rpx solid #eceff5;
	}
}
.time-middle {
	margin: 0 32rpx;
	font-size: 36rpx;
	font-weight: 400;
	color: rgba(97, 107, 128, 1);
	line-height: 50rpx;
}
// 删除时间
.del-time {
	width: 32rpx;
	height: 32rpx;
	margin-left: auto;
	// background-color: darkcyan;
	background-image: $icon-clear;
	background-size: 100%;
}
// 添加时间
.add-time {
	text-align: right;
	margin-top: 16rpx;
	margin-right: 32rpx;
	text {
		font-size: 32rpx;
		font-weight: 400;
		color: rgba(18, 203, 142, 1);
		line-height: 45rpx;
		cursor: pointer;
	}
}
// 提交按钮
.sub-btn {
	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
	margin: 0 32rpx;
	button {
		border-radius: $uni-border-radius-lg60;
	}
}

textarea {
	width: 100%;
	height: 100&;
	font-size: 32rpx;
	font-weight: 400;
	color: rgba(37, 37, 37, 1);
	line-height: 45rpx;
}
</style>
