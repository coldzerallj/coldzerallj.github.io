<template>
	<section>
		<!-- filter -->
		<el-form label-position="top" label-width="auto" :model="filter" :class="'custom-el-form'">
			<el-row>
				<el-col :md="6" :lg="7">
					<el-form-item :label="$t('shu-zi-chan-pin-ming-cheng')">
						<el-input v-model="filter.name" />
					</el-form-item>
				</el-col>
				<el-col :md="6" :lg="7">
					<el-form-item :label="$t('shu-zi-chan-pin-id')">
						<el-input v-model="filter.id" />
					</el-form-item>
				</el-col>
				<el-col :md="6" :lg="6">
					<el-form-item :label="$t('quan-bian-hao')">
						<el-input v-model="filter.couponNo" />
					</el-form-item>
				</el-col>
				<el-col :md="6" :lg="4">
					<div class="custom-filter-btns-wrap if-el-form-item__label-none">
						<el-button type="default" icon="el-icon-refresh-left" @click="resetList" />
						<el-button type="primary" @click="handleSearch">{{ $t('cha-xun') }}</el-button>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="6" :lg="7">
					<el-form-item :label="$t('jiao-yi-liu-shui-hao')">
						<el-input v-model="filter.transactionNo" />
					</el-form-item>
				</el-col>
				<el-col :md="6" :lg="7">
					<el-form-item :label="$t('ding-dan-hao')">
						<el-input v-model="filter.orderNo" />
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!-- data statistical -->
		<data-statistical :data="statistical" />
		<!-- table -->
		<!-- <section-table :url="table.url" :thead="table.thead" :tbody="table.tbody" ref="sectionTable" /> -->

		<section id="table-box">
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
import api from '@API';
import { DIGITAL_PRODUCT_TYPE_LIST } from '@HELPER/const';

export default {
	data() {
		return {
			breadcrumb: [],
			filter: {
				name: '',
				id: '',
				couponNo: '',
				transactionNo: '',
				orderNo: '',
			},
			table: {
				totalGrantNum: null,
				totalGrantValue: null,
				pageSize: 10,
				pageNum: 1,
				totalSize: 0,
				loading: false,
				thead: [
					{
						prop: `tradeNo`,
						label: this.$t('jiao-yi-liu-shui-hao'),
					},
					{
						prop: `orderNo`,
						label: this.$t('ding-dan-hao'),
					},
					{
						prop: `productCode`,
						label: this.$t('quan-bian-hao'),
					},
					{
						prop: `tokenId`,
						label: this.$t('tokenid'),
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
						prop: `productTypeName`,
						label: this.$t('shu-zi-chan-pin-fen-lei'),
					},
					{
						prop: `grantNum`,
						label: this.$t('fa-fang-shu-liang'),
					},
					{
						prop: `grantDate`,
						label: this.$t('fa-fang-ri-qi'),
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
						prop: `isEnabled`,
						label: this.$t('ke-yong-shi-duan-xian-zhi'),
					},
					{
						prop: `availableRange`,
						label: this.$t('ke-yong-shi-duan'),
					},
					// {
					// 	prop: `payerAccount`,
					// 	label: this.$t('fu-kuan-fang'),
					// },
					{
						prop: `payeeId`,
						label: this.$t('shou-kuan-fang-yong-hu-id'),
					},
					{
						prop: `payeeAccount`,
						label: this.$t('shou-kuan-fang-zhang-hu'),
					},
					{
						prop: `remark`,
						label: this.$t('bei-zhu'),
					},
				],
				tbody: [],
			},
			statistical: null,
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
		// 设置统计数字
		setStatistical() {
			this.statistical = [
				{
					row: [
						{
							label: this.$t('yi-fa-fang-shu-liang'),
							value: this.table.totalGrantNum,
						},
						{
							label: this.$t('yi-fa-fang-you-hui-quan-mian-zhi-zong-he'),
							colLabelMd: 3,
							colLabelLg: 4,
							value: this.table.totalGrantValue,
						},
					],
				},
			];
		},

		// 列表请求
		async getList() {
			this.table.loading = true;
			const res = await api.couponManagement.getCouponIssueRecordList(
				this.filter.name,
				this.filter.id,
				this.filter.couponNo,
				this.filter.transactionNo,
				this.filter.orderNo,
				this.table.pageNum,
				this.table.pageSize,
			);
			if (res.code === 200 && res.message === 'success') {
				this.table.loading = false;
				res.data.map(item => {
					item.productTypeName = this.$options.filters.code2text(item.productType, DIGITAL_PRODUCT_TYPE_LIST);
				});
				this.table.body = res.data;
				this.table.totalSize = Number(res.totalSize);
				this.table.totalGrantNum = res.extra.totalGrantNum;
				this.table.totalGrantValue = res.extra.totalGrantValue;
			} else {
				this.table.loading = false;
			}
			this.setStatistical();
		},

		// 重置列表
		resetList() {
			this.filter.id = '';
			this.filter.name = '';
			this.filter.couponNo = '';
			this.filter.transactionNo = '';
			this.filter.orderNo = '';
			this.table.pageNum = 1;
			this.getList();
		},
	},

	created() {
		this.getList();
	},
};
</script>
