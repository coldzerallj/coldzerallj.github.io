<template>
	<view class="app-main category-manage">
		<view class="category-list">
			<view class="category-item" v-for="(item, idx) in categoryList" :key="idx">
				<view class="category-item-name">
					{{ item.typeName }}
				</view>
				<view class="category-item-ctrl" v-if="item.typeId !== '1'">
					<view class="ctrl-btn secondary" @tap="handleDel(item.typeId)">
						删除
					</view>
					<view class="ctrl-btn primary" @tap="openModal(item.typeId, item.typeName)">
						重命名
					</view>
				</view>
				<view class="category-item-ctrl" v-else>
					<view class="ctrl-tips">
						默认分类，不可修改
					</view>
				</view>
			</view>
		</view>
		<view class="module-button">
			<button type="main" class="submit" @tap="openModal()">添加商品类别</button>
		</view>
		<view class="modal-mask" v-if="modal.show" />
		<view class="modal" v-if="modal.show">
			<view class="modal-header">
				<view class="shut-down-modal" @tap="shutDownModal" />
				<view class="head-box">
					{{ modal.title }}
				</view>
			</view>
			<view class="modal-body">
				<view class="module">
					<view class="module-header">商品类别名称</view>
					<view class="module-input">
						<input
							type="text"
							:class="['uni-input', modal.categoryName.length > 0 ? 'has-value' : '']"
							placeholder="请输入类别名称"
							v-model="modal.categoryName"
							placeholder-class="custom-placeholder"
						/>
					</view>
				</view>
			</view>
			<view class="modal-footer">
				<view class="foot-box">
					<view class="ctrl-btn primary" @tap="submit">
						确定
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import product from '@/api/product';

export default {
	data() {
		return {
			modal: {
				show: false,
				categoryName: '',
				categoryId: '',
				categorySortNo: '',
				title: '',
			},
			categoryList: [],
		};
	},

	onShow() {
		this.getCategoryList();
	},

	onHide() {},

	methods: {
		// 删除类别
		handleDel(id) {
			const me = this;

			const params = {
				tenantId: uni.getStorageSync('tenantId'),
				typeId: id,
			};

			uni.showModal({
				content: `确定删除该类别?`,
				success(res) {
					if (res.confirm) {
						uni.showLoading({
							title: `网络通信中...`,
							mask: true,
						});

						product.categoryDel(params).then((res) => {
							if (res.message === 'success') {
								uni.showToast({
									icon: 'success',
									title: `类别已删除`,
									mask: true,
								});
								me.getCategoryList();
							} else {
								uni.showToast({
									icon: 'none',
									title: res.message,
									duration: 2000,
									mask: true,
								});
							}
						});
					}
				},
			});
		},

		// submit
		submit() {
			uni.showLoading({
				title: `网络通信中...`,
				mask: true,
			});

			const params = {
				tenantId: uni.getStorageSync('tenantId'),
				typeName: this.modal.categoryName,
			};

			if (this.modal.categoryId) {
				params.typeId = this.modal.categoryId;
				params.sortNo = this.modal.categorySortNo;

				product.categoryModify(params).then((res) => {
					if (res.data && res.message === 'success') {
						this.submitSuccess();
					} else {
						uni.showToast({
							icon: 'none',
							title: res.message,
							duration: 2000,
							mask: true,
						});
					}
				});
			} else {
				product.categoryAdd(params).then((res) => {
					if (res.data && res.message === 'success') {
						this.submitSuccess();
					} else {
						uni.showToast({
							icon: 'none',
							title: res.message,
							duration: 2000,
							mask: true,
						});
					}
				});
			}
		},

		// submit success
		submitSuccess() {
			uni.showToast({
				icon: 'success',
				title: this.modal.categoryId ? '修改成功' : '添加成功',
				duration: 1500,
				mask: true,
				success: () => {
					setTimeout(() => {
						this.shutDownModal();
						this.getCategoryList();
					}, 1500);
				},
			});
		},

		// 打开模态窗
		openModal(id, name, sortNo) {
			this.modal.show = true;

			if (id) {
				this.modal.categoryId = id;
				this.modal.categoryName = name;
				this.modal.categorySortNo = sortNo;
				this.modal.title = '编辑商品类别';
			} else {
				this.modal.title = '新增商品类别';
			}
		},

		// 关闭模态窗
		shutDownModal() {
			this.modal.show = false;
			this.modal.categoryName = '';
			this.modal.categoryId = '';
			this.modal.categorySortNo = '';
			this.modal.title = '';
		},

		// 拿产品类别列表
		getCategoryList() {
			product.getProductTypeList(uni.getStorageSync('tenantId')).then((res) => {
				if (res.data && res.data.length > 0) {
					this.categoryList = res.data;
				}
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.modal-mask {
	position: fixed;
	top: 0;
	left: 0;
	width: 200vw;
	height: 200vh;
	z-index: 99;
	background-color: rgba(0, 0, 0, 0.3);
}

.modal {
	z-index: 100;
	position: fixed;
	top: 50%;
	left: 50%;
	width: 80%;
	background-color: $uni-bg-color;
	@include rounded($uni-border-radius-lg);
	@include animation-s(in, 0.3s, ease, 0.2s);

	@keyframes in {
		0% {
			opacity: 0;
			transform: translate(-50%, -100%);
		}

		100% {
			opacity: 1;
			transform: translate(-50%, -50%);
		}
	}

	&-header {
		position: relative;
		text-align: center;
		font-size: 0;
		line-height: 0;
		padding: $uni-spacing-base 100rpx;
		border-bottom: 1px solid $uni-border-color-grey;

		.shut-down-modal {
			position: absolute;
			top: 50%;
			right: $uni-spacing-base;
			transform: translate(0, -50%);
			@include rounded(50%);
			@include square(43rpx);
			background-image: $icon-shutdown-thin;
			background-position: center center;
			background-color: $form-font-color-placeholder;
			background-repeat: no-repeat;
			background-size: 35%;
		}

		.head-box {
			display: inline-block;
			font-size: $uni-font-size-lg;
			line-height: $uni-font-size-lg;
			color: $uni-text-color;
			@include am-line-clamp(1);
		}
	}

	&-footer {
		text-align: center;
		font-size: 0;
		line-height: 0;
		padding: $uni-spacing-base;

		.foot-box {
			display: inline-block;

			.ctrl-btn {
				&:first-child {
					margin-left: 0;
					height: $category-manager-btn-height * 1.2;
					line-height: $category-manager-btn-height * 1.2;
					padding: 0 $uni-spacing-lg * 3;
				}
			}
		}
	}
}

.category-list {
	padding-bottom: 200rpx;
}

.category-item {
	position: relative;
	padding: $uni-spacing-lg 400rpx $uni-spacing-lg $uni-spacing-base;
	margin: $uni-spacing-lg $uni-spacing-lg 0 $uni-spacing-lg;
	background-color: $uni-bg-color;
	@include rounded($uni-border-radius-lg);

	&-name {
		display: block;
		font-size: $uni-font-size-lg;
		color: $uni-text-color;
		@include am-line-clamp(1);
	}

	&-ctrl {
		position: absolute;
		top: $uni-spacing-base - 2rpx;
		right: $uni-spacing-base;
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

.ctrl-tips {
	text-align: right;
	font-size: $uni-font-size-lg;
	line-height: $category-manager-btn-height;
	color: $uni-text-ordermsg;
}

.module-button {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: $uni-spacing-lg;
	box-sizing: border-box;

	.submit {
		box-sizing: border-box;
		height: $form-btn-height;
		@include rounded($form-btn-height);

		&:after {
			@include rounded($form-btn-height);
			border-color: transparent;
		}
	}
}

.module {
	padding: $uni-spacing-lg 20%;
}

.module-header {
	color: $uni-text-ordermsg;
	font-size: $form-font-size-secondary;
	text-align: center;
}

.module-input {
	position: relative;

	.uni-input {
		text-align: center;
		box-sizing: border-box;
		padding: 0;
		border: 1px solid transparent;
		border-bottom-color: $form-border-color-primary;
		font-size: $form-font-size-primary;
		color: $form-font-color-primary;
		height: $form-input-height;
	}
}
</style>
