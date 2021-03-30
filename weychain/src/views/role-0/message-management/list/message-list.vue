<template>
	<section>
		<!-- filter -->
		<el-form label-position="top" label-width="auto" :model="filter" :class="'custom-el-form'">
			<el-row>
				<el-col :md="6" :lg="10">
					<el-form-item :label="$t('xiao-xi-bian-hao')">
						<el-input v-model="filter.messageNo" />
					</el-form-item>
				</el-col>
				<el-col :md="6" :lg="10">
					<el-form-item :label="$t('xiao-xi-biao-ti')">
						<el-input v-model="filter.title" />
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
		<div class="data-title">
			<div class="btn">
				<el-button type="primary" @click="addMessage">新建消息 </el-button>
			</div>
		</div>
		<el-table v-loading="loading" :data="tableData" style="width: 100%">
			<el-table-column label="消息编号" prop="messageNo"> </el-table-column>
			<el-table-column label="消息标题" prop="title"> </el-table-column>
			<el-table-column label="状态" prop="CNstatus"> </el-table-column>
			<el-table-column label="发送时间" prop="sendTime"> </el-table-column>
			<el-table-column label="创建时间" prop="createdTime"> </el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-tooltip content="编辑" placement="top" effect="light">
						<el-button size="mini" @click="tbtnClick(scope.$index, scope.row, $t('bian-ji'))" v-if="scope.row.status === 0" circle type="success" plain>
							<i class="table-icon-style el-icon-setting"></i>
						</el-button>
					</el-tooltip>
					<el-tooltip content="发送" placement="top" effect="light">
						<el-button size="mini" @click="tbtnClick(scope.$index, scope.row, $t('fa-song'))" v-if="scope.row.status === 0" circle type="success" plain>
							<i class="table-icon-style el-icon-position"></i>
						</el-button>
					</el-tooltip>
					<el-tooltip content="删除" placement="top" effect="light">
						<el-button size="mini" @click="tbtnClick(scope.$index, scope.row, $t('shan-chu'))" v-if="scope.row.status === 0" circle type="success" plain>
							<i class="table-icon-style el-icon-delete"></i>
						</el-button>
					</el-tooltip>
				</template>
			</el-table-column>
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
			breadcrumb: [],
			filter: {
				messageNo: '',
				title: '',
				pageNum: 1,
				pageSize: 10,
			},
			tableData: [],
			totalSize: 0,
		};
	},

	methods: {
		// 列表请求 url + 当前参数
		async setRequestUrl() {
			this.loading = true;
			const resData = await api.messageManagement.selectListMallNotice(this.filter);
			const data = JSON.parse(JSON.stringify(resData.data));
			data.map(item => {
				if (item.status === 0) {
					item.CNstatus = '未发送';
				} else {
					item.CNstatus = '已发送';
				}
			});
			this.tableData = data;
			this.totalSize = Number(resData.totalSize);
			this.loading = false;
		},

		// 列表请求
		getList() {
			this.filter.pageNum = 1;
			this.setRequestUrl();
		},

		// 重置列表
		resetList() {
			this.date = '';
			this.filter = {
				messageNo: '',
				title: '',
				pageNum: 1,
				pageSize: 10,
			};
			this.getList();
		},

		// 表格行内按钮点击判断
		async tbtnClick(index, row, prop) {
			switch (prop) {
				case this.$t('bian-ji'):
					this.$router.push({
						name: this.$ALL_CONST.ROUTE_NAME.RN_CREATE_MESSAGE_PUSH,
						query: {
							data: JSON.stringify(row),
							from: this.$ALL_CONST.ROUTE_NAME.RN_MESSAGE_LIST,
						},
					});
					break;
				// eslint-disable-next-line no-case-declarations
				case this.$t('fa-song'):
					this.$confirm(this.$t('shi-fou-fa-song-gai-tiao-xiao-xi'), '提示', {
						confirmButtonText: this.$t('que-ding'),
						cancelButtonText: false,
						type: 'warning',
					}).then(async () => {
						const loading = this.$loading({
							lock: true,
							text: '处理中',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0)',
						});
						const upData = row;
						upData.status = 1; // 0 未发送 1 发送
						const upRes = await api.messageManagement.updateMallNotice(upData);
						if (upRes.code === 200) {
							this.$notify.success({
								title: this.$t('cheng-gong'),
								message: '',
							});
							setTimeout(() => {
								loading.close();
							}, 500);
							this.getList();
						} else {
							loading.close();
							this.$message.error(upRes.message);
						}
					});

					break;
				// eslint-disable-next-line no-case-declarations
				case this.$t('shan-chu'):
					this.$confirm(this.$t('shi-fou-shan-chu-gai-tiao-xiao-xi'), '提示', {
						confirmButtonText: this.$t('que-ding'),
						cancelButtonText: false,
						type: 'warning',
					}).then(async () => {
						const loading = this.$loading({
							lock: true,
							text: '处理中',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0)',
						});
						const deleteData = await api.messageManagement.deleteMallNotice(row);
						if (deleteData.code === 200) {
							this.$notify.success({
								title: this.$t('cheng-gong'),
								message: '',
							});
							setTimeout(() => {
								loading.close();
							}, 500);
							this.getList();
						} else {
							loading.close();
							this.$message.error(deleteData.message);
						}
					});
					break;
				default:
			}
		},

		handleCurrentChange(val) {
			// 分页
			// console.log(`当前页: ${val}`);
			this.filter.pageNum = val;
			this.setRequestUrl();
		},

		handleSizeChange(val) {
			this.filter.pageSize = val;
			this.setRequestUrl();
		},

		// 新建消息
		addMessage() {
			this.$router.push({
				name: this.$ALL_CONST.ROUTE_NAME.RN_CREATE_MESSAGE_PUSH,
				query: {
					from: this.$ALL_CONST.ROUTE_NAME.RN_ACTIVITY_TEMPLATE,
				},
			});
		},

		// 初始化面包屑
		initBreadcrumb() {
			this.breadcrumb = [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_MESSAGE_MANAGEMENT_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_MESSAGE_LIST_LABEL,
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
	float: left;
	padding-bottom: 20px;
}
.title-resole {
	float: left;
	width: 80%;
	padding: 20px 0;
}
.btn button {
	color: #5cb87a;
	background: #eff8f2;
	border-color: #bee3ca;
}
.btn button:hover {
	/* opacity: 0.6; */
	color: #fff;
	background: #5cb87a;
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
