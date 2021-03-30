<template>
	<view class="page-confirm-detail">
		<view class="module-tab">
			<view class="tab-button">
				<view
					class="item"
					v-for="(item, index) in tabButton"
					:class="[index == curIndex ? 'active' : '']"
					:key="index"
					@tap="handleTab(index)"
					>{{ item }}
				</view>
			</view>
			<view class="tab-content" v-show="curIndex === 0">
				<view class="module-info">
					<infoCell title="店铺全称" v-model="storeInfo.storeFullName" :isDisabled="true" />
					<infoCell title="店铺（商户）简称" v-model="storeInfo.storeShortName" :isDisabled="true" />
					<infoCell
						title="经营品类"
						v-model="storeInfo.bizCategoryJson"
						:isDisabled="true"
						placeholder="请选择经营品类"
						:isShowMore="true"
					/>
					<infoCell title="店铺简介（选填）" v-model="storeInfo.storeBriefDesc" :hasSlot="true" :isDisabled="true" />
				</view>
				<view class="module-info">
					<infoCell title="店铺所在地" v-model="storePlace" :isDisabled="true" />
					<infoCell title="店铺详细地址" v-model="storeInfo.addressDetail" :isDisabled="true" />
					<infoCell title="店铺铺位号" v-model="storeInfo.shopNo" :isDisabled="true" />
					<infoCell title="店铺联系电话" v-model="storeInfo.shopContactNo" :isDisabled="true" />
					<view class="info-cell-pic">
						<view class="info-title"> 店铺图片</view>
						<view class="media-list">
							<view class="media">
								<image class="media-object" :src="storeImg1" mode="widthFix"></image>
								<view class="media-tips">正面照片（门头照）</view>
							</view>
							<view class="media" v-if="storeImg2 !== ''">
								<image class="media-object" :src="storeImg2" mode="widthFix"></image>
								<view class="media-tips">其他照片（选填）</view>
							</view>
						</view>
					</view>
				</view>
				<view class="module-info">
					<infoCell title="运营主体类型" v-model="bizSubjectTypeDec" :isDisabled="true" />
					<template v-if="storeInfo.bizSubjectType != 1">
						<infoCell title="营业执照编号" v-model="storeInfo.licenceCode" :isDisabled="true" />
						<infoCell title="商户名称" v-model="storeInfo.merchantName" :isDisabled="true" />

						<infoCell title="经营者/法定代表人" v-model="storeInfo.legalPerson" :isDisabled="true" />
						<infoCell title="注册地址（选填）" v-model="storeInfo.registeredAddr" :isDisabled="true" />
						<infoCell title="营业期限" :dataSection="true" :dateStart="timeStartYunying" :dateEnd="timeEndYunying" />
					</template>
				</view>
				<view class="module-info" v-if="storeInfo.bizSubjectType != 1">
					<view class="info-cell-pic">
						<view class="info-title"> 营业执照</view>
						<view class="media-list">
							<view class="media">
								<image class="media-object" :src="storeInfo.licencePic" mode="widthFix"></image>
							</view>
						</view>
					</view>
					<view class="info-cell-pic">
						<view class="info-title"> 食品经营许可证（选填）</view>
						<view class="media-list">
							<view class="media">
								<image class="media-object" :src="storeInfo.foodSafetyLicensePic" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="module-info" v-if="storeInfo.bizSubjectType == 3">
					<infoCell title="证书类型" v-model="certificateTypeDec" :isDisabled="true" />
					<template v-if="storeInfo.licenceCode.length >= 18">
						<infoCell title="组织机构代码" v-model="storeInfo.organCode" :isDisabled="true" />
						<infoCell title="有效期" :dataSection="true" :dateStart="timeStartCode" :dateEnd="timeEndCode" />
						<view class="info-cell-pic">
							<view class="info-title"> 组织机构代码证</view>
							<view class="media-list">
								<view class="media">
									<image class="media-object" :src="storeInfo.organCodePic" mode="widthFix"></image>
								</view>
							</view>
						</view>
					</template>
				</view>
			</view>
			<view class="tab-content" v-show="curIndex === 1">
				<view class="module-info">
					<infoCell title="经营者/法人证件类型" v-model="certificate" :isDisabled="true" />
					<infoCell title="姓名" v-model="managerInfo.realName" :isDisabled="true" />
					<template v-if="managerInfo.certificateType == 1">
						<infoCell title="身份证号" v-model="managerInfo.idCardNo" :isDisabled="true" />
						<infoCell
							title="身份证有效期"
							:dataSection="true"
							:dateStart="managerInfo.idCardStartDate"
							:dateEnd="managerInfo.idCardEndDate"
						/>
						<view class="info-cell-pic">
							<view class="info-title">身份证照片</view>
							<view class="media-list">
								<view class="media">
									<image class="media-object" :src="managerInfo.idCardBackPic" mode="widthFix"></image>
									<view class="media-tips">身份证照片（人像）</view>
								</view>
								<view class="media">
									<image class="media-object" :src="managerInfo.idCardFrontPic" mode="widthFix"></image>
									<view class="media-tips">身份证照片（国徽）</view>
								</view>
							</view>
						</view>
						<view class="info-cell-pic" v-if="managerInfo.healthCertificatePic">
							<view class="info-title">健康证（选填）</view>
							<view class="media-list">
								<view class="media">
									<image class="media-object" :src="managerInfo.healthCertificatePic" mode="widthFix"></image>
								</view>
							</view>
						</view>
					</template>
					<template v-else>
						<infoCell title="证件号" v-model="managerInfo.idCardNo" :isDisabled="true" />
						<infoCell title="证件结束日期" v-model="managerInfo.idCardEndDate" :isDisabled="true" />
						<view class="info-cell-pic">
							<view class="info-title">证件照片</view>
							<view class="media-list">
								<view class="media">
									<image class="media-object" :src="managerInfo.certificatePic" mode="widthFix"></image>
								</view>
							</view>
						</view>
					</template>
				</view>
				<view class="module-info">
					<infoCell title="超级管理员类型" v-model="superAdminTypeDec" :isDisabled="true" />
					<infoCell title="超级管理员姓名" v-model="managerInfo.superAdminName" :isDisabled="true" />
					<infoCell title="超级管理员身份证号码" v-model="managerInfo.superAdminCardNo" :isDisabled="true" />
					<infoCell title="超级管理员手机号" v-model="managerInfo.superAdminMobile" :isDisabled="true" />
					<infoCell title="超级管理员邮箱" v-model="managerInfo.superAdminEmail" />
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { mallBusinessInfo, managerInfo } from '@/api/apply-residence.js';
import infoCell from '../info-cell';
export default {
	components: {
		// 声明组件
		infoCell,
	},
	data() {
		return {
			tabButton: ['店铺信息', '经营者信息'],
			curIndex: 0,
			resData: {},
			storeInfo: {},
			storePlace: '',
			managerInfo: {},
			accountInfo: '',
			certificate: '',
			storeImg1: '',
			storeImg2: '',
			bizSubjectTypeDec: '',
			certificateTypeDec: '',
			timeStartYunying: '',
			timeEndYunying: '',
			timeStartCode: '',
			timeEndCode: '',
			superAdminTypeDec: '',
		};
	},
	onLoad() {
		// 获取入驻详情商家信息
		mallBusinessInfo().then((res) => {
			if (res.code === 200) {
				this.storeInfo = res.data;
				this.storePlace = this.storeInfo.province + ' ' + this.storeInfo.city + ' ' + this.storeInfo.district;

				// 店铺详情图片
				this.storeImg1 = res.data.shopPic.split(',')[0];
				this.storeImg2 = res.data.shopPic.split(',')[1] ? res.data.shopPic.split(',')[1] : '';
				// 运营期限
				if (res.data.businessTerm) {
					this.timeStartYunying = res.data.businessTerm.split(',')[0];
					this.timeEndYunying = res.data.businessTerm.split(',')[1];
				}
				// 组织机构有效期
				if (res.data.organTerm) {
					this.timeStartCode = res.data.organTerm.split(',')[0];
					this.timeEndCode = res.data.organTerm.split(',')[1];
				}

				// 运营主体类型: '小微商户（无营业执照的小微商户）', '个体户（有营业执照的个体经营者）', '企业（经营方为企业，已开通了对公账户）'
				switch (this.storeInfo.bizSubjectType) {
					case 1:
						this.bizSubjectTypeDec = '小微商户（无营业执照的小微商户）';
						break;
					case 2:
						this.bizSubjectTypeDec = '个体户（有营业执照的个体经营者）';
						break;
					case 3:
						this.bizSubjectTypeDec = '企业（经营方为企业，已开通了对公账户）';
						break;
				}
				// 证书类型: '营业执照', '营业执照（统一社会信用代码）'
				switch (this.storeInfo.certificateType) {
					case 1:
						this.certificateTypeDec = '营业执照';
						break;
					case 2:
						this.certificateTypeDec = '营业执照（统一社会信用代码）';
						break;
				}
			} else {
				uni.showToast({
					title: res.message,
					duration: 1000,
				});
			}
		});
		// 获取入驻详情经营者信息
		managerInfo().then((res) => {
			if (res.code === 200) {
				this.managerInfo = res.data;
				// 证件类别: 1、中国大陆居民-身份证；2、其他国家或地区居民-护照；3、中国香港居民–来往内地通行证；4、中国澳门居民–来往内地通行证；5、中国台湾居民–来往大陆通行证
				switch (this.managerInfo.certificateType) {
					case 1:
						this.certificate = '中国大陆居民-身份证';
						break;
					case 2:
						this.certificate = '其他国家或地区居民-护照';
						break;
					case 3:
						this.certificate = '中国香港居民–来往内地通行证';
						break;
					case 4:
						this.certificate = '中国澳门居民–来往内地通行证';
						break;
					case 5:
						this.certificate = '中国台湾居民–来往大陆通行证';
				}

				// 超级管理员类型 1、法定代表人/经营者；2、委派负责人
				switch (this.managerInfo.superAdminType) {
					case 1:
						this.superAdminTypeDec = '法定代表人/经营者';
						break;
					case 2:
						this.superAdminTypeDec = '委派负责人';
						break;
				}
			} else {
				uni.showToast({
					title: res.message,
					duration: 1000,
				});
			}
		});
	},
	onShow() {},
	methods: {
		handleTab(index) {
			this.curIndex = index;
		},
	},
};
</script>
<style lang="scss">
.page-confirm-detail {
	.tab-button {
		background: #fff;
		margin: 0 0 $uni-spacing-lg;
		display: flex;
		.item {
			position: relative;
			width: 50%;
			padding: 14rpx 0 40rpx;
			text-align: center;
			font-size: $uni-font-size-lg;
			color: $uni-text-color-black;
			&:after {
				background: none;
				display: block;
				height: 3px;
				width: 96rpx;
				position: absolute;
				bottom: 14rpx;
				left: 50%;
				margin-left: -48rpx;
				border-radius: 3px;
				content: '';
			}
			&.active {
				&:after {
					background: $uni-color-main;
				}
			}
		}
	}
	.module-info {
		background: $uni-bg-color;
		padding: 0 $uni-spacing-lg;
	}
	.info-cell-pic {
		background: $uni-bg-color;
		padding: $uni-font-size-lg 0 $uni-spacing-base;
		margin: 0 0 $uni-spacing-lg;
		@include borderCreator(bottom, solid, #eceff5);
		.info-title {
			margin: 0 0 20rpx;
			font-size: $uni-font-size-base;
			color: $uni-text-color-grey;
		}
		.info-tips {
			margin: 0 0 20rpx;
			font-size: 20rpx;
			color: $uni-text-ordermsg;
		}
		.media-list {
			overflow: auto;
			.media {
				display: inline-block;
				vertical-align: top;
				padding-right: 28rpx;
			}
			.media-tips {
				padding: 4rpx 0;
				font-size: 20rpx;
				color: $uni-text-ordermsg;
			}
			.media-object {
				width: 210rpx;
				height: 210rpx;
				border-radius: 16rpx;
			}
		}
	}
}
</style>
