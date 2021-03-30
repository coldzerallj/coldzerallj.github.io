<template>
	<view class="popup-category">
		<view class="module-block">
			<view class="block-header">一级品类</view>
			<view class="block-content">
				<view
					class="item"
					v-for="(item, index) in categroyList"
					:key="index"
					:class="[item.isActive ? 'active' : '']"
					@tap="handleCheck(item)"
				>
					<span class="item-title">{{ item.categoryName }}</span>
				</view>
			</view>
		</view>
		<view class="module-block" v-if="showSecond">
			<view class="block-header">干调品类</view>
			<view class="block-content">
				<view
					class="item"
					v-for="(item, index) in categroyListSecond"
					:key="index"
					:class="[item.isActive ? 'active' : '']"
					@tap="handleCheckSecond(item)"
				>
					<span class="item-title">{{ item.categoryName }}</span>
				</view>
			</view>
		</view>
		<view class="fixed-bottom module-button">
			<button type="main" class="button-confirm" @tap="handleConfirm">
				确定
			</button>
		</view>
	</view>
</template>
<script>
/**
 *
 * @example <popupCategory @confirm="handleCofirmCategory"></popupCategory>
 */
import { bizCategory } from '@/api/apply-residence.js';
export default {
	props: {
		selected: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			showSecond: false,
			categroyList: [
				{
					categoryId: '1',
					categoryName: '蔬菜类',
					level: '1',
					sortOrder: 1,
				},
			],
			categroyListSecond: [
				{
					categoryId: ' 1',
					categoryName: '芝麻，麻酱',
					level: '2',
					sortOrder: 1,
				},
			],
		};
	},
	created() {
		bizCategory().then((res) => {
			const { data } = res;
			this.categroyList = data;

			this.categroyList.map((item) => {
				this.$set(item, 'isActive', false);
			});
			data.map((item) => {
				if (item.mallBizCategoryDTOList) {
					this.categroyListSecond = item.mallBizCategoryDTOList;
					this.categroyListSecond.map((item) => {
						this.$set(item, 'isActive', false);
					});
				}
			});
		});
	},
	methods: {
		handleCheck(item) {
			item.isActive = !item.isActive;
			if (item.categoryName === '干调') {
				if (item.isActive) {
					this.showSecond = true;
				} else {
					this.showSecond = false;
				}
			}
		},
		handleCheckSecond(item) {
			item.isActive = !item.isActive;
		},
		handleConfirm() {
			const data = [];
			this.categroyList.map((item) => {
				// console.log('titetieteitiet', item);

				if (item.isActive && !item.mallBizCategoryDTOList) {
					const postItem = {
						cid: item.categoryId,
						name: item.categoryName,
					};
					data.push(postItem);
				} else if (item.isActive && item.mallBizCategoryDTOList) {
					const postItem = {
						cid: item.categoryId,
						name: item.categoryName,
						child: [],
					};
					this.categroyListSecond.map((itemSec) => {
						if (itemSec.isActive) {
							const postItemSec = {
								cid: itemSec.categoryId,
								name: itemSec.categoryName,
							};
							postItem.child.push(postItemSec);
						}
					});
					if (postItem.child.length) {
						data.push(postItem);
					}
				}
			});

			// console.log('daya', data);

			this.$emit('confirm', data);
		},
	},
};
</script>

<style lang="scss" scoped>
.popup-category {
	background: #fff;
	height: 1000rpx;
	overflow: auto;
	padding: 0 0 100rpx;
	.module-block {
		background: $uni-bg-color;
		padding: 0 12rpx;
		margin: 0 0 $uni-spacing-lg;
	}
	.block-header {
		padding: $uni-spacing-lg 12rpx $uni-spacing-base;
		font-size: $uni-font-size-lg;
		color: $uni-text-color;
		font-weight: bold;
	}
	.block-content {
		// display: flex;
		// flex-wrap: wrap;
	}
	.item {
		display: inline-block;
		min-width: 1/3 * 100%;
		padding: 0 12rpx $uni-spacing-base;
		box-sizing: border-box;
		&.active {
			.item-title {
				background: rgba(255, 71, 113, 0.3);
				color: $uni-text-color-grey;
				&:after {
					content: '';
					position: absolute;
					right: 0;
					bottom: 0;
					@include iconBase64Background($icon-apply-catefory, 38rpx, 38rpx);
				}
			}
		}
	}
	.item-title {
		background: #ebeef5;
		display: block;
		position: relative;
		height: 72rpx;
		padding: 0 12rpx;
		line-height: 72rpx;
		border-radius: 8rpx;
		font-size: 30rpx;
		color: $uni-text-color-black;
		text-align: center;
	}
}
</style>
