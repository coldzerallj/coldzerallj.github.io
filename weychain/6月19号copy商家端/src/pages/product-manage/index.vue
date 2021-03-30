<template>
	<view class="app-main page-product-manage">
		<view class="page-product-manage-container">
			<view>
				<navTab :fixedClass="'border-bottom'" ref="navTab" :tabTitle="tabButton" @changeTab="handleTab"></navTab>
			</view>
			<view class="zhezhao"> <unoccupancy v-if="status == '2' || status == '1' || status == '0'" :type="status"></unoccupancy></view>
			<view class="searcher-wrap">
				<view class="searcher-entrance-box">
					<searcher-entrance :fakePlaceholder="`搜索商家店内商品`" @tap="toSearch" />
				</view>
				<view class="searcher-wrap-attr-btn-box">
					<span class="btn" @tap="modifyProducts">
						<template v-if="!productInModify">编辑</template>
						<template v-else>完成</template>
					</span>
				</view>
			</view>

			<view class="category-list">
				<scroll-view class="category-tab" scroll-x="true" @scroll="scroll" scroll-left="120">
					<view
						:class="['category-item', idx === currentProductTypeIndex ? 'current' : '']"
						v-for="(item, idx) in productTypeList"
						:key="idx"
						@tap="showCategory(item.typeId, idx)"
					>
						{{ item.typeName }}
					</view>
				</scroll-view>

				<view :class="['products', productInModify ? 'modify-mode' : '']">
					<view v-if="products.length === 0" class="non-products">暂无{{ onSale === PRODUCT_ON_SALE ? '出售中' : '待上架' }}商品</view>
					<template v-else>
						<view class="product" v-for="(item, idx) in products" :key="idx">
							<view
								:class="['product-check-box', item.checked ? 'checked' : '']"
								v-if="productInModify"
								@tap="handleCheck(item.subjectId, idx)"
							/>
							<view class="detail-priamry">
								<view class="info-box">
									<view class="img-box">
										<image :src="item.galleryArray[0]"></image>
									</view>
									<span class="topic">{{ item.productName }}</span>
									<span class="spec">
										<span> {{ item.specifications[0].specName }}， </span>
										<span>
											{{ item.specifications[0].weight }}{{ item.specifications[0].weightUnitName }} /
											{{ item.specifications[0].stockUnitName }}，
										</span>
										<span> {{ item.specifications[0].stockNum }}{{ item.specifications[0].stockUnitName }} </span>
									</span>
									<span class="price">{{ item.specifications[0].price | currency('¥') }}</span>
								</view>
								<view class="ctrl-btns" v-if="!productInModify">
									<span
										class="ctrl-btn secondary"
										@tap="handleOnSaleOrNot(item.subjectId, PRODUCT_OFF_SHELF)"
										v-if="onSale === PRODUCT_ON_SALE"
										>下架</span
									>
									<span
										class="ctrl-btn secondary"
										@tap="handleOnSaleOrNot(item.subjectId, PRODUCT_ON_SALE)"
										v-if="onSale === PRODUCT_OFF_SHELF"
										>上架</span
									>
									<span class="ctrl-btn primary" @tap="handleToModify(item.subjectId)">修改商品</span>
								</view>
							</view>
						</view>
					</template>
					<view class="module-button">
						<view :class="['select-all', selectedAll ? 'checked' : '']" @tap="selectAll" v-if="productInModify">
							<span>全选</span>
						</view>
						<view class="ctrl-btn secondary" @tap="handleDel" v-if="productInModify && onSale === PRODUCT_OFF_SHELF">删除</view>
						<view
							class="ctrl-btn secondary"
							@tap="handleOnSaleOrNot(null, PRODUCT_ON_SALE)"
							v-if="productInModify && onSale === PRODUCT_OFF_SHELF"
							>上架</view
						>
						<view
							class="ctrl-btn secondary"
							@tap="handleOnSaleOrNot(null, PRODUCT_OFF_SHELF)"
							v-if="productInModify && onSale === PRODUCT_ON_SALE"
							>下架</view
						>
						<view class="ctrl-btn secondary" @tap="handleToCategoryManagement" v-if="!productInModify">管理商品类别</view>
						<view class="ctrl-btn primary" @tap="handleToAdd" v-if="!productInModify">新增商品</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import product from '@/api/product';
import { PRODUCT_OFF_SHELF, PRODUCT_ON_SALE, WX_MESSAGE_TEMPLATE } from '@/common/global';
import navTab from '@/pages/components/navTab/navTab';
import searcherEntrance from '@/pages/components/searcher-entrance';
import unoccupancy from '@/pages/components/un-occupancy/index';

export default {
	components: {
		navTab,
		searcherEntrance,
		unoccupancy,
	},

	data() {
		return {
			PRODUCT_OFF_SHELF,
			PRODUCT_ON_SALE,
			productTypeList: [],
			currentProductTypeIndex: 0,
			currentProductType: '',
			search: '',
			onSale: PRODUCT_ON_SALE,
			products: [],
			tabButton: [
				{
					name: '出售中',
					id: PRODUCT_ON_SALE,
				},
				{
					name: '待上架',
					id: PRODUCT_OFF_SHELF,
				},
			],
			productInModify: false,
			selected: [],
			selectedAll: false,
			status: '',
		};
	},

	onShow() {
		this.getProductTypeList();
		this.getProducts(this.currentProductType, this.search, this.onSale);
		this.status = uni.getStorageSync('status');
	},

	onHide() {
		// 这个页面隐藏的时候如果正在编辑，则重置并关闭编辑
		// 其实这个步可以不要，就是如果页面切换视觉有延迟的话，再次进来这个页面会看到正在关闭之前打开着的编辑状态 UI，比较突兀
		this.shutDownModifyModeAndResetData();
	},

	methods: {
		// 复选框
		handleCheck(subjectId, idx) {
			this.products[idx].checked = !this.products[idx].checked;

			if (this.products[idx].checked) {
				// 为 true 则是要加入肯德基豪华大餐
				this.selected.push(subjectId);
				// 然后看看队友是不是全部都加入了，是的话就标记准备一锅端
				let result = true;
				this.products.some((item) => {
					if (!item.checked) {
						result = false;
					}
				});
				this.selectedAll = result;
			} else {
				// 为 false 则是不用加入肯德基豪华大餐
				// 要从肯德基豪华大餐中剔除
				this.selected.splice(idx, 1);
				// 然后标记为并不是一锅端
				this.selectedAll = false;
			}
		},

		// 修改商品
		handleToModify(subjectId) {
			uni.navigateTo({
				url: `./add/index?subjectId=${subjectId}`,
			});
		},

		// 全选 / 全不选
		selectAll() {
			// 如果根本没商品，就不用继续玩了
			if (this.products.length === 0) {
				return;
			}

			// 有商品的情况下继续玩
			if (!this.selectedAll) {
				// 先清空已经选择商品
				this.selected = [];
				this.products.map((item) => {
					item.checked = true;
					// 再将全部商品选择上
					this.selected.push(item.subjectId);
				});
				this.selectedAll = true;
			} else {
				this.products.map((item) => {
					item.checked = false;
				});
				this.selectedAll = false;
				this.selected = [];
			}
		},

		// 上下架业务流程
		onSaleOrNot(subjectId, onSale) {
			const me = this;
			// 如果是复选情况下，需校验用户有没勾选商品
			if (!subjectId && me.selected.length === 0) {
				uni.showToast({
					icon: 'none',
					title: '请选择商品',
					mask: true,
				});
				return;
			}

			const str = onSale === PRODUCT_OFF_SHELF ? '下' : '上';

			uni.showModal({
				content: `确定将商品${str}架?`,
				success(res) {
					if (res.confirm) {
						let arr = [];

						if (subjectId) {
							arr.push(subjectId);
						} else {
							arr = me.selected;
						}

						const parmas = {
							onSale,
							subjectIds: arr,
						};

						product.changeSaleStatus(parmas).then((res) => {
							if (res.data && res.message === 'success') {
								uni.showToast({
									icon: 'success',
									title: `商品已${str}架`,
									mask: true,
								});
								me.getProducts(me.currentProductType, me.search, me.onSale);
							}
						});
					}
				},
			});
		},

		// 单个 / 批量商品上下架
		handleOnSaleOrNot(subjectId, onSale) {
			const me = this;

			switch (onSale) {
				case PRODUCT_ON_SALE:
					uni.requestSubscribeMessage({
						tmplIds: WX_MESSAGE_TEMPLATE,
						success(res) {
							me.onSaleOrNot(subjectId, onSale);
						},
					});
					break;
				case PRODUCT_OFF_SHELF:
					me.onSaleOrNot(subjectId, onSale);
					break;
				default:
			}
		},

		// 批量删除商品
		handleDel() {
			const me = this;

			// 没勾选商品就不不能删除
			if (me.selected.length === 0) {
				uni.showToast({
					icon: 'none',
					title: '请选择商品',
					mask: true,
				});
				return;
			}

			uni.showModal({
				content: `确定删除商品?`,
				success(res) {
					if (res.confirm) {
						product.productDel(me.selected).then((res) => {
							if (res.data && res.message === 'success') {
								uni.showToast({
									icon: 'success',
									title: `商品已删除`,
									mask: true,
								});
								me.getProducts(me.currentProductType, me.search, me.onSale);
							}
						});
					}
				},
			});
		},

		// 打开 / 关闭修改商品列表功能
		modifyProducts() {
			this.productInModify = !this.productInModify;
			this.initSelected();
		},

		// 清空已经选择的商品，重置页面 UI
		initSelected() {
			this.products.map((item) => {
				item.checked = false;
			});
			this.selected = [];
			this.selectedAll = false;
		},

		// 如果编辑功能是打开状态，则关闭并重置数据和UI
		shutDownModifyModeAndResetData() {
			if (this.productInModify) {
				this.productInModify = false;
				this.initSelected();
			}
		},

		// 去搜索
		toSearch() {
			// console.log('toSearch');
		},

		// 拿产品类别列表
		getProductTypeList() {
			product.getProductTypeList(uni.getStorageSync('tenantId')).then((res) => {
				if (res.data && res.data.length > 0) {
					const ProductTypeAll = [
						{
							typeId: '',
							typeName: '全部商品',
						},
					];
					this.productTypeList = [...ProductTypeAll, ...res.data];
				}
			});
		},

		// 那商家商品列表
		getProducts(id, search, onSale) {
			// 切换的时候如果正在编辑，则重置并关闭编辑
			this.shutDownModifyModeAndResetData();
			product.getProducts(id, search, onSale).then((res) => {
				res.data.map((item, idx) => {
					item.checked = false;
				});
				this.products = res.data;
			});
		},

		// 产品分类切换
		showCategory(id, idx) {
			this.currentProductTypeIndex = idx;
			this.currentProductType = id;
			this.getProducts(id, this.search, this.onSale);
		},

		// 切换 ‘出售中’ 和 ‘待上架’ 的数据
		handleTab(index) {
			this.tabButton.map((item, idx) => {
				if (index === idx) {
					this.onSale = item.id;
				}
			});
			this.getProducts(this.currentProductType, this.search, this.onSale);
		},

		// 管理商品类别
		handleToCategoryManagement() {
			uni.navigateTo({
				url: './category/index',
			});
		},

		// 新增商品
		handleToAdd() {
			uni.navigateTo({
				url: './add/index',
			});
		},

		// handleEdit(type) {
		// 	this.isEdit = type;
		// 	this.$set(this.listData[this.showCategoryIndex], 'checked', false);
		// 	this.listData[this.showCategoryIndex].child.filter((item) => {
		// 		this.$set(item, 'checked', false);
		// 	});
		// },

		// handleUpDown(item, type) {
		// 	let tips = '';
		// 	if (type === 'down') {
		// 		tips = '确认下架该商品吗 ？';
		// 	} else {
		// 		tips = '确认上架该商品吗 ？';
		// 	}
		// 	uni.showModal({
		// 		title: '',
		// 		content: tips,
		// 		success: (res) => {
		// 			if (res.confirm) {
		// 				window.console.log('用户点击确定');
		// 			} else if (res.cancel) {
		// 				window.console.log('用户点击取消');
		// 			}
		// 		},
		// 	});
		// },

		// handleDelete() {
		// 	const checkedCount = this.listData[this.showCategoryIndex].child.filter(function (item) {
		// 		return item.checked;
		// 	}).length;
		// 	if (checkedCount > 0) {
		// 		const tips = '确认删除这' + checkedCount + '种商品吗';
		// 		uni.showModal({
		// 			title: '',
		// 			content: tips,
		// 			success: (res) => {
		// 				if (res.confirm) {
		// 					window.console.log('用户点击确定');
		// 				} else if (res.cancel) {
		// 					window.console.log('用户点击取消');
		// 				}
		// 			},
		// 		});
		// 	} else {
		// 		uni.showToast({
		// 			icon: 'none',
		// 			title: '请选择商品',
		// 		});
		// 	}
		// },

		// handleToDown() {
		// 	const checkedCount = this.listData[this.showCategoryIndex].child.filter(function (item) {
		// 		return item.checked;
		// 	}).length;
		// 	if (checkedCount > 0) {
		// 		const tips = '确认下架这' + checkedCount + '种商品吗';
		// 		uni.showModal({
		// 			title: '',
		// 			content: tips,
		// 			success: (res) => {
		// 				if (res.confirm) {
		// 					window.console.log('用户点击确定');
		// 				} else if (res.cancel) {
		// 					window.console.log('用户点击取消');
		// 				}
		// 			},
		// 		});
		// 	} else {
		// 		uni.showToast({
		// 			icon: 'none',
		// 			title: '请选择商品',
		// 		});
		// 	}
		// },

		// handleToClassfic() {
		// 	this.$refs.popupSelectClass.open();
		// },

		// selectConfirm(item, index) {
		// 	this.classIndex = index;
		// },

		// handleClose() {
		// 	this.$refs.popupSelectClass.close();
		// },
	},
};
</script>

<style lang="scss" scoped>
.searcher-wrap {
	background-color: $uni-bg-color;
	padding: $uni-spacing-base 120rpx $uni-spacing-base $uni-spacing-lg;
	position: relative;
	box-sizing: border-box;

	.searcher-wrap-attr-btn-box {
		position: absolute;
		right: $uni-spacing-lg;
		top: 50%;
		transform: translate(0, -50%);

		> .btn {
			font-size: $searcher-font-size-primary;
			line-height: $searcher-font-size-primary;
			color: $uni-text-color-grey;
			display: block;
		}
	}
}

.top_view {
	height: var(--status-bar-height);
	width: 100%;
	position: fixed;
	background-color: #fff;
	top: 0;
	z-index: 999;
}

.page-product-manage {
	/* #ifdef APP-PLUS */
	padding: var(--status-bar-height) 0 0;
	/* #endif */
}

.page-product-manage-container {
	// padding: 104rpx 0 0;
}

.app-header {
	/* #ifdef APP-PLUS */

	top: var(--status-bar-height);
	/* #endif */
	background: #fff;
	display: flex;
	padding: 20rpx 24rpx;

	.app-title {
		padding-right: 20rpx;
		font-size: 32rpx;
		font-weight: bold;
	}

	.iconfanhui {
		padding-right: 14rpx;
		line-height: 64rpx;
		font-size: 36rpx;
	}

	.search-content {
		display: flex;
		flex: 1;
		border: 1px solid #ddd;
		border-radius: 32rpx;
		align-items: center;
		padding: 2rpx 16rpx;
		margin-right: 16rpx;
	}

	.iconsousuo {
		color: #ccc;
	}

	.search-input {
		font-size: 24rpx;
		margin-left: 12rpx;
		flex: 1;
	}

	.iconxiaoxi {
		color: $ds-main-color;
		font-size: 36rpx;
	}
}

.module-link {
	display: flex;

	.item {
		width: 50%;
		padding: 12rpx 0;
		text-align: center;
		font-size: 26rpx;
		color: #888;

		&.active {
			color: $ds-main-color;
		}
	}
}

.module-button {
	position: fixed;
	bottom: 0;
	/*  #ifdef  H5  */
	bottom: 100rpx;
	/*  #endif  */
	left: 0;
	right: 0;
	background-color: $uni-bg-color;
	@include clearfix;
	padding: 0 $uni-spacing-lg;
	padding-left: 180rpx;
	height: $category-manager-btn-height * 2;
	line-height: $category-manager-btn-height * 2;
	font-size: 0;
	box-sizing: border-box;
	text-align: right;
	box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.075);

	.select-all {
		position: absolute;
		top: 50%;
		left: $uni-spacing-lg;
		transform: translate(0, -50%);
		font-size: 0;
		line-height: 0;

		> span {
			padding-left: $uni-spacing-sm;
			display: inline-block;
			vertical-align: middle;
			font-size: $uni-font-size-base;
			line-height: $uni-font-size-base;
			color: $uni-text-color-grey;
		}

		&:before {
			content: '';
			@include square(40rpx);
			@include rounded(50%);
			border: 1px solid darken($uni-border-color, 5);
			display: inline-block;
			vertical-align: middle;
		}

		&.checked:before {
			border-color: transparent;
			background-color: $uni-color-main;
			background-image: $icon-correct-white;
			background-repeat: no-repeat;
			background-size: 50%;
			background-position: center center;
		}
	}
}

.product-check-box {
	@include square(40rpx);
	@include rounded(50%);
	position: absolute;
	top: 50%;
	left: $uni-spacing-lg;
	transform: translate(0, -50%);
	border: 1px solid darken($uni-border-color, 5);

	&.checked {
		border-color: transparent;
		background-color: $uni-color-main;
		background-image: $icon-correct-white;
		background-repeat: no-repeat;
		background-size: 50%;
		background-position: center center;
	}
}

.ctrl-btn {
	display: inline-block;
	box-sizing: border-box;
	vertical-align: middle;
	height: $category-manager-btn-height;
	line-height: $category-manager-btn-height;
	@include rounded($category-manager-btn-height);
	font-size: $uni-font-size-lg;
	padding: 0 $uni-spacing-base;
	text-align: center;
	min-width: 160rpx;
	margin-left: $uni-spacing-base;

	&:first-child {
		margin-right: 0;
	}

	&.primary {
		color: #fff;
		background-color: $ds-main-color;
	}

	&.secondary {
		color: $uni-text-color-grey;
		background-color: $uni-color-secondry;
	}
}

.edit-button {
	position: fixed;
	bottom: 0;
	/*  #ifdef  H5  */
	bottom: 100rpx;
	/*  #endif  */
	left: 0;
	right: 0;
	display: flex;

	.button {
		width: 1/3 * 100%;
		padding: 4rpx 0;
		font-size: 26rpx;
		border-radius: 0;
		color: #fff;
	}

	.button-delete {
		background: #ca5454;
	}

	.button-classfic {
		background: #fff;
		color: $ds-main-color;
		border: 1px solid $ds-main-color;
	}
}

.category-header {
	padding: 0 12rpx 16rpx;
	border-bottom: 1px solid #eee;
}

.category-action {
	float: right;

	.action-item {
		display: inline-block;
		vertical-align: middle;
		margin-left: 60rpx;
		color: #888;
	}

	.action-finish {
		color: $ds-main-color;
	}
}

.media {
	background: #fff;
	display: flex;
	box-sizing: border-box;
	width: 100%;
	padding: 20rpx $uni-spacing-row-sm;
	border-bottom: 1px solid #eee;
}

.media-object {
	background: #ccc;
	width: 160rpx;
	height: 160rpx;
}

.media-content {
	display: block;
	flex: 1;
	padding: 0 $uni-spacing-row-base;
}

.media-title {
	font-size: $uni-font-size-lg;
}

.media-tips {
	margin: 0 0 8rpx;
	font-size: $uni-font-size-sm;
	color: #999;
}

.media-price {
	color: $uni-text-price;
}

.item-count {
	float: right;
}

.button-up-down {
	padding: 6rpx 16rpx;
	float: right;
	font-size: 26rpx;
	line-height: 30rpx;
}

.media-check {
	float: right;
}

.category-list {
	.category-tab {
		box-sizing: border-box;
		padding: 0 $uni-spacing-lg $uni-spacing-base;
		width: 100%;
		white-space: nowrap;
		background-color: $uni-bg-color;

		.category-item {
			display: inline-block;
			margin-left: $uni-spacing-base;
			padding: 0 $uni-spacing-base;
			font-size: $category-tab-font-size-primary;
			line-height: $category-tab-btn-height;
			height: $category-tab-btn-height;
			background-color: $category-tab-btn-color-primary;
			@include rounded($uni-border-radius-lg);
			@include transition(all, 0.3s, ease, 0);

			&:first-child {
				margin-left: 0;
			}

			&.current {
				color: #fff;
				background-color: $category-tab-btn-color-current;
			}
		}
	}

	.products {
		padding-bottom: $category-manager-btn-height * 2 + $uni-spacing-lg;

		.product {
			position: relative;
			box-sizing: border-box;
			margin: $uni-spacing-lg $uni-spacing-lg 0 $uni-spacing-lg;
			padding: $uni-spacing-lg;
			background-color: $uni-bg-color;
			@include rounded($uni-border-radius-lg);
			@include transition(all, 0.3s, ease, 0);

			.detail-priamry {
				min-height: $category-product-img-width;

				> .info-box {
					position: relative;
					padding-left: $category-product-img-width + $uni-spacing-lg;

					> .img-box {
						position: absolute;
						top: 0;
						left: 0;
						overflow: hidden;
						@include square($category-product-img-width);
						@include rounded($uni-border-radius-lg);

						> image {
							width: 100%;
							height: 100%;
							background-color: $uni-text-color-placeholder;
						}
					}

					.topic,
					.spec,
					.price {
						display: block;
					}

					.topic {
						font-size: $uni-font-size-lg;
						color: $uni-text-color-black;
						@include am-line-clamp(1, $uni-font-size-lg * 1.2);
					}

					.spec {
						font-size: $uni-font-size-sm;
						color: $uni-text-color-grey;
						@include am-line-clamp(1, $uni-font-size-sm * 1.2);
						padding-top: 10rpx;
					}

					.price {
						font-size: $uni-font-size-lg + 6rpx;
						color: $uni-text-price;
						@include am-line-clamp(1, ($uni-font-size-lg + 6rpx) * 1.2);
						padding-top: 20rpx;
					}
				}

				> .ctrl-btns {
					text-align: right;
					border-top: 1px solid $uni-border-color;
					padding-top: $uni-spacing-lg;
					margin-top: $uni-spacing-lg;
				}
			}
		}

		.non-products {
			padding-top: 200rpx + $uni-spacing-base;
			width: 300rpx;
			font-size: $uni-font-size-lg;
			color: $uni-text-color-grey;
			text-align: center;
			margin: 200rpx auto 0 auto;
			background-image: $icon-non-products;
			background-size: 70% auto;
			background-repeat: no-repeat;
			background-position: center top;
		}

		&.modify-mode {
			.product {
				padding-left: 110rpx;
			}
		}
	}
}

.modal-select-class {
	.modal-content {
		background: #fff;
		/* #ifdef H5 */
		padding-bottom: 100rpx;
		/* #endif */
	}

	.modal-header {
		font-size: 30rpx;
		color: #000;
		font-weight: bold;
		padding: 20rpx 24rpx;
		border-bottom: 1px solid #eee;
	}

	.action-close {
		float: right;
		color: $ds-main-color;
		font-size: 28rpx;
	}

	.modal-list {
		padding: 0 0 0 100rpx;
		border-bottom: 1px solid #eee;
	}

	.item {
		font-size: 28rpx;
		padding: 14rpx;
		border-bottom: 1px solid #eee;

		&:last-child {
			border-bottom: none !important;
		}

		&.active {
			color: $ds-main-color;
			font-weight: bold;
			border-bottom: 1px solid $ds-main-color;
		}
	}

	.modal-button {
		padding: 0 24rpx 24rpx;

		.uni-input {
			font-size: 26rpx;
			margin: 0 0 6rpx;
		}
	}

	.button-close {
		padding: 8rpx 0;
		font-size: 30rpx;
		border-radius: 0;
	}
}
// 遮罩层
.zhezhao /deep/ .open {
	top: 60rpx;
	.tip,
	.tip-on {
		padding-top: 440rpx;
	}
}
</style>
