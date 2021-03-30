<template>
	<section>
		<!-- 添加 报名发型活动 -->
		<!-- 表单 -->
		<el-form label-position="top" label-width="auto" :model="form" :class="'custom-el-form'" ref="form" :rules="rules">
			<el-row>
				<el-col :md="16" :lg="10">
					<el-form-item :label="$t('huo-dong-id')" prop="chargeName">
						<el-input value="23" disabled="true" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="16" :lg="10">
					<el-form-item :label="$t('huo-dong-mu-bang')" prop="chargeName">
						<el-input value="23" disabled="true" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="16" :lg="10">
					<el-form-item label="活动场景" prop="chargeName">
						<el-input value="下单付款成功" disabled="true" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="16" :lg="10">
					<el-form-item label="活动名称" prop="chargeName">
						<el-input value="" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="16" :lg="10">
					<el-form-item label="活动日期" prop="chargeName"> </el-form-item>
					<el-row>
						<el-col :md="16" :lg="10"><el-date-picker type="date" placeholder="选择日期"> </el-date-picker></el-col>
						<el-col :md="16" :lg="10"><el-date-picker type="date" placeholder="选择日期"> </el-date-picker></el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="16" :lg="10">
					<el-form-item label="活动时间段" prop="chargeName"> </el-form-item>
					<el-row>
						<el-col :md="16" :lg="10">
							<el-time-picker :picker-options="{ selectableRange: '01:00:00 - 23:59:59' }" placeholder="选择时间"> </el-time-picker>
						</el-col>
						<el-col :md="16" :lg="10">
							<el-time-picker :picker-options="{ selectableRange: '01:00:00 - 23:59:59' }" placeholder="选择时间"> </el-time-picker>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="16" :lg="10">
					<el-form-item label="活动简介">
						<el-input type="textarea" :disabled="formDisabled" maxlength="500" show-word-limit />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="24" :lg="24">
					<el-form-item label="奖励设置" prop="chargeName"> </el-form-item>
					<el-row>
						<el-col :md="6" :lg="6">
							<el-form-item label="奖品类型选择" prop="chargeName">
								<el-select :class="'block-select'">
									<el-option label="优惠劵" value="优惠劵" />
									<el-option label="积分" value="积分" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :md="6" :lg="6">
							<el-form-item label="奖品选择" prop="chargeName">
								<span>xxx50元优惠券</span>
								<el-button type="primary">
									点击选择
								</el-button>
							</el-form-item>
						</el-col>
						<el-col :md="6" :lg="6">
							<el-form-item label="奖励数量" prop="chargeName">
								<el-input value="" type="number" />
							</el-form-item>
						</el-col>
						<el-col :md="6" :lg="6">
							<el-form-item label="优惠券有效期" prop="chargeName"> </el-form-item>
							<el-row>
								<el-col :md="16" :lg="10"><el-date-picker type="date" placeholder="选择优惠券有效期"> </el-date-picker></el-col>
								<el-col :md="16" :lg="10"><el-date-picker type="date" placeholder="选择优惠券有效期"> </el-date-picker></el-col>
							</el-row>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="24" :lg="24">
					<el-form-item label="活动限制" prop="chargeName"> </el-form-item>
					<el-row>
						<el-col :md="8" :lg="8">
							<el-form-item label="总参加次数" prop="chargeName">
								<el-input placeholder="" v-model="input1">
									<template slot="append">
										<span>次/人</span>
										<el-radio label="2">不限制</el-radio>
									</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :md="8" :lg="8">
							<el-form-item label="每天参加次数" prop="chargeName">
								<el-input placeholder="" v-model="input1">
									<template slot="append">
										<span>次/人</span>
										<el-radio label="2">不限制</el-radio>
									</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :md="8" :lg="8">
							<el-form-item label="每月参加次数" prop="chargeName">
								<el-input placeholder="" v-model="input1">
									<template slot="append">
										<span>次/人</span>
										<el-radio label="2">不限制</el-radio>
									</template>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="16" :lg="10">
					<el-form-item label="面向用户群" prop="chargeName">
						<el-select :class="'block-select'">
							<el-option label="消费者端" value="2" />
							<el-option label="商家端" value="1" />
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="16" :lg="10">
					<el-form-item label="封面图片">
						<img src="" alt="封面图片" />
						<el-upload
							class="upload-demo"
							action="https://jsonplaceholder.typicode.com/posts/"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:before-remove="beforeRemove"
							multiple
							:limit="3"
							:on-exceed="handleExceed"
							:file-list="fileList"
						>
							<el-button type="primary">修改</el-button>
							<!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
						</el-upload>
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
	</section>
</template>

<script>
import store from '@STORE';
import api from '@API';
import { DATA_ONLY_READ } from '@HELPER/const';

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
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_SIGN_UP_FORM_LABEL,
				},
			],
			DATA_ONLY_READ,
			toDo: '',
			formDisabled: false,
			form: {
				chargeName: '',
				chargePeriod: '',
				id: '',
			},
			fileList: [],
			rules: {
				chargeName: [
					{
						required: true,
						message: this.$t('qing-shu-ru-zhang-dan-ming-cheng'),
						trigger: 'blur',
					},
				],
				chargePeriod: [
					{
						required: true,
						message: this.$t('qing-xuan-ze-zhang-dan-yue-fen'),
						trigger: 'blur',
					},
				],
			},
		};
	},

	methods: {
		onChange(file, fileList) {
			this.fileList = fileList;
		},

		async submit(formName) {
			const me = this;
			let formReady = false;
			let fileReady = false;

			me.$refs[formName].validate(valid => {
				if (valid) {
					formReady = true;
				} else {
					formReady = false;
				}
			});

			if (me.fileList.length === 0) {
				me.$notify.error({
					title: me.$t('cuo-wu'),
					message: me.$t('qing-shang-chuan-zhang-dan-shu-ju-wen-jian'),
				});
				fileReady = false;
			} else {
				fileReady = true;
			}

			me.fileList.map(file => {
				// 不能超过 2 MB
				if (file.raw.size > 2097152) {
					me.$notify.error({
						title: me.$t('cuo-wu'),
						message: `${me.$t('shang-chuan-de-wen-jian-bu-neng-chao-guo')} 2 MB`,
					});
					fileReady = false;
				}

				// 只能是 xlsx 文件
				if (file.raw.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
					me.$notify.error({
						title: me.$t('cuo-wu'),
						message: `${me.$t('qing-shang-chuan')} xlsx ${me.$t('ge-shi-wen-jian')}`,
					});
					fileReady = false;
				}
			});

			if (formReady && fileReady) {
				store.commit(me.$ALL_CONST.STORE_TYPE.SET_GLOBAL_LOADING, true);
				const params = new FormData();

				me.fileList.map(file => {
					params.append('file', file.raw);
				});

				if (me.form.id) {
					params.append('id', me.form.id);
				}

				params.append('chargeName', me.form.chargeName);
				params.append('chargePeriod', me.form.chargePeriod);

				const res = await api.chargeManagement.importCharge(params);
				if (res.code === 200 && res.message === 'success') {
					store.commit(me.$ALL_CONST.STORE_TYPE.SET_GLOBAL_LOADING, false);
					me.$notify.success({
						title: me.$t('dao-ru-cheng-gong'),
						message: me.$t('zhang-dan-dao-ru-cheng-gong-jiang-fan-hui-zhang-dan-lie-biao'),
					});
					me.$router.push({
						name: me.$ALL_CONST.ROUTE_NAME.RN_CHARGE_LIST_DRAFT,
					});
				} else if (res.code === 30001) {
					store.commit(me.$ALL_CONST.STORE_TYPE.SET_GLOBAL_LOADING, false);
					// 导入有重复
					store.commit(this.$ALL_CONST.STORE_TYPE.SET_MODAL_FILTER, true);
					me.$confirm(`已有 ${me.form.chargePeriod} 的账单，是否合并当前导入的账单，合并后将覆盖重复的旧数据`, me.$t('zhong-fu-zhang-dan'), {
						confirmButtonText: me.$t('shi'),
						cancelButtonText: me.$t('fou'),
						type: 'warning',
					})
						.then(async () => {
							store.commit(me.$ALL_CONST.STORE_TYPE.SET_GLOBAL_LOADING, true);
							// console.log('params', params.entries());
							params.append('cover', true);
							const again = await api.chargeManagement.importCharge(params);
							if (again.code === 200 && again.message === 'success') {
								store.commit(me.$ALL_CONST.STORE_TYPE.SET_GLOBAL_LOADING, false);
								store.commit(this.$ALL_CONST.STORE_TYPE.SET_MODAL_FILTER, false);
								me.$notify.success({
									title: me.$t('dao-ru-cheng-gong'),
									message: me.$t('zhang-dan-dao-ru-cheng-gong-jiang-fan-hui-zhang-dan-lie-biao'),
								});
								me.$router.push({
									name: me.$ALL_CONST.ROUTE_NAME.RN_CHARGE_LIST_DRAFT,
								});
							} else {
								store.commit(me.$ALL_CONST.STORE_TYPE.SET_GLOBAL_LOADING, false);
								store.commit(this.$ALL_CONST.STORE_TYPE.SET_MODAL_FILTER, false);
								me.$notify.error({
									title: me.$t('dao-ru-shi-bai'),
									message: again.data,
								});
							}
						})
						.catch(() => {
							store.commit(this.$ALL_CONST.STORE_TYPE.SET_MODAL_FILTER, false);
							me.$message({
								type: 'info',
								message: me.$t('yi-qu-xiao-dao-ru-zhang-dan'),
							});
						});
				} else {
					store.commit(me.$ALL_CONST.STORE_TYPE.SET_GLOBAL_LOADING, false);
					me.$notify.error({
						title: me.$t('dao-ru-shi-bai'),
						message: res.data,
					});
				}
			}
		},

		// 返回、取消
		goBack() {
			this.$router.push({
				name: this.$route.query.from,
			});
		},

		// 获取账单统计列表
		async getChargeNameAndMonth() {
			const res = await api.chargeManagement.getChargeNameAndMonth(this.form.id);
			if (res.code === 200 && res.message === 'success') {
				this.form.chargeName = res.data.chargeName;
				this.form.chargePeriod = res.data.chargePeriod;
			}
		},
	},

	created() {
		// 进来确定你要什么
		this.toDo = this.$route.query.toDo;

		// 有 id 拿 id
		if (this.$route.query.id) {
			this.form.id = this.$route.query.id;
		}

		// 根据你要做什么，改变界面，获取数据
		// switch (this.toDo) {
		// 	case DATA_MODIFY:
		// 		break;
		// 	case DATA_ADDITION:
		// 		break;
		// 	case DATA_ONLY_READ:
		// 		break;
		// 	default:
		// }

		// 初始化面包屑
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_BREADCRUMB, this.breadcrumb);
		// 暂时关闭 tab 按钮
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB_NEED_OR_NOT, false);
	},

	beforeDestroy() {
		// 重新打开 tab 按钮
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB_NEED_OR_NOT, false);
	},
};
</script>
