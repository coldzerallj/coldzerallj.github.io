<template>
	<section>
		<!-- filter -->
		<el-form label-position="top" label-width="auto" :model="filter" :class="'custom-el-form'">
			<el-row>
				<el-col :md="12" :lg="6">
					<el-form-item :label="$t('dian-pu-ming-cheng')">
						<el-input v-model="filter.storeFullName" />
					</el-form-item>
				</el-col>
				<el-col :md="6" :lg="6">
					<el-form-item :label="$t('dian-pu-id')">
						<el-input v-model="filter.tenantId" />
					</el-form-item>
				</el-col>
				<el-col :md="6" :lg="6">
					<el-form-item :label="$t('yun-ying-zhu-ti-lei-xing')">
						<el-select v-model="filter.bizSubjectType" :class="'block-select'">
							<el-option v-for="item in bizSubjectType" :key="item.code" :label="item.label" :value="item.code" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :md="6" :lg="6">
					<div class="custom-filter-btns-wrap if-el-form-item__label-none">
						<el-button type="default" icon="el-icon-refresh-left" @click="resetList" />
						<el-button type="primary" @click="getList">{{ $t('sou-suo') }}</el-button>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="6" :lg="6">
					<el-form-item :label="$t('xian-xia-shou-kuan')">
						<el-select v-model="filter.offlineCollection" :class="'block-select'">
							<el-option v-for="item in offlineCollection" :key="item.code" :label="item.label" :value="item.code" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :md="6" :lg="6">
					<el-form-item :label="$t('pu-wei-hao')">
						<el-input v-model="filter.shopNo" />
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>

		<!-- 收款二维码弹窗 -->
		<el-dialog title="收款二维码" :visible.sync="dialogVisible" width="720px" :append-to-body="true">
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
		</el-dialog>

		<!-- 收款二维码弹窗 -->

		<!-- table -->
		<!-- <section-table
			:url="table.url"
			:topBtns="table.topBtns"
			:thead="table.thead"
			:tbody="table.tbody"
			:tbtn="table.tbtn"
			:myBaseUrl="table.myBaseUrl"
			@clickBtn="clickBtn"
			@tbtnClick="tbtnClick"
			ref="sectionTable"
		/> -->
		<el-table v-loading="loading" :data="table.tbody" style="width: 100%">
			<el-table-column v-for="(item, index) in table.thead" :key="index" :prop="item.prop" :label="item.label"> </el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
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
		<!-- 添加子商户弹窗 -->
		<el-dialog :title="$t('shou-kuan-she-zhi')" :visible.sync="dialogAdd" :append-to-body="true" width="600px">
			<div class="tab-button">
				<div class="item" :class="{ active: index == curIndex }" v-for="(item, index) in tabList" :key="index" @click="handleTab(index)">
					{{ item }}
				</div>
			</div>
			<!-- 线下收款设置 -->
			<div class="module-form" v-show="curIndex === 0">
				<el-form ref="form" :model="addForm" label-width="150px" label-position="left">
					<el-form-item label="店铺名称"> <el-input v-model="addForm.storeFullName" :disabled="true"></el-input> </el-form-item
				></el-form>
				<el-form ref="form" :model="addForm" label-width="150px" label-position="left">
					<el-form-item label="店铺ID"> <el-input v-model="addForm.tenantId" :disabled="true"></el-input> </el-form-item
				></el-form>
				<!-- <el-form ref="form" :model="addForm" label-width="150px" label-position="left">
					<el-form-item label="二级商户号"> <el-input v-model="addForm.subMerchantNo" :disabled="true"></el-input> </el-form-item
				></el-form> -->
				<!-- <el-form ref="form" :model="addForm" label-width="150px" label-position="left">
					<el-form-item label="联系电话"> <el-input v-model="addForm.shopContactNo" :disabled="true"></el-input> </el-form-item
				></el-form> -->
				<el-form ref="form" :model="addForm" label-width="150px" label-position="left">
					<el-form-item label="经营者姓名"> <el-input v-model="addForm.legalPerson" :disabled="true"></el-input> </el-form-item
				></el-form>
				<el-form ref="form" :model="addForm" label-width="150px" label-position="left">
					<el-form-item label="线下收款">
						<el-radio v-model="addForm.offlineCollection" label="1">开通</el-radio> <el-radio v-model="addForm.offlineCollection" label="0">关闭</el-radio>
					</el-form-item></el-form
				>
				<el-form ref="form" :model="addForm" label-width="150px" label-position="left">
					<el-form-item label="分帐比例">
						<el-input v-model="addForm.offlineShareRatio" type="Number"><template slot="append">%</template></el-input>
						<div class="fenzhang-tips">*大于等于0 ，小于30</div>
						<div class="fenzhang-tips">*精确至小数点1位</div></el-form-item
					>
				</el-form>
				<el-form ref="form" :model="addForm" label-width="150px" label-position="left">
					<el-form-item class="offline" label="优惠券成本分摊方式">
						<el-select class="el-select" v-model="addForm.offlineAllocType" placeholder="请选择" width="150px">
							<el-option v-for="item in apportionmentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<el-input v-if="addForm.offlineAllocType !== '3'" class="apport" v-model="addForm.offlineCostAlloc" type="Number">
							<template slot="append">元</template></el-input
						>
						<span v-show="addForm.offlineAllocType == '3'">平台承担</span>
						<el-input
							v-show="addForm.offlineAllocType == '3'"
							class="isApport"
							v-model="addForm.offlinePlatform"
							onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
							maxlength="3"
						>
							<template slot="append">%</template></el-input
						>
						<span class="Apportspan" v-show="addForm.offlineAllocType == '3'">商家承担</span>
						<el-input v-show="addForm.offlineAllocType == '3'" class="isApport" v-model="addForm.offlineMerchants" type="Number">
							<template slot="append">%</template></el-input
						>
					</el-form-item>
					<div v-show="addForm.offlineAllocType !== '3'" class="offlin-div">
						<span v-show="(addForm.offlineAllocType == '1') | (addForm.offlineAllocType == '2')" class="offlin-span">分摊说明：</span>
						<p v-show="addForm.offlineAllocType == '1'" class="offlin-p">
							每个消费者用了10元，还是20元的券，平台承担固定（如2元）成本，其余由商家承担； 如优惠券的面值低于该金额，则全部成本由平台承担。
						</p>
						<p v-show="addForm.offlineAllocType == '2'" class="offlin-p">
							每个消费者用了10元，还是20元的券，商家承担固定（如2元）成本，其余由平台承担； 如优惠券的面值低于该金额，则全部成本由商家承担。
						</p>
					</div>
				</el-form>
				<el-form ref="form" :model="addForm" label-width="150px">
					<el-form-item class="text-tip" label="备注（选填）"> <el-input type="textarea" v-model="addForm.offlineComment"></el-input> </el-form-item
				></el-form>
			</div>
			<!-- 线下收款设置 -->
			<!-- 线上收款设置 -->
			<div class="module-form" v-show="curIndex === 1">
				<el-form ref="form" :model="addForm" label-width="150px" label-position="left">
					<el-form-item label="店铺名称"> <el-input v-model="addForm.storeFullName" :disabled="true"></el-input> </el-form-item
				></el-form>
				<el-form ref="form" :model="addForm" label-width="150px" label-position="left">
					<el-form-item label="店铺ID"> <el-input v-model="addForm.tenantId" :disabled="true"></el-input> </el-form-item
				></el-form>
				<el-form ref="form" :model="addForm" label-width="150px" label-position="left">
					<el-form-item label="经营者姓名"> <el-input v-model="addForm.legalPerson" :disabled="true"></el-input> </el-form-item
				></el-form>
				<el-form ref="form" :model="addForm" label-width="150px" label-position="left">
					<el-form-item label="分帐比例">
						<el-input :disabled="true" value="0" type="Number"><template slot="append">%</template></el-input>
					</el-form-item>
				</el-form>
				<el-form ref="form" :model="addForm" label-width="150px" label-position="left">
					<el-form-item class="offline" label="优惠券成本分摊方式">
						<el-select class="el-select" v-model="addForm.onlineAllocType" placeholder="请选择" width="100px">
							<el-option v-for="item in apportionmentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<el-input v-if="addForm.onlineAllocType !== '3'" class="apport" v-model="addForm.onlineCostAlloc" type="Number">
							<template slot="append">元</template></el-input
						>
						<span v-show="addForm.onlineAllocType == '3'">平台承担</span>
						<el-input
							v-show="addForm.onlineAllocType == '3'"
							class="isApport"
							v-model="addForm.onlinePlatform"
							onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
							maxlength="3"
						>
							<template slot="append">%</template></el-input
						>
						<span class="Apportspan" v-show="addForm.onlineAllocType == '3'">商家承担</span>
						<el-input v-show="addForm.onlineAllocType == '3'" class="isApport" v-model="addForm.onlineMerchants" type="Number">
							<template slot="append">%</template></el-input
						>
					</el-form-item>
					<div v-show="addForm.onlineAllocType !== '3'" class="offlin-div">
						<span v-show="(addForm.onlineAllocType == '1') | (addForm.onlineAllocType == '2')" class="offlin-span">分摊说明：</span>
						<p v-show="addForm.onlineAllocType == '1'" class="offlin-p">
							每个消费者用了10元，还是20元的券，平台承担固定（如2元）成本，其余由商家承担； 如优惠券的面值低于该金额，则全部成本由平台承担。
						</p>
						<p v-show="addForm.onlineAllocType == '2'" class="offlin-p">
							每个消费者用了10元，还是20元的券，商家承担固定（如2元）成本，其余由平台承担； 如优惠券的面值低于该金额，则全部成本由商家承担。
						</p>
					</div>
				</el-form>
			</div>
			<!-- 线上收款设置 -->

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogAdd = false">关 闭</el-button>
				<el-button type="primary" @click="handleSureAdd">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 添加子商户弹窗 -->
	</section>
</template>

<script>
import vueQr from 'vue-qr';
import store from '@STORE';
import api from '@API';
import {
	DATA_MODIFY,
	DATA_ADDITION,
	// CHARGE_DRAFT
} from '@HELPER/const';
export default {
	components: {
		vueQr,
	},
	data() {
		return {
			loading: false,
			addForm: {
				storeFullName: '',
				id: '',
				// subMerchantNo: '',
				// shopContactNo: '',
				legalPerson: '',
				offlineCollection: '',
				offlineShareRatio: '',
				offlineComment: '',
				bizCategoryJson: '',
				shopNo: '',
				offlineLink: '',
				applyStatus: '',
				tenantId: '',
				// 线上分摊
				offlineAllocType: '', // 1平台 2商家 3按比例
				offlineCostAlloc: '', // 1/2
				offlinePlatform: 0, // 3
				offlineMerchants: 0, // 3
				// 线上分账
				onlineCollection: false,
				onlineAllocType: '', // 1平台 2商家 3按比例
				onlineCostAlloc: '', // 1/2
				onlinePlatform: 0, // 3
				onlineMerchants: 0, // 3
				onlineShareRatio: 0,
				onlineComment: '',
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
			breadcrumb: [],
			filter: {
				tenantId: '',
				shopNo: '',
				storeFullName: '',
				bizSubjectType: '',
				offlineCollection: '',
				pageSize: 10,
				pageNum: 1,
			},
			totalSize: 0,
			bizSubjectType: [
				{
					label: '全部',
					code: '',
				},
				{
					label: '小微商户',
					code: '1',
				},
				{
					label: '个体户',
					code: '2',
				},
				{
					label: '企业',
					code: '3',
				},
			],
			offlineCollection: [
				{
					label: '全部',
					code: '',
				},
				{
					label: '开通',
					code: '1',
				},
				{
					label: '关闭',
					code: '0',
				},
			],
			table: {
				myBaseUrl: 'pay',
				url: '',
				// 列表头按钮
				topBtns: [
					// {
					// 	btn: this.$t('tian-jia-zi-shang-hu'),
					// 	type: 'warning',
					// },
				],
				thead: [
					{
						prop: `tenantId`,
						label: this.$t('dian-pu-id'),
						fixWidth: `140`,
					},
					{
						prop: `storeFullName`,
						label: this.$t('dian-pu-ming-cheng'),
						fixWidth: `140`,
					},
					{
						prop: `subMerchantNo`,
						label: this.$t('er-ji-shang-hu-hao'),
						fixWidth: `140`,
					},
					{
						prop: `shopContactNo`,
						label: this.$t('lian-xi-dian-hua'),
						fixWidth: `140`,
					},
					{
						prop: `legalPerson`,
						label: this.$t('jing-ying-zhe-xing-ming'),
						fixWidth: `140`,
					},
					{
						prop: `bizCategoryJson`,
						label: this.$t('jing-ying-pin-lei'),
						fixWidth: `140`,
					},
					{
						prop: `storeCode`,
						label: this.$t('pu-wei-hao'),
						fixWidth: `140`,
					},
					{
						prop: `offlineCollection`,
						label: this.$t('xian-xia-shou-kuan'),
						fixWidth: `140`,
					},
					{
						prop: `offlineShareRatio`,
						label: '线下分账比例',
						fixWidth: `140`,
					},
					{
						prop: `offlineCost`,
						label: this.$t('you-hui-quan-cheng-ben-fen-tan-xian-shang'),
						fixWidth: `140`,
					},
					{
						prop: `onlineCost`,
						label: this.$t('you-hui-quan-cheng-ben-fen-tan-xian-xia'),
						fixWidth: `140`,
					},
					{
						prop: `offlineComment`,
						label: this.$t('bei-zhu-xin-xi'),
					},
				],
				tbody: [],
				tbtn: [
					{
						prop: this.$t('she-zhi'),
						icon: 'el-icon-setting',
						type: 'success',
					},
					{
						prop: this.$t('shou-kuan-er-wei-ma'),
						icon: 'el-icon-picture-outline',
						type: 'success',
					},
				],
			},
			tabList: ['线下收款设置', '线上收款设置'],
			curIndex: 0,
			apportionmentList: [
				{ value: '1', label: '平台承担固定成本' },
				{ value: '2', label: '商家承担固定成本' },
				{ value: '3', label: '按比例分摊' },
			],
			onlineAllocType: '',
			offlineAllocType: '',
		};
	},
	watch: {
		'addForm.offlinePlatform'(value) {
			if (value) {
				if (value * 1 > 100 || value * 1 < 0) {
					this.$message.error('比例区间为，大于等于0小于等于100');
					this.addForm.offlinePlatform = 0;
					this.addForm.offlineMerchants = 0;
				} else {
					this.addForm.offlineMerchants = 100 - value * 1;
				}
			}
		},
		'addForm.onlinePlatform'(value) {
			// console.log('addForm.onlinePlatform', value);
			if (value) {
				if (value * 1 > 100 || value * 1 < 0) {
					this.$message.error('比例区间为，大于等于0小于等于100');
					this.addForm.onlinePlatform = 0;
					this.addForm.onlineMerchants = 0;
				} else {
					this.addForm.onlineMerchants = 100 - value * 1;
				}
			}
		},
	},

	methods: {
		// canvans画二维码
		handleDrawImage(dataUrl, id) {
			const myCanvas = document.querySelector('#codeCanvas');
			// console.log(myCanvas, dataUrl);
			const ctx = myCanvas.getContext('2d');
			ctx.rect(0, 0, 680, 756);
			ctx.fillStyle = '#fff';
			ctx.fill();
			const img = new Image();
			img.src = dataUrl;
			img.onload = () => {
				ctx.drawImage(img, 116, 120);
			};

			ctx.textAlign = 'center'; // 文字居中
			ctx.fillStyle = '#252525';
			ctx.font = '600 35px PingFangSC-Medium';
			ctx.fillText(this.codeData.codeName, 340, 86);
			ctx.fillStyle = '#616B80';
			ctx.font = '27px PingFangSC-Medium';
			ctx.fillText('微信支付', 366, 680);
			const img2 = new Image();
			img2.src = this.codeData.wechatImg;
			img2.onload = () => {
				ctx.drawImage(img2, 260, 650);
			};
			setTimeout(() => {
				this.codeData.imgUrl = myCanvas.toDataURL('image/png');
			}, 10);
		},
		// 列表请求 url + 当前参数
		async setRequestUrl() {
			this.loading = true;
			const resData = await api.collectionManagement.getStoreList(this.filter);
			const data = JSON.parse(JSON.stringify(resData.data));
			data.map(item => {
				// 线下收款转义
				if (item.offlineCollection) {
					item.offlineCollection = '开通';
				} else {
					item.offlineCollection = '关闭';
				}
				// 经营品类转义
				if (item.bizCategoryJson !== '') {
					const bizCategory = [];
					JSON.parse(item.bizCategoryJson).map(category => {
						bizCategory.push(category.name);
					});
					item.bizCategoryJson = bizCategory.join(',');
				}
				// 比例添加 %
				if (item.offlineShareRatio || item.offlineShareRatio === 0) {
					item.offlineShareRatio = `${item.offlineShareRatio} %`;
				}
				// 线下分摊类型，取值
				if (item.offlineAllocType === '3') {
					item.offlineCost = `平台承担${item.offlineCostAlloc}%`;
				} else if (item.offlineAllocType === '2') {
					item.offlineCost = `商家承担${item.offlineCostAlloc}元/张券`;
				} else if (item.offlineAllocType === '1') {
					item.offlineCost = `平台承担${item.offlineCostAlloc}元/张券`;
				} else {
					item.offlineCost = '——';
				}

				// 线上分摊类型，取值
				if (item.onlineAllocType === '3') {
					item.onlineCost = `平台承担${item.onlineCostAlloc}%`;
				} else if (item.onlineAllocType === '2') {
					item.onlineCost = `商家承担${item.onlineCostAlloc}元/张券`;
				} else if (item.onlineAllocType === '1') {
					item.onlineCost = `平台承担${item.onlineCostAlloc}元/张券`;
				} else {
					item.onlineCost = '——';
				}
			});
			this.table.tbody = data;
			this.totalSize = Number(resData.totalSize);
			this.loading = false;
		},

		// 列表请求
		getList() {
			this.filter.pageNum = 1;
			this.setRequestUrl();
		},

		async handleSureAdd() {
			// const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			const percentReg = /^\d+(\.\d{1})?$/;
			// if (this.addForm.storeName === '') {
			// 	this.$message.error('请填写子商户名称');
			// 	return false;
			// }
			// if (this.addForm.storeAliasNo === '') {
			// 	this.$message.error('请填写子商户铺位号');
			// 	return false;
			// }
			// if (this.addForm.contactPhone === '') {
			// 	this.$message.error('请填写联系电话');
			// 	return false;
			// }
			// if (!myreg.test(this.addForm.contactPhone)) {
			// 	this.$message.error('请输入正确的联系电话');
			// 	return false;
			// }
			// if (this.addForm.contactName === '') {
			// 	this.$message.error('请填写经办人');
			// 	return false;
			// }
			// if (this.addForm.rate === '') {
			// 	this.$message.error('请填写分账比例');
			// 	return false;
			// }
			if (this.addForm.offlineAllocType !== '') {
				if (this.addForm.offlineAllocType === '3' && this.addForm.offlinePlatform === '') {
					this.$message.error('请填写正确的线下分摊方式和分摊比例');
					return false;
				} else if (this.addForm.offlineCostAlloc === '' || this.addForm.offlineCostAlloc * 1 < 0) {
					this.$message.error('请填写正确的线下分摊费用,不能为负数,不能为空');
					return false;
				}
			}
			if (this.addForm.onlineAllocType !== '') {
				if (this.addForm.onlineAllocType === '3' && this.addForm.onlinePlatform === '') {
					this.$message.error('请填写正确的线上分摊方式和分摊比例');
					return false;
				} else if (this.addForm.onlineCostAlloc === '' || this.addForm.onlineCostAlloc * 1 < 0) {
					this.$message.error('请填写正确的线上分摊费用,不能为负数,不能为空');
					return false;
				}
			}
			if (!percentReg.test(this.addForm.offlineShareRatio)) {
				this.$message.error('请填写正确的分账比例');
				return false;
			}
			if (this.addForm.offlineShareRatio * 1 > 29.9) {
				this.$message.error('分帐比例不能大于30%');
				return false;
			}
			const loading = this.$loading({
				lock: true,
				text: '提交中',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0)',
			});
			setTimeout(() => {
				loading.close();
			}, 1000);

			this.addForm.offlineShareRatio = Number(this.addForm.offlineShareRatio);
			this.addForm.offlineCollection = this.addForm.offlineCollection === '1' ? 'true' : 'false';

			// 线下分摊类型，取值 offlineAllocType/onlineAllocType // 1平台平摊 2商家平摊 3按比例
			if (this.addForm.offlineAllocType === '3') {
				this.addForm.offlineCostAlloc = this.addForm.offlinePlatform;
			}
			// 线上分摊类型，取值
			if (this.addForm.onlineAllocType === '3') {
				this.addForm.onlineCostAlloc = this.addForm.onlinePlatform;
			}

			// 提交的数据
			const resData = await api.collectionManagement.addMerchantStore(this.addForm);
			if (resData.clientMessage === '成功') {
				this.$message.success('操作成功');
				this.setRequestUrl();
				this.dialogAdd = false;
				this.addForm = {};
			} else if (resData.clientMessage === '失败') {
				this.$message.error(resData.message);
			}
		},
		// 重置列表
		resetList() {
			this.filter = {
				tenantId: '',
				shopNo: '',
				storeFullName: '',
				bizSubjectType: '',
				offlineCollection: '',
				pageSize: 10,
				pageNum: 1,
			};
			this.getList();
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
		// 表格行内按钮点击判断
		async tbtnClick(index, row, prop) {
			const parmas = { tenantId: row.tenantId, id: row.id };
			// const parmas = { tenantId: 22, id: 1 };
			const loading = this.$loading({
				lock: true,
				text: '加载中',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0)',
			});
			switch (prop) {
				// eslint-disable-next-line no-case-declarations
				case this.$t('shou-kuan-er-wei-ma'):
					if (!row.offlineLink) {
						const codeRes = await api.collectionManagement.getDetail(parmas);
						const resData = await api.collectionManagement.getCodeUrl(codeRes.data);
						if (resData.code !== 200) {
							this.$message.error(resData.message);
						} else {
							this.codeData.codeName = row.storeFullName;
							this.codeData.url = resData.data;
							this.setRequestUrl();
							this.dialogVisible = true;
						}
					} else {
						this.codeData.codeName = row.storeFullName;
						this.codeData.url = row.offlineLink;
						this.dialogVisible = true;
					}
					setTimeout(() => {
						loading.close();
					}, 1000);

					break;
				//  表格内-设置按钮
				// eslint-disable-next-line no-case-declarations
				case this.$t('she-zhi'):
					const res = await api.collectionManagement.getDetail(parmas);
					const dataset = JSON.parse(JSON.stringify(res.data));
					if (dataset.offlineCollection) {
						dataset.offlineCollection = '1';
					} else {
						dataset.offlineCollection = '0';
					}
					setTimeout(() => {
						loading.close();
					}, 1000);

					// 线上分摊比例 1,平台 2，商家 3，按比例
					if (dataset.onlineAllocType === '3') {
						dataset.onlinePlatform = dataset.onlineCostAlloc;
						dataset.onlineCostAlloc = 0;
					} else {
						dataset.onlinePlatform = '';
					}
					// 线下分摊比例
					if (dataset.offlineAllocType === '3') {
						dataset.offlinePlatform = dataset.offlineCostAlloc;
						dataset.offlineCostAlloc = 0;
					} else {
						dataset.offlinePlatform = '';
					}
					this.addForm = dataset;
					this.dialogAdd = true;
					break;
				default:
			}
		},
		handleTab(index) {
			this.curIndex = index;
		},

		// 表格顶部按钮点击判断
		// async clickBtn(type) {
		// 	// 按钮点击 type 判断按钮类型
		// 	switch (type) {
		// 		case this.$t('tian-jia-zi-shang-hu'):
		// 			this.addForm = {
		// 				contactName: '',
		// 				contactPhone: '',
		// 				remark: '',
		// 				storeAliasNo: '',
		// 				storeName: '',
		// 				rate: '15',
		// 			};
		// 			this.dialogAdd = true;
		// 			break;
		// 		default:
		// 	}
		// },

		// 初始化面包屑
		initBreadcrumb() {
			this.breadcrumb = [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_COLLECTION_MANAGEMENT_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_SUB_MERCHANTS_LABEL,
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
		// this.handle();
	},
};
</script>
<style scoped lang="scss">
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
.module-form >>> .el-input.is-disabled .el-input__inner {
	background: #fff;
	color: #606266;
}
.module-form >>> .el-input {
	width: 80% !important;
}
.tab-button {
	background: #fff;
	display: flex;
	padding: 0 0px 40px;

	.item {
		position: relative;
		font-size: 15px;
		width: 90px;
		margin-right: 60px;
		&.active {
			color: #02a7f0;
			&:after {
				content: '';
				position: absolute;
				bottom: 0px;
				top: 25px;
				left: 16px;
				height: 2px;
				width: 100%;
				margin-left: -16px;
				background-color: #02a7f0;
			}
		}
	}
}
.apport {
	width: 245px;
}
.isApport {
	width: 185px;
}
.apports {
	display: inline-block;
}
.apportList {
	display: inline-block;
	width: 100%;
}
.el-select {
	width: 160px;
}
.Apportspan {
	margin-left: 164px;
}
.offline {
	margin: 0;
}
.offlin-div {
	margin-top: 10px;
	.offlin-p {
		margin: 0;
		font-size: 8px;
		padding: 2px 4px;
		text-indent: 20px;
	}
	.offlin-span {
		padding-left: 4px;
	}
}
.text-tip {
	margin-top: 25px;
}
</style>
