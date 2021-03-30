<template>
	<view class="page-search">
		<view class="page-search-container">
			<view class="app-header fixed-top">
				<view class="search-content">
					<text class="iconfont iconsousuo"></text>
					<input
						class="search-input"
						confirm-type="search"
						type="text"
						v-model="searchValue"
						placeholder="请输入铺位号（建议输入后半部分）"
						@input="handleSearch"
					/>
				</view>
				<view class="search-button" @tap="handleClean">清除</view>
			</view>

			<!-- isShowProduct为true显示搜索结果 -->
			<view class="module-product" v-show="isShowProduct">
				<view class="module-header" v-if="(ShopNoList.length > 0)">请点击选择您的店铺铺位号</view>
				<view class="module-body">
					<view class="module-product-info" v-for="(item, index) in ShopNoList" :key="index">
						<view class="media-title" @tap="selectShopNo(item.areaNo)">{{ item.areaNo }}</view>
					</view>
				</view>
				<view class="page-none" v-if="(ShopNoList.length <= 0)">
					找不到和 {{ searchValue }} 匹配的铺位号，请重新输入。 如铺位号确实存在，请联系管理人员在后台添加铺位号。</view
				>
			</view>
			<!-- isShowProduct为true显示搜索结果 -->
		</view>
	</view>
</template>

<script>
import { getAreaList } from '@/api/apply-residence.js';
export default {
	components: {},
	data() {
		return {
			defaultImg: '@/static/img/logo.jpg',
			searchValue: '',
			lastId: '',
			pageSize: 10,
			isShowProduct: false,
			ShopNoList: [],
			testList: ['E-W234-R', 'W-222-FD', 'W-233-DD', 'W-EEW2', 'W-232-停车场'],
			idex: '',
			delList: [''],
		};
	},
	onLoad(options) {
		this.idex = options.idex;
		this.delList = JSON.parse(options.items);
	},
	methods: {
		// 输入框事件实时查询，两个字符以上
		handleSearch(e) {
			this.searchValue = e.detail.value;
			if (this.searchValue.length >= 2) {
				uni.showLoading({
					title: '加载中...',
					mask: true,
				});
				const postData = {
					keyword: this.searchValue,
					// lastId: '',
					// pageSize: this.pageSize,
				};
				getAreaList(postData).then((res) => {
					uni.hideLoading();
					const { data } = res;
					if (res.code === 200) {
						this.isShowProduct = true;
						const newArr = data.filter((v) => this.delList.findIndex((el) => el === v.areaNo) === -1);
						this.ShopNoList = newArr;
						// this.lastId = res.data[res.data.length - 1].subjectId;
						// 判断输入关键字是否存在
						// this.history.filter((item) => {
						// 	if (item === this.searchValue) {
						// 		isHistory = true;
						// 	}
						// });
						// if (!isHistory) {
						// 	this.history.push(this.searchValue);
						// 	uni.setStorageSync('historySearch', this.history);
						// }
					} else {
						uni.showToast({
							title: res.data,
							duration: 1000,
							icon: 'none',
						});
					}
				});
			} else {
				this.isShowProduct = false;
				this.ShopNoList = [];
				this.lastId = '';
			}
		},
		handleClean() {
			this.searchValue = '';
			this.isShowProduct = false;
			this.ShopNoList = [];
			this.lastId = '';
		},
		// 选中的铺位号
		selectShopNo(item) {
			// eslint-disable-next-line no-undef
			const pages = getCurrentPages();
			const prevPage = pages[pages.length - 2];
			prevPage.setData({
				shopNoId: item,
				idex: this.idex,
			});
			uni.navigateBack();
		},
	},
};
</script>
<style lang="scss">
page {
	background: $uni-bg-color-othergrey;
}
</style>
<style lang="scss" scoped>
.page-search-container {
	padding: 90rpx 0 32rpx;
	.app-header {
		background: #fff;
		display: flex;
		/* #ifdef H5 */
		top: 90rpx;
		/* #endif */
		padding: $uni-spacing-sm $uni-spacing-base;
		.iconfanhui {
			padding-right: 14rpx;
			line-height: 64rpx;
			font-size: 38rpx;
		}
		.search-content {
			background: #f0f2f5;
			display: flex;
			flex: 1;
			border-radius: 32rpx;
			align-items: center;
			padding: 2rpx $uni-spacing-base;
			margin-right: 16rpx;
			justify-content: center;
		}

		.iconsousuo {
			color: $uni-text-ordermsg;
			font-size: $uni-font-size-base;
		}

		.search-input {
			font-size: $uni-font-size-base;
			margin-left: 12rpx;
			// width: 50%;
			flex: 1;
		}
		.search-button {
			padding-left: 8rpx;
			line-height: 64rpx;
			font-size: $uni-font-size-base;
			color: $uni-text-color-black;
		}
	}

	.module-header {
		padding: 28rpx;
		font-size: $uni-font-size-base;
		color: #616b80;
		.iconshanchu {
			float: right;
			color: $uni-text-ordermsg;
			font-size: 36rpx;
		}
	}

	.module-hot {
		.module-body {
			overflow-x: auto;
			padding: 24rpx 20rpx;
			padding-top: 0;
		}

		.item {
			display: inline-block;
			padding: 0 12rpx 20rpx;
		}

		.item-content {
			display: block;
			background: #f0f2f5;
			padding: 12rpx 20rpx;
			border-radius: 8rpx;
			text-align: center;
			font-size: $uni-font-size-base;
			color: $uni-text-color-grey;
		}
	}
	.module-product {
		.module-body {
			padding: $uni-spacing-base $uni-spacing-lg $uni-spacing-sm;
			padding-top: 0;
		}
		.item {
			padding: $uni-spacing-lg;
			margin: 0 0 $uni-spacing-lg;
			background: #fff;
			border-radius: 10rpx;
			&:last-child {
				margin: 0;
			}
		}
	}
	.page-none {
		// padding: 120rpx 0 0;
		padding: 28rpx;
		// text-align: center;
		font-size: 28rpx;
		color: #616b80;
	}

	.module-product-info {
		display: flex;
		width: 100%;
		.media-object {
			width: 140rpx;
			height: 140rpx;
		}

		.media-content {
			flex: 1;
			position: relative;
			padding-left: $uni-spacing-base;
		}
		.media-title {
			// margin: 0 0 $uni-spacing-sm;
			border-radius: 20rpx;
			margin-bottom: 24rpx;
			padding-left: 33rpx;
			background: #fff;
			height: 93rpx;
			width: 100%;
			line-height: 93rpx;
			font-size: $uni-font-size-base;
			// @include textEllipsis(1);
			color: $uni-text-color-black;
		}
		.media-tips {
			margin: 0 0 $uni-spacing-base;
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
		}
		.item-price {
			position: relative;
		}
		.price-count {
			color: $uni-text-price;
			font-size: $uni-font-size-lg;
			line-height: 28rpx;
		}
	}
}
</style>
