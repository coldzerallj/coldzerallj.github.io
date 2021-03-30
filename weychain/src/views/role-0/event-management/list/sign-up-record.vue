<template>
	<!-- 报名型规则记录 -->
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
					<el-form-item label="报名时间">
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
					label: this.$ALL_CONST.ROUTE_NAME.RN_SIGN_UP_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_SIGN_UP_RECORD_LABEL,
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
				activityId: '',
				activityName: '',
				actStatus: '',
				templateType: '',
				activityDate: '',
				activityDateType: '0',
				// pageSize: 10,
				pageNum: 1,
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
					// 	btn: '创建规则',
					// 	type: 'warning',
					// },
				],
				thead: [
					{
						prop: `logSn`,
						label: '记录编号',
						fixWidth: `180`,
					},
					{
						prop: `activityId`,
						label: '规则ID',
						fixWidth: `100`,
					},
					{
						prop: `activityName`,
						label: '规则名称',
						fixWidth: `150`,
					},
					{
						prop: `zhStatus`,
						label: '规则状态',
						fixWidth: `100`,
					},
					{
						prop: `templateId`,
						label: '规则类型ID',
						fixWidth: `140`,
					},
					{
						prop: `sceneName`,
						label: '场景',
						fixWidth: `140`,
					},
					{
						prop: `tenantId`,
						label: '商家ID',
						fixWidth: `100`,
					},
					{
						prop: `zhTenantStatus`,
						label: '商家状态',
						fixWidth: `120`,
					},
					{
						prop: `signupTime`,
						label: '参与规则时间（报名时间）',
					},
				],
				tbody: [],
				tbtn: [
					// {
					// 	prop: '下线规则 ',
					// 	icon: 'el-icon-picture-outline',
					// 	type: 'success',
					// },
					// {
					// 	prop: '编辑/查看规则 ',
					// 	icon: 'el-icon-picture-outline',
					// 	type: 'success',
					// },
					// {
					// 	prop: '查看参与记录 ',
					// 	icon: 'el-icon-picture-outline',
					// 	type: 'success',
					// },
				],
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
			this.table.url = api.eventManagement.getActSelectList(data);
		},
		// 接口请求完筛选数据
		filterData() {
			// 规则状态,1-进行中，2-未开始，3-已结束, 4-已下线
			const status = ['', '进行中', '未开始', '已结束', '已下线', ''];
			// 状态，已报名, 已退出，商家参加规则的状态
			const tenantStatus = ['', '已报名', '已退出'];
			this.$refs['sectionTable'].table.tbody.map(item => {
				item.zhStatus = status[item.actStatus];
				item.zhTenantStatus = tenantStatus[item.tenantStatus];
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
				activityId: '',
				activityName: '',
				actStatus: '',
				templateType: '',
				activityDate: '',
				activityDateType: '',
				// pageSize: 10,
				pageNum: 1,
			};
			this.getList();
		},

		// 表格行内按钮点击判断
		tbtnClick(index, row, prop) {},

		// 表格顶部按钮点击判断
		clickBtn(type) {
			// 按钮点击 type 判断按钮类型
			const url = `/${this.$ALL_CONST.ROUTE_NAME.RN_EVENT_MANAGEMENT}/${this.$ALL_CONST.ROUTE_NAME.RN_SIGN_UP_FORM}`;
			this.$router.push(url);
		},
	},

	created() {
		// 获取当前规则的id
		if (sessionStorage.getItem('signupId')) {
			this.filter.activityId = sessionStorage.getItem('signupId');
			sessionStorage.removeItem('signupId');
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
