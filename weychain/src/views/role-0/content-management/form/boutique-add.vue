<template>
	<section class="boutique-add">
		<!-- 添加 触发型活动 -->
		<!-- 表单 -->
		<el-row>
			<el-col :md="14" :lg="14" style="padding-right:32px">
				<el-form>
					<el-form-item label="填写卡片名称" :required="true">
						<el-input v-model="addForm.name" placeholder="请填写卡片名称" />
					</el-form-item>

					<el-form-item label="填写主标题" :required="true">
						<el-input v-model="addForm.mainTitle" placeholder="请填写主标题" />
					</el-form-item>

					<el-form-item label="">
						<div class="module-title-tips">填写副标题<span class="img-tips">（选填）</span></div>

						<el-input v-model="addForm.subTitle" placeholder="请填写副标题" />
					</el-form-item>
					<div class="module-product">
						<div class="module-title-tips">
							<span class="ic">* </span>选择商品<span class="img-tips" style="display:block">注：商品从上往下为商品展示顺序，点击箭头进行排序</span>

							<el-button class="coupon-btn-add" type="primary" @click="handleOpenProduct" size="mini">
								选择商品
							</el-button>
						</div>

						<div class="product-list">
							<div class="item" v-for="(item, index) in selected" :key="index">
								<div class="module-el-sort" v-if="selected.length > 1">
									<div class="el-sort el-icon-top" @click="handleSort('top', index)"></div>
									<div class="el-sort el-icon-bottom" @click="handleSort('bottom', index)"></div>
								</div>
								<span class="el-icon-remove" @click="handleDeleteProduct(index)"></span>
								<img style="width: 100px; height: 100px;border-radius:6px" :src="item.picUrl" fit="fit" />
								<div class="item-content">
									<div class="item-title">{{ item.productName }}</div>
									<div class="item-tips">
										{{ item.value }} {{ item.weight }}{{ item.weightUnitName }}/{{ item.stockUnitName }}，库存：{{ item.stockNum - item.withHoldStockNum
										}}{{ item.stockUnitName }}
									</div>
									<div class="item-price">¥{{ item.price }}</div>
								</div>
							</div>
						</div>
					</div>
				</el-form>
				<div class="custom-form-btns-wrap">
					<el-button type="primary" @click="handleAddForm">
						{{ $t('que-ren-ti-jiao') }}
					</el-button>
					<el-button type="default" @click="goBack">
						<template>{{ $t('fan-hui') }}</template>
					</el-button>
				</div>
			</el-col>
			<el-col :md="10" :lg="10">
				<div class="block-title">预览卡片</div>
				<div class="module-show">
					<div style="padding:0 0 14px">
						<div class="show-title">{{ addForm.mainTitle }}</div>
						<div class="show-tips">{{ addForm.subTitle }}</div>
					</div>
					<div class="show-list product-list">
						<div class="item" v-for="(item, index) in selected" :key="index">
							<div class="item-block">
								<img style="width:100px; height:100px;border-radius:6px" :src="item.picUrl" fit="fit" />
								<div class="item-content">
									<div class="item-title" style="margin:0 0 16px">{{ item.productName }}</div>
									<div class="item-price">¥{{ item.price }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-dialog ref="dialogProduct" :visible="dialogSelectProduct" title="" @open="openProduct" @close="closeDialog" :append-to-body="true" width="70%">
			<el-row class="module-select-product">
				<el-col :span="6" class="module-store">
					<div class="module-title">选择商品所属店铺</div>
					<el-input placeholder="请输入店铺名称搜索" v-model="numberStore.storeFullName" class="input-with-select">
						<el-button slot="append" icon="el-icon-search" @click="handleSearchStore"></el-button>
					</el-input>
					<el-radio-group v-model="selectStore" @change="handleSelectStore" class="store-list">
						<el-radio :label="store.tenantId" v-for="store in storeListData" :key="store.id">{{ store.storeFullName }}</el-radio>
					</el-radio-group>

					<el-pagination
						class="module-page"
						@current-change="handlePageStore"
						:page-size="numberStore.pageSize"
						layout="prev, pager, next, jumper"
						:total="numberStore.total"
					>
					</el-pagination>
				</el-col>
				<el-col :span="18" class="module-store-product">
					<div class="module-title">
						选择商品

						<el-input placeholder="搜索店内商品" v-model="numberProduct.search" class="input-with-select input-select-product">
							<el-button slot="append" icon="el-icon-search" @click="handleSearchProduct"></el-button>
						</el-input>
					</div>

					<div class="module-form">
						<el-table
							v-loading="loadingProduct"
							ref="multipleTable"
							header-cell-class-name="table-header"
							:data="tableData"
							tooltip-effect="dark"
							style="width: 100%"
							@selection-change="handleCurrentChange"
							:row-key="getRowKeys"
						>
							<el-table-column type="selection" width="55" :reserve-selection="true"> </el-table-column>
							<el-table-column property="productName" label="商品名称" width="150"> </el-table-column>
							<el-table-column property="value" label="商品规格" width="120"> </el-table-column>
							<el-table-column property="" label="规格库存" width="120">
								<template slot-scope="scope">
									{{ scope.row.stockNum - scope.row.withHoldStockNum }}
								</template>
							</el-table-column>
							<el-table-column property="" label="规格重量" width="120">
								<template slot-scope="scope"> {{ scope.row.weight }}{{ scope.row.weightUnitName }}/{{ scope.row.stockUnitName }} </template>
							</el-table-column>
							<el-table-column property="" label="规格单价">
								<template slot-scope="scope"> {{ scope.row.price }}/{{ scope.row.stockUnitName }} </template>
							</el-table-column>
						</el-table>
						<el-pagination
							class="module-page"
							@current-change="handlePage"
							:page-size="numberProduct.pageSize"
							layout="prev, pager, next, jumper"
							:total="numberProduct.total"
						>
						</el-pagination>
					</div>
				</el-col>
			</el-row>

			<span slot="footer" class="dialog-footer">
				<el-button @click="closeDialog">取 消 </el-button>
				<el-button type="primary" @click="handleSureProduct">确 认 </el-button>
			</span>
		</el-dialog>
		<!-- 奖品选择弹窗 -->
	</section>
</template>

<script>
import store from '@STORE';
import api from '@API';
// import axios from 'axios';
import { DATA_ACTION_LIST } from '@HELPER/const';
// import { delete } from 'vue/types/umd';

export default {
	data() {
		return {
			breadcrumb: [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_BOUTIQUE_LIST_LABEL,
				},
				{
					label: `${DATA_ACTION_LIST[this.$route.query.toDo]}精选商品卡片`,
				},
			],
			filter: {},
			addForm: {
				id: '',
				bizType: '',
				name: '',
				mainTitle: '',
				subTitle: '',
				sortOrder: '',
			},
			getRowKeys(row) {
				return row.productId;
			},
			dialogSelectProduct: false,
			tableData: [],
			selected: [],
			currentRow: [],
			selectStore: '',
			selectStoreName: '',
			loadingProduct: false,
			storeListData: [],
			isNeedSelected: false,
			// 店铺选择
			numberStore: {
				pageSize: 8,
				pageNum: 1,
				total: 0,
				storeFullName: '',
				storeTypeArr: '',
			},
			// 商品选择
			numberProduct: {
				pageSize: 8,
				pageNum: 1,
				total: 0,
				search: '',
			},
		};
	},
	watch: {
		selectStore(val) {
			this.numberProduct.tenantId = Number(this.selectStore);
			this.storeListData.some(item => {
				if (item.tenantId === this.selectStore) {
					this.selectStoreName = item.storeFullName;
				}
			});
			this.getDigitalProductList();
		},
	},
	methods: {
		// 确认提交或编辑卡片
		async handleAddForm() {
			// 新建活动字段校验

			if (this.addForm.name === '') {
				this.$message.error('请填写卡片名称');
				return false;
			}
			if (this.addForm.mainTitle === '') {
				this.$message.error('请填写主标题');
				return false;
			}
			if (this.selected.length <= 0) {
				this.$message.error('请选择商品');
				return false;
			}

			const loading = this.$loading({
				lock: true,
				text: '提交中',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0)',
			});
			setTimeout(() => {
				loading.close();
			}, 1000);

			const data = JSON.parse(JSON.stringify(this.addForm));
			this.selected.some((item, index) => {
				this.$set(item, 'sortOrder', index);
			});
			data.addMallChoiceGoodsDTOList = this.selected;
			let res = null;
			if (!this.addForm.id) {
				// 添加卡片
				res = await api.boutiqueManagement.goodsManagementAdd(data);
			} else {
				// 编辑卡片
				res = await api.boutiqueManagement.goodsManagementUpdate(data);
			}
			if (res.code === 200) {
				this.$notify.success({
					title: `${DATA_ACTION_LIST[this.toDo]}${this.$t('cheng-gong')}`,
					// eslint-disable-next-line prettier/prettier
					message: `${DATA_ACTION_LIST[this.toDo]}${this.$t('cheng-gong')}，将返回精选商品管理`,
				});

				this.$router.push({
					name: this.$ALL_CONST.ROUTE_NAME.RN_BOUTIQUE_LIST,
				});
			} else {
				this.$notify.error({
					title: `${DATA_ACTION_LIST[this.toDo]}${this.$t('shi-bai')}`,
					message: res.message,
				});
			}
		},
		handleSearchStore() {
			this.getStoreList();
		},
		handleSearchProduct() {
			this.getDigitalProductList();
		},

		// 删除选中的商品
		handleDeleteProduct(index) {
			this.selected.splice(index, 1);
		},
		// 卡片商品排序
		handleSort(type, index) {
			if (type === 'top') {
				this.selected[index] = this.selected.splice(index - 1, 1, this.selected[index])[0];
			} else {
				if (index + 1 >= this.selected.length) {
					this.selected[index] = this.selected.splice(0, 1, this.selected[index])[0];
				} else {
					this.selected[index] = this.selected.splice(index + 1, 1, this.selected[index])[0];
				}
			}
		},
		// table数据回选
		setSelect(rows) {
			if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row, true);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		// 选择商品
		handleOpenProduct() {
			if (this.selected.length >= 8) {
				this.$message.error('精选商品的数量最多只能选择8个，你已超出上限');
			} else {
				// 重置弹窗数据的筛选条件
				this.tableData = [];
				this.numberStore.storeFullName = '';
				this.numberProduct.search = '';
				this.numberStore.pageNum = 1;
				this.numberProduct.pageNum = 1;
				this.isNeedSelected = true;
				store.commit(this.$ALL_CONST.STORE_TYPE.SET_MODAL_FILTER, true);
				this.getStoreList();
				this.dialogSelectProduct = true;
			}
		},
		// dialog弹窗open回调事件
		async openProduct() {
			if (this.selected.length > 0) {
				this.currentRow = JSON.parse(JSON.stringify(this.selected));
			} else {
				this.currentRow = [];
			}
		},
		// 店铺分页
		handlePageStore(val) {
			this.numberStore.pageNum = val;
			this.getStoreList();
		},
		// 商品分页
		handlePage(val) {
			this.numberProduct.pageNum = val;
			this.getDigitalProductList();
		},
		// 选择商品 暂放弹窗的数组中
		handleCurrentChange(val) {
			this.currentRow = val;
			const selectLength = this.currentRow.length;
			if (selectLength > 8) {
				this.$nextTick(() => {
					this.tableData.some(item => {
						if (this.currentRow[selectLength - 1].productId === item.productId) {
							this.$refs.multipleTable.toggleRowSelection(item, false);
							return true;
						}
					});
				});
				this.$message.error('精选商品的数量最多只能选择8个，你已超出上限');
			}
		},
		// 关闭对话框
		closeDialog() {
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_MODAL_FILTER, false);
			this.dialogSelectProduct = false;
			this.currentRow = [];
			this.$refs.multipleTable.clearSelection();
			this.selectStore = '';
		},

		// 返回、取消
		goBack() {
			this.$router.push({
				name: this.$route.query.from,
			});
		},
		handleSelectStore() {},
		// 获取商铺列表
		async getStoreList() {
			const res = await api.boutiqueManagement.getStoreList(this.numberStore);
			if (res.code === 200 && res.message === 'success') {
				this.numberStore.total = res.totalSize;
				this.storeListData = res.data;
				this.selectStore = res.data[0].tenantId;
			}
		},
		// 获取商铺的商品
		async getDigitalProductList() {
			this.loadingProduct = true;
			const res = await api.boutiqueManagement.getProductList(this.numberProduct);
			if (res.code === 200 && res.message === 'success') {
				this.numberProduct.total = res.totalSize;
				this.tableData = res.data;
				this.tableData.some(item => {
					this.$set(item, 'tenantId', Number(this.selectStore));
					this.$set(item, 'tenantName', this.selectStoreName);
				});
				if (this.isNeedSelected) {
					this.setSelect(this.currentRow);
					this.isNeedSelected = false;
				}
				this.loadingProduct = false;
			} else {
				this.loadingProduct = false;
			}
		},
		// 获取精选商品卡片详情
		async getDetails() {
			const loading = this.$loading({
				lock: true,
				text: '数据加载中...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0)',
			});

			const res = await api.boutiqueManagement.goodsManagementDetails({ id: this.addForm.id });

			loading.close();
			if (res.code === 200 && res.message === 'success') {
				const { data } = res;
				this.addForm.name = data.name;
				this.addForm.mainTitle = data.mainTitle;
				this.addForm.subTitle = data.subTitle;
				this.selected = data.mallChoiceGoodsRespDTOList;

				this.addForm.bizType = data.bizType;
				if (data.bizType === 1) {
					this.numberStore.storeTypeArr = '3';
				} else if (data.bizType === 2) {
					this.numberStore.storeTypeArr = '1,2';
				}
			}
		},
		// 确认选中商品
		handleSureProduct() {
			const newArr = JSON.parse(JSON.stringify(this.currentRow));

			const hash = {};
			const needData = newArr.reduce((preVal, curVal) => {
				hash[curVal.productId] ? '' : (hash[curVal.productId] = true && preVal.push(curVal));
				return preVal;
			}, []);

			if (newArr.length > 8) {
				this.$message.error('精选商品的数量最多只能选择8个，你已超出上限');
			} else {
				this.selected = needData;
				this.dialogSelectProduct = false;
				this.selectStore = '';
			}
		},
	},

	created() {
		// 进来确定你要什么
		this.toDo = this.$route.query.toDo;

		// 有 id 拿 id
		if (this.$route.query.id) {
			// 有 template判断活动模板
			this.addForm.id = Number(this.$route.query.id);
			this.getDetails();
		}
		// 有 bizType 判断 1：生鲜，2：点餐
		if (this.$route.query.bizType) {
			if (this.$route.query.bizType === '1') {
				this.numberStore.storeTypeArr = '3';
			} else if (this.$route.query.bizType === '2') {
				this.numberStore.storeTypeArr = '1,2';
			}
			this.addForm.bizType = Number(this.$route.query.bizType);
		}
		// 初始化面包屑
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_BREADCRUMB, this.breadcrumb);
		// 暂时关闭 tab 按钮
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB_NEED_OR_NOT, false);
	},

	beforeDestroy() {
		// 重新打开 tab 按钮
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB_NEED_OR_NOT, true);
	},
};
</script>
<style lang="scss">
.boutique-add {
	.input-textarea .el-textarea__inner {
		min-height: 100px !important;
	}
	.module-coupon {
		position: relative;
	}
	.module-coupon .coupon-btn-add {
		position: absolute;
		right: 0;
		top: -32px;
	}
	.module-coupon-content {
		padding: 6px 12px;
		margin: 6px 0;
		border: 1px solid #eee;
		border-radius: 5px;
	}
	.module-coupon .coupon-header {
		display: flex;
		justify-content: center;
	}
	.module-coupon .coupon-list {
		display: flex;
		justify-content: center;
		padding: 6px 0;
		border-bottom: 1px solid #eee;
	}
	.module-coupon .coupon-list:last-child {
		border-bottom: none;
	}
	.module-coupon .item {
		width: 33.2%;
		color: #606266;
		text-align: center;
	}
	.module-spe .el-input-group__append {
		position: relative;
	}
	.module-spe .checkbox-mask {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10;
	}
	.module-title .el-form-item__label {
		font-size: 18px;
	}
	.module-title-coupon .el-form-item__label {
		font-size: 16px;
	}

	.module-title-tips {
		position: relative;
		padding: 0 0 3px;
		color: #606266;
		font-size: 16px;
	}
	.img-tips {
		padding: 4px 0 0;
		font-size: 12px;
		color: #888;
	}
	.coupon-btn-add {
		position: absolute;
		bottom: 0;
		right: 0;
	}
	.module-title-tips .ic {
		color: #f56c6c;
	}
	.row-spe {
		display: flex;
		align-items: flex-end;
	}
	.product-list {
		padding: 16px 0 0;
	}
	.product-list .item {
		position: relative;
		display: flex;
		padding: 12px;
		margin: 0 0 12px;
		border-radius: 6px;
		border: 1px dashed #ccc;
		transition: all 0.3s;
	}
	.product-list .el-icon-remove {
		position: absolute;
		top: -8px;
		right: -8px;
		font-size: 22px;
		color: #ccc;
		cursor: pointer;
	}
	.product-list .module-el-sort {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 50px;
		font-size: 21px;
		color: #999;
	}
	.product-list .module-el-sort .el-sort {
		display: block;
		padding: 6px;
		cursor: pointer;
	}
	.product-list .module-el-sort .el-sort:hover {
		color: #36697f;
	}
	.product-list .item-content {
		flex: 1;
	}
	.product-list .item-content {
		padding: 0 80px 0 16px;
	}
	.product-list .item-title {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		margin: 0 0 8px;
		font-size: 16px;
		color: #606266;
	}
	.product-list .item-tips {
		margin: 0 0 12px;
		font-size: 13px;
		color: #999;
	}
	.product-list .item-price {
		font-size: 20px;
		font-weight: bold;
		color: #ff5a47;
	}

	.block-title {
		padding: 12px 0;
		font-size: 16px;
	}
	.module-show {
		border-radius: 6px;
	}
	.module-show .show-title {
		font-size: 18px;
		font-weight: bold;
		padding: 0 0 4px;
	}
	.module-show .show-tips {
		color: #333;
	}
	.module-show .show-list {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -8px;
		padding: 0;
	}
	.module-show .show-list .item {
		display: flex;
		box-sizing: border-box;
		width: 50%;
		padding: 0 8px;
		margin: 0 0 16px;
		border: none;
	}
	.item-block {
		background: #f5f5f5;
		width: 100%;
		display: flex;
		padding: 12px;
		border-radius: 6px;
	}
	.module-show .show-list .item-content {
		padding: 0 6px;
	}
}
.module-select-product .module-title {
	position: relative;
	top: -6px;
	padding: 0 0 8px;
	font-size: 17px;
}
.input-select-product {
	position: absolute;
	top: -6px;
	right: 0;
}
.el-input__inner {
	height: 34px;
}
.input-select-product {
	width: 300px;
}
.module-select-product .module-store {
	padding: 0 16px 32px 0;
	border-right: 1px solid #eee;
}
.module-select-product .module-store-product {
	padding-left: 16px;
}
.store-list {
	padding: 13px 0 0;
}
.store-list .el-radio {
	width: 100%;
	margin: 0;
	padding: 15.5px 0;
	border-bottom: 1px solid #ebeef5;
}
.store-list .el-radio .el-radio__label {
	font-size: 15px;
}
.module-store-product .table-header .el-checkbox {
	display: none;
}

.module-page {
	padding: 12px 0 0;
	text-align: right;
}
</style>
