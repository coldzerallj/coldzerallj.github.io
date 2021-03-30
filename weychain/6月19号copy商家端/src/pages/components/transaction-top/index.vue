<template>
	<!-- 交易 头部 时间 选择 -->
	<view class="transction-item">
		<view class="choose-box">
			<!-- 开始时间 -->
			<view>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="startTimeChange">
					{{ startTime }}
					<span class="right-icon"><span class="iconfont iconjiantou"> </span></span>
				</picker>
			</view>
			<!-- 结束时间 -->
			<view>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="endTimeChange">
					{{ endTime }}<span class="right-icon"><span class="iconfont iconjiantou"> </span></span
				></picker>
			</view>
			<!-- 交易类型 -->
			<view>
				<picker @change="bindPickerChange" :value="index" :range="arrayType">
					{{ transType }}<span class="right-icon"><span class="iconfont iconjiantou"> </span></span>
				</picker>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		isType: () => true,
	},
	data() {
		const currentDate = this.getDate({
			format: true,
		});
		return {
			startTime: '开始时间',
			endTime: '结束时间',
			transType: this.isType ? '交易类型' : '提现状态',
			date: currentDate,
			arrayType: ['交易类型1', '交易类型2', '交易类型3', '交易类型本3'],
			index: 0,
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		},
	},
	onLoad() {},
	methods: {
		// 日期选择器
		startTimeChange: function (e) {
			this.startTime = e.target.value;
		},
		endTimeChange: function (e) {
			this.endTime = e.target.value;
		},
		// 交易类型

		bindPickerChange: function (e) {
			// this.index = e.target.value;
			this.transType = this.arrayType[e.target.value];
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
	},
};
</script>
<style lang="scss" scoped>
.transction-item {
	padding: 28rpx 32rpx;
	background-color: #fff;
}

.choose-box {
	display: flex;
	justify-content: space-between;

	view {
		font-size: 32rpx;
		color: #616b80;
	}
	.right-icon {
		display: inline-block;
		margin-left: 26rpx;
		color: #616b80;
		transform: rotate(90deg);
	}
}
</style>
