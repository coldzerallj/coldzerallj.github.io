<template>
	<view class="qiun-columns">
		<unoccupancy v-if="status == '2' || status == '1' || status == '0'" :type="status"></unoccupancy>
		<!-- <view>
			<button type="main" @tap="handle">授权微信通知</button>
		</view> -->
		<!-- <view>
			<button type="main" @tap="goApplyResidence">申请入驻</button>
		</view> -->
		<view class="tab-button">
			<view class="item" :class="{ active: index == curIndex }" v-for="(item, index) in tabList" :key="index" @click="handleTab(index)">
				{{ item }}
			</view>
			<navigator class="action-msg" url="../user/message/index">
				<!-- <text class="iconfont iconxiaoxi" /> -->
				<text class="icon-message"></text>
			</navigator>
		</view>
		<view class="selling-goods" v-show="curIndex == 0">
			<view>
				<view class="time-box">
					<view class="choose-time">
						<view class="start-time">
							<picker mode="date" value="" :start="startDate" :end="endDate" @change="bindTimeChange($event, 'timeStart')">
								<view class="time-input">
									<span class="date-icon"></span>
									<input
										class="date-input"
										disabled
										type="text"
										:value="timeStart"
										placeholder="开始时间"
										placeholder-class="uni-input-placeholder"
									/>
								</view>
							</picker>
						</view>
						<view class="time-middle"> 至 </view>
						<view class="end-time">
							<picker mode="date" value="" :start="startDate" :end="endDate" @change="bindTimeChange($event, 'timeEnd')">
								<view class="time-input">
									<span class="date-icon"></span>
									<input
										class="date-input"
										disabled
										type="text"
										:value="timeEnd"
										placeholder="结束时间"
										placeholder-class="uni-input-placeholder"
									/>
								</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="goods-amount">
					<view>销售总额（元）</view>
					<span> ¥{{ amount }} </span>
				</view>
				<!-- 进度条 -->
				<view class="uni-padding-wrap uni-common-mt">
					<view class="progress-box" v-for="(item, index) in gressList" :key="index">
						<view class="progress-title">
							<span>{{ item.productName }}</span>
							<span>{{ item.percentage }}%</span>
							<span>¥{{ item.orderGoodsPrice }} </span>
						</view>
						<progress
							:percent="item.percentage"
							:activeColor="activeColorList[index]"
							active
							stroke-width="5"
							:duration="second"
							backgroundColor="#EBEEF5"
						/>
					</view>
				</view>
			</view>
		</view>
		<view class="sales-amount" v-show="curIndex == 1">
			<view class="date-picke">
				<view class="particular">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" fields="year" @change="bindDateChange">
						<view class="date-line">{{ date }}</view>
					</picker>
				</view>
				<!-- <view class="date-month viewport" ref="date">
					<view class="month" v-for="(item, index) in items" :key="index">
						<span :class="{ active: index == choseIndex }" class="month-number" @tap="touchMonth(item, index)">{{ item }}</span>
					</view>
				</view> -->
				<view class="content">
					<scroll-view scroll-x="true" class="scroll" :scroll-left="moveWidth" :show-scrollbar="true">
						<view class="box" v-for="(item, index) in items" :key="index">
							<span :class="{ active: index == choseIndex }" class="month-number" @tap="touchMonth(index)">{{ item }}</span>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="date-amount">
				<view>当日销售金额（元）</view>
				<span> ¥{{ dayAmount }} </span>
			</view>
			<!-- <view class="qiun-charts" v-if="status === '3'"> -->
			<view>
				<canvas
					canvas-id="canvaLineA"
					id="canvaLineA"
					class="charts"
					disable-scroll="true"
					@touchstart="touchLineA"
					@touchmove="moveLineA"
					@touchend="touchEndLineA"
				></canvas>
			</view>
		</view>
	</view>
</template>

<script>
import uCharts from '@/js_sdk/u-charts.min.js';
import unoccupancy from '@/pages/components/un-occupancy/index';
import { getSaleGoods, getSaleAccount } from '@/api/index.js';
let _self;
let canvaLineA = null;
export default {
	components: { unoccupancy },
	data() {
		const currentDate = this.getDate({
			format: true,
		});
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			status: '',

			timeStart: '',
			timeEnd: '',
			moveWidth: '',
			refwidth: '',
			gressList: [
				// {
				// 	productName: '胡萝卜',
				// 	percentage: '60',
				// 	orderGoodsPrice: 249,
				// },
			], //  进度条百分比
			activeColorList: ['#EC756D', '#EC8C6D ', '#ECBC6D ', '#C9EC6D', '#6DEC71', '#6DECEC '],
			second: 10,
			tabList: ['销售前十商品', '每日销售金额'],
			curIndex: 0,
			choseIndex: -1,
			amount: 0, //  销售前十商品
			dayAmount: 0, //  每日销售金额
			otherAmount: 0, //  其它金额
			min: 0,
			max: 0,
			date: currentDate,
			items: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
			chartData: {
				categories: [], //  图表天数
				series: [
					{
						name: '当日销售金额',
						data: [20, 20, 20, 20, 20, 20, 20, 20],
						color: '#ff4771',
					},
				],
			},
		};
	},
	onShow() {
		this.status = uni.getStorageSync('status');
		this.touchMonth(new Date().getMonth());
		this.getSaleDay();
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		},
		times() {
			const { timeStart, timeEnd } = this;
			return {
				timeStart,
				timeEnd,
			};
		},
		dayTimes() {
			const { date, choseIndex } = this;
			return {
				date,
				choseIndex,
			};
		},
	},
	watch: {
		// 销售前十日期变化
		times(value) {
			// console.log('times', value, typeof value);
			if (value.timeStart !== '' && value.timeEnd !== '') {
				if (this.contrastTime(value.timeStart, value.timeEnd)) {
					this.getSaleTop();
				} else {
					uni.showToast({
						title: '请输入正确的时间区间',
						icon: 'none',
					});
				}
			}
		},
		// 每日销售金额变化
		dayTimes(value) {
			if (value.choseIndex !== -1) {
				// console.log('keyifaqingqiu', value, this.choseIndex + 1);
				// this.chartData.categories = [];
				this.chartData.series.data = [];
				this.getSaleDay();
			} else {
				uni.showToast({
					title: '请选择需要查询的月份',
					icon: 'none',
				});
			}
		},
	},
	onLoad() {
		this.uChartsObj();
	},
	methods: {
		handleTab(index) {
			this.curIndex = index;
		},
		bindDateChange: function (e) {
			this.date = e.target.value;
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			if (type === 'start') {
				year = year - 3;
			} else if (type === 'end') {
				year = year + 3;
			}
			return `${year}`;
		},
		// 时间选择
		bindTimeChange: function (e, type) {
			this[type] = e.target.value;
		},

		touchLineA(e) {
			canvaLineA.scrollStart(e);
		},
		moveLineA(e) {
			canvaLineA.scroll(e);
		},
		touchEndLineA(e) {
			const that = this;
			canvaLineA.scrollEnd(e);

			//  下面是toolTip事件，如果滚动后不需要显示，可不填写
			canvaLineA.showToolTip(e, {
				format: function (item, category) {
					that.dayAmount = item.data;
					return category + '号' + item.name + ':' + item.data + '元';
				},
			});
		},
		// 月份选择
		touchMonth(i) {
			// console.log('mmmm', m, i);
			const that = this;
			that.choseIndex = i;
			// let refwidth = '';
			// const adindex = i;
			const query = uni.createSelectorQuery().in(that);
			query
				.select('.content')
				.boundingClientRect((data) => {
					that.refwidth = data.width;

					const indexWidth = that.refwidth / 6;
					that.moveWidth = that.choseIndex * indexWidth;
				})
				.exec();
			// // const refwidth = document.getElementsByClassName('date-month')[0].offsetWidth;
			// const refwidth = this.$refs['date'];
		},
		// 获取销售前十商品
		getSaleTop() {
			uni.showLoading();
			const parms = {
				tenantId: 112,
				startTime: this.timeStart,
				endTime: this.addDate(this.timeEnd, 1),
			};
			getSaleGoods(parms)
				.then((res) => {
					uni.hideLoading();
					this.gressList = [];
					this.otherAmount = 0;
					this.amount = 0;
					// console.log('rew', res);
					// gressList
					const { data } = res;
					data.map((item, index) => {
						this.amount = ((Number(item.orderGoodsPrice * 100) + Number(this.amount * 100)) / 100).toFixed(2);
						// 前五商品
						if (index <= 4) {
							this.gressList.push(item);
						} else {
							this.otherAmount = (Number(item.orderGoodsPrice * 100) + Number(this.otherAmount * 100)) / 100;
						}
					});
					// 其它类
					if (data.length >= 6) {
						const other = {
							orderGoodsPrice: this.otherAmount,
							productName: '其它',
						};
						this.gressList.push(other);
					}
					this.gressList.map((item) => {
						item.percentage = ((item.orderGoodsPrice / this.amount) * 100).toFixed(2);
					});
				})
				.catch((err) => {
					uni.hideLoading();
					uni.showToast({
						title: err.message,
						duration: 1500,
					});
				});
		},
		// 每日销售金额
		getSaleDay() {
			uni.showLoading();
			const parms = {
				tenantId: 38,
				year: this.date,
				month: this.choseIndex !== -1 ? this.choseIndex + 1 : new Date().getMonth() + 1,
			};
			getSaleAccount(parms)
				.then((res) => {
					uni.hideLoading();
					this.chartData.categories = [];
					this.chartData.series[0].data = [];
					this.dayAmount = 0;
					const { data } = res;
					// console.log('data', data);
					if (data.length > 0) {
						data.map((item, index) => {
							this.chartData.categories.push(index + 1);
							this.chartData.series[0].data.push(Number(item.actualPrice));
						});
						const maxArr = this.chartData.series[0].data.concat();
						maxArr.sort((a, b) => {
							return a - b;
						});
						this.max = maxArr[maxArr.length - 1] ? maxArr[maxArr.length - 1] : 0;
					} else {
						for (let i = 0; i <= 30; i++) {
							this.chartData.categories.push(i + 1);
							this.chartData.series[0].data.push(Number(0));
						}
					}

					this.chartData.categories.push('');
					canvaLineA.updateData(this.chartData);
					this.uChartsObj();
				})
				.catch((err) => {
					uni.hideLoading();
					uni.showToast({
						title: err.message,
						duration: 1500,
					});
				});

			// this.uc()
			// console.log(this.chartData.categories, 'this.chartData.series.data');
		},
		// 时间大小
		contrastTime(timeStart, timeEnd) {
			const startTime = new Date(Date.parse(timeStart));
			const endtime = new Date(Date.parse(timeEnd));
			//  3进行比较
			return startTime <= endtime;
		},
		addDate(date, days) {
			const d = new Date(date);
			d.setDate(d.getDate() + days);
			const m = d.getMonth() + 1;
			return d.getFullYear() + '-' + m + '-' + d.getDate();
		},
		uChartsObj() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			// eslint-disable-next-line new-cap
			canvaLineA = new uCharts({
				$this: _self,
				canvasId: 'canvaLineA',
				type: 'area',
				fontSize: 11,
				// legend: true,
				dataLabel: false,
				dataPointShape: true,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				categories: this.chartData.categories,
				series: this.chartData.series,
				animation: true,
				enableScroll: true, //  开启图表拖拽功能
				legend: { show: false }, //  是否显示各类别的图例标识
				xAxis: {
					type: 'grid',
					// disabled: true,
					disableGrid: true,
					itemCount: 11, //  x轴单屏显示数据的数量，默认为5个
					scrollShow: false, //  新增是否显示滚动条，默认false
					scrollAlign: 'left', //  滚动条初始位置
					scrollBackgroundColor: '#FF4771', //  默认为 #EFEBEF
					// scrollColor: '#FF4771', //  滚动条颜色  默认为 #A6A6A6
					boundaryGap: 'justify', //  坐标轴起点
					axisLine: false,
					gridColor: '#FF4771',
					axisLineColor: '#FF4771',
					// fontColor: '#FF4771', //  坐标轴点的颜色
				},
				yAxis: {
					gridType: 'solid',
					gridColor: '#CCCCCC',
					dashLength: 8,
					splitNumber: 5,
					min: 0,
					max: this.max,
					axisLineColor: '#FF4771',
				},
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					area: {
						type: 'curve',
						opacity: 0.2,
						addLine: true,
						width: 1,
					},
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.tab-button {
	background: #fff;
	display: flex;
	padding: 24rpx;

	.item {
		position: relative;
		font-size: 30rpx;
		width: 180rpx;
		margin-right: 42rpx;
		// text-align: center;
		color: $uni-text-color-grey;
		&.active {
			color: $ds-main-color;
			&:after {
				content: '';
				position: absolute;
				bottom: 0px;
				top: 50rpx;
				left: 50%;
				height: 4rpx;
				width: 64rpx;
				margin-left: -32rpx;
				background-color: #e4262d;
			}
		}
	}
	.action-msg {
		height: 32rpx;
		width: 44rpx;
		padding-left: 200rpx;
		.icon-message {
			@include iconBase64Background($icon-message, 32rpx, 32rpx);
		}
	}
}
//  销售前十商品
.selling-goods {
	// 日期选择
	.time-box {
		height: 88rpx;
		margin: auto;
		padding: 23rpx 30rpx 0 26rpx;
		font-size: 26rpx;
		.choose-time {
			display: flex;
			align-items: center;
			.time-input {
				font-size: 26rpx;
				width: 240rpx;
				float: left;
				.date-icon {
					height: 36rpx;
					width: 36rpx;
					background-image: $icon-date-image;
					background-size: 100%;
					background-repeat: no-repeat;
					display: inline-block;
					padding: 8rpx;
					vertical-align: top;
					margin: 0 16rpx;
					float: left;
				}
				.date-input {
					// float: left;
					line-height: 52rpx;
					padding-top: 6rpx;
				}
			}
		}
		.time-middle {
			margin: 0 32rpx;
			font-size: 26rpx;
			font-weight: 400;
			color: rgba(97, 107, 128, 1);
			// line-height: 50rpx;
		}
	}
	// 销售总额
	.goods-amount {
		background: #fff;
		padding: 36rpx 0 0rpx 26rpx;
		font-size: 72rpx;
		color: #616b80;
		b {
			color: #ff5a47;
			padding: 10rpx;
		}
		span {
			display: block;
			font-weight: 500;
			color: #ff5a47;
			margin: 20rpx 0;
		}
	}
	// 进度条
	.progress-box {
		padding: 20rpx 0;
		.progress-title {
			height: 42rpx;
			span:nth-of-type(1) {
				font-size: 24rpx;
				padding-right: 16rpx;
				color: #252525;
			}
			span:nth-of-type(2) {
				font-size: 24rpx;
				color: #99a0ad;
			}
			span:nth-of-type(3) {
				float: right;
				font-size: 30rpx;
			}
		}
		/deep/ .uni-progress-inner-bar {
			border-radius: 10rpx;
		}
	}
}

// 当日销售金额
.sales-amount {
	// 年份选择
	.date-picke {
		background: #fff;
		height: 88rpx;
		.particular {
			float: left;
			.date-line {
				font-size: 26rpx;
				padding: 27rpx;
			}
		}
		// .date-month {
		// 	display: flex;
		// 	overflow: auto;
		// 	// margin: 0 25rpx;
		// 	.month {
		// 		width: 1/6 * 100%;
		// 		min-width: 1/6 * 100%;
		// 		max-width: 1/6 * 100%;
		// 		text-align: center;
		// 		padding: 27rpx 0rpx;
		// 		.month-number {
		// 			color: #99a0ad;
		// 			&.active {
		// 				color: #252525;
		// 			}
		// 		}
		// 	}
		// }
		.content {
			// padding: 0 30rpx;
			display: flex;
			line-height: 88rpx;
			.scroll {
				width: 100%;
				height: 100%;
				overflow: hidden;
				white-space: nowrap;
				text-align: center;
			}

			.box {
				display: inline-block;
				width: 1/6 * 100%;
				min-width: 1/6 * 100%;
				max-width: 1/6 * 100%;
				// margin-right: 30rpx;
				.month-number {
					color: #99a0ad;
					&.active {
						color: #252525;
					}
				}
			}

			.box:last-child {
				margin-right: 0;
			}
		}
	}
	// 当日金额
	.date-amount {
		background: #fff;
		padding: 72rpx 0 72rpx 26rpx;
		font-size: 72rpx;
		color: #616b80;
		b {
			color: #ff5a47;
			padding: 10rpx;
		}
		span {
			display: block;
			font-weight: 500;
			color: #ff5a47;
			margin: 20rpx 0;
		}
	}
}
</style>
<style>
page {
	background: #fff;
}
.qiun-padding {
	padding: 2%;
	width: 96%;
}
.qiun-wrap {
	display: flex;
	flex-wrap: wrap;
}
.qiun-rows {
	display: flex;
	flex-direction: row !important;
}
.qiun-columns {
	display: flex;
	flex-direction: column !important;
}
.qiun-common-mt {
	margin-top: 10upx;
}
.qiun-bg-white {
	background: #ffffff;
}
.qiun-title-bar {
	width: 96%;
	padding: 10upx 2%;
	flex-wrap: nowrap;
}
.qiun-title-dot-light {
	border-left: 10upx solid #0ea391;
	padding-left: 10upx;
	font-size: 32upx;
	color: #000000;
}
.qiun-charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
.charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
</style>
