<template>
	<section>
		<!-- filter -->
		<el-form label-position="top" label-width="auto" :model="filter" :class="'custom-el-form'">
			<el-row>
				<el-col :md="6" :lg="7">
					<el-form-item :label="$t('he-xiao-shi-jian')">
						<el-date-picker
							v-model="daterange"
							type="daterange"
							range-separator="至"
							:start-placeholder="$t('kai-shi-shi-jian')"
							:end-placeholder="$t('jie-shu-shi-jian')"
							value-format="yyyy-MM-dd"
						>
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :md="6" :lg="7">
					<el-form-item>
						<el-select size="mini" v-model="varOpt1">
							<el-option :label="$t('jiao-yi-liu-shui-hao')" :value="0"></el-option>
							<el-option :label="$t('ding-dan-hao')" :value="1"></el-option>
						</el-select>

						<el-input v-model="varOpt1Value" />
					</el-form-item>
				</el-col>
				<el-col :md="6" :lg="6">
					<el-form-item>
						<el-select size="mini" v-model="varOpt2">
							<el-option :label="$t('quan-bian-hao')" :value="0"></el-option>
							<el-option :label="$t('chan-pin-id')" :value="1"></el-option>
						</el-select>
						<el-input v-model="varOpt2Value" />
					</el-form-item>
				</el-col>
				<el-col :md="6" :lg="4">
					<div class="custom-filter-btns-wrap if-el-form-item__label-none">
						<el-button type="default" icon="el-icon-refresh-left" @click="resetList" />
						<el-button type="primary" @click="getList">{{ $t('cha-xun') }}</el-button>
					</div>
				</el-col>
			</el-row>

			<el-row>
				<el-col :md="6" :lg="7">
					<el-form-item :label="$t('jie-suan-fei-zhuang-tai')">
						<el-select v-model="filter.settFeeSattus" :class="'block-select'">
							<el-option v-for="item in SETTLEMENT_STATUS" :key="item.code" :label="item.label" :value="item.code" />
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :md="6" :lg="7">
					<el-form-item>
						<el-select size="mini" v-model="varOpt3">
							<el-option :label="$t('fa-hang-fang-ming-cheng')" :value="0"></el-option>
							<el-option :label="$t('fa-hang-fang-id')" :value="1"></el-option>
						</el-select>
						<el-input v-model="varOpt3Value" />
					</el-form-item>
				</el-col>

				<el-col :md="6" :lg="6">
					<el-form-item>
						<el-select size="mini" v-model="varOpt4">
							<el-option :label="$t('he-xiao-dian-pu-ming-cheng')" :value="0"></el-option>
							<el-option :label="$t('he-xiao-dian-pu-id')" :value="1"></el-option>
						</el-select>
						<el-input v-model="varOpt4Value" />
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!-- table -->
		<section-table
			:url="table.url"
			@filterData="filterData"
			:topBtns="table.topBtns"
			:thead="table.thead"
			:tbody="table.tbody"
			@clickBtn="clickBtn"
			ref="sectionTable"
		/>
	</section>
</template>

<script>
import store from '@STORE';
import api from '@API';
import { SETTLEMENT_STATUS } from '@HELPER/const';

export default {
	data() {
		return {
			breadcrumb: [],
			daterange: '', // 时间区间
			varOpt1: 0, // 选择查询 交易流水号 or 订单号
			varOpt1Value: '',
			varOpt2: 0, // 选择查询 券编号 or 产品ID
			varOpt2Value: '',
			varOpt3: 0, // 选择查询 发行方名称 or 发行方ID
			varOpt3Value: '',
			varOpt4: 0, // 选择查询 核销店名称 or 核销店ID
			varOpt4Value: '',
			filter: {
				startTime: '', // 开始时间
				endTime: '', // 结束时间
				tradeNo: '', // 交易流水号
				orderNo: '', // 订单号
				productNo: '', // 券编号
				productId: '', // 产品ID
				settFeeSattus: '', // 结算费状态
				issueOrgName: '', // 发行方名称
				issueOrgId: '', // 发行方ID
				storeName: '', // 核销店名称
				storeId: '', // 核销店ID
			},
			SETTLEMENT_STATUS, // 结算费状态枚举
			table: {
				// 列表头按钮
				topBtns: [
					{
						btn: this.$t('dao-chu-shu-ju'),
						icon: 'el-icon-download',
						type: 'warning',
					},
				],
				url: '',
				thead: [
					{
						prop: `tradeNo`,
						label: this.$t('jiao-yi-liu-shui-hao'),
						fixWidth: `100`,
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
						prop: `productNameAndId`,
						label: `${this.$t('chan-pin-ming-cheng')}/ID`,
					},
					{
						prop: `pubOrgNameAndId`,
						label: `${this.$t('fa-hang-fang-ming-cheng')}/ID`,
					},
					{
						prop: `payerAccount`,
						label: this.$t('fu-kuan-fang-zhang-hu'),
					},
					{
						prop: `payerId`,
						label: this.$t('fu-kuan-fang-yong-hu-id'),
					},
					{
						prop: `storeNameAndId`,
						label: `${this.$t('he-xiao-dian-pu-ming-cheng')}/ID`,
					},
					{
						prop: `settleTime`,
						label: this.$t('he-xiao-shi-jian'),
					},
					{
						prop: `settleNum`,
						label: this.$t('he-xiao-shu-liang'),
					},
					{
						prop: `productValue`,
						label: this.$t('mian-zhi'),
					},
					{
						prop: `settlePrice`,
						label: this.$t('jie-suan-jia'),
					},
					{
						prop: `settleStateLabel`,
						label: this.$t('jie-suan-zhuang-tai'),
					},
					{
						prop: `settleNo`,
						label: this.$t('jie-suan-ding-dan-hao'),
					},
					{
						prop: `tradeDesc`,
						label: this.$t('jiao-yi-miao-shu'),
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
		async clickBtn(type) {
			// 按钮点击 type 判断按钮类型
			const elink = document.createElement('a');
			switch (type) {
				case this.$t('dao-chu-shu-ju'):
					if (this.daterange !== '') {
						this.filter.startTime = this.daterange[0];
						this.filter.endTime = this.daterange[1];
					}

					// 交易流水号 or 订单号
					if (this.varOpt1 === 0) {
						this.filter.tradeNo = this.varOpt1Value;
						this.filter.orderNo = '';
					} else {
						this.filter.orderNo = this.varOpt1Value;
						this.filter.tradeNo = '';
					}

					// 券编号 or 产品ID
					if (this.varOpt2 === 0) {
						this.filter.productNo = this.varOpt2Value;
						this.filter.productID = '';
					} else {
						this.filter.productID = this.varOpt2Value;
						this.filter.productNo = '';
					}

					elink.download = '';
					elink.style.display = 'none';
					elink.href = `/mbs/v2_0_0/oprDigitalProdSettlement/exportList?settleTimeStart=${this.filter.startTime}&settleTimeEnd=${this.filter.endTime}&tradeNo=${this.filter.tradeNo}&orderNo=${this.filter.orderNo}&productCode=${this.filter.productNo}&productId=${this.filter.productId}&settleState=${this.filter.settFeeSattus}&pubOrgName=${this.filter.issueOrgName}&pubOrgId=${this.filter.issueOrgId}&storeId=${this.filter.storeId}&storeName=${this.filter.storeName}`;
					document.body.appendChild(elink);
					elink.click();
					document.body.removeChild(elink);
					break;
				default:
			}
		},

		// 列表请求 url + 当前参数
		setRequestUrl() {
			if (this.daterange !== '') {
				this.filter.startTime = this.daterange[0];
				this.filter.endTime = this.daterange[1];
			}

			// 交易流水号 or 订单号
			if (this.varOpt1 === 0) {
				this.filter.tradeNo = this.varOpt1Value;
				this.filter.orderNo = '';
			} else {
				this.filter.orderNo = this.varOpt1Value;
				this.filter.tradeNo = '';
			}

			// 券编号 or 产品ID
			if (this.varOpt2 === 0) {
				this.filter.productNo = this.varOpt2Value;
				this.filter.productID = '';
			} else {
				this.filter.productID = this.varOpt2Value;
				this.filter.productNo = '';
			}

			this.table.url = api.couponManagement.oprDigitalProdSettlementQueryList(this.filter);
		},

		// 接口请求完筛选数据
		filterData() {
			this.$refs['sectionTable'].table.tbody.map(item => {
				item.settleStateLabel = this.$options.filters.code2text(item.settleState, SETTLEMENT_STATUS);
				item.productValue = this.$options.filters.currency(item.productValue, '￥');
				item.settlePrice = this.$options.filters.currency(item.settlePrice, '￥');
			});
		},

		// 列表请求
		getList() {
			this.setRequestUrl();
			this.$refs.sectionTable.fetchData(this.table.url);
		},

		// 重置列表
		resetList() {
			this.daterange = '';
			this.varOpt1 = 0;
			this.varOpt1Value = '';
			this.varOpt2 = 0;
			this.varOpt2Value = '';
			this.varOpt3 = 0;
			this.varOpt3Value = '';
			this.varOpt4 = 0;
			this.varOpt4Value = '';
			this.filter = {
				startTime: '',
				endTime: '',
				tradeNo: '',
				orderNo: '',
				productNo: '',
				productId: '',
				settFeeSattus: '',
				issueOrgName: '',
				issueOrgId: '',
				storeName: '',
				storeId: '',
			};
			this.getList();
		},
		// 初始化面包屑
		initBreadcrumb() {
			this.breadcrumb = [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_COUPON_MANAGEMENT_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_COUPON_WRITE_OFF_RECORD_LABEL,
				},
			];
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_BREADCRUMB, this.breadcrumb);
		},
	},

	created() {
		this.setRequestUrl();
		this.initBreadcrumb();
	},
};
</script>
