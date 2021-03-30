/* eslint-disable no-unused-vars */
<template>
	<view class="module-tab">
		<view class="tab-button">
			<scroll-view scroll-x="true" style="white-space: nowrap; display: flex;" scroll-with-animation>
				<view class="item" :class="{ active: tabIndex == index }" v-for="(item, index) in tabTitle" :key="index" @tap="handleTab(index)">
					{{ item.name }}
				</view>
			</scroll-view>
			<!-- </view> -->
		</view>
	</view>
</template>

<script>
export default {
	props: {
		tabTitle: {
			type: Array,
			default() {
				return [];
			},
		},
		tabIndex: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			// tabIndex: 0,
		};
	},
	created() {},
	methods: {
		handleTab(index) {
			// this.tabIndex = index;
			this.$emit('changeSecTab', index);
		},
	},
};
</script>

<style lang="scss">
.module-tab {
	width: 100%;
	padding: 16rpx 64rpx;
	background: #fff;
	margin-bottom: 24rpx;
}
.tab-button {
	.item {
		width: 120rpx;
		height: 56rpx;
		line-height: 56rpx;
		border-radius: 8rpx;
		display: inline-block;
		text-align: center;
		font-size: 26rpx;
		color: #616b80;
		background: #f0f2f5;

		&:last-child {
			border-right: none;
		}

		&.active {
			background: $ds-main-color;
			color: #fff;
		}
	}
	.item + .item {
		margin-left: 56rpx;
	}
}
</style>
