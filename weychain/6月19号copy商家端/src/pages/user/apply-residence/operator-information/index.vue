<template>
	<view class="table">
		<!-- 步骤条 -->
		<view class="step">
			<view class="step-header"><view class="boxnumber1">1</view> <view class="step-line"></view><view class="boxnumber2">2</view></view>
			<view class="step-realName"> <view class="box-name1">店铺信息</view> <view class="box-name2">经营者信息</view> </view>
		</view>
		<!-- 分隔线 -->
		<view class="line"></view>
		<view class="page-order-return">
			<view class="module">
				<view class="module-header">经营者/法人证件类型</view>
				<view class="module-input">
					<view class="uni-list-cell-db">
						<picker
							:disabled="isPicker"
							@change="bindPickerChange('documentType', $event)"
							:value="form.certificateType"
							:range="documentTypeList"
						>
							<view v-if="form.certificateType === ''" class="input-select">
								请选择
								<text class="iconfont iconjiantou"></text>
							</view>
							<view v-else class="input-select-in">
								{{ documentTypeList[form.certificateType] }}
								<text class="iconfont iconjiantou"></text>
							</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<!-- 身份证信息 -->
		<view class="operator-idCardNo" v-show="form.certificateType === '0'">
			<infoCell title="姓名" v-model="form.realName" :isDisabled="false" :isLink="false" placeholder="请输入名字"></infoCell>
			<infoCell title="身份证号" v-model="form.idCardNo" :isDisabled="false" :isLink="false" placeholder="请输入身份证号"></infoCell>
			<view class="module-time">
				<view class="time-box">
					<view class="time-title">身份证有效期</view>
					<view class="choose-time">
						<view class="start-time">
							<picker
								mode="date"
								:value="form.idCardStartDate"
								:start="startDate"
								:end="endDate"
								@change="bindTimeChange($event, 'idCardStartDate')"
							>
								<view class="time-input">
									<text class="iconfont iconjiantou"></text>
									<input disabled type="text" :value="form.idCardStartDate" placeholder="开始时间" />
								</view>
							</picker>
						</view>
						<view class="time-middle"> 至 </view>
						<view class="end-time">
							<picker
								mode="date"
								:value="form.idCardEndDate"
								:start="startDate"
								:end="endDate"
								@change="bindTimeChange($event, 'idCardEndDate')"
							>
								<view class="time-input">
									<text class="iconfont iconjiantou"></text>
									<input disabled type="text" :value="form.idCardEndDate" placeholder="结束时间" />
								</view>
							</picker>
						</view>
						<!-- 长期 -->
						<view class="ontime" @tap="onTime('idCardEndDate')">长期</view>
					</view>
				</view>
			</view>
			<view class="shop-add-photo">
				<view class="photo-title">身份证照片</view>
				<view class="trames">
					<view class="trames-photo">
						<certificate
							title="店铺图片"
							ref="trames"
							:imageURL="form.idCardBackPic"
							@transmitImage="transmitImage($event, 'idCardBackPic')"
						>
						</certificate>
						<view class="fooltip">身份照片（人像）</view>
					</view>
					<view class="trames-photo">
						<certificate
							title="店铺图片"
							ref="trames"
							:imageURL="form.idCardFrontPic"
							@transmitImage="transmitImage($event, 'idCardFrontPic')"
						></certificate>
						<view class="fooltip">身份照片（国徽）</view>
					</view>
				</view>
			</view>
			<view class="shop-add-photo">
				<view class="photo-title">健康证（选填）</view>
				<view class="photo-title-tip">图片字迹清晰，便于确认，扫描件为佳。</view>
				<view class="trames">
					<view class="trames-photo">
						<certificate
							title="店铺图片"
							ref="trames"
							:imageURL="form.certificatePic"
							@transmitImage="transmitImage($event, 'certificatePic')"
						>
						</certificate>
					</view>
				</view>
			</view>
		</view>
		<!-- 证件类型非身份证 -->
		<view class="operator-unCard" v-show="form.certificateType !== '' && form.certificateType !== '0'">
			<infoCell title="姓名" v-model="form.realName" :isDisabled="false" :isLink="false" placeholder="请输入名字"></infoCell>
			<infoCell title="证件号" v-model="form.idCardNo" :isDisabled="false" :isLink="false" placeholder="请输入身份证号"></infoCell>
			<view class="module-time">
				<view class="time-box">
					<view class="time-title">证件结束日期</view>
					<view class="choose-time">
						<view class="end-time">
							<picker
								mode="date"
								:value="form.idCardEndDate"
								:start="startDate"
								:end="endDate"
								@change="bindTimeChange($event, 'idCardEndDate')"
							>
								<view class="time-input">
									<text class="iconfont iconjiantou"></text>
									<input disabled type="text" :value="form.idCardEndDate" placeholder="结束时间" />
								</view>
							</picker>
						</view>
						<!-- 长期 -->
						<view class="ontime" @tap="onTime('idCardEndDate')">长期</view>
					</view>
				</view>
			</view>
			<view class="shop-add-photo">
				<view class="photo-title">证件照片</view>
				<view class="trames">
					<view class="trames-photo">
						<certificate ref="trames" :imageURL="form.certificatePic" @transmitImage="transmitImage($event, 'certificatePic')">
						</certificate>
					</view>
				</view>
			</view>
		</view>

		<!-- 超级管理员类型 -->
		<view class="super-order">
			<view class="module">
				<view class="module-header">超级管理员类型</view>
				<view class="module-input">
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange('adminType', $event)" :value="form.superAdminType" :range="administratorTypeList">
							<view v-if="form.superAdminType === ''" class="input-select">
								请选择
								<text class="iconfont iconjiantou"></text>
							</view>
							<view v-else class="input-select-in">
								{{ administratorTypeList[form.superAdminType] }}
								<text class="iconfont iconjiantou"></text>
							</view>
						</picker>
					</view>
				</view>
				<view class="module-tip">温馨提示：资金账户开通之后，超级管理员将获得资金账户的全部管理权限</view>
			</view>
		</view>
		<view class="super-table">
			<infoCell title="超级管理员姓名" v-model="form.superAdminName" :isDisabled="false" :isLink="false" placeholder="请输入超级管理员姓名">
			</infoCell>
			<infoCell
				title="超级管理员身份证号码"
				v-model="form.superAdminCardNo"
				:isDisabled="false"
				:isLink="false"
				placeholder="请输入超级管理员身份证号码"
			></infoCell>
			<infoCell
				title="超级管理员手机号"
				v-model="form.superAdminMobile"
				:isDisabled="false"
				:isLink="false"
				placeholder="请输入超级管理员手机号"
			></infoCell>
			<infoCell
				title="超级管理员邮箱"
				v-model="form.superAdminEmail"
				:isDisabled="false"
				:isLink="false"
				placeholder="请输入超级管理员邮箱"
			></infoCell>
		</view>
		<view class="buttombg">
			<view class="fornext"> <button type="main" class="toButtom" @tap="submit">提交</button></view>
		</view>
	</view>
</template>
<script>
import infoCell from '../info-cell.vue';
import certificate from '../certificate.vue';
import { mallBusinessLicenseEenter, managerInfo } from '@/api/apply-residence.js';
export default {
	components: {
		infoCell,
		certificate,
	},
	data() {
		return {
			documentTypeList: [
				'中国大陆居民-身份证',
				'其他国家或地区居民-护照',
				'中国香港居民–来往内地通行证',
				'中国澳门居民–来往内地通行证',
				'中国台湾居民–来往大陆通行证',
			],
			administratorTypeList: ['法定代表人/经营者(有营业执照个体经营者)', '负责人(由法人/经营者委派的负责人)'],
			isPicker: false,
			form: {
				certificateType: '', //  证件类型
				superAdminType: '', //  super管理员类型
				// 身份证类型
				realName: '', //  姓名  //  其它姓名
				idCardNo: '', //  身份证  //  其它证件号
				idCardStartDate: '', //  有效期起
				idCardEndDate: '', //  有效期止
				idCardFrontPic: '', //  身份证正面
				idCardBackPic: '', //  身份证背面
				// 其它证件类型
				idCardEndDateType: '', //  证件到期日类型 1、具体时间；2、长期
				certificatePic: '', //  证件照片  证件图片
				// super管理员
				superAdminName: '', //  超级管理员名字
				superAdminCardNo: '', //  超级管理员身份证
				superAdminMobile: '', //  超级管理员手机
				superAdminEmail: '', //  超级管理员邮箱
			},
		};
	},
	onLoad(options) {
		const that = this;
		const formData = JSON.parse(uni.getStorageSync('formData'));
		// console.log('form', formData);
		if (formData.bizSubjectType === '0') {
			that.form.certificateType = '0';
			that.isPicker = true;
		}
		// 接口
		if (options.type === '1') {
			managerInfo().then((res) => {
				if (res.code === 200) {
					const { data } = res;
					this.form = data;
					// 经营者  //  证件类型
					this.form.certificateType = String(data.certificateType - 1);
					this.form.superAdminType = String(data.superAdminType - 1);
					// console.log('经营者详情', data);

					// this.storePlace = this.storeInfo.province + ' ' + this.storeInfo.city + ' ' + this.storeInfo.district;
				} else {
					uni.showToast({
						title: res.message,
						duration: 1000,
					});
				}
			});
		}
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		},
	},
	methods: {
		bindPickerChange(type, e) {
			const that = this;
			switch (type) {
				case 'documentType':
					that.form.certificateType = String(e.target.value);
					break;
				case 'adminType':
					that.form.superAdminType = String(e.target.value);
					break;
			}
			// console.log('当前值', that.form.certificateType, typeof that.form.certificateType);
		},
		// 上传图片
		transmitImage(getData, type) {
			// console.log('getData', type, getData);
			this.form[type] = getData[0];
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
		// 时间长期
		onTime(type) {
			this.form[type] = '长期';
			// console.log('长期', this.form);
		},
		// 提交商家认证资料
		submit() {
			// const shoped = JSON.parse(uni.getStorageSync('formData'));
			const parmsData = { mallBusinessStoreInfoDTO: JSON.parse(uni.getStorageSync('formData')) };
			if (this.verify()) {
				//  身份证时间
				if (this.form.certificateType !== '0') {
					this.form.idCardStartDate = '';
					this.form.idCardEndDate = this.form.idCardEndDate === '长期' ? '' : this.form.idCardEndDate;
				} else {
					this.form.idCardEndDate = this.form.idCardEndDate === '长期' ? '' : this.form.idCardEndDate;
				}
				parmsData.mallBusinessStoreManagerInfoDTO = this.form;
				// 商铺信息
				// 证书类别
				parmsData.mallBusinessStoreInfoDTO.certificateType = parmsData.mallBusinessStoreInfoDTO.certificateType * 1 + 1;
				// 运营主体类型
				parmsData.mallBusinessStoreInfoDTO.bizSubjectType = parmsData.mallBusinessStoreInfoDTO.bizSubjectType * 1 + 1;
				// 经营者信息
				// 超级管理员类型
				parmsData.mallBusinessStoreManagerInfoDTO.superAdminType = parmsData.mallBusinessStoreManagerInfoDTO.superAdminType * 1 + 1;
				// 证件类型
				parmsData.mallBusinessStoreManagerInfoDTO.certificateType = parmsData.mallBusinessStoreManagerInfoDTO.certificateType * 1 + 1;
				// if (parmsData.mallBusinessStoreManagerInfoDTO.idCardEndDate === '长期') {
				// 	parmsData.mallBusinessStoreManagerInfoDTO.idCardEndDate = '';
				// }

				// console.log('提交的参数', parmsData);
				mallBusinessLicenseEenter(parmsData).then((res) => {
					// console.log('maxxxx', res);
					if (res.code === 200) {
						uni.removeStorageSync('formData');
						uni.setStorageSync('status', '2');
						// this.$store.dispatch('user/applyProgress', { applyStatus: 2 });
						uni.switchTab({
							url: '/pages/sale-report/index',
						});
					} else {
						uni.showToast({
							title: res.message,
							duration: 1500,
							icon: 'none',
						});
					}
				});
			}
			// console.log('------');
		},
		// 表单校验
		verify() {
			// 手机格式校验
			const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			//  身份证校验
			const idCardNo = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
			//  校验邮箱
			const Mail = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
			//  中文姓名
			// const nameCN = /^(?:[\u4e00-\u9fa5·]{2,16})$/;
			// 校验有没选择证件类型
			if (!this.form.certificateType) {
				this.formErrorMsg('请填选择证件类型');
				return false;
			} else if (this.form.certificateType === '0') {
				//  身份证校验
				// 校验有没填写姓名
				if (!this.form.realName) {
					this.formErrorMsg('请填写姓名');
					return false;
				}
				// 校验有没填身份证号码
				if (!this.form.idCardNo) {
					this.formErrorMsg('请填写身份证号码');
					return false;
				}
				// 校验有没填正确的身份证号码
				if (!idCardNo.test(this.form.idCardNo)) {
					this.formErrorMsg('请输入正确的身份证');
					return false;
				}
				// // 校验有没填身份证有效期
				if (!this.form.idCardStartDate) {
					this.formErrorMsg('请填写身份证有效期');
					return false;
				}
				//  校验有没选择营业期限
				if (!this.form.idCardStartDate || !this.form.idCardEndDate) {
					this.formErrorMsg('请选择身份证有效期');
					return false;
				}
				if (this.form.idCardStartDate && this.form.idCardEndDate) {
					const startTime = Date.parse(new Date(this.form.idCardStartDate));
					const endTime = Date.parse(new Date(this.form.idCardEndDate));
					const times = (endTime - startTime) / 1000 / 3600 / 24;
					if (times <= 0) {
						this.formErrorMsg('请选择正确的身份证有效期时间');
						return false;
					}
				}
				// 校验有没上传身份证图片(正面照)
				if (!this.form.idCardFrontPic) {
					this.formErrorMsg('请上传身份证图片');
					return false;
				}
				// 校验有没上传身份证图片(背面照)
				if (!this.form.idCardBackPic) {
					this.formErrorMsg('请上传身份证图片');
					return false;
				}
			} else {
				//  证件校验
				// 校验有没填写姓名
				if (!this.form.realName) {
					this.formErrorMsg('请填写证件姓名');
					return false;
				}
				// 校验有没填证件号
				if (!this.form.idCardNo) {
					this.formErrorMsg('请填写证件号');
					return false;
				}
				// 校验有没选择证件结束日期
				if (!this.form.idCardEndDate) {
					this.formErrorMsg('请选择证件结束日期');
					return false;
				}
				// 校验有没上传证件照片
				if (!this.form.certificatePic) {
					this.formErrorMsg('请上传证件照片');
					return false;
				}
			}

			// super管理员
			// 校验有没选择管理员类型
			if (!this.form.superAdminType) {
				this.formErrorMsg('请选择管理员类型');
				return false;
			}
			// 校验有没填写管理员名字
			if (!this.form.superAdminName) {
				this.formErrorMsg('请填写管理员名字');
				return false;
			}
			//  校验中文姓名
			// if (!nameCN.test(this.form.superAdminName)) {
			// 	this.formErrorMsg('请输入中文名字');
			// 	return false;
			// }
			// 校验有没填写管理员身份证
			if (!this.form.superAdminCardNo) {
				this.formErrorMsg('请填写管理员身份证');
				return false;
			}
			// 正确的身份证
			if (!idCardNo.test(this.form.superAdminCardNo)) {
				this.formErrorMsg('请输入正确的管理员身份证');
				return false;
			}
			// 校验有没填写管理员手机
			if (!this.form.superAdminMobile) {
				this.formErrorMsg('请填写管理员手机');
				return false;
			}
			// 校验手机号格式
			if (!myreg.test(this.form.superAdminMobile)) {
				this.formErrorMsg('请输入正确的手机号码');
				return false;
			}
			// 校验有没填写管理员邮箱
			if (!this.form.superAdminEmail) {
				this.formErrorMsg('请填写管理员邮箱');
				return false;
			}
			// 邮箱格式
			if (!Mail.test(this.form.superAdminEmail)) {
				this.formErrorMsg('请输入正确的邮箱地址');
				return false;
			}

			return true;
		},
		formErrorMsg(str) {
			uni.showToast({
				icon: 'none',
				title: str,
				duration: 2000,
			});
		},
	},
};
</script>
<style scoped lang="scss">
// 步骤条
.step {
	background: #fff;
	height: 102rpx;
	.step-header {
		padding-top: 16rpx;
		height: 32rpx;
		display: flex;
		justify-content: center;
		.boxnumber1 {
			font-size: 20rpx;
			color: #fff;
			text-align: center;
			height: 32rpx;
			width: 32rpx;
			border-radius: 50%;
			background: #ff4771;
			float: left;
			margin: 0 125rpx;
		}
		.boxnumber2 {
			font-size: 20rpx;
			color: #fff;
			text-align: center;
			height: 32rpx;
			width: 32rpx;
			border-radius: 50%;
			background: #ff4771;
			float: left;
			margin: 0 125rpx;
		}
	}
	.step-line {
		background: #ff4771;
		border: 1px solid #ff4771;
		width: 248rpx;
		position: absolute;
		left: 252rpx;
		top: 30rpx;
	}
	.step-realName {
		display: flex;
		justify-content: center;
		height: 32rpx;
		.box-name1 {
			height: 32rpx;
			float: left;
			margin: 13rpx 80rpx;
			color: #ff4771;
			font-size: 24rpx;
		}
		.box-name2 {
			height: 32rpx;
			float: left;
			margin: 13rpx 80rpx;
			color: #ff4771;
			font-size: 24rpx;
		}
	}
}
// 分隔线
.line {
	height: 24rpx;
	width: 100%;
	background: #f5f7fa;
}

.operator-idCardNo,
.operator-unCard {
	padding: 0 32rpx;
	background: #fff;
}
// 类型
.page-order-return {
	.module {
		padding: 32rpx;
		height: 120rpx;
		background: #fff;
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
		.placeholder {
			color: #c9ced6;
			border: 1px solid #eee;
			border-top: none;
			border-radius: 10rpx;
		}
	}
}
// 时间区间
.module-time {
	height: 184rpx;
	.time-box {
		// padding: 32rpx;
		margin-top: 32rpx;
		background-color: #fff;
	}
	.time-title {
		padding-top: 18rpx;
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

// 上传图片框
.shop-add-photo {
	display: inline-block;
	height: 346rpx;
	padding-top: 32rpx;
	.photo-title {
		color: #616b80;
		font-size: 28rpx;
		// padding: 16rpx;
		padding-bottom: 12rpx;
	}
	.photo-title-tip {
		font-size: 20rpx;
		color: #99a0ad;
		padding-bottom: 24rpx;
	}
	.trames {
		display: flex;
		// height: 387rpx;
		display: block;
		// float: left;
		width: 100%;
	}
	.trames-photo {
		display: inline-block;
		width: 240rpx;
		margin-right: 0;
	}
	.fooltip {
		margin-top: 16rpx;
		font-size: 20rpx;
		color: #99a0ad;
		text-align: center;
	}
}
// 超级管理员
.super-order {
	height: 238rpx;
	.module {
		padding: 32rpx;
		height: 174rpx;
		background: #fff;
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
		.placeholder {
			color: #c9ced6;
			border: 1px solid #eee;
			border-top: none;
			border-radius: 10rpx;
		}
	}
	.module-tip {
		font-size: 20rpx;
		color: #99a0ad;
		padding-top: 40rpx;
	}
}
// super表单
.super-table {
	padding: 0 32rpx;
	background: $uni-bg-color;
	padding-bottom: 1px;
}
// 提交按钮
.buttombg {
	background: $uni-bg-color;
	.fornext {
		background: $uni-bg-color-othergrey;
		padding-top: 32rpx;
		padding-bottom: 68rpx;
		.toButtom {
			margin: 0 32rpx;
			border-radius: 48rpx;
			height: 96rpx;
		}
	}
}
</style>
