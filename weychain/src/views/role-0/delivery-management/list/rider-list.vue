<template>
	<section>
		<!-- filter -->
		<el-form label-position="top" label-width="auto" :model="filter" :class="'custom-el-form'">
			<el-row>
				<el-col :md="4" :lg="5">
					<el-form-item :label="$t('yong-hu-ID')">
						<el-input v-model="filter.userId" />
					</el-form-item>
				</el-col>
				<el-col :md="4" :lg="5">
					<el-form-item :label="$t('shou-ji-hao')">
						<el-input v-model="filter.mobile" />
					</el-form-item>
				</el-col>
				<el-col :md="4" :lg="4">
					<el-form-item :label="$t('qi-shou-lei-xin')">
						<el-select v-model="filter.riderType" :class="'block-select'">
							<el-option v-for="item in bizSubjectType" :key="item.code" :label="item.label" :value="item.code" />
						</el-select>
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
		<section-table
			:url="table.url"
			:topBtns="table.topBtns"
			:thead="table.thead"
			:tbody="table.tbody"
			:urlParams="table.urlParams"
			@clickBtn="clickBtn"
			:usePost="true"
			ref="sectionTable"
		/>
	</section>
</template>

<script>
import store from '@STORE';
import api from '@API';
import { DATA_ADDITION } from '@HELPER/const';
// import fileDownload from 'js-file-download';
export default {
	data() {
		return {
			DATA_ADDITION,
			breadcrumb: [],
			bizSubjectType: [
				{
					code: '',
					label: '不限',
				},
				{
					code: 1,
					label: '普通骑手',
				},
				{
					code: 2,
					label: '店铺自有骑手',
				},
			],
			filter: {
				mobile: '',
				riderType: '',
				userId: '',
			},
			table: {
				url: '',
				urlParams: {},
				// 列表头按钮
				topBtns: [
					{
						btn: `导出数据`,
						icon: 'el-icon-document-add',
						type: 'primary',
					},
				],
				thead: [
					{
						prop: `userId`,
						label: this.$t('yong-hu-ID'),
					},
					{
						prop: `mobile`,
						label: this.$t('shou-ji-hao'),
					},
					{
						prop: `email`,
						label: this.$t('you-xiang-di-zhi'),
					},
					{
						prop: `zhriderType`,
						tprop: 'riderType',
						label: this.$t('qi-shou-lei-xin'),
						change: [
							{
								code: 1,
								label: '普通骑手',
							},
							{
								code: 2,
								label: '店铺自有骑手',
							},
						],
					},
					{
						prop: `realName`,
						label: this.$t('qi-shou-xing-ming'),
					},
					{
						prop: `healthCertificatePic`,
						label: this.$t('jian-kang-zheng'),
						type: 'picture',
						pictureName: '健康证',
					},
					{
						prop: `subMerchantNo`,
						label: this.$t('suo-shu-dian-pu-ID'),
					},
					{
						prop: `storeFullName`,
						label: this.$t('suo-shu-dian-pu-ming-cheng'),
					},
					{
						prop: `settlingTime`,
						label: this.$t('ru-zhu-shi-jian'),
					},
				],
				tbody: [],
			},
		};
	},

	methods: {
		// 列表请求 url + 当前参数
		setRequestUrl() {
			this.filter.userId ? (this.filter.userId = Number(this.filter.userId)) : '';
			// let data = {};
			// data = this.filter;
			this.table.urlParams = this.filter;
			this.table.url = api.deliveryManagement.riderList();
		},

		// 列表请求
		getList() {
			this.setRequestUrl();
			this.$refs.sectionTable.fetchData(this.table.url);
		},

		// 重置列表
		resetList() {
			this.filter.productName = '';
			this.filter.productId = '';
			this.filter.applyNo = '';
			this.filter.ranger = '';
			this.filter.startPublishTime = '';
			this.filter.endPublishTime = '';
			this.getList();
		},

		// 表格顶部按钮点击判断
		async clickBtn(type) {
			// 按钮点击 type 判断按钮类型
			switch (type) {
				// eslint-disable-next-line no-case-declarations
				case `导出数据`:
					// const param = {};
					this.filter.userId ? (this.filter.userId = Number(this.filter.userId)) : '';
					this.exportData();
					// param = this.filter;
					// api.deliveryManagement.exportRiderList(param).then(res => {
					// 	if (res.byteLength < 250) {
					// 		this.$message({
					// 			type: 'error',
					// 			message: '骑手列表失败',
					// 		});
					// 		return false;
					// 	} else {
					// 		const name = '骑手列表.xls';
					// 		fileDownload(res, name);
					// 	}
					// });

					break;
				default:
			}
		},

		async exportData() {
			const elink = document.createElement('a');
			elink.download = '';
			elink.style.display = 'none';
			elink.href = `mbs/v1_0_0/boss/mallRider/exportList?userId=${this.filter.userId}&mobile=${this.filter.mobile}&riderType=${this.filter.riderType}`;
			document.body.appendChild(elink);
			elink.click();
			document.body.removeChild(elink);
		},
		// 初始化面包屑
		initBreadcrumb() {
			this.breadcrumb = [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_DELIVERY_MANAGEMENT_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_RIDER_LIST_LABEL,
				},
			];
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_BREADCRUMB, this.breadcrumb);
		},
	},

	created() {
		// 初始化面包屑
		this.initBreadcrumb();
		// 列表请求 url + 当前参数
		this.setRequestUrl();
	},
};
</script>
