<template>
	<section>
		<!-- filter -->
		<el-form label-position="top" label-width="auto" :model="filter" :class="'custom-el-form'">
			<el-row>
				<el-col :md="14" :lg="14">
					<el-form-item :label="$t('shu-zi-chan-pin-id')">
						<el-input v-model="filter.id" />
					</el-form-item>
				</el-col>
				<el-col :md="4" :lg="6">
					<el-form-item :label="$t('shu-zi-chan-pin-zhuang-tai')">
						<el-select v-model="filter.digitalProductStatus" :class="'block-select'">
							<el-option v-for="item in digitalProductStatusList" :key="item.code" :label="item.label" :value="item.code" />
						</el-select>
					</el-form-item>
				</el-col>
				<!-- <el-col :md="4" :lg="5">
					<el-form-item :label="$t('fa-quan-ji-gou-lei-xing')">
						<el-select v-model="filter.organization" :class="'block-select'">
							<el-option v-for="item in organizationList" :key="item.code" :label="item.label" :value="item.code" />
						</el-select>
					</el-form-item>
				</el-col> -->
				<el-col :md="6" :lg="4">
					<div class="custom-filter-btns-wrap if-el-form-item__label-none">
						<el-button type="default" icon="el-icon-refresh-left" @click="resetList" />
						<el-button type="primary" @click="handleSearch">{{ $t('cha-xun') }}</el-button>
					</div>
				</el-col>
			</el-row>
		</el-form>

		<section id="table-box">
			<!-- 列表顶部按钮 -->
			<section class="fresh-table-top-btns" v-if="table.topBtns.length > 0">
				<div class="btns-box">
					<el-tooltip
						effect="dark"
						:content="item.tooltip"
						placement="bottom"
						v-for="item in table.topBtns"
						v-bind:key="item.btn"
						:disabled="item.tooltip ? false : true"
					>
						<el-button :icon="item.icon" :type="item.type" :plain="item.noPlain ? false : true" size="small" @click.stop="clickBtn(item.btn)">
							<template v-if="!item.tooltip">
								{{ item.btn }}
							</template>
						</el-button>
					</el-tooltip>
				</div>
			</section>

			<!-- 列表 -->
			<el-table v-loading="table.loading" :data="table.body" style="width: 100%">
				<el-table-column
					v-for="(item, index) in table.thead"
					v-bind:key="index"
					:prop="item.prop"
					:label="item.label"
					:min-width="item.width"
					:width="item.fixWidth"
				>
				</el-table-column>

				<el-table-column align="right" width="180" fixed="right" v-if="table.body && table.body.length > 0">
					<template slot-scope="scope">
						<el-tooltip :content="$t('she-wei-shang-jia')" placement="top" effect="light" v-if="scope.row.status === DIGITAL_PRODUCT_OFF_SHELF">
							<el-button size="mini" @click="tbtnClick(scope.$index, scope.row, $t('she-wei-shang-jia'))" circle type="success" plain>
								<i class="table-icon-style el-icon-top"></i>
							</el-button>
						</el-tooltip>

						<el-tooltip :content="$t('she-wei-xia-jia')" placement="top" effect="light" v-if="scope.row.status === DIGITAL_PRODUCT_ON_SHELF">
							<el-button size="mini" @click="tbtnClick(scope.$index, scope.row, $t('she-wei-xia-jia'))" circle type="danger" plain>
								<i class="table-icon-style el-icon-bottom"></i>
							</el-button>
						</el-tooltip>

						<el-tooltip :content="$t('bian-ji')" placement="top" effect="light">
							<el-button size="mini" @click="tbtnClick(scope.$index, scope.row, $t('bian-ji'))" circle plain>
								<i class="table-icon-style el-icon-edit"></i>
							</el-button>
						</el-tooltip>

						<!-- <el-tooltip :content="$t('bai-ming-dan-she-zhi')" placement="top" effect="light">
							<el-button size="mini" @click="tbtnClick(scope.$index, scope.row, $t('bai-ming-dan-she-zhi'))" circle plain type="success">
								<i class="table-icon-style el-icon-s-claim"></i>
							</el-button>
						</el-tooltip> -->

						<!-- <el-tooltip :content="$t('hei-ming-dan-she-zhi')" placement="top" effect="light">
							<el-button size="mini" @click="tbtnClick(scope.$index, scope.row, $t('hei-ming-dan-she-zhi'))" circle plain type="warning">
								<i class="table-icon-style el-icon-s-release"></i>
							</el-button>
						</el-tooltip> -->
					</template>
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
				/>
			</div>
		</section>
	</section>
</template>

<script>
import store from '@STORE';
import api from '@API';
import {
	// DATA_ONLY_READ,
	DATA_MODIFY,
	DATA_ADDITION,
	DIGITAL_PRODUCT_STATUS_LIST,
	ORGANIZATION_LIST,
	DIGITAL_PRODUCT_OFF_SHELF,
	DIGITAL_PRODUCT_ON_SHELF,
	SUIT_STORE_WHITE,
	SUIT_STORE_BLACK,
} from '@HELPER/const';

export default {
	data() {
		return {
			SUIT_STORE_WHITE,
			SUIT_STORE_BLACK,
			DIGITAL_PRODUCT_OFF_SHELF,
			DIGITAL_PRODUCT_ON_SHELF,
			DATA_MODIFY,
			DATA_ADDITION,
			breadcrumb: [],
			digitalProductStatusList: [],
			organizationList: [],
			filter: {
				id: '',
				digitalProductStatus: '',
				organization: '',
			},
			table: {
				pageSize: 10,
				pageNum: 1,
				totalSize: 0,
				loading: false,
				// 列表头按钮
				topBtns: [
					{
						btn: `${this.$t('xin-jian')}${this.$t('shu-zi-chan-pin')}`,
						icon: 'el-icon-document-add',
						type: 'success',
					},
				],
				thead: [
					{
						prop: `id`,
						label: this.$t('shu-zi-chan-pin-id'),
					},
					{
						prop: `productName`,
						label: this.$t('shu-zi-chan-pin-ming-cheng'),
					},
					{
						prop: `productValue`,
						label: this.$t('you-hui-quan-mian-zhi'),
					},
					// {
					// 	prop: `effectiveDays`,
					// 	label: `${this.$t('mo-ren-you-xiao-qi')}(${this.$t('tian')})`,
					// },
					{
						prop: `pubOrgTypeLabel`,
						label: this.$t('fa-quan-ji-gou-lei-xing'),
					},
					{
						prop: `pubOrgName`,
						label: this.$t('fa-quan-ji-gou-ming-cheng'),
					},
					{
						prop: `listTypeName`,
						label: `${this.$t('shi-yong-dian-pu')}${this.$t('bang-ding-fang-shi')}`,
					},
					{
						prop: `suitStoreWhite`,
						label: `${this.$t('bai-ming-dan')}(${this.$t('shi-yong-dian-pu')})`,
					},
					{
						prop: `suitStoreBlack`,
						label: `${this.$t('hei-ming-dan')}(${this.$t('bu-shi-yong-dian-pu')})`,
					},
					{
						prop: `suitGoods`,
						label: this.$t('shi-yong-shang-pin'),
					},
					{
						prop: `minAmount`,
						label: this.$t('zui-xiao-xiao-fei-jin-e'),
					},
					{
						prop: `statusLabel`,
						label: this.$t('shu-zi-chan-pin-zhuang-tai'),
					},
					{
						prop: `remark`,
						label: this.$t('bei-zhu'),
					},
				],
				tbody: [],
			},
		};
	},

	methods: {
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
			const res = await api.couponManagement.getDigitalProductList(
				this.filter.id,
				this.filter.digitalProductStatus,
				this.filter.organization,
				this.table.pageNum,
				this.table.pageSize,
			);
			if (res.code === 200 && res.message === 'success') {
				this.table.loading = false;
				res.data.map(item => {
					item.productValue = this.$options.filters.currency(item.productValue, '￥');
					item.minAmount = this.$options.filters.currency(item.minAmount, '￥');
					item.pubOrgName = `${item.pubOrgName} / ${item.pubOrgId}`;
					item.statusLabel = this.$options.filters.code2text(item.status, DIGITAL_PRODUCT_STATUS_LIST);
					item.pubOrgTypeLabel = this.$options.filters.code2text(item.pubOrgType, ORGANIZATION_LIST);
					item.listTypeName = Number(item.listType) === SUIT_STORE_BLACK ? '黑名单' : '白名单';
					item.suitStoreWhite = Number(item.listType) === SUIT_STORE_WHITE ? item.suitStore : '--';
					item.suitStoreBlack = Number(item.listType) === SUIT_STORE_BLACK ? item.suitStore : '--';
				});
				this.table.body = res.data;
				this.table.totalSize = Number(res.totalSize);
			} else {
				this.table.loading = false;
			}
		},

		// 重置列表
		resetList() {
			this.filter.id = '';
			this.filter.digitalProductStatus = '';
			this.filter.organization = '';
			this.table.pageNum = 1;
			this.getList();
		},

		// 表格顶部按钮点击判断
		clickBtn(type) {
			// 按钮点击 type 判断按钮类型
			switch (type) {
				case `${this.$t('xin-jian')}${this.$t('shu-zi-chan-pin')}`:
					this.$router.push({
						name: this.$ALL_CONST.ROUTE_NAME.RN_DIGITAL_PRODUCTS_FORM,
						query: {
							from: this.$ALL_CONST.ROUTE_NAME.RN_DIGITAL_PRODUCTS_MANAGEMENT,
							toDo: DATA_ADDITION,
						},
					});
					break;
				default:
			}
		},

		// 产品上下架
		offShelfOrNot(status, id) {
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_MODAL_FILTER, true);

			let configContent = '';
			let configTitle = '';
			let successMessgae = '';

			switch (status) {
				case DIGITAL_PRODUCT_OFF_SHELF:
					successMessgae = `${this.$t('shu-zi-chan-pin-yi')}${this.$t('shang-jia')}`;
					break;
				case DIGITAL_PRODUCT_ON_SHELF:
					successMessgae = `${this.$t('shu-zi-chan-pin-yi')}${this.$t('xia-jia')}`;
					break;
				default:
			}

			if (status === DIGITAL_PRODUCT_OFF_SHELF) {
				configContent = `${this.$t('gai-shu-zi-chan-pin-zhuang-tai-jiang-bei-she-wei')}${this.$t('shang-jia')}`;
				configTitle = this.$t('shang-jia-shu-zi-chan-pin');
			} else {
				configContent = `${this.$t('gai-shu-zi-chan-pin-zhuang-tai-jiang-bei-she-wei')}${this.$t('xia-jia')}`;
				configTitle = this.$t('xia-jia-shu-zi-chan-pin');
			}

			this.$confirm(configContent, configTitle, {
				confirmButtonText: this.$t('que-ding'),
				showCancelButton: false,
				type: 'warning',
			})
				.then(async () => {
					store.commit(this.$ALL_CONST.STORE_TYPE.SET_GLOBAL_LOADING, true);
					const res = await api.couponManagement.changeDigitalProductStatus(id);
					if (res.code === 200 && res.message === 'success') {
						store.commit(this.$ALL_CONST.STORE_TYPE.SET_GLOBAL_LOADING, false);
						store.commit(this.$ALL_CONST.STORE_TYPE.SET_MODAL_FILTER, false);
						this.$notify.success({
							title: this.$t('cheng-gong'),
							message: successMessgae,
						});
						// 列表请求
						this.getList();
					} else {
						store.commit(this.$ALL_CONST.STORE_TYPE.SET_GLOBAL_LOADING, false);
						store.commit(this.$ALL_CONST.STORE_TYPE.SET_MODAL_FILTER, false);
						this.$notify.error({
							title: `${this.$t('cuo-wu')}`,
							message: res.data,
						});
					}
				})
				.catch(() => {
					store.commit(this.$ALL_CONST.STORE_TYPE.SET_MODAL_FILTER, false);
				});
		},

		// 表格行内按钮点击判断
		tbtnClick(index, row, prop) {
			switch (prop) {
				case this.$t('bian-ji'):
					this.$router.push({
						name: this.$ALL_CONST.ROUTE_NAME.RN_DIGITAL_PRODUCTS_FORM,
						query: {
							from: this.$ALL_CONST.ROUTE_NAME.RN_DIGITAL_PRODUCTS_MANAGEMENT,
							toDo: DATA_MODIFY,
							id: row.id,
						},
					});
					break;
				case this.$t('she-wei-shang-jia'):
					this.offShelfOrNot(row.status, row.id);
					break;
				case this.$t('she-wei-xia-jia'):
					this.offShelfOrNot(row.status, row.id);
					break;
				// case this.$t('bai-ming-dan-she-zhi'):
				// 	this.$router.push({
				// 		name: this.$ALL_CONST.ROUTE_NAME.RN_DIGITAL_PRODUCTS_SUIT_STORE,
				// 		query: {
				// 			from: this.$ALL_CONST.ROUTE_NAME.RN_DIGITAL_PRODUCTS_MANAGEMENT,
				// 			toDo: DATA_ONLY_READ,
				// 			id: row.id,
				// 			productName: row.productName,
				// 			suitStore: row.suitStore,
				// 		},
				// 	});
				// 	break;
				// case this.$t('hei-ming-dan-she-zhi'):
				// 	this.$router.push({
				// 		name: this.$ALL_CONST.ROUTE_NAME.RN_DIGITAL_PRODUCTS_NOT_SUIT_STORE,
				// 		query: {
				// 			from: this.$ALL_CONST.ROUTE_NAME.RN_DIGITAL_PRODUCTS_MANAGEMENT,
				// 			toDo: DATA_MODIFY,
				// 			id: row.id,
				// 			productName: row.productName,
				// 			suitStore: row.suitStore,
				// 		},
				// 	});
				// 	break;
				default:
			}
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
			];
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_BREADCRUMB, this.breadcrumb);
		},

		// 组装给 filter 的下拉菜单用的各种枚举
		initFilterSelecterList() {
			const all = [
				{
					label: this.$t('quan-bu'),
					code: '',
				},
			];
			this.digitalProductStatusList = [...all, ...DIGITAL_PRODUCT_STATUS_LIST];
			this.organizationList = [...all, ...ORGANIZATION_LIST];
		},
	},

	created() {
		// 初始化面包屑
		this.initBreadcrumb();
		// 列表请求
		this.getList();
		// 组装给数字产品分类下拉菜单用的枚举
		this.initFilterSelecterList();
	},
};
</script>
