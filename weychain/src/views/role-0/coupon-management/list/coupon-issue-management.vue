<template>
	<section>
		<!-- filter -->
		<el-form label-position="top" label-width="auto" :model="filter" :class="'custom-el-form'">
			<el-row>
				<el-col :md="4" :lg="5">
					<el-form-item :label="$t('shu-zi-chan-pin-id')">
						<el-input v-model="filter.productId" />
					</el-form-item>
				</el-col>
				<el-col :md="4" :lg="5">
					<el-form-item :label="$t('shu-zi-chan-pin-ming-cheng')">
						<el-input v-model="filter.productName" />
					</el-form-item>
				</el-col>
				<el-col :md="4" :lg="4">
					<el-form-item :label="$t('shen-qing-dan-hao')">
						<el-input v-model="filter.applyNo" />
					</el-form-item>
				</el-col>
				<el-col :md="6" :lg="6">
					<el-form-item :label="$t('fa-hang-ri-qi')">
						<el-date-picker
							v-model="filter.ranger"
							type="daterange"
							:range-separator="$t('zhi')"
							:start-placeholder="$t('kai-shi-ri-qi')"
							:end-placeholder="$t('jie-shu-ri-qi')"
							value-format="yyyy-MM-dd"
						>
						</el-date-picker>
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
		<section-table :url="table.url" :topBtns="table.topBtns" :thead="table.thead" :tbody="table.tbody" @clickBtn="clickBtn" ref="sectionTable" />
	</section>
</template>

<script>
import store from '@STORE';
import api from '@API';
import { DATA_ADDITION } from '@HELPER/const';

export default {
	data() {
		return {
			DATA_ADDITION,
			breadcrumb: [],
			filter: {
				productId: '',
				productName: '',
				applyNo: '',
				ranger: '',
				startPublishTime: '',
				endPublishTime: '',
			},
			table: {
				url: '',
				// 列表头按钮
				topBtns: [
					{
						btn: `${this.$t('xin-jian')}${this.$t('fa-hang-shen-qing')}`,
						icon: 'el-icon-document-add',
						type: 'success',
					},
				],
				thead: [
					{
						prop: `applyNo`,
						label: this.$t('shen-qing-dan-hao'),
					},
					{
						prop: `productId`,
						label: this.$t('shu-zi-chan-pin-id'),
					},
					{
						prop: `productName`,
						label: this.$t('shu-zi-chan-pin-ming-cheng'),
					},
					{
						prop: `tokenId`,
						label: this.$t('tokenid'),
					},
					{
						prop: `publishNum`,
						label: this.$t('fa-hang-shu-liang'),
					},
					{
						prop: `availableNum`,
						label: this.$t('ke-yong-shu-liang'),
					},
					// {
					// 	prop: `cancelNum`,
					// 	label: this.$t('zuo-fei-shu-liang'),
					// },
					// {
					// 	prop: `circNum`,
					// 	label: this.$t('liu-tong-zhong-shu-liang'),
					// },
					// {
					// 	prop: `circAvailableNum`,
					// 	label: this.$t('liu-tong-zhong-ke-yong-shu-liang'),
					// },
					// {
					// 	prop: `circExpiredNum`,
					// 	label: this.$t('liu-tong-zhong-yi-guo-qi-shu-liang'),
					// },
					{
						prop: `publishTime`,
						label: this.$t('fa-hang-ri-qi'),
					},
					{
						prop: `startTime`,
						label: this.$t('sheng-xiao-ri-qi'),
					},
					{
						prop: `endTime`,
						label: this.$t('jie-zhi-ri-qi'),
					},
					{
						prop: `pubOrgAccount`,
						label: this.$t('fa-hang-fang-zhang-hu'),
					},
				],
				tbody: [],
			},
		};
	},

	methods: {
		// 列表请求 url + 当前参数
		setRequestUrl() {
			if (this.filter.ranger === null) {
				this.filter.ranger = '';
				this.filter.startPublishTime = '';
				this.filter.endPublishTime = '';
			}

			if (this.filter.ranger && this.filter.ranger.length > 0) {
				this.filter.startPublishTime = this.filter.ranger[0];
				this.filter.endPublishTime = this.filter.ranger[1];
			}

			this.table.url = api.couponManagement.getCouponIssueList(
				this.filter.productName,
				this.filter.productId,
				this.filter.applyNo,
				this.filter.startPublishTime,
				this.filter.endPublishTime,
			);
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
				case `${this.$t('xin-jian')}${this.$t('fa-hang-shen-qing')}`:
					this.$router.push({
						name: this.$ALL_CONST.ROUTE_NAME.RN_COUPON_ISSUE_FORM,
						query: {
							from: this.$ALL_CONST.ROUTE_NAME.RN_COUPON_ISSUE_MANAGEMENT,
							toDo: DATA_ADDITION,
						},
					});
					break;
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
					label: this.$ALL_CONST.ROUTE_NAME.RN_COUPON_ISSUE_MANAGEMENT_LABEL,
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
