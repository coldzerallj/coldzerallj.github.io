<template>
	<!-- 活动模板 -->
	<section>
		<!-- table -->
		<el-table v-loading="loading" :data="table.tbody" style="width: 99%">
			<el-table-column v-for="(item, index) in table.thead" :key="index" :prop="item.prop" :label="item.label" :width="item.fixWidth"> </el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-tooltip content="上架" placement="top" effect="light" v-if="scope.row.status === 0">
						<el-button size="mini" @click="handleUpDown('1', scope.row)" circle type="success" plain>
							<i class="table-icon-style el-icon-top"></i>
						</el-button>
					</el-tooltip>
					<el-tooltip content="下架" placement="top" effect="light" v-else>
						<el-button size="mini" @click="handleUpDown('2', scope.row)" circle type="danger" plain>
							<i class="table-icon-style el-icon-bottom"></i>
						</el-button>
					</el-tooltip>
					<el-tooltip content="编辑广告" placement="top" effect="light">
						<el-button size="mini" @click="handleEdit(scope.row)" circle type="default" plain>
							<i class="table-icon-style el-icon-edit-outline"></i>
						</el-button>
					</el-tooltip>
					<el-tooltip content="设置/查看广告" placement="top" effect="light">
						<el-button size="mini" @click="handleChecked(scope.row)" circle type="default" plain>
							<i class="table-icon-style el-icon-document-copy"></i>
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

		<!-- 编辑广告位弹窗 -->
		<el-dialog title="编辑广告位" :visible.sync="dialogAdd" :append-to-body="true" width="560px">
			<div class="module-form">
				<el-form ref="form" :model="addForm" label-width="100px">
					<el-form-item :label="this.$t('guang-gao-wei-bian-hao')">
						<el-input v-model="addForm.id" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item :label="this.$t('guang-gao-wei-ming-cheng')">
						<el-input v-model="addForm.name"></el-input>
					</el-form-item>
					<el-form-item :label="this.$t('wei-zhi')">
						<el-input v-model="addForm.location" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item :label="this.$t('guang-gao-xing-shi')">
						<el-input v-model="addForm.type" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item :label="this.$t('bei-zhu')">
						<el-input
							placeholder="请输入备注..."
							class="input-textarea"
							:autosize="{ maxRows: 8 }"
							type="textarea"
							maxlength="500"
							show-word-limit
							v-model="addForm.comment"
						></el-input>
					</el-form-item>
				</el-form>
			</div>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogAdd = false">取 消 </el-button>
				<el-button type="primary" @click="handleSureAdd">确 认 </el-button>
			</span>
		</el-dialog>

		<!-- 编辑广告位弹窗 -->
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
					label: this.$ALL_CONST.ROUTE_NAME.RN_ADVERTISING_LIST_LABEL,
					to: this.$ALL_CONST.ROUTE_NAME.RN_ADVERTISING_LIST,
				},
			],
			breadcrumb: [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_ADVERTISING_MANAGEMENT_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_ADVERTISING_LIST_LABEL,
				},
			],
			dialogAdd: false,
			totalSize: 0,
			loading: false,
			filter: {
				pageSize: 10,
				pageNum: 1,
			},
			addForm: {},
			table: {
				url: '',
				thead: [
					{
						prop: `code`,
						label: this.$t('guang-gao-wei-bian-hao'),
						fixWidth: '90',
					},
					{
						prop: `name`,
						label: this.$t('guang-gao-wei-ming-cheng'),
						fixWidth: '170',
					},
					{
						prop: `typeDec`,
						label: this.$t('guang-gao-xing-shi'),
					},
					{
						prop: `location`,
						label: this.$t('wei-zhi'),
					},
					{
						prop: `quantity`,
						label: this.$t('guang-gao-shu-liang'),
					},
					{
						prop: `statusDec`,
						label: this.$t('zhuang-tai'),
					},
					{
						prop: `comment`,
						label: this.$t('bei-zhu'),
					},
				],
				tbody: [],
				tbtn: [
					{
						prop: '查看活动列表',
						icon: 'el-icon-arrow-right',
					},
				],
			},
		};
	},

	methods: {
		// 列表请求 url + 当前参数
		async setRequestUrl() {
			this.loading = true;
			const resData = await api.advertisingManagement.oprAdPlacementList(this.filter);
			const data = JSON.parse(JSON.stringify(resData.data));

			data.map(item => {
				if (item.type === 1) {
					item.typeDec = 'banner';
				} else {
					item.typeDec = '弹窗';
				}
				if (item.status === 0) {
					item.statusDec = '下架';
				} else {
					item.statusDec = '上架';
				}
			});
			this.table.tbody = data;
			this.totalSize = Number(resData.totalSize);
			this.loading = false;
		},

		// 列表请求
		getList() {
			this.setRequestUrl();
		},

		handleUpDown(type, item) {
			// 上/下架
			const confirmContent = type === '1' ? '是否上架该广告位' : '是否下架该广告位';
			this.$confirm(confirmContent, '提示', {
				confirmButtonText: this.$t('que-ding'),
				cancelButtonText: false,
				type: 'warning',
			}).then(async () => {
				const postData = {
					id: Number(item.id),
					status: item.status,
				};
				const res = await api.advertisingManagement.oprAdPlacementUpdateStatus(postData);
				if (res.code === 200) {
					this.$notify.success({
						title: '操作成功',
						message: '',
					});
					this.getList();
				} else {
					this.$notify.error({
						title: res.message,
						message: res.data,
					});
				}
			});
		},
		// 编辑广告位弹窗
		handleEdit(row) {
			this.addForm = JSON.parse(JSON.stringify(row));
			this.dialogAdd = true;
		},
		async handleSureAdd() {
			const res = await api.advertisingManagement.oprAdvertisingUpdate(this.addForm);
			if (res.code === 200) {
				this.$notify.success({
					title: '编辑成功',
					message: '',
				});
				this.getList();
				this.dialogAdd = false;
			} else {
				this.dialogAdd = false;
				this.$notify.error({
					title: res.message,
					message: res.data,
				});
			}
		},
		// 重置列表
		resetList() {
			this.filter = {
				storeAliasNo: '',
				storeName: '',
			};
			this.getList();
		},
		handleCurrentChange(val) {
			this.filter.pageNum = val;
			this.setRequestUrl();
		},
		handleSizeChange(val) {
			this.filter.pageSize = val;
			this.setRequestUrl();
		},
		// 查看/设置广告位
		handleChecked(row) {
			this.$router.push({
				name: this.$ALL_CONST.ROUTE_NAME.RN_ADVERTISING_DETAIL,
				query: {
					id: row.id,
					code: row.code,
					name: row.name,
					location: row.location,
					from: this.$ALL_CONST.ROUTE_NAME.RN_ADVERTISING_LIST,
				},
			});
		},

		// 表格顶部按钮点击判断
		async clickBtn(type) {
			// 按钮点击 type 判断按钮类型

			if (type === '创建活动') {
				// 报名型活动记录
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
<style>
.input-textarea .el-textarea__inner {
	min-height: 100px !important;
}
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
