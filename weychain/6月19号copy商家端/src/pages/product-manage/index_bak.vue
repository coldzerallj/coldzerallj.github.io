<template>
	<view class="app-main page-product-manage">
		<view class="page-product-manage-container">
			<!-- #ifdef APP-PLUS -->
			<view class="top_view"></view>
			<!-- #endif -->
			<view class="app-header fixed-top">
				<!-- #ifndef MP-WEIXIN -->

				<view class="app-title">销售</view>
				<!-- #endif -->

				<!-- <view class="search-content">
					<text class="iconfont iconsousuo"></text>
					<input class="search-input" type="text" placeholder="搜索内容" />
				</view> -->

				<!-- <navigator class="action-msg" url="../user/message/index">
					<text class="iconfont iconxiaoxi"></text>
				</navigator> -->
			</view>

			<!-- <view class="module-link">
				<navigator class="item active">商品管理</navigator>
				<navigator class="item" url="sale-report/index">销售报表</navigator>
			</view> -->

			<view class="module-tab">
				<view class="tab-button">
					<view class="tab-button-content">
						<view
							class="item"
							:class="{ active: tabIndex == index }"
							v-for="(item, index) in tabButton"
							:key="index"
							@tap="handleTab(index)"
						>
							<view class="item-text">
								{{ item }}
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="category-list" v-if="showProduct">
				<!-- 左侧分类导航 -->
				<scroll-view class="category-tab" scroll-x="true" @scroll="scroll" scroll-left="120">
					<view class="category-item" v-for="m in productTypeList" :key="m.typeId" @tap="showCategory(m.typeId)">
						{{ m.typeName }}
					</view>
				</scroll-view>

				<!--右侧子导航-->
				<scroll-view scroll-y="true" class="right">
					<view class="category" v-for="(n, index) in listData" :key="n.id" v-show="index == showCategoryIndex && n.child.length > 0">
						<view class="category-header">
							{{ n.title }}
							<view class="category-action">
								<view class="action-item action-edit" v-if="!isEdit" @tap="handleEdit(true)">
									批量操作
								</view>
								<view class="action-item action-check" v-if="isEdit">
									<label @tap="handleCheckALL">
										<checkbox :checked="n.checked" />
										全选
									</label>
								</view>
								<view class="action-item action-finish" v-if="isEdit" @tap="handleEdit(false)">
									完成
								</view>
							</view>
						</view>
						<view class="media-list" v-if="n.child.length > 0">
							<view class="media" v-for="(o, i) in n.child" :key="i" @tap="handleToAdd(o.id)">
								<image class="media-object" src=""></image>
								<view class="media-content">
									<view class="media-title">{{ o.title }}</view>
									<view class="media-tips">
										配送费：{{ o.postage }}元
										<span class="item-count">库存：{{ o.count }}</span>
									</view>
									<view class="media-price">
										￥{{ o.price }}
										<button v-if="!isEdit && tabIndex == 0" type="main" class="button-up-down" @tap.stop="handleUpDown(o, 'down')">
											下架
										</button>
										<button v-if="!isEdit && tabIndex == 1" type="main" class="button-up-down" @tap.stop="handleUpDown(o, 'up')">
											上架
										</button>
										<checkbox class="media-check" v-if="isEdit" :checked="o.checked" @tap.stop="handleCheck(o, o.checked)" />
									</view>
								</view>
							</view>
						</view>
						<view v-else class="no-data">
							<i class="iconfont icon404"></i>
							暂无分类
						</view>
					</view>

					<view class="module-button" v-show="!isEdit">
						<view type="main" class="button-add" @tap="handleToAdd">+</view>
					</view>
				</scroll-view>
			</view>

			<view class="edit-button" v-show="isEdit">
				<button type="danger" class="button button-delete" @tap="handleDelete">
					删除
				</button>
				<button type="main" class="button button-add" @tap="handleToDown">
					下架
				</button>
				<button type="default" class="button button-classfic" @tap="handleToClassfic">
					分类至
				</button>
			</view>
			<view class="classfic-manage" v-show="!showProduct"></view>

			<uniPopup ref="popupSelectClass" type="bottom" class="modal-select-class">
				<view class="modal-content">
					<view class="modal-header">
						选择分类
						<view class="action-close" @tap="handleClose">取消</view>
					</view>

					<view class="modal-list">
						<view
							class="item"
							:class="{ active: index == classIndex }"
							v-for="(item, index) in classList"
							:key="index"
							@tap="selectConfirm(item, index)"
						>
							{{ item.name }}
						</view>
					</view>
					<view class="modal-button">
						<input type="text" class="uni-input" placeholder="请输入相关文字说明" />
						<button type="main" class="button-close" @tap="handleClose">
							确定
						</button>
					</view>
				</view>
			</uniPopup>
		</view>
	</view>
</template>

<script>
// import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
// import product from '@/api/product';

export default {
	components: {
		// 声明组件
		uniPopup,
		// uniLoadMore,
	},
	data() {
		return {
			productTypeList: [],
			productTypeIndex: 0,

			tabIndex: 0,
			tabButton: ['出售中', '待上架'],
			showProduct: true,
			isEdit: false,
			listData: [],
			list1: [],
			list2: [],
			showCategoryIndex: 1,
			loadStatus: 'more',
			classIndex: 0,
			classList: [
				{
					name: '优鲜',
				},
				{
					name: '水果',
				},
				{
					name: '其他',
				},
			],
		};
	},
	onLoad() {
		// 拿产品类别列表
		this.getProductTypeList();

		this.list1 = [
			{
				id: '45',
				title: '优鲜',
				child: [
					{
						id: '57',
						title: '日本进口三文鱼',
						price: '800',
						postage: '15',
						count: 12,
					},
					{
						id: '57',
						title: '超级新鲜大闸蟹',
						price: '800',
						postage: '15',
						count: 12,
					},
				],
			},
			{
				id: '80',
				title: '水果',
				child: [
					{
						id: '57',
						title: '进口火龙果红肉',
						price: '80',
						postage: '15',
						count: 12,
					},
					{
						id: '57',
						title: '新鲜葡萄200g',
						price: '60',
						postage: '15',
						count: 12,
					},
				],
			},
		];
		this.list2 = [
			{
				id: '45',
				title: '蔬菜',
				child: [
					{
						id: '57',
						title: '新鲜芥蓝',
						cover: 'http://www.yllook.com/attachment/images/2019/12/24/image_157717026899975254.jpg',
						price: '800',
						postage: '15',
						count: 12,
					},
					{
						id: '57',
						title: '其他蔬菜',
						cover: 'http://www.yllook.com/attachment/images/2019/12/24/image_157717026899975254.jpg',
						price: '800',
						postage: '15',
						count: 12,
					},
					{
						id: '57',
						title: '其他蔬菜',
						cover: 'http://www.yllook.com/attachment/images/2019/12/24/image_157717026899975254.jpg',
						price: '800',
						postage: '15',
						count: 12,
					},
					{
						id: '57',
						title: '其他蔬菜',
						cover: 'http://www.yllook.com/attachment/images/2019/12/24/image_157717026899975254.jpg',
						price: '800',
						postage: '15',
						count: 12,
					},
				],
			},
			{
				id: '80',
				title: '水果',
				child: [
					{
						id: '57',
						title: '进口火龙果红肉',
						cover: 'http://www.yllook.com/attachment/images/2019/12/24/image_157717026899975254.jpg',
						price: '80',
						postage: '15',
						count: 12,
					},
					{
						id: '57',
						title: '新鲜葡萄200g',
						cover: 'http://www.yllook.com/attachment/images/2019/12/24/image_157717026899975254.jpg',
						price: '60',
						postage: '15',
						count: 12,
					},
					{
						id: '57',
						title: '新鲜葡萄200g',
						cover: 'http://www.yllook.com/attachment/images/2019/12/24/image_157717026899975254.jpg',
						price: '60',
						postage: '15',
						count: 12,
					},
					{
						id: '57',
						title: '新鲜葡萄200g',
						cover: 'http://www.yllook.com/attachment/images/2019/12/24/image_157717026899975254.jpg',
						price: '60',
						postage: '15',
						count: 12,
					},
					{
						id: '57',
						title: '新鲜葡萄200g',
						cover: 'http://www.yllook.com/attachment/images/2019/12/24/image_157717026899975254.jpg',
						price: '60',
						postage: '15',
						count: 12,
					},
					{
						id: '57',
						title: '新鲜葡萄200g',
						cover: 'http://www.yllook.com/attachment/images/2019/12/24/image_157717026899975254.jpg',
						price: '60',
						postage: '15',
						count: 12,
					},
					{
						id: '57',
						title: '新鲜葡萄200g',
						cover: 'http://www.yllook.com/attachment/images/2019/12/24/image_157717026899975254.jpg',
						price: '60',
						postage: '15',
						count: 12,
					},
				],
			},
		];
		this.listData = this.list1;
		// 查询第一个拥有二级菜单的子菜单
		for (let i = 0; i < this.listData.length; i++) {
			if (this.listData[i].child.length > 0) {
				this.showCategoryIndex = i;
				break;
			}
		}
	},
	methods: {
		// 拿产品类别列表
		getProductTypeList() {
			// product.getProductTypeList().then((res) => {
			// 	this.productTypeList = res.data.data;
			// 	// 初始化当前选择项
			// 	this.form.typeId = this.productTypeList[0].typeId;
			// 	this.form.typeName = this.productTypeList[0].typeName;
			// });
			this.productTypeList = [
				{
					typeId: '0',
					typeName: '全部商品',
				},
				{
					typeId: '1',
					typeName: '全部商品',
				},
				{
					typeId: '2',
					typeName: '全部商品',
				},
				{
					typeId: '3',
					typeName: '全部商品',
				},
				{
					typeId: '4',
					typeName: '全部商品',
				},
				{
					typeId: '5',
					typeName: '全部商品',
				},
			];
		},

		handleTab(index) {
			if (this.tabIndex !== index) {
				this.isEdit = false;
			}
			this.tabIndex = index;
			if (index === 0) {
				this.listData = this.list1;
				this.showProduct = true;
			} else if (index === 1) {
				this.listData = this.list2;
				this.showProduct = true;
			} else if (index === 2) {
				this.listData = [];
				this.showProduct = false;
			}
		},
		// 分类切换显示
		showCategory(index) {
			if (this.showCategoryIndex !== index) {
				this.isEdit = false;

				this.$delete(this.listData[this.showCategoryIndex], 'checked');
				this.listData[this.showCategoryIndex].child.filter((item) => {
					this.$delete(item, 'checked');
				});
			}
			this.showCategoryIndex = index;
		},
		handleEdit(type) {
			this.isEdit = type;
			this.$set(this.listData[this.showCategoryIndex], 'checked', false);
			this.listData[this.showCategoryIndex].child.filter((item) => {
				this.$set(item, 'checked', false);
			});
		},
		handleUpDown(item, type) {
			let tips = '';
			if (type === 'down') {
				tips = '确认下架该商品吗 ？';
			} else {
				tips = '确认上架该商品吗 ？';
			}
			uni.showModal({
				title: '',
				content: tips,
				success: (res) => {
					if (res.confirm) {
						window.console.log('用户点击确定');
					} else if (res.cancel) {
						window.console.log('用户点击取消');
					}
				},
			});
		},
		handleCheck(item, checked) {
			window.console.log(checked, 1231);
			item.checked = !checked;
		},
		handleDelete() {
			const checkedCount = this.listData[this.showCategoryIndex].child.filter(function (item) {
				return item.checked;
			}).length;
			if (checkedCount > 0) {
				const tips = '确认删除这' + checkedCount + '种商品吗';
				uni.showModal({
					title: '',
					content: tips,
					success: (res) => {
						if (res.confirm) {
							window.console.log('用户点击确定');
						} else if (res.cancel) {
							window.console.log('用户点击取消');
						}
					},
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: '请选择商品',
				});
			}
		},
		handleToDown() {
			const checkedCount = this.listData[this.showCategoryIndex].child.filter(function (item) {
				return item.checked;
			}).length;
			if (checkedCount > 0) {
				const tips = '确认下架这' + checkedCount + '种商品吗';
				uni.showModal({
					title: '',
					content: tips,
					success: (res) => {
						if (res.confirm) {
							window.console.log('用户点击确定');
						} else if (res.cancel) {
							window.console.log('用户点击取消');
						}
					},
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: '请选择商品',
				});
			}
		},

		handleToAdd() {
			uni.navigateTo({
				url: './add/index',
			});
		},
		handleToClassfic() {
			this.$refs.popupSelectClass.open();
		},
		selectConfirm(item, index) {
			this.classIndex = index;
		},
		handleClose() {
			this.$refs.popupSelectClass.close();
		},
	},
};
</script>

<style lang="scss">
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
.tab-button {
	// padding: 12rpx 40rpx 32rpx;
	border-bottom: 1px solid $tab-border-color-secondary;

	.tab-button-content {
		display: flex;
	}

	.item {
		width: 100/3 * 100%;
		text-align: center;

		> .item-text {
			display: inline-block;
			font-size: $tab-font-size-primary;
			color: $tab-font-color-primary;
			height: $tab-btn-height;
			line-height: $tab-btn-height;
			position: relative;

			&:after {
				position: absolute;
				bottom: -1px;
				left: 0;
				width: 100%;
				height: 8rpx;
				background-color: $tab-font-color-current;
				@include rounded(8rpx);
			}
		}

		&.active {
			> .item-text {
				color: $tab-font-color-current;

				&:after {
					content: '';
				}
			}
		}
	}
}

.module-button {
	position: fixed;
	bottom: 0;
	/*  #ifdef  H5  */
	bottom: 100rpx;
	/*  #endif  */
	right: 0;
	padding: 20rpx 42rpx;

	.button-add {
		background: $ds-main-color;
		width: 104rpx;
		height: 104rpx;
		border-radius: 50%;
		line-height: 98rpx;
		text-align: center;
		font-size: 36px;
		color: #fff;
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

/*模块分类*/
.category-list {
	background-color: #fff;
	// display: flex;

	.category-tab {
		box-sizing: border-box;
		padding: $uni-spacing-row-base;
		width: 100%;
		white-space: nowrap;

		.category-item {
			display: inline-block;
			margin-left: $uni-spacing-row-base;
			padding: 0 $uni-spacing-row-base;
			font-size: $category-tab-font-size-primary;
			line-height: $category-tab-btn-height;
			height: $category-tab-btn-height;
			background-color: $category-tab-btn-color-primary;
			@include rounded($uni-border-radius-lg);

			&:first-child {
				margin-left: 0;
			}
		}
	}

	.left,
	.right {
		// position: absolute;
		// top: 270rpx;
		/*  #ifdef  APP-PLUS  */
		// top: calc(270rpx + var(--status-bar-height));
		/*  #endif  */
		bottom: 0rpx;
		border-top: 1px solid #f2f2f2;
	}

	.left {
		width: 100%;
		// left: 0rpx;
		background-color: #f2f2f2;

		.row {
			// width: 100%;
			// height: 90rpx;
			// display: flex;
			// align-items: center;

			.text {
				width: 100%;
				position: relative;
				font-size: 28rpx;
				display: flex;
				justify-content: center;
				color: #3c3c3c;

				.block {
					position: absolute;
					width: 0rpx;
					left: 0;
				}
			}

			&.on {
				height: 100rpx;
				background-color: #fff;

				.text {
					font-size: 30rpx;
					font-weight: 600;
					color: #1abc9c;

					.block {
						width: 10rpx;
						height: 80%;
						top: 10%;
						background-color: $ds-main-color;
					}
				}
			}
		}
	}

	.right {
		width: 76%;
		left: 24%;
		background-color: #fff;
		padding: 0 0 10rpx;

		.category {
			width: auto;
			padding: 20rpx 15rpx;

			.banner {
				width: 96%;
				margin: 0 auto 20rpx;
				height: 24.262vw;
				border-radius: 10rpx;
				overflow: hidden;
				box-shadow: 0rpx 5rpx 20rpx rgba(0, 0, 0, 0.3);

				image {
					width: 100%;
					height: 24.262vw;
				}
			}

			.list {
				margin-top: 40rpx;
				width: 100%;
				display: flex;
				flex-wrap: wrap;

				.box {
					width: calc(71.44vw / 3);
					margin-bottom: 30rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-wrap: wrap;

					image {
						width: 64%;
						height: calc(71.44vw / 3 * 0.64);
					}

					.text {
						margin-top: 8rpx;
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 26rpx;
					}
				}
			}

			.no-data {
				margin: 48rpx 0;
				color: #999;
				display: flex;
				justify-content: center;
				align-items: center;

				.iconfont {
					margin-right: 20rpx;
					font-size: 16rpx;
				}
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
</style>
