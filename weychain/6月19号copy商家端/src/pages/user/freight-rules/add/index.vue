<template>
	<view class="freight-rules-add">
		<view class="module">
			<view class="module-content">
				<!-- <view class="module-header">全市配送运费模板</view> -->
				<view class="module-body">
					<view class="item-cell">
						<view class="info-title"> 运费承担 </view
						><view class="item-value">
							<label v-for="(item, index) in itemWay" :key="index" @tap="handleSelect(item)" style="margin-right: 20px;">
								<radio class="radio" :value="item.value" :checked="Number(item.value) === post.freightPayer" />{{ item.label }}
							</label>
						</view>
					</view>
					<view class="item-cell">
						<view class="info-title"> 计费方式 </view>

						<view class="item-value">{{ post.billingMethod }}</view></view
					>
					<view class="item-cell">
						<view class="info-title"> 配送范围 </view>
						<view class="item-value">{{ post.distributionScope }}</view></view
					>
				</view>
			</view>
			<view class="module-footer" v-show="post.freightPayer == 1">
				<view class="item-title">计费规则</view>
				<view class="item-cell">
					<span class="item-addon">区间订单金额（元）</span
					><span class="item-value" style="color: #616b80;">运费（元） <text class="iconfont iconshanchu none"></text></span>
				</view>
				<view class="item-cell" v-for="(item, index) in ruleList" :key="index">
					<span class="item-addon">
						<template v-if="index == 0">
							<input class="item-input" v-model="item.minPrice" type="digit" @blur="verifyNumber('minPrice', index, $event)" />
						</template>
						<template v-else>
							<input class="item-input item-input-min" v-model="item.minPrice" type="number" disabled="disabled" />
						</template>
						<span class="item-middle">到</span>
						<input class="item-input" v-model="item.maxPrice" type="digit" @blur="verifyNumber('maxPrice', index, $event)" />
					</span>
					<span class="item-value">
						<input class="item-input" v-model="item.freight" type="digit" @input="verifyNumber('price', index, $event)" />
					</span>

					<text class="iconfont iconshanchu none" v-if="index == 0"></text>
					<text class="iconfont iconshanchu" v-else @tap="handleDelete(index)"></text>
				</view>
				<view class="action-add" v-show="post.freightPayer == 1"><span @tap="handleAdd">+添加新规则</span></view>
			</view>
		</view>
		<view class="module-price-tips" v-show="post.freightPayer == 1">
			区间起点金额为起送价，消费者将不能提交金额小于<span class="price">{{ price.min }}</span
			>元的订单。
			<view
				>区间终点金额为包邮价，大于<span class="price">{{ price.max }}</span
				>元订单金额的订单包邮配送，消费者无需支付运费。</view
			>
		</view>
		<view class="module-button">
			<button type="main" class="button-save" @tap="handleSave">保存</button>
		</view>
	</view>
</template>

<script>
import { mallFreightSave } from '@/api/freight-rules.js';
export default {
	data() {
		return {
			price: {
				min: 0.01,
				max: '',
			},
			originPrice: 0.01,
			itemWay: [
				{
					label: '买家承担运费',
					value: '1',
				},
				{
					label: '商家承担运费',
					value: '0',
				},
			],
			ruleList: [],
			post: {},
		};
	},
	onLoad(options) {
		if (options.item) {
			const data = JSON.parse(options.item);
			this.post = data;
			this.ruleList = data.mallFreightRuleList;
			if (data.freightPayer) {
				this.post.freightPayer = 1;
			} else {
				this.post.freightPayer = 0;
			}
		} else {
			this.post = {
				freightPayer: 1,
				billingMethod: '按订单金额',
				distributionScope: '吉林全市',
				mallFreightRuleList: [],
			};
		}

		const rules = this.post.mallFreightRuleList;
		if (rules.length <= 0) {
			this.ruleList = [
				{
					minPrice: '',
					maxPrice: '',
					freight: '',
				},
			];
		} else {
			this.originPrice = rules[0].minPrice;
			this.price.min = rules[0].minPrice;
			this.price.max = (rules[rules.length - 1].maxPrice * 1000 + 0.01 * 1000) / 1000;
		}

		this.$set(this.post, 'tenantId', uni.getStorageSync('tenantId'));
	},
	methods: {
		// 选择运费承担者
		handleSelect(item) {
			this.post.freightPayer = Number(item.value);
		},
		// 运费区间值控制
		verifyNumber(type, idx, e) {
			const maxIndex = this.ruleList.length - 1;
			this.$nextTick(() => {
				let val = e.target.value.toString();
				val = val.replace(/[^\d.]/g, ''); // 清除"数字"和"."以外的字符
				val = val.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
				val = val.replace(/^0+\./g, '0.');
				val = val.match(/^0+[1-9]+/) ? (val = val.replace(/^0+/g, '')) : val;
				val = val.match(/^\d*(\.?\d{0,2})/g)[0] || '';
				if (type === 'minPrice') {
					if (this.ruleList[idx].maxPrice !== '' && Number(val) >= Number(this.ruleList[idx].maxPrice)) {
						uni.showToast({
							title: '不可高于终点值',
							duration: 1000,
							icon: 'none',
						});
						this.ruleList[idx].minPrice = this.originPrice;
					} else {
						this.ruleList[idx].minPrice = val;
					}

					this.price.min = this.ruleList[idx].minPrice;
				} else if (type === 'maxPrice') {
					// 修改最后一个区间的最大值
					if (maxIndex === idx) {
						if (Number(val) > Number(this.ruleList[idx].minPrice)) {
							this.ruleList[idx].maxPrice = val;
						} else {
							this.ruleList[idx].maxPrice = (this.ruleList[idx].minPrice * 1000 + 0.01 * 1000) / 1000;
						}
						this.price.max = (this.ruleList[idx].maxPrice * 1000 + 0.01 * 1000) / 1000;
					} else {
						// 修改其他区间的最大值
						if (val <= this.ruleList[idx].minPrice) {
							uni.showToast({
								title: '不可低于起点值',
								duration: 1000,
								icon: 'none',
							});
							this.ruleList[idx].maxPrice = (this.ruleList[idx + 1].minPrice * 1000 - 0.01 * 1000) / 1000;
						} else if (val >= (this.ruleList[idx + 1].maxPrice * 1000 - 0.01 * 1000) / 1000) {
							uni.showToast({
								title: '不可高于下一区间的终点值',
								duration: 1000,
								icon: 'none',
							});
							this.ruleList[idx].maxPrice = (this.ruleList[idx + 1].minPrice * 1000 - 0.01 * 1000) / 1000;
						} else {
							this.ruleList[idx].maxPrice = val;
							this.ruleList[idx + 1].minPrice = (val * 1000 + 0.01 * 1000) / 1000;
						}
					}
				} else if (type === 'price') {
					this.ruleList[idx].freight = val;
				}
			});
		},
		// 删除运费区间
		handleDelete(index) {
			const maxIndex = this.ruleList.length - 1;
			if (maxIndex === index) {
				this.ruleList.splice(index, 1);
				this.price.max = (this.ruleList[this.ruleList.length - 1].maxPrice * 1000 + 0.01 * 1000) / 1000;
			} else {
				const minValue = this.ruleList[index].minPrice;
				this.ruleList[index + 1].minPrice = minValue;
				this.ruleList.splice(index, 1);
			}
		},
		// 新增运费区间
		handleAdd() {
			const maxIndex = this.ruleList.length - 1;
			if (this.ruleList[maxIndex].maxPrice === '') {
				uni.showToast({
					title: '请填写区间收费',
					duration: 1000,
					icon: 'none',
				});
				return false;
			}
			if (this.ruleList[maxIndex].freight === '') {
				uni.showToast({
					title: '请填写运费',
					duration: 1000,
					icon: 'none',
				});
				return false;
			}
			const item = {
				minPrice: (this.ruleList[maxIndex].maxPrice * 1000 + 0.01 * 1000) / 1000,
				maxPrice: '',
				freight: '',
			};
			this.ruleList.push(item);
		},

		// 保存运费规则
		handleSave() {
			if (this.post.freightPayer === 1) {
				const maxIndex = this.ruleList.length - 1;
				if (this.ruleList[maxIndex].maxPrice === '') {
					uni.showToast({
						title: '请填写区间收费',
						duration: 1000,
						icon: 'none',
					});
					return false;
				}
				if (this.ruleList[maxIndex].freight === '') {
					uni.showToast({
						title: '请填写运费',
						duration: 1000,
						icon: 'none',
					});
					return false;
				}
				this.post.mallFreightRuleList = this.ruleList;
			} else {
				this.post.mallFreightRuleList = [];
			}
			mallFreightSave(this.post).then((res) => {
				if (res.code === 200) {
					uni.navigateBack({
						delta: 1,
					});
				} else {
					uni.showToast({
						title: res.message,
						duration: 1200,
						icon: 'none',
					});
				}
			});
		},
	},
};
</script>
<style lang="scss">
page {
	background: $uni-bg-color-grey;
}
</style>
<style lang="scss" scoped>
.freight-rules-add {
	padding: $uni-spacing-base 0 140rpx;
	.module {
		.module-content {
			padding: $uni-spacing-base $uni-spacing-lg $uni-spacing-lg;
			background: $uni-bg-color;
			margin: 0 0 $uni-spacing-lg;
		}
		.module-header {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			padding: 0 0 $uni-spacing-base;
			margin: 0 0 14rpx;
			font-size: $uni-font-size-lg;
			color: $uni-text-color-black;
			font-weight: bold;
			@include borderCreator(bottom, solid, #ebeef5);
		}
		.module-body {
			.info-title {
				margin: 0 0 16rpx;
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
			}
			.item-cell {
				padding: 24rpx 0;
				color: $uni-text-color-grey;
				.item-value {
					font-size: $uni-font-size-lg;
					color: $uni-text-color-black;
				}
				.radio {
					position: relative;
					top: -2px;
				}
			}
		}
		.module-footer {
			background: $uni-bg-color;
			padding: 24rpx $uni-spacing-lg 0;
			.item-cell {
				display: flex;
				padding: 20rpx 0;
				color: $uni-text-color-grey;
				padding: 20rpx 0;
				justify-content: space-between;
				align-items: center;
			}
			.item-middle {
				padding: 0 20rpx;
			}
			.item-addon {
				display: flex;
				width: 70%;
				justify-content: space-between;
				align-items: center;
			}
			.item-value {
				width: 30%;
				padding-left: 32rpx;
				color: $uni-text-price;
				text-align: right;
			}
			.item-input {
				border-radius: 8rpx;
				text-align: center;
				padding: 4rpx 10rpx;
				height: 52rpx;
				font-size: 26rpx;
				@include borderCreator('', solid, #ebeef5);
			}
			.item-input-min {
				background: #f4f4f4;
				color: #999;
			}
			.iconshanchu {
				margin-left: 12rpx;
				color: $uni-text-price;
				font-size: 34rpx;
				&.none {
					color: #fff;
				}
			}
		}
		.item-title {
			color: $uni-text-color-black;
			font-weight: bold;
			padding: 0 0 12rpx;
			font-size: 31rpx;
		}
		.uni-label-pointer {
			&:first-child {
				margin-right: 20rpx;
			}
		}
	}
	.action-add {
		text-align: right;
		padding: 0 0 $uni-spacing-lg;
		font-size: 30rpx;
		color: #12cb8e;
	}
	.module-price-tips {
		padding: $uni-spacing-lg;
		color: $uni-text-ordermsg;
		font-size: $uni-font-size-sm;
		line-height: 46rpx;
		.price {
			color: $uni-text-price;
		}
	}
	.module-button {
		background: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 16rpx 32rpx;
		.button-save {
			padding: 4rpx 20rpx;
			border-radius: 28px;
			font-size: 32rpx;
		}
	}
}
</style>
