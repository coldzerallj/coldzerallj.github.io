<template>
	<view class="tablety">
		<view class="page-order-return">
			<view class="module">
				<view class="module-header">运营主体类型</view>
				<view class="module-input">
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange('operating', $event)" :value="form.bizSubjectType" :range="operatingList">
							<view v-if="form.bizSubjectType === ''" class="input-select">
								请选择
								<text class="iconfont iconjiantou"></text>
							</view>
							<view v-else class="input-select-in">
								{{ operatingList[form.bizSubjectType] }}
								<text class="iconfont iconjiantou"></text>
							</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<!--必填 营业执照/登记证书 显示页面 -->
		<view v-show="form.bizSubjectType !== '0' && form.bizSubjectType !== ''">
			<infoCell title="营业执照编号" v-model="form.licenceCode" :isDisabled="false" :isLink="false" placeholder="营业执照编号"></infoCell>
			<infoCell title="商户名称" v-model="form.merchantName" :isDisabled="false" :isLink="false" placeholder="商户名称"></infoCell>
			<infoCell
				title="经营者/法定代表人"
				v-model="form.legalPerson"
				:isDisabled="false"
				:isLink="false"
				placeholder="请输入经营者/法定代表人"
			></infoCell>
			<infoCell
				title="注册地址（选填）"
				v-model="form.registeredAddr"
				:isDisabled="false"
				:isLink="false"
				placeholder="请输入注册地址（选填）"
			></infoCell>
			<view class="module-time">
				<view class="time-box">
					<view class="time-title">营业期限</view>
					<view class="choose-time">
						<view class="start-time">
							<picker mode="date" :value="form.timeStart" :start="startDate" :end="endDate" @change="bindTimeChange($event, 'timeStart')">
								<view class="time-input">
									<text class="iconfont iconjiantou"></text>
									<input disabled type="text" :value="form.timeStart" placeholder="开始时间" />
								</view>
							</picker>
						</view>
						<view class="time-middle"> — </view>
						<view class="end-time">
							<picker mode="date" :value="form.timeEnd" :start="startDate" :end="endDate" @change="bindTimeChange($event, 'timeEnd')">
								<view class="time-input">
									<text class="iconfont iconjiantou"></text>
									<input disabled type="text" :value="form.timeEnd" placeholder="结束时间" />
								</view>
							</picker>
						</view>
						<!-- 长期 -->
						<view class="ontime" @tap="onTime('timeEnd')">长期</view>
					</view>
				</view>
			</view>
			<view class="line"></view>
			<view class="up-image">
				<view class="up-image-box">
					<view class="up-image-title">营业执照</view>
					<view class="up-image-tip">图片字迹清晰，便于确认，扫描件为佳。</view>
					<certificate :imageURL="form.licencePic" @transmitImage="transmitImage($event, 'licencePic')"></certificate>
				</view>
				<view class="up-image-box">
					<view class="up-image-title">食品经营许可证（选填）</view>
					<view class="up-image-tip">图片字迹清晰，便于确认，扫描件为佳。</view>
					<certificate :imageURL="form.foodSafetyLicensePic" @transmitImage="transmitImage($event, 'foodSafetyLicensePic')"></certificate>
				</view>
			</view>
		</view>
		<view class="page-order-return" v-show="form.bizSubjectType !== '' && form.bizSubjectType === '2'">
			<view class="module">
				<view class="module-header">证书类型</view>
				<view class="module-input">
					<view class="uni-list-cell-db">
						<view class="input-select-disable">
							{{ certificateList[form.certificateType] }}
							<text class=""></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 组织机构代码书 -->
		<view v-show="form.licenceCode.length == 15 && form.bizSubjectType === '2'">
			<infoCell title="组织机构代码" v-model="form.organCode" :isDisabled="false" :isLink="false" placeholder="组织机构代码"></infoCell>
			<view class="module-time">
				<view class="time-box">
					<view class="time-title">有效期</view>
					<view class="choose-time">
						<view class="start-time">
							<picker mode="date" :value="form.timeStartT" :start="startDate" :end="endDate" @change="bindTimeChange($event, 'timeStartT')">
								<view class="time-input">
									<text class="iconfont iconjiantou"></text>
									<input disabled type="text" :value="form.timeStartT" placeholder="开始时间" />
								</view>
							</picker>
						</view>
						<view class="time-middle"> — </view>
						<view class="end-time">
							<picker mode="date" :value="form.timeEndT" :start="startDate" :end="endDate" @change="bindTimeChange($event, 'timeEndT')">
								<view class="time-input">
									<text class="iconfont iconjiantou"></text>
									<input disabled type="text" :value="form.timeEndT" placeholder="结束时间" />
								</view>
							</picker>
						</view>
						<!-- 长期 -->
						<view class="ontime" @tap="onTime('timeEndT')">长期</view>
					</view>
				</view>
			</view>

			<view class="up-image">
				<view class="up-image-box">
					<view class="up-image-title">组织机构代码证</view>
					<view class="up-image-tip">图片字迹清晰，便于确认，扫描件为佳。</view>
					<certificate :imageURL="form.organCodePic" @transmitImage="transmitImage($event, 'organCodePic')"></certificate>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import infoCell from '../info-cell.vue';
import certificate from '../certificate.vue';
export default {
	components: {
		infoCell,
		certificate,
	},
	props: {
		formData: {},
		isred: {
			type: String,
			default: '0',
		},
	},
	data() {
		return {
			formExit: false,
			operatingList: ['小微商户（无营业执照的小微商户）', '个体户（有营业执照的个体经营者）', '企业（经营方为企业，已开通了对公账户）'],
			certificateList: ['', '营业执照', '营业执照（统一社会信用代码）'],
			form: {
				bizSubjectType: '', //  运营类型
				certificateType: 0, //  证书类型
				time: '', //  时间选择

				//  营业执照
				licenceCode: '', //  营业执照编号
				merchantName: '', //  商户名称
				legalPerson: '', // 经营者/法定代表人(营业执照)
				registeredAddr: '', // 注册地址（选填）
				businessTerm: '', //  营业期限（参数）
				licencePic: '', // 营业执照图片
				foodSafetyLicensePic: '', // 食品许可证 //  组织食品许可证
				timeStart: '', //  营业期限
				timeEnd: '', //  营业期限
				// 组织机构
				organizationName: '', // 机构名称
				organCode: '', // 组织机构代码

				representative: '', // 经营者/法定代表人（组织机构）
				// registeredAddr: '', // 注册地址（选填）
				organCodePic: '', //  组织机构代码证

				organTerm: '', //  组织机构证期限。有结束效期证件：yyyy-MM-dd,yyyy-MM-dd;长期证件：yyyy-MM-dd,长期
				termValidity: '', //  有效期（占位，时间）
				timeStartT: '', // 机构代码证有效期
				timeEndT: '', // 机构代码证有效期
			},
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		},
	},
	watch: {
		formData(value) {
			if (!this.formExit && this.isred === '1') {
				this.formExit = true;
				this.form = value;
				if (!this.form.timeStart) {
					this.$set(this.form, 'timeStart', '');
					this.$set(this.form, 'timeEnd', '');
				}
				if (!this.form.timeStartT) {
					this.$set(this.form, 'timeStartT', '');
					this.$set(this.form, 'timeEndT', '');
				}
			}
		},
		form: {
			handler(newdata, olddata) {
				// console.log('xxxx', newdata.licenceCode.length, olddata.licenceCode.length);
				if (newdata.licenceCode.length === 15) {
					this.form.certificateType = 1;
				}
				if (newdata.licenceCode.length === 18) {
					this.form.certificateType = 2;
				}
			},
			deep: true,
		},
	},
	methods: {
		// 营业类型/组织机构
		bindPickerChange: function (type, e) {
			const that = this;
			switch (type) {
				case 'operating':
					that.form.bizSubjectType = String(e.target.value);
					break;
				case 'certificate':
					that.form.certificateType = String(e.target.value);
			}
			// console.log(
			// 	type,
			// 	e.target.value,
			// 	typeof that.form.bizSubjectType,
			// 	'that.form.bizSubjectType=',
			// 	that.form.bizSubjectType,
			// 	typeof that.form.certificateType,
			// 	'that.form.certificateType=',
			// 	that.form.certificateType,
			// );
		},
		// 时间选择
		bindTimeChange: function (e, type) {
			this.form[type] = e.target.value;
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 20;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		//  长期时间
		onTime(type) {
			this.form[type] = '长期';
			// console.log('长期', this.form);
		},
		// 图片url
		transmitImage(getData, type) {
			// console.log('getData', type, getData);
			this.form[type] = getData[0];
		},
	},
};
</script>
<style scoped lang="scss">
// .tablety {
// 	padding: 32rpx;
// }
.page-order-return {
	// margin: 100rpx 0;
	// background: pink;
	// background: #f5f5f5;
	// padding: 24rpx 32rpx;
	.module {
		// margin: 0 0 24rpx;
		height: 184rpx;
	}
	.module-header {
		height: 40rpx;
		font-size: 28rpx;
		font-weight: 500;
		padding-bottom: 16rpx;
		color: rgba(97, 107, 128, 1);
		line-height: 40rpx;
	}
	.module-input {
		height: 45rpx;
		.iconjiantou {
			float: right;
			padding-right: 37rpx;
		}
		.input-select {
			color: #c9ced6;
			font-size: 32rpx;
			border: 1px solid #eee;
			border: none;
			border-bottom: 1px solid #eceff5;
			height: 70rpx;
		}
		.input-select-in {
			color: $uni-text-color-black;
			font-size: 32rpx;
			border: 1px solid #eee;
			border: none;
			border-bottom: 1px solid #eceff5;
			height: 70rpx;
		}
		.input-select-disable {
			color: $uni-text-color-black;
			font-size: 32rpx;
			border: 1px solid #eee;
			border: none;
			border-bottom: 1px solid #eceff5;
			height: 70rpx;
		}
		.placeholder {
			// padding-left: 32rpx;
			// padding-top: 16rpx;
			// padding-bottom: 18rpx;
			color: #c9ced6;
			border: 1px solid #eee;
			border-top: none;
			border-radius: 10rpx;
		}
	}
	.input-textarea {
		background: #fff;
		width: 100%;
		border: 1px solid #eee;
		box-sizing: border-box;
		border-radius: 10rpx;
		min-height: 200rpx;
		padding: 16rpx;
		.uni-textarea-textarea {
			width: 100%;
		}
	}
	.uni-form-item {
		background: #fff;
		padding: 0;
		.title {
			width: 140rpx;
			padding: 20rpx 16rpx;
		}

		.uni-input {
			padding: 14rpx;
		}
	}
	.module-button {
		padding: $uni-spacing-lg 0;
	}
	.button-upload {
		background: #fff;
		width: 200rpx;
		height: 200rpx;
		font-size: 90rpx;
		line-height: 200rpx;
		text-align: center;
		border: 1px solid #eee;
		color: #999;
	}
	.module-image {
		display: flex;
		flex-wrap: wrap;
		.item {
			width: 1/3 * 100%;
			max-width: 1/3 * 100%;
			min-width: 1/3 * 100%;
			padding: 0 10rpx 20rpx;
			box-sizing: border-box;
		}
		.media-object {
			width: 100%;
		}
	}
}
// 上传图片

.up-image {
	color: #616b80;
	font-size: 28rpx;
	margin-top: 32rpx;
	.up-image-title {
		padding: 6rpx 0;
		font-size: 28rpx;
	}
	.up-image-tip {
		padding: 6rpx 0;
		padding-bottom: 24rpx;
		color: #99a0ad;
		font-size: 20rpx;
	}
	.up-image-box {
		padding-bottom: 40rpx;
	}
}
.module-image {
	@include clearfix();

	.item {
		border-radius: 10rpx;
		@include rounded($uni-border-radius-lg);
		float: left;
		position: relative;
		padding-top: 30%;
		width: 30%;
		margin-right: 5%;
		margin-top: $uni-spacing-base;
		box-sizing: border-box;
		overflow: hidden;

		&:nth-child(3n) {
			margin-right: 0;
		}

		.del-img {
			$delBtnSize: 48rpx;
			position: absolute;
			z-index: 2;
			top: -$delBtnSize/4;
			right: -$delBtnSize/4;
			width: $delBtnSize;
			height: $delBtnSize;
			@include rounded($uni-border-radius-lg);
			background-image: $icon-shutdown-thin;
			background-position: left 10rpx bottom 10rpx;
			background-color: rgba(0, 0, 0, 0.6);
			background-repeat: no-repeat;
			background-size: 35%;
		}

		.reset-img {
			position: absolute;
			z-index: 2;
			width: 100%;
			bottom: 0;
			left: 0;
			height: 54rpx;
			line-height: 54rpx;
			font-size: 24rpx;
			color: #fff;
			text-align: center;
			background-color: rgba(0, 0, 0, 0.6);
		}
	}
}
.module-header-secondary {
	padding-top: $uni-spacing-sm;
	color: #99a0ad;
	font-size: $uni-font-size-sm;
}
.media-object {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	max-width: 100%;
	height: 100% !important;
}
.button-upload {
	background-color: rgb(236, 236, 236);

	> span {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -53%);
		font-size: 90rpx;
		color: #999;
	}
}
// 上传图片

// 时间区间

.module-time {
	height: 184rpx;
	.time-box {
		// padding: 32rpx;
		margin-top: 24rpx;
		background-color: #fff;
	}
	.time-title {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(97, 107, 128, 1);
		line-height: 40rpx;
	}
	.choose-time {
		display: flex;
		padding-top: 16rpx;

		.time-input {
			// text-align: center;
			font-size: 32rpx;
			width: 234rpx;
			padding-bottom: 17rpx;
			border-bottom: 2rpx solid #eceff5;
		}
	}
	.time-middle {
		margin: 0 32rpx;
		font-size: 36rpx;
		font-weight: 400;
		color: rgba(97, 107, 128, 1);
		line-height: 50rpx;
	}
	.iconjiantou {
		float: right;
		color: #c9ced6;
		// padding-right: 37rpx;
		transform: rotate(90deg);
		padding-top: 10rpx;
	}
	.ontime {
		font-size: 28rpx;
		padding-left: 50rpx;
	}
}
// 分隔线
.line {
	height: 24rpx;
	width: 800rpx;
	background: #f5f7fa;
	position: relative;
	top: 0;
	left: -40rpx;
}
</style>
