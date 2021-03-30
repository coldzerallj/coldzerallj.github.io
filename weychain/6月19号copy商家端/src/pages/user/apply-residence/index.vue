<template>
	<view class="shoping">
		<view class="step">
			<view class="step-header"><view class="boxnumber1">1</view><view class="step-line"></view> <view class="boxnumber2">2</view></view>
			<view class="step-name"> <view class="box-name1">店铺信息</view> <view class="box-name2">经营者信息</view> </view>
		</view>
		<view class="line"></view>
		<!-- <view class="table"> -->
		<view class="shop">
			<infoCell title="店铺全称" v-model="form.storeFullName" :isDisabled="false" :isLink="false" placeholder="请输入店铺全称"></infoCell>
			<infoCell
				title="店铺（商户）简称"
				v-model="form.storeShortName"
				:isDisabled="false"
				:isLink="false"
				placeholder="请输入店铺（商户）简称"
			></infoCell>
			<!-- <infoCell title="经营品类" v-model="bizTypeIds" :isDisabled="false" :isLink="false" placeholder="经营品类"></infoCell> -->
			<view @tap="handleSelectCategory">
				<infoCell
					:title="'经营品类'"
					v-model="form.bizCategoryJson"
					:isDisabled="true"
					:isLink="true"
					:isShowMore="true"
					placeholder="请选择经营品类"
				/>
			</view>
			<!-- 选择品类组件 -->
			<uniPopup ref="popupCategory" type="bottom" class="popup-category">
				<popupCategory @confirm="handleConfirmCategory"></popupCategory>
			</uniPopup>
			<!-- 选择品类组件 -->

			<view class="module">
				<view class="module-header">
					店铺简介
					<span class="sub">（选填）</span>
				</view>
				<view class="module-input">
					<span :class="['textarea-length-verify', form.storeBriefDesc.length == 300 ? 'full' : '']">
						<span class="textarea-length-verify-text" v-if="form.storeBriefDesc.length == 300">（最多输入 300 个字符）</span>
						{{ form.storeBriefDesc.length }} / 300
					</span>
					<textarea
						:class="['input-textarea', form.storeBriefDesc.length > 0 ? 'has-value' : '']"
						maxlength="300"
						placeholder="输入简介"
						auto-height
						v-model="form.storeBriefDesc"
						placeholder-class="uni-input-placeholder"
					/>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="shop-add">
			<infoCell title="店铺所在地" v-model="regionZips" :isDisabled="true" :isLink="false" placeholder="请输入店铺所在地"></infoCell>
			<infoCell
				title="店铺详细地址"
				v-model="form.addressDetail"
				:isDisabled="false"
				:isLink="false"
				placeholder="请输入店铺详细地址"
			></infoCell>
			<!-- 店铺铺位号选择 -->
			<view class="shopId" v-for="(item, index) in form.storeCodeList" :key="index">
				<view class="shop-add-title">店铺铺位号</view>
				<view class="shop-del">
					<span v-if="index !== 0" class="shop-del-icon" @tap="onDel(index)">
						<!-- <text class="iconfont iconjiantou"></text> -->
					</span>
				</view>
				<view class="shop-model">
					<view
						@tap="handleToSearch(index)"
						class="shop-view"
						:class="item !== '' ? 'isValue' : ''"
						type="text"
						placeholder="请选择铺位号"
						>{{ item !== '' ? item : '请选择铺位号' }}</view
					>
					<text class="iconfont iconjiantou"></text>
				</view>
			</view>
			<view class="shop-add-icon">
				<span class @tap="onAdd">+添加铺位</span>
			</view>
			<infoCell
				title="店铺联系电话"
				v-model="form.shopContactNo"
				:isDisabled="false"
				:isLink="false"
				placeholder="请输入店铺联系电话"
			></infoCell>
			<view class="shop-add-photo">
				<view class="photo-title">店铺图片</view>
				<view class="trames">
					<view class="trames-photo">
						<certificate title="店铺图片" ref="trames" :imageURL="form.storeImg1" @transmitImage="transmitImage($event, 'storeImg1')">
						</certificate>
						<view class="fooltip">正面照片（门头照）</view>
					</view>
					<view class="trames-photo">
						<certificate
							title="店铺图片"
							ref="trames"
							:imageURL="form.storeImg2"
							@transmitImage="transmitImage($event, 'storeImg2')"
						></certificate>
						<view class="fooltip">其他照片（选填）</view>
					</view>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="shop-type">
			<shopType ref="shopType" :formData="form" :isred="reaplyType"></shopType>
		</view>
		<!-- </view> -->
		<view class="fornext"> <button type="main" class="toButtom" @tap="toNext">下一步</button></view>
	</view>
</template>
<script>
import shopType from './shop-type/shop-type.vue';
import infoCell from './info-cell.vue';
import popupCategory from './popup-category.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import certificate from './certificate.vue';
import { mallBusinessInfo } from '@/api/apply-residence.js';

export default {
	components: { shopType, infoCell, uniPopup, popupCategory, certificate },
	data() {
		return {
			regionZips: '吉林省 吉林市 昌邑区', //  格式： 省份邮编,城市邮编,地区邮编
			items: [''],
			form: {
				storeFullName: '', //  店铺全称
				storeShortName: '', //  商铺简称
				bizCategory: '', // 经营品类1
				bizCategoryJson: '', //  经营品类
				storeBriefDesc: '', //  店铺简介
				province: '吉林省',
				city: '吉林市',
				district: '昌邑区',

				addressDetail: '', //  店铺详细地址
				shopNo: '', //  店铺编号，铺位号
				storeCodeList: [''],
				shopContactNo: '', //  店铺联系电话
				shopPic: '', //  店铺图片

				storeImg1: '', //  店铺照片（门头照）
				storeImg2: '', //  店铺照片（选填）
				//  经营类型字段
			},
			shopTypeData: {},
			reaplyType: '',
		};
	},
	onShow(e) {
		const that = this;
		// 选择的铺位号
		// eslint-disable-next-line no-undef
		const pages = getCurrentPages();
		const currPage = pages[pages.length - 1];
		// console.log(currPage.data, 'currPage.data');
		if (currPage.data.shopNoId) {
			that.form.storeCodeList.splice(currPage.data.idex, 1, currPage.data.shopNoId);
		}
	},
	onLoad(options) {
		this.reaplyType = options.type;
		const that = this;
		if (uni.getStorageSync('formData')) {
			const formOld = JSON.parse(uni.getStorageSync('formData'));
			that.form = formOld;
		} else {
			// console.log('jiekou');
			if (options.type === '1') {
				mallBusinessInfo().then((res) => {
					// console.log('qingqiule ');
					if (res.code === 200) {
						const { data } = res;
						this.form = data;
						// 店铺详情图片
						this.form.storeImg1 = data.shopPic.split(',')[0];
						this.form.storeImg2 = data.shopPic.split(',')[1] ? data.shopPic.split(',')[1] : '';
						// 运营主体类型
						this.form.bizSubjectType = String(data.bizSubjectType - 1);
						// 证书类型
						this.form.certificateType = data.certificateType - 1;
						// 运营期限
						if (data.bizSubjectType !== '0') {
							this.form.timeStart = data.businessTerm.split(',')[0];
							this.form.timeEnd = data.businessTerm.split(',')[1];
						}
						if (data.bizSubjectType === '2' && data.certificateType === 1) {
							this.form.timeStartT = data.organTerm.split(',')[0];
							this.form.timeEndT = data.organTerm.split(',')[1];
						}
					} else {
						uni.showToast({
							title: res.message,
							duration: 1000,
						});
					}
				});
			}
		}
	},
	methods: {
		// 经营品类
		handleSelectCategory() {
			this.$refs.popupCategory.open();
		},
		// 上传图片
		transmitImage(getData, type) {
			// console.log('getData', type, getData);
			this.form[type] = getData[0];
		},
		handleConfirmCategory(data) {
			this.form.bizCategoryJson = JSON.stringify(data);
			this.form.bizCategory = JSON.stringify(data);
			this.$refs.popupCategory.close();
		},
		// 下一步
		toNext() {
			const that = this;
			that.shopTypeData = that.$refs.shopType.form;
			// console.log('that.shopTypeData', that.shopTypeData);
			if (this.verify()) {
				// console.log('全部为true');
				// 商铺图片
				if (that.form.storeImg2 !== '') {
					that.form.shopPic = `${that.form.storeImg1},${that.form.storeImg2}`;
				} else {
					that.form.shopPic = that.form.storeImg1;
				}
				// 主体类型
				// that.shopTypeData.bizSubjectType = Number(that.shopTypeData.bizSubjectType * 1 + 1);
				// 营业期限
				that.shopTypeData.businessTerm = `${that.shopTypeData.timeStart},${that.shopTypeData.timeEnd}`;
				//  组织机构证书期限
				if (that.shopTypeData.bizSubjectType === '2' && that.shopTypeData.licenceCode.length === 15) {
					that.shopTypeData.organTerm = `${that.shopTypeData.timeStartT},${that.shopTypeData.timeEndT}`;
				}
				that.form.bizSubjectType = that.shopTypeData.bizSubjectType;
				that.form.certificateType = that.shopTypeData.certificateType;
				that.form.licenceCode = that.shopTypeData.licenceCode;
				that.form.merchantName = that.shopTypeData.merchantName;
				that.form.legalPerson = that.shopTypeData.legalPerson;
				that.form.registeredAddr = that.shopTypeData.registeredAddr;
				that.form.businessTerm = that.shopTypeData.businessTerm;
				that.form.licencePic = that.shopTypeData.licencePic;
				that.form.foodSafetyLicensePic = that.shopTypeData.foodSafetyLicensePic;
				that.form.timeStart = that.shopTypeData.timeStart;
				that.form.timeEnd = that.shopTypeData.timeEnd;
				that.form.organizationName = that.shopTypeData.organizationName;
				that.form.organCode = that.shopTypeData.organCode;
				that.form.representative = that.shopTypeData.representative;
				that.form.organCodePic = that.shopTypeData.organCodePic;
				that.form.organTerm = that.shopTypeData.organTerm;
				that.form.termValidity = that.shopTypeData.termValidity;
				that.form.timeStartT = that.shopTypeData.timeStartT;
				that.form.timeEndT = that.shopTypeData.timeEndT;
				// const formData = Object.assign(that.shopTypeData, that.form);
				const formData = that.form;
				// console.log('formData', formData, that.shopTypeData, that.form);

				// console.log('next');
				// 缓存数据
				uni.setStorageSync('formData', JSON.stringify(formData));
				uni.navigateTo({
					url: '/pages/user/apply-residence/operator-information/index?type=' + this.reaplyType,
				});
			} else {
				// console.log('errr');
			}
		},
		// 校验表单
		verify() {
			// 手机格式校验
			const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			//  身份证校验
			// const IDcard = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
			// 银行卡号
			// const bank = /^[1-9]\d{9,29}$/;
			// 校验有没填店铺全称;
			if (!this.form.storeFullName) {
				this.formErrorMsg('请填写店铺全称');
				return false;
			}
			// 校验有没填店铺或商户简称
			if (!this.form.storeShortName) {
				this.formErrorMsg('请填写店铺或商户简称');
				return false;
			}
			// 校验有没选择经营品类
			if (!this.form.bizCategoryJson) {
				this.formErrorMsg('请选择经营品类');
				return false;
			}
			// 校验有没选择店铺所在地
			if (!this.form.province) {
				this.formErrorMsg('请选择店铺所在地');
				return false;
			}
			// 校验有没填店铺详细地址
			if (!this.form.addressDetail) {
				this.formErrorMsg('请填写店铺详细地址');
				return false;
			}
			// 校验有没填店铺铺位号
			if (this.form.storeCodeList.length <= 1) {
				this.formErrorMsg('请填写店铺铺位号');
				return false;
			}
			// 校验有没填店铺联系电话
			if (!this.form.shopContactNo) {
				this.formErrorMsg('请填写店铺联系电话');
				return false;
			}
			// 联系电话格式校验
			if (!myreg.test(this.form.shopContactNo)) {
				this.formErrorMsg('请填写正确的联系电话');
				return false;
			}
			// 校验有没上传店铺图片图片
			// if (this.form.storeImg1.length === 0) {
			// 	this.formErrorMsg('请上传门头照片');
			// 	return false;
			// }
			// 校验有没选择运营主体类型
			if (!this.shopTypeData.bizSubjectType) {
				this.formErrorMsg('请选择运营主体类型');
				return false;
			}

			// 运营主体类型
			if (this.shopTypeData.bizSubjectType === '1') {
				//  校验有没填营业执照编号
				if (!this.shopTypeData.licenceCode) {
					this.formErrorMsg('请填写营业执照编号');
					return false;
				}
				//  校验有没填营业执照编号
				if (this.shopTypeData.licenceCode.length !== 15 && this.shopTypeData.licenceCode.length !== 18) {
					this.formErrorMsg('请填写正确的营业执照编号');
					return false;
				}
				//  校验有没填商户名称
				if (!this.shopTypeData.merchantName) {
					this.formErrorMsg('请填写商户名称');
					return false;
				}
				//  校验有没填经营者/法定代表人
				if (!this.shopTypeData.legalPerson) {
					this.formErrorMsg('请填写经营者/法定代表人');
					return false;
				}
				//  校验有没选择营业期限
				if (!this.shopTypeData.timeStart || !this.shopTypeData.timeEnd) {
					this.formErrorMsg('请选择营业期限');
					return false;
				}
				if (this.shopTypeData.timeStart && this.shopTypeData.timeEnd) {
					const startTime = Date.parse(new Date(this.shopTypeData.timeStart));
					const endTime = Date.parse(new Date(this.shopTypeData.timeEnd));
					const times = (endTime - startTime) / 1000 / 3600 / 24;
					if (times <= 60) {
						this.formErrorMsg('营业期限相隔小于60天');
						return false;
					}
				}
				// 校验有没上传营业执照
				if (this.shopTypeData.licencePic.length === 0) {
					this.formErrorMsg('请上传营业执照');
					return false;
				}
				return true;
			} else if (this.shopTypeData.bizSubjectType === '2') {
				if (!this.shopTypeData.licenceCode) {
					//  校验有没填营业执照编号
					this.formErrorMsg('请填写营业执照编号');
					return false;
				}
				//  校验有没填营业执照编号
				if (this.shopTypeData.licenceCode.length !== 15 && this.shopTypeData.licenceCode.length !== 18) {
					this.formErrorMsg('请填写正确的营业执照编号');
					return false;
				}
				//  校验有没填商户名称
				if (!this.shopTypeData.merchantName) {
					this.formErrorMsg('请填写商户名称');
					return false;
				}
				//  校验有没填经营者/法定代表人
				if (!this.shopTypeData.legalPerson) {
					this.formErrorMsg('请填写经营者/法定代表人');
					return false;
				}
				//  校验有没选择营业期限
				if (!this.shopTypeData.timeStart || !this.shopTypeData.timeEnd) {
					this.formErrorMsg('请选择营业期限');
					return false;
				}
				// 相差时间
				if (this.shopTypeData.timeStart && this.shopTypeData.timeEnd) {
					const startTime = Date.parse(new Date(this.shopTypeData.timeStart));
					const endTime = Date.parse(new Date(this.shopTypeData.timeEnd));
					const times = (endTime - startTime) / 1000 / 3600 / 24;
					if (times <= 60) {
						this.formErrorMsg('营业期限相隔小于60天');
						return false;
					}
				}
				// 校验有没上传营业执照
				if (this.shopTypeData.licencePic.length === 0) {
					this.formErrorMsg('请上传营业执照');
					return false;
				}

				if (this.shopTypeData.licenceCode.length === 15) {
					if (!this.shopTypeData.organCode) {
						this.formErrorMsg('请填写组织机构代码');
						return false;
					}
					if (!this.shopTypeData.timeStartT || !this.shopTypeData.timeEndT) {
						this.formErrorMsg('请选择营业期限');
						return false;
					}
					// 相差时间
					if (this.shopTypeData.timeStartT && this.shopTypeData.timeEndT) {
						const startTime = Date.parse(new Date(this.shopTypeData.timeStartT));
						const endTime = Date.parse(new Date(this.shopTypeData.timeEndT));
						const times = (endTime - startTime) / 1000 / 3600 / 24;
						if (times <= 60) {
							this.formErrorMsg('有效期相隔小于60天');
							return false;
						}
					}
					// 组织机构代码证
					if (!this.shopTypeData.organCodePic) {
						this.formErrorMsg('请上传组织机构代码证');
						return false;
					}
				}
				return true;
			} else {
				return true;
			}

			// return true;
		},
		formErrorMsg(str) {
			uni.showToast({
				icon: 'none',
				title: str,
				duration: 2000,
			});
		},
		// 新增铺位号
		// 跳转搜索页面
		handleToSearch(index) {
			uni.navigateTo({
				url: './search/index?idex=' + index + '&items=' + JSON.stringify(this.form.storeCodeList),
			});
		},
		onAdd() {
			// console.log('adddxxx', this.items);
			this.form.storeCodeList.push('');
		},
		// 删除铺位号
		onDel(index) {
			// console.log('delxxx', this.items);
			this.form.storeCodeList.splice(index, 1);
		},
	},
};
</script>
<style scoped lang="scss">
.shoping {
	overflow: hidden;
}
.table {
	background: #fff;
	margin-top: rpx32;
	padding: 32rpx;
}
.shop {
	padding: 32rpx;
	background: #fff;
	.iconjiantou {
		float: right;
		padding-right: 37rpx;
		line-height: 280rpx;
	}
}
.shop-add {
	padding: 32rpx;
	background: #fff;
}
.shop-type {
	padding: 32rpx;
	padding-bottom: 0;
	background: #fff;
}
// 上传图片
.shop-add-photo {
	display: inline-block;
	height: 378rpx;
	.photo-title {
		color: #616b80;
		font-size: 28rpx;
		// padding: 16rpx;
		padding-bottom: 32rpx;
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
// 分隔线
.line {
	height: 24rpx;
	width: 100%;
	background: #f5f7fa;
}
//简介输入框
.module {
	& + & {
		margin-top: $uni-spacing-base * 2;
	}
}
.module-header {
	color: #616b80;
	font-size: 28rpx;
	padding-bottom: 12rpx;
}
.module-input {
	position: relative;
	.uni-input {
		box-sizing: border-box;
		padding: 0;
		border: 1px solid transparent;
		border-bottom-color: $form-border-color-primary;
		font-size: $form-font-size-primary;
		color: $form-font-color-primary;
		height: $form-input-height;

		&.has-value {
			padding-right: $form-input-height / 2 + $uni-spacing-base;
		}
	}
}
.input-textarea {
	background: #fff;
	box-sizing: border-box;
	width: auto;
	border: 1px solid $form-border-color-primary;
	min-height: 300rpx;
	padding: $uni-spacing-base;
	padding-bottom: $uni-spacing-lg * 2;
	margin: $uni-spacing-base 0 0;
	font-size: $form-font-size-primary;
	line-height: $form-font-size-primary * 1.2;

	&.has-value {
		padding-right: $form-input-height / 2 + $uni-spacing-base;
	}

	.uni-textarea-textarea {
		width: 100%;
	}
}
.textarea-length-verify {
	position: absolute;
	z-index: 2;
	bottom: $form-input-height / 4;
	right: $form-input-height / 4;
	color: $form-font-color-label;
	font-size: $uni-font-size-sm;
	line-height: $uni-font-size-sm;

	&-text {
		color: $uni-color-warning;
	}

	&.full {
		color: $uni-color-warning;
	}
}
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
			background: #c9ced6;
			float: left;
			margin: 0 125rpx;
		}
	}
	.step-line {
		background: #c9ced6;
		border: 1px solid #c9ced6;
		border-radius: 0.5px;
		width: 248rpx;
		position: absolute;
		left: 252rpx;
		top: 30rpx;
	}
	.step-name {
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
			color: #c9ced6;
			font-size: 24rpx;
		}
	}
}
// 下一步按钮
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
// 铺位号
.shopId {
	min-height: 184rpx;
	.shop-add-title {
		padding-top: 32rpx;
		color: #616b80;
		display: inline-block;
	}
	.shop-del {
		color: #12cb8e;
		// padding-left: 240rpx;
		float: right;
		padding-top: 32rpx;
		display: inline-block;
		.shop-del-icon {
			// float: right;
			height: 22rpx;
			width: 24rpx;
			background-image: $icon-del-image;
			background-size: 100%;
			background-repeat: no-repeat;
			display: inline-block;
			padding: 8rpx;
			vertical-align: top;
		}
	}
	.shop-model {
		padding: 20rpx 0;
		border-bottom: 1px solid #eceff5;
		.shop-view {
			font-size: 32rpx;
			color: #c9ced6;
			height: 50rpx;
			// float: left;
			width: 95%;
			display: inline-block;
			&.isValue {
				color: #252525;
			}
		}
	}
}
.shop-add-icon {
	font-size: 32rpx;
	color: #12cb8e;
	// padding-left: 240rpx;
	float: right;
	display: inline-block;
}
</style>
