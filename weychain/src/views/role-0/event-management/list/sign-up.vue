<template>
	<!-- 报名型规则列表 -->
	<section>
		<!-- filter -->
		<el-form label-position="top" label-width="auto" :model="filter" :class="'custom-el-form'">
			<el-row>
				<el-col :md="4" :lg="5">
					<el-form-item label="规则ID">
						<el-input v-model="filter.id" />
					</el-form-item>
				</el-col>
				<el-col :md="4" :lg="4">
					<el-form-item label="规则状态">
						<el-select v-model="filter.actStatus" style="width:100%;" placeholder="请选择规则状态">
							<el-option label="已上线" value="1"></el-option>
							<!-- <el-option label="进行中" value="1"></el-option>
							<el-option label="已结束" value="3"></el-option>
							<el-option label="未开始" value="2"></el-option> -->
							<el-option label="已下线" value="4"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :md="6" :lg="7">
					<el-form-item>
						<el-select size="mini" v-model="filter.activityDateType" placeholder="请选择规则时间">
							<el-option label="规则有效期" value="0"></el-option>
							<el-option label="规则创建时间" value="1"></el-option>
						</el-select>
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
import store from '@STORE';
import api from '@API';
import { DATA_MODIFY, DATA_ADDITION } from '@HELPER/const';
export default {
	data() {
		return {
			breadcrumb: [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_EVENT_MANAGEMENT_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_ACTIVITY_TEMPLATE_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_SIGN_UP_LABEL,
				},
			],
			DATA_MODIFY,
			DATA_ADDITION,
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now() - 8.64e7;
				},
			},
			date: '',
			filter: {
				id: '',
				actStatus: '',
				templateId: '',
				activityDateType: '0',
				activityDate: '',
			},
			table: {
				myBaseUrl: 'pay',
				url: '',
				// 列表头按钮
				topBtns: [],
				thead: [
					{
						prop: `id`,
						label: '规则ID',
						fixWidth: `80`,
					},
					{
						prop: `name`,
						label: '规则名称',
						fixWidth: `130`,
					},
					{
						prop: `zhUserType`,
						label: '面向用户群',
						fixWidth: `100`,
					},
					{
						prop: `zhActType`,
						label: '规则级别',
						fixWidth: `80`,
					},
					{
						prop: `activePeriod`,
						label: '规则有效期',
						fixWidth: `110`,
					},
					{
						prop: `activeTime`,
						label: '规则生效时段',
						fixWidth: `90`,
					},

					{
						prop: `zhStatus`,
						label: '规则状态',
						fixWidth: `110`,
					},
					{
						prop: `zhSubStatus`,
						label: '规则生效状态',
						fixWidth: `110`,
					},
					{
						prop: `participation`,
						label: '规则生效次数',
					},
					// {
					// 	prop: `remark`,
					// 	label: '奖品发放数量',
					// },
					{
						prop: `sceneName`,
						label: '场景',
					},
					{
						prop: `createdTime`,
						label: '规则创建时间',
						fixWidth: `110`,
					},
					{
						prop: `createdUser`,
						label: '创建人',
					},
				],
				tbody: [],
				tbtn: [
					{
						prop: '上线规则',
						icon: 'el-icon-sort',
						type: 'danger',
						needChangeProp: true,
					},
					{
						prop: '编辑/查看规则',
						icon: 'el-icon-edit-outline',
						type: 'default',
					},
					{
						prop: '查看生效记录',
						icon: 'el-icon-document-copy',
						type: 'default',
					},
				],
			},
		};
	},

	methods: {
		goBack() {
			this.$router.push({
				name: this.$route.query.from,
			});
		},

		// 列表请求 url + 当前参数
		setRequestUrl() {
			const data = {
				id: this.filter.id,
				actStatus: this.filter.actStatus,
				templateId: this.filter.templateId,
				startTime: '',
				endTime: '',
				actStartTime: '',
				actEndTime: '',
				// pageSize: 10,
				pageNum: 1,
			};

			if (this.filter.activityDate !== '') {
				if (this.filter.activityDateType === '0') {
					data.startTime = this.filter.activityDate[0];
					data.endTime = this.filter.activityDate[1];
					data.actStartTime = '';
					data.actEndTime = '';
				} else {
					data.actStartTime = this.filter.activityDate[0];
					data.actEndTime = this.filter.activityDate[1];
					data.startTime = '';
					data.endTime = '';
				}
			}
			this.table.url = api.eventManagement.getSignupActList(data);
		},
		// 接口请求完筛选数据
		filterData() {
			// 规则状态,1-已上线 4-已下线
			const status = ['', '已上线', '未开始', '已结束', '已下线', ''];
			// 规则状态,1-进行中 2-未开始 3-已结束
			const statusSub = ['', '进行中', '未开始', '已结束', ''];
			// //   奖品类型, 1: 优惠券 2: 积分，积分目前不弄
			const prizeType = ['', '优惠券', '积分'];
			// 面向用户群, 1是商家，2是消费者
			const userType = ['', '商家', '消费者'];

			// 规则级别, 1是商家，2是平台
			const actType = ['', '商家', '平台'];
			this.$refs['sectionTable'].table.tbody.map(item => {
				item.zhStatus = status[item.actStatus];
				item.zhSubStatus = item.state ? statusSub[item.state] : '——';
				item.zhPrizeType = prizeType[item.prizeType];
				item.zhUserType = userType[item.userType];
				item.activePeriod = `${item.startTime}~${item.endTime}`;
				item.activeTime = `${item.startActiveTime}~${item.endActiveTime}`;
				item.zhActType = actType[item.actType];
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
			this.filter = {
				id: '',
				actStatus: '',
				templateId: '',
				activityDate: '',
				activityDateType: '0',
			};
			this.getList();
		},

		// 表格行内按钮点击判断
		async tbtnClick(index, row, prop) {
			if (prop === '查看生效记录') {
				// 存储
				sessionStorage.setItem('signupId', row.id);
				this.$router.push({
					name: this.$ALL_CONST.ROUTE_NAME.RN_SIGN_UP_RECORD,
					query: {
						from: this.$ALL_CONST.ROUTE_NAME.RN_SIGN_UP,
					},
				});
			} else if (prop === '编辑/查看规则') {
				this.$router.push({
					name: this.$ALL_CONST.ROUTE_NAME.RN_CREATE_ACTIVITY_FORM,
					query: {
						from: this.$ALL_CONST.ROUTE_NAME.RN_SIGN_UP,
						template: row.templateId,
						id: row.id,
						toDo: DATA_MODIFY,
					},
				});
			} else if (prop === '下线规则' || prop === '上线规则') {
				const postData = {
					id: row.id,
					status: row.actStatus === 4 ? 1 : 4,
				};
				const res = await api.eventManagement.AcginpstuStatus(postData);
				if (res.code === 200) {
					this.setRequestUrl();
					this.$refs.sectionTable.componentsFetchData(this.table.url);
					this.$notify.success({
						title: '操作成功',
					});
				} else {
					this.$notify.error({
						title: res.message,
						message: res.data ? res.data : res.error,
					});
				}
			}
		},

		// 表格顶部按钮点击判断
		clickBtn(type) {
			// 按钮点击 type 判断按钮类型
			const url = `/${this.$ALL_CONST.ROUTE_NAME.RN_EVENT_MANAGEMENT}/${this.$ALL_CONST.ROUTE_NAME.RN_SIGN_UP_FORM}`;
			this.$router.push(url);
		},
	},

	created() {
		this.setRequestUrl();
		// 初始化面包屑
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_BREADCRUMB, this.breadcrumb);
		// 暂时关闭 tab 按钮
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB_NEED_OR_NOT, false);
	},

	beforeDestroy() {
		// 重新打开 tab 按钮
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB_NEED_OR_NOT, true);
	},
};
</script>
