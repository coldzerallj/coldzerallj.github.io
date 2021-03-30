<template>
	<section>
		<!-- filter -->
		<el-form label-position="top" label-width="auto" :model="filter" :class="'custom-el-form'">
			<el-row>
				<el-col :md="4" :lg="5">
					<el-form-item :label="$t('yong-hu-ID')">
						<el-input v-model="filter.userId" />
					</el-form-item>
				</el-col>
				<el-col :md="4" :lg="5">
					<el-form-item :label="$t('shou-ji-hao')">
						<el-input v-model="filter.mobile" />
					</el-form-item>
				</el-col>
				<el-col :md="4" :lg="4">
					<el-form-item :label="$t('qi-shou-lei-xin')">
						<el-select v-model="filter.riderType" :class="'block-select'">
							<el-option v-for="item in bizSubjectType" :key="item.code" :label="item.label" :value="item.code" />
						</el-select>
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
		<!-- table -->
		<section-table
			:url="table.url"
			:topBtns="table.topBtns"
			:thead="table.thead"
			:tbody="table.tbody"
			:tbtn="table.tbtn"
			:urlParams="table.urlParams"
			@clickBtn="clickBtn"
			@tbtnClick="tbtnClick"
			ref="sectionTable"
		/>
		<el-dialog title="骑手详情" :visible.sync="riderDetail" :append-to-body="true" width="560px">
			<div class="riderDetail_box">
				<div class="item"><span class="item_title">姓名：</span><span class="item_msg">姓名大大</span></div>
				<div class="item"><span class="item_title">手机号：</span><span class="item_msg">136999369994</span></div>
				<div class="item"><span class="item_title">邮箱：</span><span class="item_msg">xxxxx@163.com</span></div>
				<div class="item"><span class="item_title">身份证编号：</span><span class="item_msg">111233332233331123</span></div>
				<div class="item"><span class="item_title">身份有效期：</span><span class="item_msg">xxxx~xxxxx</span></div>
				<div class="item">
					<span class="item_title">健康证：</span>
					<div class="pic"><img src="" alt="健康证" /></div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="riderDetail = false">取 消 </el-button>
				<!-- <el-button type="primary">确 认 </el-button> -->
			</span>
		</el-dialog>
		<!-- 审核不通过弹窗 -->
		<el-dialog title="填写审核不通过原因" :visible.sync="examine" :append-to-body="true" width="560px">
			<div class="riderDetail_box">
				<el-input type="textarea" placeholder="请输入内容" v-model="examineTextarea" show-word-limit :autosize="{ minRows: 6 }"> </el-input>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="riderDetail = false">取 消 </el-button>
				<el-button type="primary">确 认 </el-button>
			</span>
		</el-dialog>
	</section>

	<!-- 详情弹窗 -->
</template>

<script>
import cookie from 'js-cookie';
import { LOGIN_COOKIE_KEY } from '@HELPER/const';
import store from '@STORE';
import api from '@API';
import { DATA_ADDITION } from '@HELPER/const';

export default {
	data() {
		return {
			DATA_ADDITION,
			breadcrumb: [],
			bizSubjectType: [
				{
					code: '',
					label: '不限',
				},
				{
					code: 1,
					label: '普通骑手',
				},
				{
					code: 2,
					label: '店铺自有骑手',
				},
			],
			filter: {
				mobile: '',
				riderType: '',
				userId: '',
			},
			table: {
				url: '',
				urlParams: {},
				// 列表头按钮
				topBtns: [
					{
						btn: `导出数据`,
						icon: 'el-icon-document-add',
						type: 'primary',
					},
				],
				thead: [
					{
						prop: `userId`,
						label: this.$t('yong-hu-ID'),
					},
					{
						prop: `mobile`,
						label: this.$t('shou-ji-hao'),
					},
					{
						prop: `zhriderType`,
						tprop: 'riderType',
						label: this.$t('qi-shou-lei-xin'),
						change: [
							{
								code: 1,
								label: '普通骑手',
							},
							{
								code: 2,
								label: '店铺自有骑手',
							},
						],
					},
					{
						prop: `realName`,
						label: this.$t('qi-shou-xing-ming'),
					},
					{
						prop: `id`,
						label: this.$t('suo-shu-dian-pu-ID'),
					},
					{
						prop: `applyTime`,
						label: this.$t('shen-qing-shi-jian'),
					},
					{
						prop: `zhapplyStatus`,
						tprop: 'applyStatus',
						label: this.$t('shen-qing-zhaung-tai'),
						change: [
							{
								code: 1,
								label: '未入驻',
							},
							{
								code: 2,
								label: '运营平台待审核',
							},
							{
								code: 3,
								label: '运营平台审核不通过',
							},
							{
								code: 4,
								label: '支付平台待审核',
							},
							{
								code: 5,
								label: '支付平台审核中',
							},
							{
								code: 6,
								label: '支付平台审核不通过',
							},
							{
								code: 7,
								label: '待账户验证',
							},
							{
								code: 8,
								label: '待签约',
							},
							{
								code: 9,
								label: '正常运营',
							},
						],
					},
					{
						prop: `failureReason`,
						label: this.$t('bei-zhu'),
					},
				],
				tbody: [],
				tbtn: [
					// {
					// 	prop: '查看详情',
					// 	icon: 'el-icon-tickets',
					// },
					// {
					// 	prop: '审核通过',
					// 	icon: 'el-icon-success',
					// 	type: 'success',
					// },
					// {
					// 	prop: '审核不通过',
					// 	icon: 'el-icon-error',
					// 	type: 'danger',
					// },
				],
			},
			riderDetail: false,
			examine: false,
			examineTextarea: '',
		};
	},
	watch: {
		examine(n) {
			if (!n) {
				this.examineTextarea = '';
			}
		},
	},
	methods: {
		// 列表请求 url + 当前参数
		setRequestUrl() {
			this.filter.userId ? (this.filter.userId = Number(this.filter.userId)) : '';
			let data = {};
			data = this.filter;
			this.table.urlParams = this.filter;
			this.table.url = api.deliveryManagement.riderApplyList(data);
		},

		// 列表请求
		getList() {
			this.setRequestUrl();
			this.$refs.sectionTable.fetchData(this.table.url);
		},

		// 重置列表
		resetList() {
			this.filter.productName = '';
			this.filter.productId = '';
			this.filter.applyNo = '';
			this.filter.ranger = '';
			this.filter.startPublishTime = '';
			this.filter.endPublishTime = '';
			this.getList();
		},

		// 表格顶部按钮点击判断
		async clickBtn(type) {
			// 按钮点击 type 判断按钮类型
			switch (type) {
				case `导出数据`:
					this.filter.userId ? (this.filter.userId = Number(this.filter.userId)) : '';
					this.exportData();
					break;
				default:
			}
		},
		tbtnClick(index, row, prop) {
			// console.log(index, row, prop);
			switch (prop) {
				case '查看详情':
					this.riderDetail = true;
					break;
				case '审核通过':
					break;
				case '审核不通过':
					this.examine = true;
					break;
				default:
			}
		},
		async exportData() {
			const elink = document.createElement('a');
			elink.download = '';
			elink.style.display = 'none';
			elink.href = `mbs/v1_0_0/boss/mallRider/exportList?X-TOKEN=${cookie.get(LOGIN_COOKIE_KEY)}userId=${this.filter.userId}&mobile=${
				this.filter.mobile
			}&riderType=${this.filter.riderType}`;
			document.body.appendChild(elink);
			elink.click();
			document.body.removeChild(elink);
		},
		// 初始化面包屑
		initBreadcrumb() {
			this.breadcrumb = [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_DELIVERY_MANAGEMENT_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_RIDER_LIST_LABEL,
				},
			];
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_BREADCRUMB, this.breadcrumb);
		},
	},

	created() {
		// 初始化面包屑
		this.initBreadcrumb();
		// 列表请求 url + 当前参数
		this.setRequestUrl();
	},
};
</script>

<style lang="scss" scope>
.riderDetail_box {
	padding: 0 32px;
	.item {
		margin-bottom: 16px;
		.item_title {
			width: 90px;
			display: inline-block;
			font-size: 14px;
			font-weight: 400;
			line-height: 17px;
			color: #354052;
			text-align: right;
		}
		.item_msg {
			display: inline-block;
			font-size: 14px;
			font-weight: 400;
			line-height: 17px;
			color: #7f8fa4;
			margin-left: 24px;
		}
		.pic {
			width: 80%;
			min-height: 180px;
			margin: 16px auto;
			background: #000;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
