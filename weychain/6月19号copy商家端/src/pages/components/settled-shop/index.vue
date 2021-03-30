<template>
	<view class="settled-shop">
		<!-- 店铺名称 -->
		<div class="item-box">
			<view class="item-des">店铺名称</view>
			<view class="item-val">{{ storeData.storeFullName }}</view>
		</div>
		<!-- 店铺简称 -->
		<div class="item-box">
			<view class="item-des">店铺简称</view>
			<view class="item-val">{{ storeData.storeShortName }}</view>
		</div>
		<div class="item-box">
			<view class="item-des">店铺联系电话</view>
			<view class="item-val">{{ phone }}</view>
			<!-- <span class="modify-icon modify-center" @click="goNavigate('/pages/user/business-time/index?type=1')"></span> -->
		</div>
		<div class="item-box" @click="goNavigate('/pages/user/business-time/index?type=3')">
			<view class="item-des">营业时间</view>
			<view class="item-val bizTime-range">{{ storeData.bizTimeRange }}</view>
			<span class="modify-icon modify-center"></span>
		</div>
		<!-- 店铺简介 旧版 -->
		<!-- <div class="item-box">
			<view class="item-des">店铺简介</view>
			<view class="item-intro">
				<textarea v-model="shopIntro"></textarea>
				<text>{{ shopINtroNum }}/200</text>
			</view>
		</div> -->
		<div class="item-box type-item item-intro-box">
			<view class="item-des" @click="goNavigate('/pages/user/business-time/index?type=2')">
				店铺简介<span class="modify-icon item-intro-title"> </span>
			</view>
			<view class="item-val">{{ storeData.storeBriefDesc }}</view>
		</div>
		<div class="item-box type-item">
			<view class="item-des">店铺状态</view>
			<view class="item-val">{{ storeData.businessStatus ? businessStatus[storeData.businessStatus] : '正常运营' }}</view>
		</div>
		<div class="item-box">
			<view class="item-des">店铺所在地</view>
			<view class="item-val">{{ storeData.province }} {{ storeData.city }} {{ storeData.district }}</view>
		</div>
		<div class="item-box">
			<view class="item-des">店铺详细地址</view>
			<view class="item-val">{{ storeData.addressDetail }}</view>
		</div>
		<div class="item-box">
			<view class="item-des">店铺铺位号</view>
			<view class="item-val">{{ storeData.shopNo }}</view>
		</div>
		<div class="item-box">
			<view class="item-des">经营品类</view>
			<view class="item-val">{{ storeData.bizCategoryJson }}</view>
		</div>
		<div class="item-box">
			<view class="item-des">运营主体类型</view>
			<view class="item-val">{{ bizSubjectType[storeData.bizSubjectType] }}</view>
		</div>
		<!-- 店铺照片 -->
		<div class="item-box type-item">
			<view class="item-des">店铺照片</view>
			<view class="item-pic">
				<view class="item-pic-con">
					<img :src="storePhotos[0]" alt="shop-pic" />
					<text>正面照片</text>
				</view>
				<view class="item-pic-con">
					<img :src="storePhotos[1]" alt="shop-pic" />
					<text>侧面照片</text>
				</view>
				<view class="item-pic-con">
					<img :src="storePhotos[2]" alt="shop-pic" />
					<text>其他照片</text>
				</view>
				<!-- 图标 -->
				<!-- <span class="item-rigth-tips">
					<span class="iconfont iconjiantou"></span>
				</span> -->
			</view>
		</div>
		<!-- 营业资质 -->
		<div class="item-box" v-if="storeData.bizSubjectType === '1'">
			<view class="item-des">营业资质</view>
			<view class="item-pic">
				<view class="item-pic-con">
					<img :src="storeData.licencePic" alt="shop-pic" />
					<text>营业执照</text>
				</view>
				<view class="item-pic-con">
					<img :src="storeData.foodSafetyLicensePic" alt="shop-pic" />
					<text>食品经营许可证</text>
				</view>
				<view class="item-pic-con">
					<img :src="storeData.healthCertificatePic" alt="shop-pic" />
					<text>健康证</text>
				</view>
				<!-- <span class="item-rigth-tips">
					<span class="iconfont iconjiantou"></span>
				</span> -->
			</view>
		</div>
	</view>
</template>
<script>
import { MallBusinessLicens } from '@/api/user';
export default {
	data() {
		return {
			// 店铺简介
			shopIntro: '',
			storeData: {},
			// 运营主体类型
			bizSubjectType: ['', '小微商户', '个体', '企业'],
			// 店铺状态
			businessStatus: ['', '正常运营', '暂停营业', '打烊', '停止营业'],
			// 店铺照片
			storePhotos: [],
		};
	},
	computed: {
		shopINtroNum() {
			return this.shopIntro.length;
		},
		phone() {
			if (this.storeData.shopContactNo) {
				return `${this.storeData.shopContactNo.substr(0, 3)} ${this.storeData.shopContactNo.substr(
					3,
					4,
				)} ${this.storeData.shopContactNo.substr(7, 3)}`;
			} else {
				return '';
			}
		},
	},
	onShow() {
		this.storeData = uni.getStorage('storeData') ? uni.getStorage('storeData') : {};
	},
	onHide() {
		uni.removeStorage('storeData');
	},
	onLoad() {},
	methods: {
		goNavigate(toUrl) {
			uni.setStorageSync('storeData', JSON.stringify(this.storeData));
			uni.navigateTo({
				url: toUrl,
			});
		},
		refreshData() {
			this.storeData = uni.getStorage('storeData') ? JSON.parse(uni.getStorageSync('storeData')) : {};
			// this.$set(this,'storeData',)
			// console.log(this.storeData, 'this.storeData');
		},
	},
	created() {
		const that = this;
		MallBusinessLicens()
			.then((res) => {
				// console.log(res, '23');
				if (res.code === 200) {
					const { data } = res;
					// 经营品类
					data.bizCategoryJson = JSON.parse(data.bizCategoryJson);
					data.bizCategoryJson = data.bizCategoryJson.map((res) => res.name);
					that.storeData = data;
					that.storePhotos = res.data.shopPic ? res.data.shopPic.split(',') : '';
				} else {
					uni.showToast({
						title: res.message,
						duration: 1500,
						icon: 'none',
					});
				}
			})
			.catch((err) => {
				uni.showLoading({
					title: err.message,
					duration: 1500,
				});
			});
	},
};
</script>
<style lang="scss" scoped>
.item-box {
	position: relative;
	padding: 32rpx 32rpx 51rpx;
	background-color: #fff;
	font-family: PingFangSC-Medium, PingFang SC;
	.item-des {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(97, 107, 128, 1);
		line-height: 40rpx;
	}
	.item-val {
		font-size: 32rpx;
		font-weight: 400;
		color: rgba(37, 37, 37, 1);
		line-height: 45rpx;
		padding-top: 16rpx;
	}
	.bizTime-range {
		padding-right: 32rpx;
		word-break: break-all;
		word-wrap: break-word;
	}
	.item-pic {
		position: relative;
		display: flex;
		margin-top: 32rpx;

		.item-pic-con {
			width: 160rpx;
			text-align: center;
			img {
				width: 160rpx;
				height: 160rpx;
				border-radius: 16rpx;
				overflow: hidden;
			}
			text {
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(153, 160, 173, 1);
				line-height: 28rpx;
				margin-top: 16rpx;
			}
		}
		.item-pic-con + .item-pic-con {
			margin-left: 20rpx;
		}
	}
}
.type-item {
	margin-top: 24rpx;
}
.item-rigth-tips {
	flex-grow: 2;
	text-align: right;
	padding-top: 50rpx;
}
.iconjiantou {
	font-size: 40rpx;
	color: $uni-text-color-grey;
}

.item-intro {
	position: relative;
	height: 277rpx;
	padding: 8rpx 8rpx;
	border: 1rpx solid rgba(235, 238, 245, 1);
	box-sizing: border-box;
	margin-top: 32rpx;
	text {
		position: absolute;
		bottom: 0;
		right: 8rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(201, 206, 214, 1);
		line-height: 33rpx;
	}
	textarea {
		width: 100%;
		height: 100&;
		font-size: 32rpx;
		font-weight: 400;
		color: rgba(37, 37, 37, 1);
		line-height: 45rpx;
	}
}
.modify-icon {
	width: 32rpx;
	height: 32rpx;
	background-image: $icon-modify;
	background-size: 100%;
	cursor: pointer;
	z-index: 2;
}
.modify-center {
	position: absolute;
	top: 50%;
	right: 32rpx;
	transform: translateY(-50%);
}

.item-intro-title {
	float: right;
}

.item-intro-box {
	min-height: 393rpx;
}
</style>
