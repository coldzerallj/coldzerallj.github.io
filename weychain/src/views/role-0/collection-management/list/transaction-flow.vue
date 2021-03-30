<template>
	<section>
		<!-- filter -->
		<el-form label-position="top" label-width="auto" :model="filter" :class="'custom-el-form'">
			<el-row>
				<el-col :md="6" :lg="6">
					<el-form-item :label="$t('dian-pu-id')">
						<el-input v-model="filter.tenantId" />
					</el-form-item>
				</el-col>
				<el-col :md="6" :lg="6">
					<el-form-item :label="$t('dian-pu-ming-cheng')">
						<el-input v-model="filter.tenantName" />
					</el-form-item>
				</el-col>
				<el-col :md="6" :lg="8">
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
				<el-col :md="6" :lg="4">
					<div class="custom-filter-btns-wrap if-el-form-item__label-none">
						<el-button type="default" icon="el-icon-refresh-left" @click="resetList" />
						<el-button type="primary" @click="getList">{{ $t('cha-xun') }}</el-button>
					</div>
				</el-col>
			</el-row>
		</el-form>
		<!-- title 统计-->
		<div class="data-title">
			<el-row class="title-resole">
				<el-col :span="3">
					<div class="grid-content bg-purple">
						订单数量: <span>{{ statistics.totalOrderNum ? statistics.totalOrderNum : 0 }}</span>
					</div></el-col
				>
				<el-col :span="3">
					<div class="grid-content bg-purple-light">
						订单金额: <span>{{ statistics.totalOrderPrice ? statistics.totalOrderPrice : 0 }}</span> 元
					</div></el-col
				>
				<el-col :span="3">
					<div class="grid-content bg-purple">
						实付金额: <span>{{ statistics.totalActualPrice ? statistics.totalActualPrice : 0 }}</span> 元
					</div></el-col
				>
				<el-col :span="3">
					<div class="grid-content bg-purple-light">
						管理费: <span>{{ statistics.totalServiceCharge ? statistics.totalServiceCharge : 0 }}</span> 元
					</div></el-col
				>
				<el-col :span="3">
					<div class="grid-content bg-purple">
						实际到账: <span>{{ statistics.totalActualAmount ? statistics.totalActualAmount : 0 }}</span> 元
					</div></el-col
				>
			</el-row>
			<div class="btn">
				<el-button type="primary" @click="exportData">{{ $t('dao-chu-shu-ju') }}</el-button>
			</div>
		</div>
		<!-- table -->
		<!-- <section-table
			:url="table.url"
			:topBtns="table.topBtns"
			:thead="table.thead"
			:tbody="table.tbody"
			:tbtn="table.tbtn"
			:myBaseUrl="table.myBaseUrl"
			@tbtnClick="tbtnClick"
			ref="sectionTable"
		/> -->

		<el-table v-loading="loading" :data="table.tbody" style="width: 100%">
			<el-table-column label="订单号" prop="orderSn"> </el-table-column>
			<el-table-column label="支付单号" prop="payId"> </el-table-column>
			<el-table-column label="交易时间" prop="payTime"> </el-table-column>
			<el-table-column label="店铺ID" prop="tenantId"> </el-table-column>
			<el-table-column label="店铺名称" prop="tenantName"> </el-table-column>
			<el-table-column label="收款二级商户号" prop="merchantNo"> </el-table-column>
			<el-table-column label="订单金额（元）" prop="orderPrice"> </el-table-column>
			<el-table-column label="优惠券抵扣金额（元）" prop="couponPrice" align="center">
				<template slot-scope="scope">
					<el-popover trigger="hover" placement="left">
						<span>优惠券成本分摊详情</span>
						<p>商家分摊成本: {{ scope.row.merchantCost }} 元</p>
						<p>平台分摊成本: {{ scope.row.platformCost }} 元</p>
						<div slot="reference" class="name-wrapper">
							<el-tag size="medium">{{ scope.row.couponPrice }}</el-tag>
						</div>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="实付金额（元）" prop="actualPrice"> </el-table-column>
			<el-table-column label="分账比例" prop="serviceRate"> </el-table-column>
			<el-table-column label="管理费（元）" prop="serviceCharge"> </el-table-column>
			<el-table-column label="实际到账金额（元）" prop="actualAmount"> </el-table-column>
			<el-table-column label="备注" prop="remark"> </el-table-column>

			<!-- <el-table-column label="操作"> -->
			<!-- <template slot-scope="scope">
					<el-tooltip content="设置" placement="top" effect="light">
						<el-button size="mini" @click="tbtnClick(scope.$index, scope.row, $t('she-zhi'))" circle type="success" plain>
							<i class="table-icon-style el-icon-setting"></i>
						</el-button>
					</el-tooltip>
					<el-tooltip content="二维码" placement="top" effect="light" v-if="scope.row.offlineCollection === '开通'">
						<el-button size="mini" @click="tbtnClick(scope.$index, scope.row, $t('shou-kuan-er-wei-ma'))" circle type="success" plain>
							<i class="table-icon-style el-icon-picture-outline"></i>
						</el-button>
					</el-tooltip>
				</template> -->
			<!-- </el-table-column> -->
		</el-table>

		<!-- 翻页组件 -->
		<div class="pagination-box" v-if="totalSize">
			<el-pagination
				background
				:hide-on-single-page="false"
				layout="total, sizes, prev, pager, next, jumper"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="filter.pageSize"
				@current-change="handleCurrentChange"
				@size-change="handleSizeChange"
				:total="totalSize"
			/>
		</div>
	</section>
</template>

<script>
import store from '@STORE';
import api from '@API';
import { DATA_MODIFY, DATA_ADDITION } from '@HELPER/const';
export default {
	data() {
		return {
			loading: false,
			DATA_MODIFY,
			DATA_ADDITION,
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now() - 8.64e7;
				},
			},
			date: '',
			breadcrumb: [],
			filter: {
				tenantId: '',
				tenantName: '',
				startTime: '',
				endTime: '',
				pageNum: 1,
				pageSize: 10,
			},
			totalSize: 0,
			statistics: {
				totalActualAmount: 0,
				totalActualPrice: 0,
				totalOrderNum: 0,
				totalOrderPrice: 0,
				totalServiceCharge: 0,
			},
			table: {
				myBaseUrl: 'pay',
				url: '',
				// 列表头按钮
				topBtns: [
					// {
					// 	btn: this.$t('xin-jian'),
					// 	icon: 'el-icon-document-add',
					// 	type: 'primary',
					// },
					// {
					// 	btn: this.$t('dao-chu-liu-shui'),
					// 	icon: 'el-icon-upload2',
					// 	type: 'warning',
					// },
				],
				thead: [
					{
						prop: `orderSn`,
						label: this.$t('ding-dan-hao'),
						fixWidth: `200`,
					},
					{
						prop: `payId`,
						label: this.$t('zhi-fu-dan-hao'),
						fixWidth: `200`,
					},
					{
						prop: `payTime`,
						label: this.$t('jiao-yi-shi-jian'),
						fixWidth: `200`,
					},
					{
						prop: `tenantId`,
						label: this.$t('dian-pu-id'),
						fixWidth: `250`,
					},
					{
						prop: `tenantName`,
						label: this.$t('dian-pu-ming-cheng'),
						fixWidth: `140`,
					},
					{
						prop: `merchantNo`,
						label: this.$t('shou-kuang-er-ji-shang-hu-hao'),
					},
					{
						prop: `orderPrice`,
						label: this.$t('ding-dan-jing-e'),
					},
					{
						prop: `couponPrice`,
						label: this.$t('you-hui-quan-di-kou-jin-e'),
					},
					{
						prop: `actualPrice`,
						label: this.$t('shi-fu-jing-e'),
					},
					{
						prop: `serviceCharge`,
						label: this.$t('guang-li-fei'),
					},
					{
						prop: `actualAmount`,
						label: this.$t('shi-ji-dao-zhang-jing-e'),
					},
					{
						prop: `serviceRate`,
						label: this.$t('fen-zhang-bi-li'),
					},
					{
						prop: `remark`,
						label: this.$t('bei-zhu'),
					},
				],
				tbody: [],
				tbtn: [],
			},
		};
	},

	methods: {
		// 列表请求 url + 当前参数
		async setRequestUrl() {
			this.loading = true;
			if (this.date !== '') {
				this.filter.startTime = this.date[0];
				this.filter.endTime = this.date[1];
			}
			const resData = await api.collectionManagement.getFlowList(this.filter);
			const data = JSON.parse(JSON.stringify(resData.data));
			data.map(item => {
				if (item.serviceRate || item.serviceRate === 0) {
					item.serviceRate = `${item.serviceRate} %`;
				}
			});
			this.table.tbody = data;
			this.statistics = resData.extra;
			this.totalSize = Number(resData.totalSize);
			this.loading = false;
		},

		// 列表请求
		getList() {
			this.filter.pageNum = 1;
			this.setRequestUrl();
			// this.$refs.sectionTable.fetchData(this.table.url);
		},

		// 重置列表
		resetList() {
			this.date = '';
			this.filter = {
				tenantId: '',
				tenantName: '',
				startTime: '',
				endTime: '',
				pageNum: 1,
				pageSize: 10,
			};
			this.getList();
		},

		// 表格行内按钮点击判断
		tbtnClick(index, row, prop) {},

		// 表格顶部按钮点击判断
		// clickBtn(type) {
		// 	// 按钮点击 type 判断按钮类型
		// 	switch (type) {
		// 		// eslint-disable-next-line no-case-declarations
		// 		case this.$t('dao-chu-shu-ju'):
		// 			if (this.date.length > 0) {
		// 				this.filter.successStartTime = this.date[0];
		// 				this.filter.successEndTime = this.date[1];
		// 			}
		// 			const elink = document.createElement('a');
		// 			elink.download = '交易流水';
		// 			elink.style.display = 'none';
		// 			elink.href =
		// 				'pay/order/exportCollectionList?merchantName=' +
		// 				this.filter.merchantName +
		// 				'&orderNo=' +
		// 				this.filter.orderNo +
		// 				'&successStartTime=' +
		// 				this.filter.successStartTime +
		// 				'&successEndTime=' +
		// 				this.filter.successEndTime;
		// 			document.body.appendChild(elink);
		// 			elink.click();
		// 			document.body.removeChild(elink);
		// 			break;
		// 		default:
		// 	}
		// },

		// 导出数据
		async exportData() {
			// const data = await api.collectionManagement.downLoadList(this.filter);
			// console.log(data);
			// this.download(data, 'liushui.xls');
			if (this.date.length > 0) {
				this.filter.startTime = this.date[0];
				this.filter.endTime = this.date[1];
			}
			const elink = document.createElement('a');
			elink.download = '';
			elink.style.display = 'none';
			elink.href = `/mbs/v2_0_0/offlineOrder/easyExport?tenantId=${this.filter.tenantId}&tenantName=${this.filter.tenantName}&startTime=${this.filter.startTime}&endTime=${this.filter.endTime}`;

			document.body.appendChild(elink);
			elink.click();
			document.body.removeChild(elink);

			// event.preventDefault(); //  使a自带的方法失效，即无法调整到href中的URL
			// axios({
			// 	method: 'get',
			// 	url: '/mbs/v2_0_0/offlineOrder/easyExport',
			// 	responseType: 'blob',
			// })
			// 	.then(res => {
			// 		const link = document.createElement('a');
			// 		const blob = new Blob([res.data]);
			// 		//  获取heads中的filename文件名
			// 		// const aa = res.headers['content-disposition'];
			// 		// const temp = res.headers['content-disposition'].split(';')[1].split('filename=')[1];
			// 		// const fileName = decodeURIComponent(temp);
			// 		link.style.display = 'none';
			// 		link.href = URL.createObjectURL(blob);
			// 		link.setAttribute('download', 'fileName');
			// 		document.body.appendChild(link);
			// 		link.click();
			// 		document.body.removeChild(link);
			// 	})
			// 	.catch(error => {
			// 		const link = document.createElement('a');
			// 		const blob = new Blob([error]);
			// 		//  获取heads中的filename文件名
			// 		// const aa = res.headers['content-disposition'];
			// 		// const temp = error.headers['content-disposition'].split(';')[1].split('filename=')[1];
			// 		// const fileName = decodeURIComponent(temp);
			// 		link.style.display = 'none';
			// 		link.href = URL.createObjectURL(blob);
			// 		link.setAttribute('download', 'fileName.xls');
			// 		document.body.appendChild(link);
			// 		link.click();
			// 		document.body.removeChild(link);
			// 	});
		},

		download(data, fileName) {
			if (!data) {
				return;
			}
			const url = URL.createObjectURL(new Blob([data]));
			const link = document.createElement('a');
			link.style.display = 'none';
			link.href = url;
			link.setAttribute('download', fileName);
			document.body.appendChild(link);
			link.click();
		},

		handleCurrentChange(val) {
			// 分页
			// console.log(`当前页: ${val}`);
			// 分页刷新
			// if (this.myBaseUrl === 'pay') {
			// 	axios.defaults.baseURL = 'pay';
			// }
			this.filter.pageNum = val;
			this.setRequestUrl();
		},

		handleSizeChange(val) {
			this.filter.pageSize = val;
			// if (this.myBaseUrl === 'pay') {
			// 	axios.defaults.baseURL = 'pay';
			// }
			this.setRequestUrl();
		},

		// 初始化面包屑
		initBreadcrumb() {
			this.breadcrumb = [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_COLLECTION_MANAGEMENT_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_TRANSACTION_FLOW_LABEL,
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
<style scoped>
.btn {
	text-align: right;
	float: right;
}
.title-resole {
	float: left;
	width: 80%;
	padding: 20px 0;
}
.btn button {
	color: #fab980;
	background: #fff8f2;
	border-color: #fde3cc;
}
.btn button:hover {
	/* opacity: 0.6; */
	color: #fff;
	background: #fab980;
	/* background: chartreuse; */
}
.data-title {
	padding: 0;
	color: #606266;
}
.data-title span {
	color: #f59a23;
}
</style>
