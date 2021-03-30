<template>
	<!-- 活动模板 -->
	<section>
		<!-- title 统计-->
		<div class="data-title">
			<el-row class="title-resole">
				<el-col :span="3">
					<div class="grid-content bg-purple">
						广告位编号：<span>{{ advertising.code }}</span>
					</div></el-col
				>
				<el-col :span="5">
					<div class="grid-content bg-purple">
						广告位名称：<span>{{ advertising.name }}</span>
					</div></el-col
				>
				<el-col :span="16">
					<div class="grid-content bg-purple">
						广告位位置：<span>{{ advertising.location }}</span>
					</div></el-col
				>
			</el-row>
			<div class="btn" style="margin:0 0 16px">
				<el-button type="success" icon="el-icon-document-add" size="small" :plain="true" @click="createCard">新增广告</el-button>
			</div>
		</div>
		<!-- table -->
		<el-table v-loading="loading" :data="table.tbody" style="width: 99%">
			<el-table-column property="code" label="广告编号" width="100"> </el-table-column>
			<el-table-column property="name" label="广告名称" width="120"> </el-table-column>
			<el-table-column label="广告图" width="140">
				<template slot-scope="scope"> <img style="width:100px; height:100px;border-radius:6px" :src="scope.row.image" fit="fit" /> </template>
			</el-table-column>
			<el-table-column property="adValidRange" label="广告有效期" width="200"> </el-table-column>
			<el-table-column property="adTimeRange" label="广告时间段" width="160"> </el-table-column>
			<el-table-column property="link" label="广告链接" width="120"> </el-table-column>
			<el-table-column property="statusDec" label="状态" width="80"> </el-table-column>
			<el-table-column property="comment" label="备注" width="120"> </el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-tooltip content="删除" placement="top" effect="light">
						<el-button size="mini" @click="handleDelete(scope.row)" circle type="default" plain>
							<i class="table-icon-style el-icon-delete"></i>
						</el-button>
					</el-tooltip>
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
		<div class="custom-form-btns-wrap text-right">
			<el-button type="default" @click="goBack">
				{{ $t('fan-hui') }}
			</el-button>
		</div>

		<!-- 新增/编辑广告弹窗 -->
		<el-dialog :title="dialogTitle" :visible.sync="dialogAdd" @close="handleClose" :append-to-body="true" width="560px">
			<div class="module-form">
				<el-form ref="form" :model="addForm" label-width="100px">
					<el-form-item label="广告名称" :required="true">
						<el-input v-model="addForm.name"></el-input>
					</el-form-item>
					<el-form-item label="广告有效期">
						<el-date-picker
							v-model="selectDate"
							:picker-options="actPickerOptions"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							value-format="yyyy-MM-dd"
						>
						</el-date-picker>
					</el-form-item>
					<el-form-item label="广告时间段">
						<el-time-picker
							is-range
							v-model="selectTime"
							value-format="HH:mm:ss"
							format="HH:mm:ss"
							range-separator="至"
							start-placeholder="开始时间段"
							end-placeholder="结束时间段"
							placeholder="选择时间范围"
						>
						</el-time-picker>
					</el-form-item>
					<el-form-item label="广告链接">
						<el-input v-model="addForm.link"></el-input>
						<div class="page-tips">消费者领券中心：/pages/user/coupon-center/index?id=1,3,5<br /></div>
					</el-form-item>
					<el-form-item label="广告图" :required="true">
						<el-upload
							:limit="1"
							action="mbs/file/storage/upload"
							:headers="myHeaders"
							list-type="picture-card"
							:file-list="consumerRotationList"
							:on-success="getConsumerRotationImage"
							:on-exceed="handleexceed"
							:on-remove="handleRemove"
							:class="{ hide: hideUpload }"
							:before-upload="beforeImgUpload"
						>
							<i class="el-icon-plus"></i>
						</el-upload>
						<div style="font-size:13px;color:#999">
							<template v-if="advertising.code === '8101' || advertising.code === '8102'">建议尺寸为750x272px</template>
							<!-- <template v-if="advertising.code === '8103'">建议尺寸为750x272px</template>
							<template v-if="advertising.code === '8104'">建议尺寸为750x272px</template> -->
						</div>
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
				<el-button @click="handleClose">取 消 </el-button>
				<el-button type="primary" @click="handleSureAdd">确 认 </el-button>
			</span>
		</el-dialog>

		<!-- 新增/编辑广告弹窗 -->
	</section>
</template>

<script>
import cookie from 'js-cookie';
import vueQr from 'vue-qr';
import store from '@STORE';
import api from '@API';
import { LOGIN_COOKIE_KEY } from '@HELPER/const';
export default {
	components: {
		vueQr,
	},
	data() {
		return {
			// 限制广告有效期
			actPickerOptions: {
				disabledDate: time => {
					return time.getTime() < Date.now() - 8.64e7;
				},
			},
			tabs: [],
			breadcrumb: [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_ADVERTISING_MANAGEMENT_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_ADVERTISING_DETAIL_LABEL,
				},
			],
			hideUpload: false,
			selectTime: '',
			selectDate: '',
			addForm: {
				image: '',
			},
			advertising: {},
			totalSize: 0,
			loading: false,
			consumerRotationList: [],
			filter: {
				adPlacementId: null,
				pageSize: 10,
				pageNum: 1,
			},
			dialogAdd: false,
			dialogTitle: '',
			table: {
				url: '',
				thead: [
					{
						prop: `id`,
						label: '广告编号',
					},
					{
						prop: `name`,
						label: '广告名称',
					},
					{
						prop: `image`,
						label: '广告图',
					},
					{
						prop: `adValidRange`,
						label: '广告有效期',
					},
					{
						prop: `adTimeRange`,
						label: '广告时间段',
					},
					{
						prop: `link`,
						label: '广告链接',
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

	computed: {
		myHeaders() {
			if (cookie.get(LOGIN_COOKIE_KEY)) {
				return {
					'X-TOKEN': cookie.get(LOGIN_COOKIE_KEY),
				};
			}
		},
	},
	watch: {
		'addForm.image'(val) {
			if (val && val !== '') {
				this.hideUpload = true;
			} else {
				this.hideUpload = false;
			}
		},
	},
	methods: {
		handleexceed(files, fileList) {
			this.$message.error('只能上传一张图片');
		},
		// 文件上传前的钩子
		beforeImgUpload(file, fileList) {
			const isImage = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg';
			if (!isImage) {
				this.$message.error('只能上传png,jpg,jpeg格式!');
				return false;
			}
		},
		handleRemove(file, fileList) {
			this.addForm.image = '';
		},
		getConsumerRotationImage(response, file, fileList) {
			this.addForm.image = response.data[0];
		},
		goBack() {
			this.$router.push({
				name: this.$route.query.from,
			});
		},
		// 列表请求 url + 当前参数
		async setRequestUrl() {
			this.loading = true;
			const resData = await api.advertisingManagement.oprAdvertisingList(this.filter);
			const data = JSON.parse(JSON.stringify(resData.data));
			data.map(item => {
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
		createCard() {
			this.consumerRotationList = [];
			this.addForm = {
				image: '',
			};
			this.dialogTitle = '新增广告';
			this.selectTime = '';
			this.selectDate = '';
			this.dialogAdd = true;
		},
		handleDelete(item) {
			// 上/下架
			const confirmContent = '是否删除该广告';
			this.$confirm(confirmContent, '提示', {
				confirmButtonText: this.$t('que-ding'),
				cancelButtonText: false,
				type: 'warning',
			}).then(async () => {
				const postData = {
					id: Number(item.id),
				};
				const res = await api.advertisingManagement.oprAdvertisingDelete(postData);
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

		handleUpDown(type, item) {
			// 上/下架
			const confirmContent = type === '1' ? '是否上架该广告' : '是否下架该广告';
			this.$confirm(confirmContent, '提示', {
				confirmButtonText: this.$t('que-ding'),
				cancelButtonText: false,
				type: 'warning',
			}).then(async () => {
				const postData = {
					id: Number(item.id),
					status: item.status,
				};
				const res = await api.advertisingManagement.oprAdvertisingUpdateStatus(postData);
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
			this.dialogTitle = '编辑广告';
			this.addForm = JSON.parse(JSON.stringify(row));

			if (this.addForm.adValidRange && this.addForm.adValidRange.length > 0) {
				this.selectDate = [this.addForm.adValidRange.split('~')[0], this.addForm.adValidRange.split('~')[1]];
			}
			// 规则时间段回显
			if (this.addForm.adTimeRange && this.addForm.adTimeRange.length > 0) {
				const timeRange = this.addForm.adTimeRange.split('~');
				const timeS = timeRange[0].split(':');
				const timeE = timeRange[1].split(':');
				this.selectTime = [new Date(2016, 9, 10, timeS[0], timeS[1], timeS[2]), new Date(2016, 9, 10, timeE[0], timeE[1], timeE[2])];
			}
			this.consumerRotationList.push({
				url: this.addForm.image,
				name: '广告图',
			});
			this.dialogAdd = true;
		},
		// 关闭弹窗
		handleClose() {
			this.consumerRotationList = [];
			this.dialogAdd = false;
		},
		async handleSureAdd() {
			// 新建字段校验
			if (!this.addForm.name || this.addForm.name === '') {
				this.$message.error('请输入广告名称');
				return false;
			}
			if (!this.addForm.image || this.addForm.image === '') {
				this.$message.error('请上传广告图');
				return false;
			}
			const data = JSON.parse(JSON.stringify(this.addForm));
			// 处理日期和时间段数据
			if (this.selectDate && this.selectDate.length > 0) {
				data.startTime = this.selectDate[0];
				data.endTime = this.selectDate[1];
			} else {
				data.startTime = '';
				data.endTime = '';
			}
			if (this.selectTime) {
				if (this.selectTime && this.selectTime.length > 0 && this.selectTime[0].length > 0) {
					data.adStartTime = this.selectTime[0];
					data.adEndTime = this.selectTime[1];
				}
			} else {
				data.adStartTime = '';
				data.adEndTime = '';
			}
			data.adPlacementId = this.filter.adPlacementId;
			let res = null;
			const loading = this.$loading({
				lock: true,
				text: '提交中',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0)',
			});
			setTimeout(() => {
				loading.close();
			}, 1000);
			if (!data.id) {
				// 添加广告
				res = await api.advertisingManagement.oprAdvertisingAdd(data);
			} else {
				// 编辑广告
				data.id = Number(data.id);
				res = await api.advertisingManagement.oprAdvertisingUpdateByEntity(data);
			}
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
			this.consumerRotationList = [];
		},
		// 重置列表
		handleCurrentChange(val) {
			this.filter.pageNum = val;
			this.setRequestUrl();
		},
		handleSizeChange(val) {
			this.filter.pageSize = val;
			this.setRequestUrl();
		},
	},

	created() {
		// 有 id 拿 id
		if (this.$route.query.id) {
			// 有 template判断活动模板
			this.filter.adPlacementId = Number(this.$route.query.id);
			this.advertising.code = this.$route.query.code;
			this.advertising.name = this.$route.query.name;
			this.advertising.location = this.$route.query.location;
			this.getList();
		}
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
.title-resole {
	padding: 20px 0;
}
.bg-purple span {
	color: #666;
}
.page-tips {
	padding: 12px 0 0;
	font-size: 12px;
	color: #999;
	line-height: 20px;
}
.hide .el-upload--picture-card {
	display: none;
}
</style>
