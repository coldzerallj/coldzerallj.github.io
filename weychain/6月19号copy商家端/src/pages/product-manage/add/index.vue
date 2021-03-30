<template>
	<view class="page-product-add">
		<view class="form-section-wrap">
			<view class="module">
				<view class="module-header">商品名称</view>
				<view class="module-header-secondary">
					最多输入 16 个字符
				</view>
				<view class="module-input">
					<span class="clear-v-modal" @tap="clearVmodal('productName')" v-if="form.productName.length > 0" />
					<input
						type="text"
						:class="['uni-input', form.productName.length > 0 ? 'has-value' : '']"
						placeholder="输入商品名称，如：五花肉"
						v-model="form.productName"
						maxlength="16"
						placeholder-class="custom-placeholder"
					/>
				</view>
			</view>
			<view class="module">
				<view class="module-header">
					商品介绍
					<span class="sub">（选填）</span>
				</view>
				<view class="module-input">
					<span class="clear-v-modal in-textarea" @tap="clearVmodal('productBrief')" v-if="form.productBrief.length > 0" />
					<span :class="['textarea-length-verify', form.productBrief.length == 300 ? 'full' : '']">
						<span class="textarea-length-verify-text" v-if="form.productBrief.length == 300">（最多输入 300 个字符）</span>
						{{ form.productBrief.length }} / 300
					</span>
					<textarea
						:class="['input-textarea', form.productBrief.length > 0 ? 'has-value' : '']"
						maxlength="300"
						placeholder="输入商品介绍"
						auto-height
						v-model="form.productBrief"
						placeholder-class="custom-placeholder"
					/>
				</view>
			</view>
			<view class="module">
				<view class="module-header">
					商品图片
				</view>
				<view class="module-header-secondary">
					最少上传 1 张，最多 5 张图片
				</view>
				<view class="module-image">
					<view class="item" v-for="(item, index) in form.images" :key="index">
						<span class="del-img" v-if="form.images.length > 1 && index !== 0" @tap="delImg(index)" />
						<span class="reset-img" @tap="handleChoose(index)" v-if="canUpload">
							重新上传
						</span>
						<span class="reset-img" v-else>
							上传中...
						</span>
						<image class="media-object" :src="item" mode="widthFix" />
					</view>
					<view class="item button-upload" @tap="handleChoose()" v-if="canUpload && form.images.length < 5">
						<span>
							+
						</span>
					</view>
					<view class="item button-upload uploading" v-if="!canUpload && form.images.length < 5">
						<span></span>
					</view>
				</view>
			</view>
			<view class="module">
				<view class="module-header">
					分类至
				</view>
				<view class="module-input">
					<view class="uni-list-cell-db">
						<picker mode="selector" range-key="typeName" @change="bindPickerChange" :value="form.typeId" :range="productTypeList">
							<view class="input-select">
								{{ form.typeName }}
								<text class="iconfont iconjiantou" />
							</view>
						</picker>
					</view>
				</view>
			</view>
		</view>

		<view class="form-section-wrap" v-for="(item, index) in form.specifications" :key="index">
			<span class="del-spec" @tap="delSpec(index, item.id ? item.id : null)" v-if="form.specifications.length > 1 && index != 0">删除</span>
			<view class="module">
				<view class="module-header">
					{{ index == 0 ? '默认规格' : `规格 ${index + 1}` }}
				</view>
				<view class="module-input">
					<span class="clear-v-modal" @tap="clearVmodal('specName', index)" v-if="item.specName.length > 0"></span>
					<input
						type="text"
						:class="['uni-input', item.specName.length > 0 ? 'has-value' : '']"
						placeholder="输入此规格的名称，如：黑毛猪五花肉"
						v-model="item.specName"
						placeholder-class="custom-placeholder"
					/>
				</view>
			</view>
			<view class="module">
				<view class="module-header">库存</view>
				<view class="grid-row">
					<view class="grid-col-15 module-grid-col-gap">
						<view class="module-input">
							<span class="clear-v-modal" @tap="clearVmodal('stockNum', index)" v-if="item.stockNum.length > 0"></span>
							<input
								type="text"
								:class="['uni-input', item.stockNum.length > 0 ? 'has-value' : '']"
								placeholder="输入此规格的库存"
								v-model="item.stockNum"
								@input="verifyNumber('stock', index, $event)"
								placeholder-class="custom-placeholder"
							/>
						</view>
					</view>
					<view class="grid-col-7">
						<view class="module-input">
							<view class="uni-list-cell-db">
								<picker
									mode="selector"
									:range-key="'unitName'"
									@change="unitChange('stock', index, $event)"
									:value="form.specifications[index].stockUnit"
									:range="stockUnitList"
								>
									<view class="input-select">
										<template v-if="item.stockUnit">
											{{ form.specifications[index].stockUnitName }}
										</template>
										<text class="iconfont iconjiantou" />
									</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="module">
				<view class="module-header">重量</view>
				<view class="grid-row">
					<view class="grid-col-15 module-grid-col-gap">
						<view class="module-input">
							<span class="clear-v-modal" @tap="clearVmodal('weight', index)" v-if="item.weight.length > 0"></span>
							<input
								type="text"
								:class="['uni-input', item.weight.length > 0 ? 'has-value' : '']"
								placeholder="输入此规格的重量"
								v-model="item.weight"
								@input="verifyNumber('weight', index, $event)"
								placeholder-class="custom-placeholder"
							/>
						</view>
					</view>
					<view class="grid-col-7">
						<view class="module-input">
							<view class="uni-list-cell-db">
								<picker
									mode="selector"
									:range-key="'unitName'"
									@change="unitChange('weight', index, $event)"
									:value="form.specifications[index].weightUnit"
									:range="weightUnitList"
								>
									<view class="input-select">
										<template v-if="item.weightUnit">
											{{ form.specifications[index].weightUnitName }}
										</template>
										<span class="plugin-text-selecter-currentValue">
											<template v-if="item.stockUnit"> / {{ form.specifications[index].stockUnitName }} </template>
										</span>
										<text class="iconfont iconjiantou" />
									</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="module">
				<view class="module-header">单价</view>
				<view class="grid-row">
					<view class="grid-col-15 module-grid-col-gap">
						<view class="module-input">
							<span class="clear-v-modal" @tap="clearVmodal('price', index)" v-if="item.price.length > 0"></span>
							<input
								type="text"
								:class="['uni-input', item.price.length > 0 ? 'has-value' : '']"
								placeholder="输入此规格的单价"
								v-model="item.price"
								@input="verifyNumber('price', index, $event)"
								placeholder-class="custom-placeholder"
							/>
						</view>
					</view>
					<view class="grid-col-7">
						<view class="module-input">
							<input
								disabled
								type="text"
								class="uni-input"
								:placeholder="`元 / ${form.specifications[index].stockUnitName}`"
								placeholder-class="custom-placeholder"
							/>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="add-spec">
			<span @tap="addSpec">+ 添加商品规格</span>
		</view>

		<view class="module-button">
			<button type="main" class="submit" @tap="submit">确认</button>
		</view>
	</view>
</template>
<script>
import product from '@/api/product';
import { trim } from '@/utils';
import { UPLOAD_URL, WX_MESSAGE_TEMPLATE } from '@/common/global';

export default {
	data() {
		return {
			productTypeList: [],
			priceUnitList: [],
			weightUnitList: [],
			stockUnitList: [],
			form: {
				productName: '',
				productBrief: '',
				specifications: [
					{
						specName: '',
						price: '',
						weight: '',
						weightUnit: null,
						weightUnitName: null,
						stockNum: '',
						stockUnit: null,
						stockUnitName: null,
					},
				],
				images: [],
				typeId: null,
				typeName: '',
			},
			imgPath: '',
			subjectId: null,
			// 编辑商品状态下，用户删除那些已经存在的规格，需要收集这些规格的ID传回给后端
			delSpecIds: [],
			// 专门为上传多张图片准备的变量
			canUpload: true,
			qtyOfUploading: 0,
			totalUpload: 0,
		};
	},

	onLoad(options) {
		this.getProductTypeList();
		this.getStockUnitList();
		this.getWeightUnitList();
		// 带 subjectId 进来的是编辑商品状态
		if (options.subjectId) {
			this.subjectId = options.subjectId;
			this.getProduct();
		}
	},

	methods: {
		// 清除键入值
		// 临时的，抽组件就换写法
		clearVmodal(vModal, idx) {
			switch (vModal) {
				case 'productName':
					this.form.productName = '';
					break;
				case 'productBrief':
					this.form.productBrief = '';
					break;
				case 'specName':
					this.form.specifications[idx].specName = '';
					break;
				case 'price':
					this.form.specifications[idx].price = '';
					break;
				case 'weight':
					this.form.specifications[idx].weight = '';
					break;
				case 'stockNum':
					this.form.specifications[idx].stockNum = '';
					break;
			}
		},

		// 校验信息展示
		formErrorMsg(str) {
			uni.showToast({
				icon: 'none',
				title: str,
				duration: 2000,
				mask: true,
			});
		},

		// toDoList:
		// 上传图片
		// 1.上传接口抽象成组件
		// 输入
		// 1. 增加商品按钮在待上架列表不出现
		// 版本管理
		// 1. 造一个版本号变量，全局代码用，输出打包的时候加到文件名里面

		// verifyNumber(idx, e) {
		// 	if (e.detail.value.indexOf('.') < 0 && e.detail.value != '') {
		// 		if (e.detail.value.length > 2) {
		// 			e.detail.value = e.detail.value.substring(0, e.detail.value.length - 1);
		// 			uni.showToast({
		// 				title: '1111',
		// 				icon: 'none',
		// 			});
		// 		} else {
		// 			e.detail.value = parseFloat(e.detail.value);
		// 		}
		// 	} else if (e.detail.value.indexOf('.') == 0) {
		// 		console.log('首位小数点情况');
		// 		e.detail.value = e.detail.value.replace(/[^$#$]/g, '0.');
		// 		e.detail.value = e.detail.value.replace(/\.{2,}/g, '.');
		// 	} else if (!/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) {
		// 		e.detail.value = e.detail.value.substring(0, e.detail.value.length - 1);
		// 	}
		// 	this.$nextTick(function () {
		// 		this.value = e.detail.value;
		// 	});
		// 	console.log(this.value);
		// },

		verifyNumber(type, idx, e) {
			this.$nextTick(() => {
				let val = e.target.value.toString();
				val = val.replace(/[^\d.]/g, ''); // 清除"数字"和"."以外的字符
				val = val.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
				val = val.replace(/^0+\./g, '0.');
				val = val.match(/^0+[1-9]+/) ? (val = val.replace(/^0+/g, '')) : val;
				val = val.match(/^\d*(\.?\d{0,2})/g)[0] || '';

				if (val.includes('.')) {
					const numDian = val.toString().split('.')[1].length;
					if (numDian === 2) {
						this.moneyMaxLeng = val.length;
					}
				} else {
					this.moneyMaxLeng = 8;
				}

				switch (type) {
					case 'stock':
						this.form.specifications[idx].stockNum = val;
						break;
					case 'weight':
						this.form.specifications[idx].weight = val;
						break;
					case 'price':
						this.form.specifications[idx].price = val;
						break;
					default:
				}
			});
		},

		// 校验表单
		verify() {
			// 校验有没填商品名字
			if (!this.form.productName) {
				this.formErrorMsg('请输入商品名称');
				return false;
			}

			// 校验有没上传图片
			if (this.form.images.length === 0) {
				this.formErrorMsg('至少上传一张图片');
				return false;
			}

			// 校验有没上传图片
			if (this.form.specifications.length === 0) {
				this.formErrorMsg('至少上传一张图片');
				return false;
			}

			// 校验规格资料
			for (let idx = 0; idx < this.form.specifications.length; idx++) {
				const item = this.form.specifications[idx];
				if (!item.specName) {
					this.formErrorMsg(`规格（${idx + 1}）缺少名称`);
					return false;
				}

				if (!item.price) {
					this.formErrorMsg(`规格（${idx + 1}）缺少单价`);
					return false;
				}

				if (item.price < 0) {
					this.formErrorMsg(`规格（${idx + 1}）的单价不能为负数`);
					return false;
				}

				if (!item.weight) {
					this.formErrorMsg(`规格（${idx + 1}）缺少重量`);
					return false;
				}

				if (item.weight < 0) {
					this.formErrorMsg(`规格（${idx + 1}）的重量不能为负数`);
					return false;
				}

				if (!item.stockNum) {
					this.formErrorMsg(`规格（${idx + 1}）缺少库存`);
					return false;
				}

				if (item.stockNum < 0) {
					this.formErrorMsg(`规格（${idx + 1}）的库存不能为负数`);
					return false;
				}
			}

			return true;
		},

		// 删除规格
		delSpec(idx, specId) {
			const me = this;
			uni.showModal({
				content: `确定删除规格 ${idx + 1}?`,
				success(res) {
					if (res.confirm) {
						if (specId) {
							// 编辑商品状态下，用户删除那些已经存在的规格，需要收集这些规格的ID传回给后端
							me.delSpecIds.push(specId);
						}
						me.form.specifications.splice(idx, 1);
					}
				},
			});
		},

		// 增加规格
		addSpec() {
			const obj = {
				specName: '',
				price: '',
				weight: '',
				weightUnit: this.weightUnitList[0].id,
				weightUnitName: this.weightUnitList[0].unitName,
				stockNum: '',
				stockUnit: this.stockUnitList[0].id,
				stockUnitName: this.stockUnitList[0].unitName,
			};
			this.form.specifications.push(obj);
		},

		// 提交表单
		submit() {
			const me = this;
			uni.requestSubscribeMessage({
				tmplIds: WX_MESSAGE_TEMPLATE,
				success(res) {
					if (me.verify()) {
						const parmas = {
							productName: trim(me.form.productName),
							productBrief: trim(me.form.productBrief),
							specifications: me.form.specifications,
							images: me.form.images,
							typeId: me.form.typeId,
						};

						// 编辑状态加多两个提交字段
						if (me.subjectId) {
							parmas.subjectId = me.subjectId;
							parmas.delSpecIds = me.delSpecIds;

							product.updateProduct(parmas).then((res) => {
								if (res.code === 200) {
									me.submitSuccess('修改成功');
								}
							});
						} else {
							product.addProduct(parmas).then((res) => {
								if (res.code === 200) {
									me.submitSuccess('添加成功');
								}
							});
						}
					}
				},
			});
		},

		// 提交表单成功
		submitSuccess(successText) {
			uni.showToast({
				icon: 'success',
				title: successText,
				duration: 2000,
				mask: true,
				success: () => {
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/product-manage/index',
						});
					}, 2000);
				},
			});
		},

		// 拿产品类别列表
		async getProductTypeList() {
			await product.getProductTypeList(uni.getStorageSync('tenantId')).then((res) => {
				if (res.data && res.data.length > 0) {
					this.productTypeList = res.data;
				}
				// 初始化当前选择项
				this.form.typeId = this.productTypeList[0].typeId;
				this.form.typeName = this.productTypeList[0].typeName;
			});
		},

		// 拿重量单位列表
		async getWeightUnitList() {
			await product.getUnitList(2).then((res) => {
				this.weightUnitList = res.data;
				// 初始化当前选择项
				this.form.specifications[0].weightUnit = this.weightUnitList[0].id;
				this.form.specifications[0].weightUnitName = this.weightUnitList[0].unitName;
			});
		},

		// 拿了库存单位列表
		async getStockUnitList() {
			await product.getUnitList(3).then((res) => {
				this.stockUnitList = res.data;
				// 初始化当前选择项
				this.form.specifications[0].stockUnit = this.stockUnitList[0].id;
				this.form.specifications[0].stockUnitName = this.stockUnitList[0].unitName;
			});
		},

		// 拿产品信息(编辑商品状态下)
		async getProduct() {
			await product.getProduct(this.subjectId).then((res) => {
				if (res.data && res.message === 'success') {
					// 拿回来的商品规格资料里面是没有计量单位的中文名称的，前端要自己用计量单位的ID重新渲染一次
					const newSpecArr = res.data.specifications;
					newSpecArr.map((item) => {
						item.weightUnitName = this.renderSpecWeightUnitName(item.weightUnit);
						item.stockUnitName = this.renderSpecStockUnitName(item.stockUnit);
						// 将传回来的数字字段变成字符串
						item.price = JSON.stringify(item.price);
						item.weight = JSON.stringify(item.weight);
						item.stockNum = JSON.stringify(item.stockNum);
					});

					this.form = {
						productName: res.data.productName,
						productBrief: res.data.productBrief,
						specifications: newSpecArr,
						images: res.data.images,
						typeId: res.data.typeId,
						typeName: this.renderProductTypeName(res.data.typeId),
					};
				}
			});
		},

		// 获取规格库存单位名称(编辑商品状态下)
		renderSpecStockUnitName(stockUnit) {
			if (this.stockUnitList.length > 0) {
				let stockUnitName;
				this.stockUnitList.some((item) => {
					if (item.id === stockUnit) {
						stockUnitName = item.unitName;
					}
				});
				return stockUnitName;
			}
		},

		// 获取规格重量单位名称(编辑商品状态下)
		renderSpecWeightUnitName(weightUnit) {
			if (this.weightUnitList.length > 0) {
				let weightUnitName;
				this.weightUnitList.some((item) => {
					if (item.id === weightUnit) {
						weightUnitName = item.unitName;
					}
				});
				return weightUnitName;
			}
		},

		// 获取商品类别的名称(编辑商品状态下)
		renderProductTypeName(typeId) {
			if (this.productTypeList.length > 0) {
				let productTypeName;
				this.productTypeList.map((item) => {
					if (item.typeId === typeId) {
						productTypeName = item.typeName;
					}
				});
				return productTypeName;
			}
		},

		// 选产品类别
		bindPickerChange(e) {
			this.form.typeId = this.productTypeList[e.target.value].typeId;
			this.form.typeName = this.productTypeList[e.target.value].typeName;
		},

		// 选单位
		unitChange(type, index, e) {
			switch (type) {
				case 'weight':
					this.form.specifications[index].weightUnit = this.weightUnitList[e.detail.value].id;
					this.form.specifications[index].weightUnitName = this.weightUnitList[e.target.value].unitName;
					break;
				case 'stock':
					this.form.specifications[index].stockUnit = this.stockUnitList[e.detail.value].id;
					this.form.specifications[index].stockUnitName = this.stockUnitList[e.target.value].unitName;
					break;
				default:
			}
		},

		// 删除图片
		delImg(idx) {
			const me = this;
			uni.showModal({
				content: '确定删除照片?',
				success(res) {
					if (res.confirm) {
						me.form.images.splice(idx, 1);
					}
				},
			});
		},

		// 判断能上传多少张照片
		imgQtyCanupload(idx) {
			if (idx !== null) {
				return 1;
			} else {
				const totalCanUpload = 5; // 用户最多上传5张图片
				const uploaded = this.form.images.length; // 已经上传的图片数量
				const infactQty = totalCanUpload - uploaded;
				return infactQty;
			}
		},

		// 上传文件到我们的服务器
		uploadFile(filePath, idx) {
			uni.showLoading({
				title: `上传中...`,
				mask: true,
			});
			uni.uploadFile({
				url: UPLOAD_URL,
				filePath,
				name: 'file',
				header: {
					'x-token': uni.getStorageSync('xToken'),
				},
				success: (uploadFileRes) => {
					const { data } = JSON.parse(uploadFileRes.data);

					if (idx !== null) {
						this.form.images.splice(idx, 1, ...data);
					} else {
						this.form.images = [...this.form.images, ...data];
					}

					this.qtyOfUploading = this.qtyOfUploading + 1;

					// eslint-disable-next-line eqeqeq
					if (this.qtyOfUploading == this.totalUpload) {
						uni.hideLoading();
						uni.showToast({
							icon: 'success',
							title: '上传成功',
							duration: 1500,
							mask: true,
						});
						this.canUpload = true;
					}
				},
				fail: () => {
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: '上传失败',
						duration: 1500,
					});
					this.canUpload = true;
					return;
				},
			});
		},

		// 上传图片
		handleChoose(idx = null) {
			const that = this;
			that.qtyOfUploading = 0;
			that.totalUpload = 0;
			that.canUpload = false;

			uni.chooseImage({
				count: that.imgQtyCanupload(idx),
				sizeType: [
					// 可以指定是原图还是压缩图，默认二者都有
					// 'original', // 暂时先只能上传压缩图
					'compressed',
				],
				sourceType: ['album', 'camera'], // 从相册选择或者拍照
				success: (res) => {
					that.totalUpload = res.tempFilePaths.length;

					if (idx !== null) {
						that.uploadFile(res.tempFilePaths[0], idx);
					} else {
						res.tempFilePaths.map((item) => {
							that.uploadFile(item, idx);
						});
					}
				},
				fail: () => {
					that.canUpload = true;
				},
			});
		},
	},
};
</script>

<style lang="scss">
.module {
	& + & {
		margin-top: $uni-spacing-base * 2;
	}
}

.module-header {
	color: $form-font-color-label;
	font-size: $form-font-size-secondary;

	.sub {
		color: $form-font-color-placeholder;
	}
}

.module-header-secondary {
	padding-top: $uni-spacing-sm;
	color: #99a0ad;
	font-size: $uni-font-size-sm;
}

.module-image {
	@include clearfix();

	.item {
		border-radius: 10rpx;
		@include rounded($uni-border-radius-lg);
		float: left;
		position: relative;
		padding-top: 30%;
		width: 30%;
		margin-right: 5%;
		margin-top: $uni-spacing-base;
		box-sizing: border-box;
		overflow: hidden;

		&:nth-child(3n) {
			margin-right: 0;
		}

		.del-img {
			$delBtnSize: 48rpx;
			position: absolute;
			z-index: 2;
			top: -$delBtnSize/4;
			right: -$delBtnSize/4;
			width: $delBtnSize;
			height: $delBtnSize;
			@include rounded($uni-border-radius-lg);
			background-image: $icon-shutdown-thin;
			background-position: left 10rpx bottom 10rpx;
			background-color: rgba(0, 0, 0, 0.6);
			background-repeat: no-repeat;
			background-size: 35%;
		}

		.reset-img {
			position: absolute;
			z-index: 2;
			width: 100%;
			bottom: 0;
			left: 0;
			height: 54rpx;
			line-height: 54rpx;
			font-size: 24rpx;
			color: #fff;
			text-align: center;
			background-color: rgba(0, 0, 0, 0.6);
		}
	}
}

.media-object {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	max-width: 100%;
	height: 100% !important;
}

.module-input {
	position: relative;

	.clear-v-modal {
		position: absolute;
		z-index: 2;
		top: $form-input-height / 4;
		right: 0;
		@include square($form-input-height / 2);
		border-radius: 50%;
		background-image: $icon-shutdown-thin;
		background-position: center center;
		background-color: $form-font-color-placeholder;
		background-repeat: no-repeat;
		background-size: 35%;

		&.in-textarea {
			right: $form-input-height / 4;
		}
	}

	.input-select {
		position: relative;
		box-sizing: border-box;
		background: #fff;
		padding: 0 $uni-spacing-base * 2 0 0;
		height: $form-input-height;
		line-height: $form-input-height;
		border: 1px solid transparent;
		border-bottom-color: $form-border-color-primary;
		white-space: nowrap;
		word-wrap: none;
		@include textEllipsis(1);
		font-size: $form-font-size-primary;
		color: $form-font-color-primary;

		.iconjiantou {
			position: absolute;
			top: 0;
			right: -4px;
			width: auto;
			text-align: center;
			line-height: calc(90rpx - 2px); //  减去上一层 input-select 的边距
			font-size: $uni-font-size-lg + 10rpx;
			color: $form-font-color-placeholder;
			font-weight: 900;
		}
	}

	.uni-input {
		box-sizing: border-box;
		padding: 0;
		border: 1px solid transparent;
		border-bottom-color: $form-border-color-primary;
		font-size: $form-font-size-primary;
		color: $form-font-color-primary;
		height: $form-input-height;

		&.has-value {
			padding-right: $form-input-height / 2 + $uni-spacing-base;
		}
	}
}

.uni-textarea-placeholder,
.uni-input-placeholder {
	margin-left: -10rpx; // 因为 uni h5 模式下渲染出来的 placeholder 字符串会前后自带空格，为对齐美观，所以用样式把空格造成的间隔抵消掉
	color: $form-font-color-placeholder;
}

// 用来兼容微信小程序的 placeholder，写在 placeholder-class 这个 dom api 上的样式
.custom-placeholder {
	// margin-left: -10rpx; // 因为 uni 小程序模式下渲染出来的 placeholder 字符串又没有空格，所以位移的样式就不需要了
	color: $form-font-color-placeholder;
}

.plugin-text-selecter-currentValue {
	color: $form-font-color-placeholder;
	padding-left: 10rpx;
}

.module-grid-col-gap {
	margin-right: ((1 / $gridSize) * 100%) * 2;
}

.input-textarea {
	background: #fff;
	box-sizing: border-box;
	width: auto;
	border: 1px solid $form-border-color-primary;
	min-height: 300rpx;
	padding: $uni-spacing-base;
	padding-bottom: $uni-spacing-lg * 2;
	margin: $uni-spacing-base 0 0;
	font-size: $form-font-size-primary;
	line-height: $form-font-size-primary * 1.2;

	&.has-value {
		padding-right: $form-input-height / 2 + $uni-spacing-base;
	}

	.uni-textarea-textarea {
		width: 100%;
	}
}

.textarea-length-verify {
	position: absolute;
	z-index: 2;
	bottom: $form-input-height / 4;
	right: $form-input-height / 4;
	color: $form-font-color-label;
	font-size: $uni-font-size-sm;
	line-height: $uni-font-size-sm;

	&-text {
		color: $uni-color-warning;
	}

	&.full {
		color: $uni-color-warning;
	}
}

.uni-form-item {
	background: #fff;
	padding: 0;
	.title {
		width: 140rpx;
		padding: 10rpx 16rpx;
	}
	.uni-input {
		padding: 14rpx;
		border: 1px solid #eee;
	}
}

.module-button {
	padding: $uni-spacing-lg;

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

.page-product-add {
	background-color: $app-page-bg-color-primary;

	.form-section-wrap {
		padding: $uni-spacing-lg;
		background-color: $uni-bg-color;
		position: relative;
	}

	.form-section-wrap + .form-section-wrap {
		margin-top: $uni-spacing-base;
	}

	.del-spec {
		position: absolute;
		top: $uni-spacing-lg;
		right: $uni-spacing-lg;
		color: $uni-color-error;
		font-size: $form-font-size-secondary;
		line-height: $form-font-size-secondary;
	}

	.add-spec {
		text-align: right;
		padding: $uni-spacing-lg;

		> span {
			@include link-mobile($uni-color-success);
			font-size: $form-font-size-primary;
		}
	}

	.button-upload {
		background-color: rgb(236, 236, 236);

		> span {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -53%);
			font-size: 90rpx;
			color: #999;
		}

		&.uploading > span {
			box-sizing: border-box;
			@include square(45rpx);
			@include rounded(50%);
			@include animation-s(bounce, 1s, linear, 0, infinite);

			border: 2px solid lighten($uni-text-color-grey, 15);
			border-top-color: transparent;

			@keyframes bounce {
				0% {
					transform: translate(-50%, -50%) rotate(0deg);
				}

				100% {
					transform: translate(-50%, -50%) rotate(359deg);
				}
			}
		}
	}
}

// toDo
// 有时候各单位列表拿回来比商品详情慢，导致有些单位岩慢的情况下渲染不出来
</style>
