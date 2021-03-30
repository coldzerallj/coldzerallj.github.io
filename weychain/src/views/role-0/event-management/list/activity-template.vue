<template>
	<!-- 规则模板 -->
	<section>
		<!-- 收款二维码弹窗 -->
		<!-- <el-dialog title="收款二维码" :visible.sync="dialogVisible" width="720px" :append-to-body="true">
			<div class="module-code">
				<vue-qr
					style="display:none"
					:callback="handleDrawImage"
					ref="img"
					:text="codeData.url"
					colorDark="#000"
					colorLight="#fff"
					:logoSrc="codeData.icon"
					:size="450"
				></vue-qr>
				<canvas id="codeCanvas" width="680" height="756"></canvas>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">关 闭</el-button>
				<el-button type="primary">
					<a class="btn-save" :href="codeData.imgUrl" :download="codeData.codeName">保 存</a>
				</el-button>
			</span>
		</el-dialog> -->

		<!-- 收款二维码弹窗 -->

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
			ref="sectionTable"
		/>
		<!-- 添加创建规则弹窗 -->
		<!-- <el-dialog title="创建规则" :visible.sync="dialogAdd" :append-to-body="true" width="400px">
			<div class="module-form">
				<el-form ref="form" :model="addForm" label-width="100px">
					<el-form-item label="子商户名称">
						<el-select v-model="addForm.activityTemplate" style="width:100%;" placeholder="请选择规则模板">
							<el-option label="触发型规则" value="1"></el-option>
							<el-option label="报名类规则" value="2"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogAdd = false">取 消 </el-button>
				<el-button type="primary" @click="handleSureAdd">确 认 </el-button>
			</span>
		</el-dialog> -->

		<!-- 添加子商户弹窗 -->
	</section>
</template>

<script>
import vueQr from 'vue-qr';
import store from '@STORE';
import api from '@API';
import { DATA_ADDITION } from '@HELPER/const';
export default {
	components: {
		vueQr,
	},
	data() {
		return {
			tabs: [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_ACTIVITY_TEMPLATE_LABEL,
					to: this.$ALL_CONST.ROUTE_NAME.RN_ACTIVITY_TEMPLATE,
				},
				// {
				// 	label: this.$ALL_CONST.ROUTE_NAME.RN_EVENT_LIST_LABEL,
				// 	to: this.$ALL_CONST.ROUTE_NAME.RN_EVENT_LIST,
				// },
			],
			breadcrumb: [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_EVENT_MANAGEMENT_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_ACTIVITY_TEMPLATE_LABEL,
				},
			],
			addForm: {
				// contactName: '',
				// contactPhone: '',
				// remark: '',
				// storeAliasNo: '',
				// storeName: '',
				// rate: '15',
				activityTemplate: '',
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
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now() - 8.64e7;
				},
			},
			filter: {
				storeAliasNo: '',
				orderNo: '',
				successEndTime: '',
				storeName: '',
				// activityId: '',
				// activityStatus: '',
				// activityTemplate: '',
				// activityDate: '',
				// activityDateType: '',
			},
			table: {
				myBaseUrl: 'pay',
				url: '',
				// 列表头按钮
				topBtns: [
					{
						btn: '创建规则',
						icon: 'el-icon-document-add',
						type: 'success',
					},
				],
				thead: [
					{
						prop: `id`,
						label: '规则类型ID',
						// fixWidth: `200`,
					},
					{
						prop: `name`,
						label: '规则类型名称',
						// fixWidth: `200`,
					},
					{
						prop: `activityScene`,
						label: '可用场景',
						// fixWidth: `200`,
					},
					{
						prop: `publishedCount`,
						label: '已发布规则数量',
						// fixWidth: `200`,
					},
					{
						prop: `processingCount`,
						label: '生效中规则数量',
						// fixWidth: `200`,
					},
					{
						prop: `tplDesc`,
						label: '规则类型名称',
					},
					// {
					// 	prop: `remark`,
					// 	label: '操作',
					// },
				],
				tbody: [],
				tbtn: [
					{
						prop: '查看规则列表',
						icon: 'el-icon-arrow-right',
					},
				],
			},
		};
	},

	methods: {
		// 列表请求 url + 当前参数
		setRequestUrl() {
			this.table.url = api.eventManagement.getTplList();
		},

		// 列表请求
		getList() {
			this.setRequestUrl();
			this.$refs.sectionTable.fetchData(this.table.url);
		},

		handleSureAdd() {
			let url = '';
			if (this.addForm.activityTemplate === '2') {
				// 创建报名类规则
				// this.$router.push('/event_management/sign_up');
				url = `/${this.$ALL_CONST.ROUTE_NAME.RN_EVENT_MANAGEMENT}/${this.$ALL_CONST.ROUTE_NAME.RN_SIGN_UP_FORM}`;
			} else {
				// 创建触发型规则;
				// this.$router.push('/event_management/trigger_type');
				url = `/${this.$ALL_CONST.ROUTE_NAME.RN_EVENT_MANAGEMENT}/${this.$ALL_CONST.ROUTE_NAME.RN_CREATE_ACTIVITY_FORM}`;
			}
			this.$router.push(url);
			this.dialogAdd = false;
		},
		// 重置列表
		resetList() {
			this.filter = {
				storeAliasNo: '',
				storeName: '',
			};
			this.getList();
		},

		// 表格行内按钮点击判断
		async tbtnClick(index, row, prop) {
			// const resData = await api.collectionManagement.getCodeUrl(data);
			// const data = {
			// 	storeName: row.storeName,
			// };
			// switch (prop) {
			// 	case this.$t('shou-kuan-er-wei-ma'):
			// 		this.codeData.codeName = resData.data.storeName;
			// 		this.codeData.url = resData.data.shortUrl;
			// 		this.dialogVisible = true;
			// 		break;
			// 	default:
			// }
			// this.$ALL_CONST.ROUTE_NAME.RN_ACTIVITY_TEMPLATE_LABEL
			// this.$router.push('/event_management/trigger_type');
			let name = '';
			if (row.id === '1') {
				name = this.$ALL_CONST.ROUTE_NAME.RN_TRIGGER_TYPE;
			} else {
				name = this.$ALL_CONST.ROUTE_NAME.RN_SIGN_UP;
			}
			// this.$router.push(name);
			this.$router.push({
				name,
				query: {
					from: this.$ALL_CONST.ROUTE_NAME.RN_ACTIVITY_TEMPLATE,
				},
			});
		},

		// 表格顶部按钮点击判断
		async clickBtn(type) {
			// 按钮点击 type 判断按钮类型

			if (type === '创建规则') {
				// 报名型规则记录
				// const url = `/${this.$ALL_CONST.ROUTE_NAME.RN_EVENT_MANAGEMENT}/${this.$ALL_CONST.ROUTE_NAME.RN_CREATE_ACTIVITY_FORM}`;
				// this.$router.push(url);

				this.$router.push({
					name: this.$ALL_CONST.ROUTE_NAME.RN_CREATE_ACTIVITY_FORM,
					query: {
						toDo: DATA_ADDITION,
						from: this.$ALL_CONST.ROUTE_NAME.RN_ACTIVITY_TEMPLATE,
					},
				});
			}
		},
	},

	created() {
		this.setRequestUrl();
		// 初始化面包屑
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_BREADCRUMB, this.breadcrumb);
		// 初始 tab 按钮
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB, this.tabs);
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
