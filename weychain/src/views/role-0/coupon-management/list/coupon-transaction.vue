<template>
	<section>
		<!-- filter -->
		<el-form label-position="top" label-width="auto" :model="filter" :class="'custom-el-form'">
			<el-row>
				<el-col :md="5" :lg="5">
					<el-form-item :label="$t('shu-zi-chan-pin-fen-lei')">
						<el-select v-model="filter.productType" :class="'block-select'">
							<el-option v-for="item in productType" :key="item.code" :label="item.label" :value="item.code" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :md="5" :lg="5">
					<el-form-item :label="$t('jiao-yi-shi-jian')">
						<el-date-picker
							v-model="date"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							value-format="yyyy-MM-dd"
						>
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :md="5" :lg="5">
					<el-form-item>
						<el-select size="mini" v-model="numberSelectVal">
							<el-option :label="$t('jiao-yi-liu-shui-hao')" value="0"></el-option>
							<el-option :label="$t('ding-dan-hao')" value="1"></el-option>
						</el-select>

						<el-input v-model="numberVal" />
					</el-form-item>
				</el-col>
				<el-col :md="5" :lg="5">
					<el-form-item :label="$t('jiao-yi-lei-xing')">
						<el-select v-model="filter.tradeType" :class="'block-select'">
							<el-option v-for="item in tradeType" :key="item.code" :label="item.label" :value="item.code" />
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="5" :lg="5">
					<el-form-item :label="$t('jiao-yi-zi-lei-xing')">
						<el-select v-model="filter.tradeSubType" :class="'block-select'">
							<el-option v-for="item in tradeSubType" :key="item.code" :label="item.label" :value="item.code" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :md="5" :lg="5">
					<el-form-item :label="$t('jiao-yi-zhuang-tai')">
						<el-select v-model="filter.tradeState" :class="'block-select'">
							<el-option v-for="item in transactionStatus" :key="item.code" :label="item.label" :value="item.code" />
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :md="5" :lg="5">
					<el-form-item>
						<el-select size="mini" v-model="IDSelectVal">
							<el-option :label="$t('shou-kuan-fang-yong-hu-id')" value="0"></el-option>
							<el-option :label="$t('fu-kuan-fang-yong-hu-id')" value="1"></el-option>
						</el-select>
						<el-input v-model="IDVal" />
					</el-form-item>
				</el-col>
				<el-col :md="5" :lg="5">
					<el-form-item :label="$t('quan-bian-hao')">
						<el-input v-model="filter.productCode" />
					</el-form-item>
				</el-col>
				<el-col :md="4" :lg="4">
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
			@filterData="filterData"
			:topBtns="table.topBtns"
			:thead="table.thead"
			:tbody="table.tbody"
			:tbtn="table.tbtn"
			ref="sectionTable"
		/>
	</section>
</template>

<script>
import store from '@STORE';
import api from '@API';

export default {
	data() {
		return {
			date: '',
			numberVal: '',
			IDVal: '',
			numberSelectVal: '0',
			IDSelectVal: '0',
			breadcrumb: [],
			filter: {
				productType: '',
				tradeStartTime: '',
				tradeEndTime: '',
				tradeNo: '',
				orderNo: '',
				tradeType: '',
				tradeSubType: '',
				payerId: '',
				payeeId: '',
				productCode: '',
				tradeState: '',
			},
			productType: [
				{
					label: '优惠券',
					code: '1',
				},
			],
			tradeType: [
				{
					label: '全部',
					code: '',
				},
				{
					label: '交易',
					code: '1',
				},
				{
					label: '过期',
					code: '2',
				},
				{
					label: '作废',
					code: '3',
				},
			],
			tradeSubType: [
				{
					label: '全部',
					code: '',
				},
				{
					label: '发行',
					code: '1',
				},
				{
					label: '发放',
					code: '2',
				},
				{
					label: '转让',
					code: '3',
				},
				{
					label: '核销',
					code: '4',
				},
				{
					label: '消费',
					code: '5',
				},
				{
					label: '回收',
					code: '6',
				},
				{
					label: '撤销交易',
					code: '7',
				},
				{
					label: '过期',
					code: '8',
				},
				{
					label: '作废',
					code: '9',
				},
			],
			transactionStatus: [
				{
					label: '全部',
					code: '',
				},
				{
					label: '成功',
					code: '1',
				},
				{
					label: '失败',
					code: '2',
				},
				{
					label: '未确定',
					code: '3',
				},
			],

			table: {
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
						prop: `productId`,
						label: this.$t('chan-pin-id'),
					},
					{
						prop: `tokenId`,
						label: this.$t('token-id'),
					},
					{
						prop: `productName`,
						label: this.$t('chan-pin-ming-cheng'),
					},
					{
						prop: `zhProductType`,
						label: this.$t('shu-zi-chan-pin-fen-lei'),
					},
					{
						prop: `tradeNum`,
						label: this.$t('jiao-yi-shu-liang'),
					},
					{
						prop: `zhTradeType`,
						label: this.$t('jiao-yi-lei-xing'),
					},
					{
						prop: `zhTradeSubType`,
						label: this.$t('jiao-yi-zi-lei-xing'),
					},
					{
						prop: `payeeAccount`,
						label: this.$t('shou-kuan-fang-zhang-hu'),
						fixWidth: `100`,
					},
					{
						prop: `payeeId`,
						label: this.$t('shou-kuan-fang-yong-hu-id'),
						fixWidth: `110`,
					},
					{
						prop: `payerAccount`,
						label: this.$t('fu-kuan-fang-zhang-hu'),
						fixWidth: `100`,
					},
					{
						prop: `payerId`,
						label: this.$t('fu-kuan-fang-yong-hu-id'),
						fixWidth: `110`,
					},
					{
						prop: `tradeStartTime`,
						label: this.$t('jiao-yi-fa-qi-shi-jian'),
						fixWidth: `110`,
					},
					{
						prop: `tradeEndTime`,
						label: this.$t('jiao-yi-wan-cheng-shi-jian'),
						fixWidth: `110`,
					},
					{
						prop: `cancelFlagLabel`,
						label: this.$t('shi-fou-che-xiao'),
					},
					{
						prop: `cancelTradeNo`,
						label: this.$t('bei-che-xiao-liu-shui-hao'),
					},
					{
						prop: `zhTradeState`,
						label: this.$t('jiao-yi-zhuang-tai'),
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
		// 列表请求 url + 当前参数
		setRequestUrl() {
			if (this.date !== '') {
				this.filter.tradeStartTime = this.date[0];
				this.filter.tradeEndTime = this.date[1];
			}
			if (this.numberSelectVal === '0') {
				this.filter.tradeNo = this.numberVal;
				this.filter.orderNo = '';
			} else {
				this.filter.orderNo = this.numberVal;
				this.filter.tradeNo = '';
			}

			if (this.IDSelectVal === '0') {
				this.filter.payeeId = this.IDVal;
				this.filter.payerId = '';
			} else {
				this.filter.payerId = this.IDVal;
				this.filter.payeeId = '';
			}
			this.table.url = api.couponManagement.getTradeAccount(this.filter);
		},
		// 接口请求完筛选数据
		filterData() {
			// //   奖品类型, 1: 优惠券 2: 积分，积分目前不弄
			const productType = ['', '优惠券', '积分'];
			// 交易类型, 1: 交易 2: 过期 3: 作废
			const tradeType = ['', '交易', '过期', '作废'];
			// 交易子类型, 1: 发行 2: 发放 3: 转让 4: 核销 5: 消费 6: 回收 7: 撤销交易 8: 过期 9: 作废
			const tradeSubType = ['', '发行', '发放', '转让', '核销', '消费', '回收', '撤销交易', '过期', '作废'];

			// 交易状态, 1: 成功 2: 失败 3: 未确定
			const tradeState = ['', '成功', '失败', '未确定'];
			this.$refs['sectionTable'].table.tbody.map(item => {
				item.zhProductType = productType[item.productType];
				item.zhTradeType = tradeType[item.tradeType];
				item.zhTradeSubType = tradeSubType[item.tradeSubType];
				item.zhTradeState = tradeState[item.tradeState];
				item.cancelFlagLabel = item.cancelFlag === '0' ? '否' : '是';
				item.cancelTradeNo = item.cancelTradeNo || '--';
			});
		},
		// 列表请求
		getList() {
			this.setRequestUrl();
			this.$refs.sectionTable.fetchData(this.table.url);
		},

		// 重置列表
		resetList() {
			this.date = '';
			this.numberVal = '';
			this.IDVal = '';
			this.numberSelectVal = '0';
			this.IDSelectVal = '0';
			this.filter = {
				productType: '',
				tradeStartTime: '',
				tradeEndTime: '',
				tradeNo: '',
				orderNo: '',
				tradeType: '',
				tradeSubType: '',
				payerId: '',
				payeeId: '',
				productCode: '',
				tradeState: '',
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
					label: this.$ALL_CONST.ROUTE_NAME.RN_COUPON_TRANSACTION_LABEL,
				},
			];
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_BREADCRUMB, this.breadcrumb);
		},
	},

	created() {
		this.setRequestUrl();
		this.$EventBus.$on(this.$ALL_CONST.EVENT_BUS_BACK_TO_COLLECTION_MANAGEMENT, () => {
			this.initBreadcrumb();
		});
		this.initBreadcrumb();
	},
};
</script>
