<template>
	<section>
		<!-- 表单 -->
		<el-form label-position="top" label-width="auto" :model="form" :class="'custom-el-form'" ref="form" :rules="rules">
			<el-row>
				<el-col :md="16" :lg="10">
					<el-form-item :label="$t('shu-zi-chan-pin-ming-cheng')" prop="productName">
						<el-input v-model.trim="form.productName" :placeholder="'填写优惠券名称（主要用于后台区分不同的数字产品 / 券）'" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="16" :lg="6">
					<el-form-item :label="$t('you-hui-quan-mian-zhi')" prop="productValue">
						<el-input v-model.trim="form.productValue" :disabled="formDisabled" :placeholder="'优惠券可用于抵扣的金额，必须大于0'" type="text" v-integer>
							<template slot="append">{{ $t('yuan') }}</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="16" :lg="6">
					<el-form-item :label="$t('zui-shao-xiao-fei-jin-e')" prop="minAmount">
						<el-input v-model.trim="form.minAmount" :placeholder="'最少消费金额不得低于优惠券面值'" v-decimals>
							<template slot="append">{{ $t('yuan') }}</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="16" :lg="10">
					<el-form-item :label="$t('you-hui-quan-jian-jie')">
						<el-input type="textarea" v-model.trim="form.productDesc" maxlength="200" show-word-limit />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="10" :lg="6">
					<el-form-item :label="$t('shu-zi-chan-pin-zhuang-tai')" prop="status">
						<el-select v-model="form.status" :class="'block-select'">
							<el-option v-for="item in DIGITAL_PRODUCT_STATUS_LIST" :key="item.code" :label="item.label" :value="item.code" />
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="10" :lg="6">
					<el-form-item :label="`${$t('shi-yong-dian-pu')}${$t('bang-ding-fang-shi')}`" prop="shopCanUse">
						<el-select v-model="form.shopCanUse" :class="'block-select'" :disabled="toDo === DATA_MODIFY ? true : false">
							<el-option v-for="item in SUIT_STORE_FROM_WHERE" :key="item.code" :label="item.label" :value="item.code" />
						</el-select>
					</el-form-item>
					<div class="custom-tips-in-form">
						现白名单只可通过报名方式添加
					</div>
				</el-col>
			</el-row>
			<el-row v-if="form.shopCanUse === SUIT_STORE_WHITE">
				<el-col :md="16" :lg="10">
					<el-form-item :label="$t('bai-ming-dan-dian-pu-shu-liang')" prop="digitalProductId">
						<el-input v-model.trim="form.whiteListLength" readonly>
							<el-button @click="whiteListInAdditon" slot="append">{{ $t('cha-kan') }}</el-button>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-if="form.shopCanUse === SUIT_STORE_BLACK">
				<el-col :md="16" :lg="10">
					<el-form-item :label="$t('hei-ming-dan-dian-pu-shu-liang')" prop="digitalProductId">
						<el-input v-model.trim="form.suitStoreList.length" readonly>
							<el-button @click="dialogVisible = true" slot="append">{{ $t('she-zhi') }}</el-button>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<!-- <el-row>
				<el-col :md="16" :lg="6">
					<el-form-item :label="$t('shi-yong-shang-pin')" prop="itemCanUse">
						<el-input v-model.trim="form.itemCanUse" :disabled="true" />
					</el-form-item>
				</el-col>
			</el-row> -->
			<el-row>
				<el-col :md="16" :lg="10">
					<el-form-item :label="$t('bei-zhu')">
						<el-input type="textarea" v-model.trim="form.remark" maxlength="500" show-word-limit />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="16" :lg="10">
					<div class="custom-form-btns-wrap">
						<el-button type="primary" @click="submit('form')" v-if="toDo !== DATA_ONLY_READ">
							{{ $t('que-ren-ti-jiao') }}
						</el-button>
						<el-button type="default" @click="goBack">
							<template v-if="toDo === DATA_ONLY_READ">{{ $t('fan-hui') }}</template>
							<template v-else>{{ $t('qu-xiao') }}</template>
						</el-button>
					</div>
				</el-col>
			</el-row>
		</el-form>

		<!-- dialog -->
		<el-dialog
			:title="`${form.shopCanUse === SUIT_STORE_WHITE ? $t('bai-ming-dan-she-zhi') : $t('hei-ming-dan-she-zhi')}`"
			:visible.sync="dialogVisible"
			:append-to-body="true"
			width="90%"
			@open="openDialog"
			@close="closeDialog"
		>
			<!-- filter -->
			<el-form label-position="top" label-width="auto" :model="filter" :class="'custom-el-form'">
				<el-row>
					<el-col :md="8" :lg="10">
						<el-form-item :label="$t('shang-jia-ming-cheng')">
							<el-input v-model="filter.name" />
						</el-form-item>
					</el-col>
					<el-col :md="8" :lg="10">
						<el-form-item :label="$t('shang-jia-id')">
							<el-input v-model="filter.id" />
						</el-form-item>
					</el-col>
					<el-col :md="6" :lg="4">
						<div class="custom-filter-btns-wrap if-el-form-item__label-none">
							<el-button type="default" icon="el-icon-refresh-left" @click="resetList" />
							<el-button type="primary" @click="getList">{{ $t('cha-xun') }}</el-button>
						</div>
					</el-col>
				</el-row>
			</el-form>

			<section id="table-box">
				<!-- 列表 -->
				<el-table v-loading="table.loading" :data="table.tbody" style="width: 100%" ref="table" :row-key="getRowKey" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55" :reserve-selection="true" v-if="form.shopCanUse === SUIT_STORE_BLACK" />
					<el-table-column
						v-for="(item, index) in table.thead"
						v-bind:key="index"
						:prop="item.prop"
						:label="item.label"
						:min-width="item.width"
						:width="item.fixWidth"
					>
					</el-table-column>
				</el-table>

				<!-- 翻页组件 -->
				<div class="pagination-box">
					<el-pagination
						background
						:hide-on-single-page="false"
						layout="total, sizes, prev, pager, next, jumper"
						:page-sizes="[10, 20, 30, 40]"
						:page-size="table.pageSize"
						@current-change="handleCurrentChange"
						@size-change="handleSizeChange"
						:total="table.totalSize"
						:current-page="table.pageNum"
					/>
				</div>
			</section>

			<span slot="footer" class="dialog-footer" v-if="form.shopCanUse === SUIT_STORE_BLACK">
				<el-button type="primary" @click="handleMultiSelectionSubmit">{{ $t('que-ding') }}</el-button>
			</span>
		</el-dialog>
	</section>
</template>

<script>
import store from '@STORE';
import api from '@API';
import {
	DATA_ONLY_READ,
	DATA_MODIFY,
	DATA_ADDITION,
	DATA_ACTION_LIST,
	DIGITAL_PRODUCT_STATUS_LIST,
	SUIT_STORE_FROM_WHERE,
	SUIT_STORE_WHITE,
	SUIT_STORE_BLACK,
} from '@HELPER/const';

export default {
	data() {
		// 校验优惠券面值
		const checkProductValue = (rule, value, callback) => {
			const PV = Number(value);
			if (!value) {
				return callback(new Error(this.$t('qing-shu-ru-you-hui-quan-mian-zhi')));
			}
			setTimeout(() => {
				if (!Number.isInteger(PV)) {
					callback(new Error(this.$t('qing-shu-ru-zheng-zheng-shu')));
				} else if (PV <= 0) {
					callback(new Error(this.$t('you-hui-quan-mian-zhi-bi-xu-da-yu-0')));
				} else {
					callback();
				}
			}, 0);
		};
		// 校验最少消费金额
		const checkMinAmount = (rule, value, callback) => {
			const MA = Number(value);
			const PV = Number(this.form.productValue);
			if (!value) {
				return callback(new Error(this.$t('qing-shu-ru-zui-di-xiao-fei-jin-e')));
			}
			setTimeout(() => {
				if (MA === 0) {
					callback(new Error(this.$t('zui-shao-xiao-fei-jinebu-neng-wei-ling')));
				} else if (MA < PV) {
					callback(new Error(this.$t('zui-shao-xiao-fei-jinebi-xu-da-yu-deng-yu-you-hui-quan-mian-zhi')));
				} else {
					callback();
				}
			}, 0);
		};
		return {
			dialogVisible: false,
			DATA_ONLY_READ,
			DATA_MODIFY,
			DATA_ADDITION,
			DIGITAL_PRODUCT_STATUS_LIST,
			SUIT_STORE_FROM_WHERE,
			SUIT_STORE_WHITE,
			SUIT_STORE_BLACK,
			toDo: '',
			breadcrumb: [],
			formDisabled: false,
			form: {
				id: '',
				productName: '',
				productValue: '',
				minAmount: '',
				productDesc: '',
				status: '',
				shopCanUse: null,
				whiteListLength: 0,
				PreSuitStoreList: [],
				suitStoreList: [],
				itemCanUse: 0,
				remark: '',
			},
			rules: {
				productName: [
					{
						required: true,
						message: this.$t('qing-shu-ru-shu-zi-chan-pin-ming-cheng'),
						trigger: 'blur',
					},
				],
				productValue: [
					{
						required: true,
						validator: checkProductValue,
						trigger: 'blur',
					},
				],
				minAmount: [
					{
						required: true,
						validator: checkMinAmount,
						trigger: 'blur',
					},
				],
				status: [
					{
						required: true,
						message: this.$t('qing-xuan-ze-shu-zi-chan-pin-zhuang-tai'),
						trigger: 'blur',
					},
				],
				shopCanUse: [
					{
						required: true,
						message: this.$t('qing-she-zhi-dian-pu-bang-ding-fang-shi'),
						trigger: 'blur',
					},
				],
				// itemCanUse: [
				// 	{
				// 		required: true,
				// 		message: '',
				// 		trigger: 'blur',
				// 	},
				// ],
			},
			filter: {
				id: '',
				name: '',
			},
			table: {
				pageSize: 10,
				pageNum: 1,
				totalSize: 0,
				loading: false,
				thead: [],
				tbody: [],
			},
		};
	},

	watch: {
		'form.shopCanUse'(val) {
			switch (val) {
				case SUIT_STORE_WHITE:
					this.table.thead = [
						{
							prop: `tenantName`,
							label: this.$t('shang-jia-ming-cheng'),
						},
						{
							prop: `tenantId`,
							label: this.$t('shang-jia-id'),
						},
					];
					break;
				case SUIT_STORE_BLACK:
					this.table.thead = [
						{
							prop: `storeFullName`,
							label: this.$t('shang-jia-ming-cheng'),
						},
						{
							prop: `id`,
							label: 'id',
						},
						{
							prop: `tenantId`,
							label: this.$t('shang-jia-id'),
						},
						{
							prop: `storeCode`,
							label: this.$t('pu-wei-hao'),
						},
						{
							prop: `bizCategoryJson`,
							label: this.$t('jing-ying-pin-lei'),
						},
						{
							prop: `shopContactNo`,
							label: this.$t('lian-xi-dian-hua'),
						},
					];
					break;
				default:
			}
		},
	},

	methods: {
		whiteListInAdditon() {
			if (this.form.shopCanUse === SUIT_STORE_WHITE && this.toDo === DATA_ADDITION) {
				store.commit(this.$ALL_CONST.STORE_TYPE.SET_MODAL_FILTER, true);
				this.$alert('新建优惠券成功后，将可查看报名优惠券活动的商家', '提示', {
					showClose: false,
					confirmButtonText: '确定',
					callback: () => {
						store.commit(this.$ALL_CONST.STORE_TYPE.SET_MODAL_FILTER, false);
					},
				});
			} else {
				this.dialogVisible = true;
			}
		},

		getRowKey(row) {
			return row.id;
		},

		handleSelectionChange(val) {
			// console.log('勾选了什么', val);
			this.form.PreSuitStoreList = val;
		},

		// 打开对话框
		openDialog() {
			// 如果已经有选择过的数据，复制出来作为一开始的预选数据
			if (this.form.suitStoreList.length > 0) {
				const arr = JSON.parse(JSON.stringify(this.form.suitStoreList));
				this.form.PreSuitStoreList = arr;
			} else {
				this.form.PreSuitStoreList = [];
			}
			// console.log('1 打开对话框时候的PreSuitStoreList', this.form.PreSuitStoreList);
			// 开始请求列表
			this.getList();
			// 打开磨砂玻璃效果
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_MODAL_FILTER, true);
		},

		// element table 提供的 “需要勾选当前哪几条数据方法”
		toggleSelection(rows) {
			if (rows) {
				rows.forEach(row => {
					this.$refs.table.toggleRowSelection(row, true);
				});
			} else {
				this.$refs.table.clearSelection();
			}
		},

		// 关闭对话框
		closeDialog() {
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_MODAL_FILTER, false);
			this.dialogVisible = false;
			this.form.PreSuitStoreList = [];
			this.filter.id = '';
			this.filter.name = '';
			this.table.pageNum = 1;
		},

		// 确定黑名单所选
		handleMultiSelectionSubmit() {
			const newArr = JSON.parse(JSON.stringify(this.form.PreSuitStoreList));

			const hash = {};
			const data2 = newArr.reduce((preVal, curVal) => {
				hash[curVal.id] ? '' : (hash[curVal.id] = true && preVal.push(curVal));
				return preVal;
			}, []);

			this.form.suitStoreList = data2;

			this.closeDialog();
		},

		// 改变每页数据量
		handleSizeChange(val) {
			this.table.pageSize = val;
			this.getList();
		},

		// 翻页
		handleCurrentChange(val) {
			this.table.pageNum = val;
			this.getList();
		},

		// 搜索重置页数
		handleSearch() {
			this.table.pageNum = 1;
			this.getList();
		},

		// 列表请求
		async getList() {
			this.table.loading = true;

			let res;
			switch (this.form.shopCanUse) {
				case SUIT_STORE_WHITE:
					res = await api.couponManagement.getSuitStoreList(this.form.id, this.filter.name, this.filter.id, this.table.pageNum, this.table.pageSize);
					break;
				case SUIT_STORE_BLACK:
					res = await api.couponManagement.suitStoreQueryList(this.filter.name, this.filter.id, this.table.pageNum, this.table.pageSize);
					break;
				default:
			}

			if (res.code === 200 && res.message === 'success') {
				this.table.loading = false;
				const arr = [];
				res.data.map(item => {
					if (item.bizCategoryJson) {
						JSON.parse(item.bizCategoryJson).map(a => {
							arr.push(a.name);
						});
						item.bizCategoryJson = arr.join('，');
					}
				});
				this.table.totalSize = Number(res.totalSize);
				this.table.tbody = res.data;
				this.toggleSelection(this.form.PreSuitStoreList);
			} else {
				this.table.loading = false;
			}
		},

		// 重置列表
		resetList() {
			this.filter.id = '';
			this.filter.name = '';
			this.table.pageNum = 1;
			this.getList();
		},

		submit(formName) {
			const me = this;

			me.$refs[formName].validate(async valid => {
				if (valid) {
					store.commit(me.$ALL_CONST.STORE_TYPE.SET_GLOBAL_LOADING, true);

					const params = {
						productName: this.form.productName,
						productValue: this.form.productValue,
						minAmount: this.form.minAmount,
						productDesc: this.form.productDesc,
						status: this.form.status,
						listType: this.form.shopCanUse,
						// itemCanUse: this.form.itemCanUse,
						remark: this.form.remark,
					};

					// 如果黑名单
					if (this.form.shopCanUse === SUIT_STORE_BLACK) {
						params.blackOrWhiteList = this.form.suitStoreList;
					}

					let res;
					if (this.form.id) {
						params.id = this.form.id;
						res = await api.couponManagement.updateDigitalProductDetail(params);
					} else {
						res = await api.couponManagement.addDigitalProduct(params);
					}

					if (res.code === 200 && res.message === 'success') {
						store.commit(me.$ALL_CONST.STORE_TYPE.SET_GLOBAL_LOADING, false);
						me.$notify.success({
							title: `${DATA_ACTION_LIST[this.toDo]}${me.$t('cheng-gong')}`,
							message: `
						${me.$t('cheng-gong')}${DATA_ACTION_LIST[this.toDo]}${me.$t('shu-zi-chan-pin')}，${me.$t('jiang-fan-hui')}${me.$t('shu-zi-chan-pin')}${me.$t('guan-li')}
						`,
						});
						me.$router.push({
							name: me.$ALL_CONST.ROUTE_NAME.RN_DIGITAL_PRODUCTS_MANAGEMENT,
						});
					} else {
						store.commit(me.$ALL_CONST.STORE_TYPE.SET_GLOBAL_LOADING, false);
						me.$notify.error({
							title: `${DATA_ACTION_LIST[this.toDo]}${me.$t('shi-bai')}`,
							message: res.data,
						});
					}
				} else {
					return;
				}
			});
		},

		// 返回、取消
		goBack() {
			this.$router.push({
				name: this.$route.query.from,
			});
		},

		// 初始化面包屑
		initBreadcrumb() {
			this.breadcrumb = [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_COUPON_MANAGEMENT_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_DIGITAL_PRODUCTS_MANAGEMENT_LABEL,
				},
				{
					label: `${DATA_ACTION_LIST[this.toDo]}${this.$ALL_CONST.ROUTE_NAME.RN_DIGITAL_PRODUCTS_FORM_LABEL}`,
				},
			];
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_BREADCRUMB, this.breadcrumb);
		},

		// 初始化 default panel 的 tab 按钮 / true 开启 / false 关闭
		initDefaultPanelTabNeedOrNot(params = false) {
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB_NEED_OR_NOT, params);
		},

		// 获取优惠券信息
		async getDigitalProductDetail() {
			const res = await api.couponManagement.getDigitalProductDetail(this.form.id);
			if (res.code === 200 && res.message === 'success') {
				this.form.productName = res.data.productName;
				this.form.productValue = res.data.productValue;
				this.form.minAmount = res.data.minAmount;
				this.form.shopCanUse = res.data.listType;
				this.form.productDesc = res.data.productDesc;
				this.form.status = res.data.status;
				this.form.remark = res.data.remark;
				this.form.suitStoreList = res.data.blackOrWhiteList;
			}
		},
	},

	created() {
		// 进来确定你要什么
		this.toDo = this.$route.query.toDo;

		// 有 id 拿 id
		if (this.$route.query.id) {
			this.form.id = this.$route.query.id;
		}

		// 根据你要做什么，改变界面，获取数据
		switch (this.toDo) {
			case DATA_MODIFY:
				this.formDisabled = true;
				this.getDigitalProductDetail();
				break;
			default:
		}

		// 初始化面包屑
		this.initBreadcrumb();
		// 初始化 default panel 的 tab 按钮 / true 开启 / false 关闭
		this.initDefaultPanelTabNeedOrNot();
	},

	beforeDestroy() {
		// 初始化 default panel 的 tab 按钮 / true 开启 / false 关闭
		this.initDefaultPanelTabNeedOrNot(true);
	},
};
</script>
