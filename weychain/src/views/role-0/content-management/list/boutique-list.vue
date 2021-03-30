<template>
	<section>
		<!-- filter -->
		<el-form label-position="top" label-width="auto" :model="filter" :class="'custom-el-form'">
			<el-row>
				<el-col :md="6" :lg="10">
					<el-form-item :label="$t('ka-pian-bian-hao')">
						<el-input v-model="filter.cardNo" />
					</el-form-item>
				</el-col>
				<el-col :md="6" :lg="10">
					<el-form-item :label="$t('ka-pian-ming-cheng')">
						<el-input v-model="filter.name" />
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
				<el-button type="primary" @click="createCard">{{ btnName }} </el-button>
			</div>
		</div>
		<el-table v-loading="loading" :data="tableData" style="width: 100%">
			<el-table-column label="卡片编号" prop="cardNo"> </el-table-column>
			<el-table-column label="卡片名称" prop="name"> </el-table-column>
			<el-table-column label="最近操作人" prop="updatedUser"> </el-table-column>
			<el-table-column label="更新时间" prop="updatedTime"> </el-table-column>
			<el-table-column label="创建时间" prop="createdTime"> </el-table-column>
			<!-- <el-table-column label="显示顺序" prop="sortOrder"> </el-table-column> -->
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-tooltip content="编辑" placement="top" effect="light">
						<el-button size="mini" @click="tbtnClick(scope.$index, scope.row, $t('bian-ji'))" circle type="success" plain>
							<i class="table-icon-style el-icon-setting"></i>
						</el-button>
					</el-tooltip>
					<el-tooltip content="禁用" placement="top" effect="light" v-if="scope.row.enableFlag">
						<el-button size="mini" @click="tbtnClick(scope.$index, scope.row, $t('jin-yong'))" circle type="danger" plain>
							<i class="table-icon-style el-icon-bottom"></i>
						</el-button>
					</el-tooltip>
					<el-tooltip content="启用" placement="top" effect="light" v-else>
						<el-button size="mini" @click="tbtnClick(scope.$index, scope.row, $t('qi-yong'))" circle type="success" plain>
							<i class="table-icon-style el-icon-top"></i>
						</el-button>
					</el-tooltip>
					<el-tooltip content="删除" placement="top" effect="light">
						<el-button size="mini" @click="tbtnClick(scope.$index, scope.row, $t('shan-chu'))" circle type="success" plain>
							<i class="table-icon-style el-icon-delete"></i>
						</el-button>
					</el-tooltip>
				</template>
			</el-table-column>
		</el-table>

		<!-- 创建卡片弹窗 -->
		<el-dialog :visible="centerDialogVisible" width="500px" @close="closeDialog" :append-to-body="true" center>
			<div class="tips-title">
				<span class="title">请选择创建卡片的商品类型</span>
				<div class="content">
					<span> 生鲜类商品（选择后只能选择农贸生鲜的商品展示）</span>
					<el-radio class="radio" v-model="sendObject" label="1">{{ '' }}</el-radio>
				</div>
				<div class="content">
					<span> 点餐类商品（选择后只能选择餐饮小吃的商品展示）</span>
					<el-radio v-model="sendObject" label="2">{{ '' }}</el-radio>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeDialog">取 消</el-button>
				<el-button type="primary" @click="handleCheck">确 定</el-button>
			</span>
		</el-dialog>

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
				cardNo: '',
				name: '',
				pageNum: 1,
				pageSize: 10,
			},
			tableData: [],
			btnName: '创建卡片',
			dialogAdd: false,
			addForm: {},
			totalSize: 0,
			centerDialogVisible: false,
			sendObject: '',
		};
	},

	methods: {
		// 请求列表数据
		async setRequestUrl() {
			this.loading = true;
			const resData = await api.messageManagement.choiceGoodsManagement(this.filter);
			const data = JSON.parse(JSON.stringify(resData.data));
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
				cardNo: '',
				name: '',
				pageNum: 1,
				pageSize: 10,
			};
			this.getList();
		},

		// 表格行内按钮点击判断
		async tbtnClick(index, row, prop) {
			const parmas = {
				id: row.id * 1,
				enable: !row.enableFlag,
				cardNo: row.cardNo,
			};
			switch (prop) {
				case this.$t('bian-ji'):
					this.$router.push({
						name: this.$ALL_CONST.ROUTE_NAME.RN_BOUTIQUE_ADD,
						query: {
							id: row.id,
							from: this.$ALL_CONST.ROUTE_NAME.RN_BOUTIQUE_LIST,
							toDo: DATA_MODIFY,
						},
					});
					break;
				// eslint-disable-next-line no-case-declarations
				case this.$t('jin-yong'):
					this.enableDisable({ type: 2, data: parmas });
					break;
				// eslint-disable-next-line no-case-declarations
				case this.$t('qi-yong'):
					this.enableDisable({ type: 1, data: parmas });
					break;
				// eslint-disable-next-line no-case-declarations
				case this.$t('shan-chu'):
					this.delete(parmas);
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
		createCard() {
			this.centerDialogVisible = true;
			// this.$router.push({
			// 	name: this.$ALL_CONST.ROUTE_NAME.RN_CREATE_MESSAGE_PUSH,
			// 	query: {
			// 		from: this.$ALL_CONST.ROUTE_NAME.RN_ACTIVITY_TEMPLATE,
			// 	},
			// });
		},
		// 关闭对话框
		closeDialog() {
			this.centerDialogVisible = false;
		},
		// 确定卡片
		handleCheck() {
			if (this.sendObject !== '') {
				this.centerDialogVisible = false;
				this.$router.push({
					name: this.$ALL_CONST.ROUTE_NAME.RN_BOUTIQUE_ADD,
					query: { bizType: this.sendObject, from: this.$ALL_CONST.ROUTE_NAME.RN_BOUTIQUE_LIST, toDo: DATA_ADDITION },
				});
				this.sendObject = '';
			} else {
				this.$message.error('请选择创建卡片的商品类型');
			}
		},
		// 启用/禁用
		enableDisable(item) {
			const confirmContent = item.type === 1 ? this.$t('shi-fou-qi-yong-gai-ka-pian') : this.$t('shi-fou-jin-yong-gai-ka-pian');
			this.$confirm(confirmContent, '提示', {
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
				const res = await api.messageManagement.choiceUpdateEnable(item.data);
				if (res.code === 200) {
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
					this.$message.error(res.message);
				}
			});
		},
		// 删除卡片
		delete(item) {
			if (!item.enable) {
				this.$message.error(`卡片编号为${item.cardNo}的卡片正在启用，无法删除`);
			} else {
				this.$confirm(this.$t('shi-fou-shan-chu-gai-ka-pian'), '提示', {
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
					const res = await api.messageManagement.choiceDelete(item);
					if (res.code === 200) {
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
						this.$message.error(res.message);
					}
				});
			}
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
<style scoped lang="scss">
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

/* 弹窗 */
.tips-title {
	.title {
		display: inline-block;
		margin: 10px 0;
		font-size: 18px;
	}
	/* text-align: center; */
	height: 120px;
	width: 100%;
	.content {
		padding: 10px 20px;
		font-size: 16px;
		/deep/ .el-radio__inner {
			width: 20px;
			height: 20px;
		}
	}
}
.el-dialog__wrapper {
	top: 145px;
}
</style>
