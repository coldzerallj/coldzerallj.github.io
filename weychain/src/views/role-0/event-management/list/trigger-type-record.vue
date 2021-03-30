<template>
	<!-- 触发型规则记录 -->
	<section>
		<!-- filter -->
		<el-form label-position="top" label-width="auto" :model="filter" :class="'custom-el-form'">
			<el-row>
				<el-col :md="4" :lg="6">
					<el-form-item label="规则ID">
						<el-input v-model="filter.activityId" />
					</el-form-item>
				</el-col>
				<el-col :md="4" :lg="6">
					<el-form-item label="规则状态">
						<el-select v-model="filter.actStatus" style="width:100%;" placeholder="请选择规则状态">
							<el-option label="进行中" value="1"></el-option>
							<el-option label="已结束" value="3"></el-option>
							<el-option label="未开始" value="2"></el-option>
							<el-option label="已下线" value="4"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :md="4" :lg="6">
					<el-form-item label="规则名称">
						<el-input v-model="filter.activityName" />
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :md="6" :lg="8">
					<el-form-item label="规则生效时间">
						<el-date-picker
							v-model="filter.activityDate"
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
						<el-button type="primary" @click="getList">{{ $t('sou-suo') }}</el-button>
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
			:tbtn="table.tbtn"
			:myBaseUrl="table.myBaseUrl"
			@clickBtn="clickBtn"
			@tbtnClick="tbtnClick"
			@filterData="filterData"
			ref="sectionTable"
		/>

		<div class="custom-form-btns-wrap text-right">
			<el-button type="default" @click="goBack">
				{{ $t('fan-hui') }}
			</el-button>
		</div>
	</section>
</template>

<script>
import vueQr from 'vue-qr';
import store from '@STORE';
import api from '@API';
import { DATA_MODIFY, DATA_ADDITION } from '@HELPER/const';
export default {
	components: {
		vueQr,
	},
	data() {
		return {
			breadcrumb: [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_EVENT_MANAGEMENT_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_TRIGGER_TYPE_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_TRIGGER_TYPE_RECORD_LABEL,
				},
			],
			addForm: {
				contactName: '',
				contactPhone: '',
				remark: '',
				storeAliasNo: '',
				storeName: '',
				rate: '15',
			},
			dialogAdd: false,
			dialogVisible: false,
			codeData: {
				url: '',
				icon: require('@/assets/logo-ds.png'),
				imgUrl: '',
				codeName: '收款二维码',
				wechatImg: require('@/assets/wechat.png'),
			},
			DATA_MODIFY,
			DATA_ADDITION,
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now() - 8.64e7;
				},
			},
			filter: {
				activityId: '',
				activityName: '',
				actStatus: '',
				templateType: '',
				activityDate: '',
				activityDateType: '0',
				pageSize: 10,
				pageNum: 1,
			},
			table: {
				myBaseUrl: 'pay',
				url: '',
				// 列表头按钮
				// topBtns: [
				// 	{
				// 		btn: '创建规则',
				// 		type: 'warning',
				// 	},
				// ],
				thead: [
					{
						prop: `logSn`,
						label: '记录编号',
						fixWidth: `180`,
					},
					{
						prop: `orderSn`,
						label: '订单号',
						fixWidth: `120`,
					},
					{
						prop: `activityId`,
						label: '规则ID',
						fixWidth: `90`,
					},
					{
						prop: `activityName`,
						label: '规则名称',
						fixWidth: `120`,
					},
					{
						prop: `sceneName`,
						label: '场景',
						fixWidth: `120`,
					},
					{
						prop: `templateId`,
						label: '规则类型ID',
						fixWidth: `120`,
					},
					{
						prop: `userId`,
						label: '用户ID',
						fixWidth: `100`,
					},
					{
						prop: `signupTime`,
						label: '规则生效时间',
						fixWidth: `110`,
					},
					{
						prop: `prizeCount`,
						label: '发放数量',
						fixWidth: `80`,
					},
					// {
					// 	prop: `productCode`,
					// 	label: '券编号',
					// },
					{
						prop: `prizeTime`,
						label: '优惠券发放时间',
					},
				],
				tbody: [],
			},
		};
	},

	methods: {
		goBack() {
			this.$router.push({
				name: this.$route.query.from,
				query: {
					from: this.$ALL_CONST.ROUTE_NAME.RN_ACTIVITY_TEMPLATE,
				},
			});
		},
		// 列表请求 url + 当前参数
		setRequestUrl() {
			const data = {
				activityId: this.filter.activityId,
				activityName: this.filter.activityName,
				actStatus: this.filter.actStatus,
				templateType: this.filter.templateType,
				startTime: this.filter.activityDate[0] ? this.filter.activityDate[0] : '',
				endTime: this.filter.activityDate[1] ? this.filter.activityDate[1] : '',
				// pageSize: 10,
				pageNum: 1,
			};
			this.table.url = api.eventManagement.getSelectList(data);
		},

		// 列表请求
		getList() {
			this.setRequestUrl();
			this.$refs.sectionTable.fetchData(this.table.url);
		},
		// 接口请求完筛选数据
		filterData() {
			// //   奖品类型, 1: 优惠券 2: 积分，积分目前不弄
			const prizeType = ['', '优惠券', '积分'];

			this.$refs['sectionTable'].table.tbody.map(item => {
				item.zhProductType = prizeType[item.productType];
			});
		},

		async handleSureAdd() {
			const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			const percentReg = /^([1]?\d{1,2})$/;
			if (this.addForm.storeName === '') {
				this.$message.error('请填写子商户名称');
				return false;
			}
			if (this.addForm.storeAliasNo === '') {
				this.$message.error('请填写子商户铺位号');
				return false;
			}
			if (this.addForm.contactPhone === '') {
				this.$message.error('请填写联系电话');
				return false;
			}
			if (!myreg.test(this.addForm.contactPhone)) {
				this.$message.error('请输入正确的联系电话');
				return false;
			}
			if (this.addForm.contactName === '') {
				this.$message.error('请填写经办人');
				return false;
			}
			if (this.addForm.rate === '') {
				this.$message.error('请填写分账比例');
				return false;
			}
			if (!percentReg.test(this.addForm.rate)) {
				this.$message.error('请填写正确的分账比例');
				return false;
			}
			const resData = await api.collectionManagement.addMerchantStore(this.addForm);
			if (resData.msg === '成功') {
				this.$message.success('操作成功');
				this.getList();
				this.dialogAdd = false;
			}
		},
		// 重置列表
		resetList() {
			this.filter = {
				activityId: '',
				activityName: '',
				actStatus: '',
				templateType: '',
				activityDate: '',
				activityDateType: '',
				pageSize: 10,
				pageNum: 1,
			};
			this.getList();
		},

		// 表格行内按钮点击判断
		async tbtnClick(index, row, prop) {
			const resData = await api.collectionManagement.getCodeUrl(data);
			const data = {
				storeName: row.storeName,
			};
			switch (prop) {
				case this.$t('shou-kuan-er-wei-ma'):
					this.codeData.codeName = resData.data.storeName;
					this.codeData.url = resData.data.shortUrl;
					this.dialogVisible = true;
					break;
				default:
			}
		},

		// 表格顶部按钮点击判断
		async clickBtn(type) {
			// 按钮点击 type 判断按钮类型
			// switch (type) {
			// 	case this.$t('tian-jia-zi-shang-hu'):
			// 		this.addForm = {
			// 			contactName: '',
			// 			contactPhone: '',
			// 			remark: '',
			// 			storeAliasNo: '',
			// 			storeName: '',
			// 			rate: '15',
			// 		};
			// 		this.dialogAdd = true;
			// 		break;
			// 	default:
			// }
			const url = `/${this.$ALL_CONST.ROUTE_NAME.RN_EVENT_MANAGEMENT}/${this.$ALL_CONST.ROUTE_NAME.RN_CREATE_ACTIVITY_FORM}`;
			this.$router.push(url);
		},
	},

	created() {
		// 获取当前规则的id
		if (sessionStorage.getItem('triggerId')) {
			this.filter.activityId = sessionStorage.getItem('triggerId');
			sessionStorage.removeItem('triggerId');
		}
		this.setRequestUrl();
		// 初始化面包屑
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_BREADCRUMB, this.breadcrumb);
		// 暂时关闭 tab 按钮
		this.$nextTick(() => {
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB_NEED_OR_NOT, false);
		});
	},

	beforeDestroy() {
		// 重新打开 tab 按钮
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB_NEED_OR_NOT, true);
	},
};
</script>
<style scoped>
.module-code {
	text-align: center;
}
.btn-save {
	color: #fff;
	text-decoration: none;
}
.fenzhang-tips {
	line-height: 20px;
	font-size: 13px;
	color: #888;
	padding: 8px 0 0;
}
</style>
