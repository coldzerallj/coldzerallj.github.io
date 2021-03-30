<template>
	<view class="info-cell">
		<view class="info-title">
			{{ title }}
		</view>
		<view class="info-content" v-if="!hasSlot">
			<template v-if="!dataSection">
				<view class="info-value">
					<input
						v-if="!isShowMore"
						class="info-input"
						type="text"
						placeholder-class="uni-input-placeholder"
						:value="value"
						:disabled="isDisabled"
						:placeholder="placeholder"
						@input="$emit('input', $event.target.value)"
					/>
					<view class="info-more" v-else>
						<span class="info-more-tips" v-show="inputValue === ''">{{ placeholder }}</span>
						<span class="item" v-for="(item, index) in inputValue" :key="index">{{ item.name }}</span>
					</view>
				</view>
				<span v-if="isLink" class="iconfont iconjiantou"></span>
			</template>
			<view class="date-section" v-if="dataSection">
				<span class="date-item">{{ dateStart }}</span>
				<span class="date-title">至</span>
				<span class="date-item">{{ dateEnd }}</span>
			</view>
		</view>
		<view class="info-content" v-if="hasSlot">
			<view class="info-value">
				<textarea
					:value="value"
					@input="$emit('input', $event.target.value)"
					class="input-textarea"
					:disabled="isDisabled"
					:placeholder="placeholder"
					auto-height
				/>
			</view>
		</view>
	</view>
</template>
<script>
/**
 * info-cell选择
 * @property {String} title 标题
 * @property {String} value 内容
 * @property {String} placeholder 提示语
 * @property {Boolean} isDisabled 是否可编辑
 * @property {Boolean} isLink 是否有链接图标
 *
 * @example <infoCell :title="title" v-model="value" :isDisabled="true" :isLink="false" :placeholder="请输入"></infoCell>
 */
export default {
	props: {
		title: {
			type: String,
			default: '',
		},
		hasSlot: {
			type: Boolean,
			default: false,
		},
		value: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: '',
		},
		isDisabled: {
			type: Boolean,
			default: false,
		},
		isLink: {
			type: Boolean,
			default: false,
		},
		isShowMore: {
			type: Boolean,
			default: false,
		},
		dataSection: {
			type: Boolean,
			default: false,
		},
		dateStart: {
			type: String,
			default: '',
		},
		dateEnd: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			inputValue: '',
		};
	},
	watch: {
		value(val) {
			if (this.isShowMore && this.value !== '') {
				const data = JSON.parse(this.value);
				this.inputValue = data;
				data.map((item, index) => {
					if (item.child) {
						this.inputValue.splice(index, 1);
						this.inputValue = this.inputValue.concat(item.child);
						// this.inputValue = [...this.inputValue, ...item.child];
						// console.log('this.valie', this.inputValue);
					}
				});
			}
		},
	},
	created() {
		if (this.isShowMore && this.value !== '') {
			const data = JSON.parse(this.value);
			this.inputValue = data;

			data.map((item, index) => {
				if (item.child) {
					this.inputValue.splice(index, 1);
					this.inputValue = this.inputValue.concat(item.child);
					// this.inputValue = [...this.inputValue, ...item.child];
					// console.log(this.inputValue);
				}
			});
		}
	},
};
</script>

<style lang="scss">
.info-cell {
	background: $uni-bg-color;
	padding: $uni-font-size-lg 0 $uni-spacing-base;
	margin: 0 0 $uni-spacing-lg;
	@include borderCreator(bottom, solid, #eceff5);
	.info-title {
		margin: 0 0 20rpx;
		font-size: $uni-font-size-base;
		color: $uni-text-color-grey;
	}
	.info-content {
		display: flex;
		align-items: center;
	}
	.info-value,
	.info-input {
		font-size: $uni-font-size-lg;
		color: $uni-text-color-black;
		flex: 1;
	}
	.info-more-tips {
		font-size: $uni-font-size-lg;
		color: $uni-text-color-placeholder;
	}
	.info-more {
		// display: flex;
		// align-items: center;
		.item {
			background: #fbc3d0;
			display: inline-block;
			vertical-align: middle;
			font-size: $uni-font-size-sm;
			color: $uni-text-color-white;
			border-radius: 6rpx;
			margin-right: $uni-spacing-base;
			margin-bottom: 10rpx;
			padding: 2rpx 6rpx;
		}
	}

	.input-textarea {
		width: 100%;
		min-height: 120rpx;
		.uni-textarea-textarea {
			width: 100%;
			line-height: 36rpx;
		}
	}
	.date-section {
		display: flex;
		align-items: center;
	}
	.date-item {
		font-size: $uni-font-size-lg;
		color: $uni-text-color-black;
	}
	.date-title {
		padding: 0 $uni-spacing-lg;
		font-size: 36rpx;
		color: $uni-text-color-grey;
	}
}
</style>
