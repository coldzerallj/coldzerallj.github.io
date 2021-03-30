<template>
	<section>
		<!-- 表单 -->
		<el-form label-position="top" label-width="auto" :model="form" :class="'custom-el-form'" ref="form" :rules="rules">
			<el-row>
				<el-col :md="16" :lg="10">
					<el-form-item :label="$t('shu-zi-chan-pin-id')" prop="digitalProductId">
						<el-input v-model.trim="form.digitalProductId" :placeholder="$t('dian-ji-you-bian-an-niu-xuan-ze-shu-zi-chan-pin')" readonly>
							<el-button @click="openDialog" slot="append">{{ $t('xuan-ze-shu-zi-chan-pin') }}</el-button>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<template v-if="form.digitalProductId">
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item :label="`${$t('shu-zi-chan-pin')}${$t('ming-cheng')}`">
							<el-input v-model.trim="form.digitalProductName" disabled />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item :label="`${$t('shu-zi-chan-pin')}${$t('mian-zhi')}`">
							<el-input v-model.trim="form.digitalProductValue" disabled>
								<template slot="append">{{ $t('yuan') }}</template>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item :label="`${$t('shu-zi-chan-pin')}${$t('zui-shao-xiao-fei-jin-e')}`">
							<el-input v-model.trim="form.digitalProductMinimumConsumption" disabled>
								<template slot="append">{{ $t('yuan') }}</template>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</template>
			<el-row>
				<el-col :md="16" :lg="10">
					<el-form-item :label="$t('fa-hang-shu-liang')" prop="issueQty">
						<el-input v-model.trim="form.issueQty" :disabled="formDisabled" :placeholder="$t('you-hui-quan-de-fa-hang-shu-liang')" type="text" v-decimals />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="16" :lg="10">
					<el-form-item :label="$t('you-hui-quan-mo-ren-you-xiao-qi')" prop="ranger">
						<el-date-picker
							v-model="form.ranger"
							type="daterange"
							:range-separator="$t('zhi')"
							:start-placeholder="$t('sheng-xiao-ri-qi')"
							:end-placeholder="$t('jie-zhi-ri-qi')"
							value-format="yyyy-MM-dd"
							:picker-options="pickerOptions"
						/>
					</el-form-item>
					<div class="custom-tips-in-form">
						优惠券默认生效日期大于等于今天；发放<span class="warning">（注意：你当前处于申请发行阶段，不是发放阶段）</span>
						优惠券时，可另外设置优惠券有效期，建议将截止日期设置大一些；有效期需要大于等于券的默认有效期；
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="16" :lg="10">
					<el-form-item :label="$t('fa-hang-shuo-ming')">
						<el-input
							type="textarea"
							v-model.trim="form.remark"
							:disabled="formDisabled"
							:placeholder="$t('yong-yu-shuo-ming-ben-ci-fa-hang-you-hui-quan-de-yuan-yin-huo-bei-jing')"
						/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="16" :lg="10">
					<div class="custom-form-btns-wrap">
						<el-button type="primary" @click="submit('form')" v-if="toDo !== DATA_ONLY_READ">
							{{ $t('que-ren-ti-jiao') }}
						</el-button>
						<el-button type="default" @click="goBack">
							<template v-if="toDo === DATA_ONLY_READ">{{ $t('fan-hui') }}</template>
							<template v-else>{{ $t('qu-xiao') }}</template>
						</el-button>
					</div>
				</el-col>
			</el-row>
		</el-form>
		<!-- dialog -->
		<el-dialog
			:title="`${$t('xuan-ze-shu-zi-chan-pin')}${$t('zhi-xian-shi-shang-jia-zhong-de-shu-zi-chan-pin')}`"
			:visible.sync="dialogVisible"
			:append-to-body="true"
			width="90%"
			@close="closeDialog"
		>
			<!-- table -->
			<section-table
				:fixedClass="'radio-table'"
				:url="table.url"
				:thead="table.thead"
				:tbody="table.tbody"
				ref="sectionTable"
				:needSingleSelection="true"
				@filterData="filterData"
				highlight-current-row
				@handleSingleSelection="handleSingleSelection"
			/>
		</el-dialog>
	</section>
</template>

<script>
import store from '@STORE';
import api from '@API';
import { DATA_ONLY_READ, DATA_ACTION_LIST, DIGITAL_PRODUCT_STATUS_LIST } from '@HELPER/const';

export default {
	data() {
		// 校验发行数量
		const checkIssueQty = (rule, value, callback) => {
			if (!value) {
				return callback(new Error(this.$t('qing-shu-ru-fa-hang-shu-liang')));
			}
			setTimeout(() => {
				if (!Number.isInteger(Number(value))) {
					callback(new Error(this.$t('qing-shu-ru-zheng-zheng-shu')));
				} else {
					if (Number(value) <= 0) {
						callback(new Error(this.$t('you-hui-quan-mian-zhi-bi-xu-da-yu-0')));
					} else {
						callback();
					}
				}
			}, 0);
		};
		return {
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() < Date.now() - 8.64e7;
				},
			},
			DATA_ONLY_READ,
			DIGITAL_PRODUCT_STATUS_LIST,
			toDo: '',
			breadcrumb: [],
			formDisabled: false,
			form: {
				digitalProductId: '',
				digitalProductName: '',
				digitalProductValue: '',
				digitalProductMinimumConsumption: '',
				digitalProductType: '',
				issueQty: '',
				ranger: [],
				remark: '',
			},
			rules: {
				digitalProductId: [
					{
						required: true,
						message: this.$t('qing-xuan-ze-yi-ge-shu-zi-chan-pin'),
						trigger: 'blur',
					},
				],
				issueQty: [
					{
						required: true,
						validator: checkIssueQty,
						trigger: 'blur',
					},
				],
				ranger: [
					{
						required: true,
						message: this.$t('qing-shu-ru-you-hui-quan-you-xiao-qi'),
						trigger: 'blur',
					},
				],
			},
			dialogVisible: false,
			table: {
				url: '',
				thead: [
					{
						prop: `id`,
						label: this.$t('shu-zi-chan-pin-id'),
					},
					{
						prop: `productName`,
						label: this.$t('shu-zi-chan-pin-ming-cheng'),
					},
					{
						prop: `zhProductValue`,
						label: this.$t('you-hui-quan-mian-zhi'),
					},
					{
						prop: `effectiveDays`,
						label: `${this.$t('mo-ren-you-xiao-qi')}(${this.$t('tian')})`,
					},
					{
						prop: `pubOrgType`,
						label: this.$t('fa-quan-ji-gou-lei-xing'),
					},
					{
						prop: `pubOrgName`,
						label: this.$t('fa-quan-ji-gou-ming-cheng'),
					},
					{
						prop: `suitStore`,
						label: this.$t('shi-yong-dian-pu'),
					},
					{
						prop: `suitGoods`,
						label: this.$t('shi-yong-shang-pin'),
					},
					{
						prop: `zhMinAmount`,
						label: this.$t('zui-xiao-xiao-fei-jin-e'),
					},
					{
						prop: `remark`,
						label: this.$t('bei-zhu'),
					},
				],
				tbody: [],
			},
		};
	},

	methods: {
		// 接口请求完筛选数据
		filterData() {
			this.$refs['sectionTable'].table.tbody.map(item => {
				item.zhProductValue = '￥' + item.productValue;
				item.zhMinAmount = '￥' + item.minAmount;
			});
		},
		// 单选 - 选中列表项
		handleSingleSelection(val) {
			this.form.digitalProductId = val.id;
			this.form.digitalProductName = val.productName;
			this.form.digitalProductValue = val.productValue;
			this.form.digitalProductMinimumConsumption = val.minAmount;
			this.form.digitalProductType = val.productType;
			this.closeDialog();
		},

		// 列表请求 url + 当前参数
		setRequestUrl() {
			this.table.url = api.couponManagement.getDigitalProductListForCouponIssueForm();
		},

		// 列表请求
		async getList() {
			this.setRequestUrl();
			await this.$refs.sectionTable.fetchData(this.table.url);
		},

		// 提交
		async submit(formName) {
			const me = this;

			me.$refs[formName].validate(async valid => {
				if (valid) {
					store.commit(me.$ALL_CONST.STORE_TYPE.SET_GLOBAL_LOADING, true);

					const params = {
						productId: Number(this.form.digitalProductId),
						productName: this.form.digitalProductName,
						productValue: this.form.digitalProductValue,
						productType: this.form.digitalProductType,
						minAmount: this.form.digitalProductMinimumConsumption,
						publishNum: Number(this.form.issueQty),
						startTime: this.form.ranger && this.form.ranger.length > 0 ? this.form.ranger[0] : '',
						endTime: this.form.ranger && this.form.ranger.length > 0 ? this.form.ranger[1] : '',
						publishRemark: this.form.remark,
					};

					const res = await api.couponManagement.addCouponIssue(params);
					if (res.code === 200 && res.message === 'success') {
						store.commit(me.$ALL_CONST.STORE_TYPE.SET_GLOBAL_LOADING, false);
						me.$notify.success({
							title: `${DATA_ACTION_LIST[this.toDo]}${me.$t('cheng-gong')}`,
							// eslint-disable-next-line prettier/prettier
							message: `${me.$t('cheng-gong')}${DATA_ACTION_LIST[this.toDo]}${this.$t('fa-hang-shen-qing')}，${me.$t('jiang-fan-hui')}${me.$t(
								'you-hui-quan-fa-hang',
							)}${me.$t('guan-li')}`,
						});
						me.$router.push({
							name: me.$ALL_CONST.ROUTE_NAME.RN_COUPON_ISSUE_MANAGEMENT,
						});
					} else {
						store.commit(me.$ALL_CONST.STORE_TYPE.SET_GLOBAL_LOADING, false);
						me.$notify.error({
							title: `${DATA_ACTION_LIST[this.toDo]}${me.$t('shi-bai')}`,
							message: res.data,
						});
					}
				} else {
					return;
				}
			});
		},

		// 打开对话框
		openDialog() {
			this.getList();
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_MODAL_FILTER, true);
			this.dialogVisible = true;
		},

		// 关闭对话框
		closeDialog() {
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_MODAL_FILTER, false);
			this.dialogVisible = false;
		},

		// 返回、取消
		goBack() {
			this.$router.push({
				name: this.$route.query.from,
			});
		},

		// 初始化面包屑
		initBreadcrumb() {
			this.breadcrumb = [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_COUPON_MANAGEMENT_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_COUPON_ISSUE_MANAGEMENT_LABEL,
				},
				{
					label: `${DATA_ACTION_LIST[this.toDo]}${this.$ALL_CONST.ROUTE_NAME.RN_COUPON_ISSUE_FORM_LABEL}`,
				},
			];
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_BREADCRUMB, this.breadcrumb);
		},

		// 初始化 default panel 的 tab 按钮 / true 开启 / false 关闭
		initDefaultPanelTabNeedOrNot(params = false) {
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB_NEED_OR_NOT, params);
		},
	},

	created() {
		// 进来确定你要什么
		this.toDo = this.$route.query.toDo;

		// 初始化面包屑
		this.initBreadcrumb();
		// 初始化 default panel 的 tab 按钮 / true 开启 / false 关闭
		this.initDefaultPanelTabNeedOrNot();
	},

	beforeDestroy() {
		// 初始化 default panel 的 tab 按钮 / true 开启 / false 关闭
		this.initDefaultPanelTabNeedOrNot(true);
	},
};
</script>
