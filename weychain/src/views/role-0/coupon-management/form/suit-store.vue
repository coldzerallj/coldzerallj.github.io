<template>
	<section>
		<!-- data statistical -->
		<data-statistical :data="statistical" />
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
		<!-- table -->
		<section-table ref="sectionTable" :url="table.url" :thead="table.thead" :tbody="table.tbody" />
		<!-- 返回 -->
		<section>
			<router-view />
			<div class="custom-form-btns-wrap text-right">
				<el-button type="default" @click="goBack">
					{{ $t('fan-hui') }}
				</el-button>
			</div>
		</section>
	</section>
</template>

<script>
import store from '@STORE';
import api from '@API';
import { DATA_ACTION_LIST } from '@HELPER/const';

export default {
	data() {
		return {
			toDo: '',
			id: '',
			breadcrumb: [],
			filter: {
				id: '',
				name: '',
			},
			table: {
				url: '',
				thead: [
					{
						prop: `tenantName`,
						label: this.$t('shang-jia-ming-cheng'),
					},
					{
						prop: `tenantId`,
						label: this.$t('shang-jia-id'),
					},
				],
				tbody: [],
			},
			statistical: null,
		};
	},

	methods: {
		// 设置统计数字
		setStatistical() {
			this.statistical = [
				{
					row: [
						{
							label: this.$t('you-hui-quan-ming-cheng'),
							value: this.$route.query.productName,
						},
						{
							label: this.$t('you-hui-quan-chan-pin-id'),
							value: this.id,
						},
						{
							label: this.$t('yi-bang-ding-shang-jia-shu-liang'),
							value: this.$route.query.suitStore,
						},
					],
				},
			];
		},

		// 列表请求 url + 当前参数
		setRequestUrl() {
			this.table.url = api.couponManagement.getSuitStoreList(this.id, this.filter.name, this.filter.id);
			this.setStatistical();
		},

		// 列表请求
		getList() {
			this.setRequestUrl();
			this.$refs.sectionTable.fetchData(this.table.url);
		},

		// 重置列表
		resetList() {
			this.filter.id = '';
			this.filter.name = '';
			this.getList();
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
					label: `${DATA_ACTION_LIST[this.toDo]}${this.$ALL_CONST.ROUTE_NAME.RN_DIGITAL_PRODUCTS_SUIT_STORE_LABEL}`,
				},
			];
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_BREADCRUMB, this.breadcrumb);
		},

		// 初始化 default panel 的 tab 按钮 / true 开启 / false 关闭
		initDefaultPanelTabNeedOrNot(params = false) {
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB_NEED_OR_NOT, params);
		},
	},

	created() {
		// 进来确定你要什么
		this.toDo = this.$route.query.toDo;

		// 有 id 拿 id
		if (this.$route.query.id) {
			this.id = this.$route.query.id;
		}

		// 初始化面包屑
		this.initBreadcrumb();
		// 初始化 default panel 的 tab 按钮 / true 开启 / false 关闭
		this.initDefaultPanelTabNeedOrNot();
		// 列表请求 url + 当前参数
		this.setRequestUrl();
	},

	beforeDestroy() {
		// 初始化 default panel 的 tab 按钮 / true 开启 / false 关闭
		this.initDefaultPanelTabNeedOrNot(true);
	},
};
</script>
