<template>
	<view class="page-identity-confirm">
		<view class="module-input">
			<view class="uni-form-item">
				<view class="title">店铺名称*</view>
				<input v-model="form.storeName" class="uni-input" placeholder="请输入店铺名称" />
			</view>
			<view class="uni-form-item">
				<view class="title">营业执照编码</view>
				<input v-model="form.licenceCode" class="uni-input" placeholder="请输入营业执照" />
			</view>
			<!-- <view class="uni-form-item">
				<view class="title">营业时间</view>

				<input
					v-model="time"
					class="uni-input"
					placeholder="请输入营业执照"
					disabled="disabled"
					@tap="handleSelectTime"
				/>
			</view> -->
			<view class="uni-form-item" style="margin: 0 0 12px;">
				<view class="title">详细地址</view>
				<textarea v-model="form.businessAddress" class="input-textarea" placeholder="点击输入多行文本" auto-height />
			</view>

			<view class="uni-form-item">
				<view class="title">真实姓名*</view>
				<input v-model="form.realName" class="uni-input" placeholder="请输入真实姓名" />
			</view>
			<view class="uni-form-item">
				<view class="title">身份证号*</view>
				<input v-model="form.idCard" class="uni-input" placeholder="请输入身份证号" />
			</view>
		</view>
		<view class="module">
			<view class="module-header">营业执照照片</view>
			<view class="module-image">
				<image class="media-object" :src="form.licenceImgUrl ? form.licenceImgUrl : ''" mode="widthFix"></image>
				<view class="button-upload" @tap="handleChoose('licenceImgUrl')">
					点击上传
				</view>
			</view>
		</view>

		<view class="module">
			<view class="module-header">食品许可证图片</view>
			<view class="module-image">
				<image class="media-object" :src="form.storeLogoUrl ? form.storeLogoUrl : ''" mode="widthFix"></image>
				<view class="button-upload" @tap="handleChoose('storeLogoUrl')">
					点击上传
				</view>
			</view>
		</view>
		<view class="module">
			<view class="module-header">食品许可证图片</view>
			<view class="module-image">
				<image class="media-object" :src="form.foodSafetyLicenseImgUrl ? form.foodSafetyLicenseImgUrl : ''" mode="widthFix"></image>
				<view class="button-upload" @tap="handleChoose('foodSafetyLicenseImgUrl')">点击上传</view>
			</view>
		</view>
		<view class="module module-two">
			<view class="module-header">身份证照片</view>
			<view class="module-image">
				<view class="media">
					<image class="media-object" :src="form.idCardFrontImgUrl ? form.idCardFrontImgUrl : ''"></image>
					<view class="button-upload" @tap="handleChoose('idCardFrontImgUrl')">
						点击上传正面
					</view>
				</view>
				<view class="media">
					<image class="media-object" :src="form.idCardBackImgUrl ? form.idCardBackImgUrl : ''"></image>
					<view class="button-upload" @tap="handleChoose('idCardBackImgUrl')">
						点击上传反面
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="module module-two">
			<view class="module-header">手持身份证照片</view>
			<view class="module-image">
				<view class="media">
					<image class="media-object" :src="imgNone"></image>
					<view class="button-upload" @tap="handleChoose">点击上传正面</view>
				</view>
				<view class="media">
					<image class="media-object" :src="imgNone"></image>
					<view class="button-upload" @tap="handleChoose">点击上传反面</view>
				</view>
			</view>
		</view> -->
		<view class="module module-two">
			<view class="module-header">安全许可证</view>
			<view class="module-image">
				<view class="media">
					<image class="media-object" :src="form.foodSafetyLicensePic ? form.foodSafetyLicensePic : ''"></image>
					<view class="button-upload" @tap="handleChoose('foodSafetyLicensePic')">点击上传</view>
				</view>
				<!-- <view class="media">
					<image class="media-object" :src="imgNone"></image>
					<view class="button-upload" @tap="handleChoose">点击上传反面</view>
				</view> -->
			</view>
		</view>
		<view class="module-button">
			<button type="main" class="button-apply" @click="applyCertification">
				申请认证
			</button>
		</view>
		<uniPopup ref="popupTime" type="bottom" class="modal-time">
			<view class="modal-content">
				<view class="modal-header">
					<view class="button button-close" @tap="handleClose">取消</view>
					<view class="title">请选择开始营业时间</view>
					<view class="button button-sure" @tap="handleSureTime">确定</view>
				</view>
				<view class="modal-body">
					{{ hours }}
					<picker-view :indicator-style="indicatorStyle" @change="timeStartChange">
						<picker-view-column>
							<view class="item" v-for="(item, index) in hours" :key="index"> {{ item }}年 </view>
						</picker-view-column>
						<picker-view-column>
							<view class="item" v-for="(item, index) in minutes" :key="index"> {{ item }}月 </view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</uniPopup>
	</view>
</template>
<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import { MallBusinessLicense } from '@/api/index.js';
export default {
	components: {
		// 声明组件
		uniPopup,
	},
	data() {
		const hours = [];
		const minutes = [];
		for (let i = 1; i <= 24; i++) {
			hours.push(i);
		}
		return {
			indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth / (750 / 100))}px;`,
			hours,
			minutes,
			time: '08:00~19:00',
			imgArr: [],
			imgNone: '../../../static/img/img-none.png',
			userIdCode: '',
			form: {
				storeName: '11232', //  商店名称
				storeLogoUrl: '', //  商店logo
				licenceCode: '123123', //  经营执照编码
				licenceImgUrl: '', //  经营执照图片
				bizTimeRange: '123123', //  营业时间
				addressDetail: '123123', //  详细地址
				bizGoodsType: '123123', //  经营商品类型
				bizGoodsTypeId: '123123', //  经营商品类型ID
				foodSafetyLicense: 'xxxxx',
				foodSafetyLicensePic: '', //  食品安全许可证
				foodSafetyLicenseImgUrl: '', //  食品安全许可证图片
				realName: 'ddddd', //  真实姓名
				idCard: 'dddd', //  身份证号码
				idCardFrontImgUrl: '', //  身份证正面图
				idCardBackImgUrl: '', //  身份证反面图
				businessAddress: 'dizhi', //  地址
				type: 1, //  类型
			},
		};
	},
	onLoad(option) {
		// console.log('option', option); //  打印出上个页面传递的参数。
		this.userIdCode = option.userIdCode;
	},
	onShow() {},
	methods: {
		handleSelectTime: function () {
			this.$refs.popupTime.open();
		},
		handleClose: function () {
			this.$refs.popupTime.close();
		},
		timeStartChange: function () {},
		handleChoose(type) {
			uni.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], // 从相册选择
				success: (res) => {
					// console.log(JSON.stringify(res.tempFilePaths));
					this.form[type] = res.tempFilePaths;
				},
			});
		},
		//  申请认证
		applyCertification() {
			// const that = this;
			// console.log(that.form);
			// const re15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
			// const re18 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
			// const res = re15.test(that.form.idCard) || re18.test(that.form.idCard);
			// if (res === false) {
			// 	uni.showToast({
			// 		title: '请输入有效的身份证号码',
			// 		duration: 1500,
			// 		icon: 'none',
			// 	});
			// 	return false;
			// }
			// console.log('this.form', this.form);
			// const parmas = {
			// 	userIdCode: this.userIdCode,
			// 	mallBusinessLicense: this.form,
			// };
			const test = {
				userIdCode: '3eb3857d-9b40-4627-9845-5843d283b5fa',
				mallBusinessLicense: {
					storeName: '11232',
					storeLogoUrl: 'Array[1]',
					licenceCode: '123123',
					licenceImgUrl: 'Array[1]',
					bizTimeRange: '123123',
					addressDetail: '123123',
					bizGoodsType: '123123',
					bizGoodsTypeId: '123123',
					foodSafetyLicense: 'xxxxx',
					foodSafetyLicensePic: 'Array[1]',
					foodSafetyLicenseImgUrl: 'Array[1]',
					realName: 'ddddd',
					idCard: 'dddd',
					idCardFrontImgUrl: 'Array[1]',
					idCardBackImgUrl: 'http://tmp/wxad5bbae45b3ed918.o6zAJs_2Rno5GxPExnTLWLRDsNmE.BCVtswiVl4S55d895b875322e8470437daa032d8649b.jpg',
					businessAddress: 'dizhi',
					type: 1,
				},
			};
			MallBusinessLicense(test).then((res) => {});
		},
	},
};
</script>

<style lang="scss">
.page-identity-confirm {
	background: #f5f5f5;
	.module {
		margin: 0 0 12rpx;
	}
	.module-header {
		padding: 24rpx 24rpx 16rpx;
		font-size: 26rpx;
	}
	.module-input {
		.iconjiantou {
			float: right;
		}
		.input-select {
			background: #fff;
			padding: 10rpx;
			text-align: right;
			border-radius: 10rpx;
		}
	}
	.input-textarea {
		background: #fff;
		width: 100%;
		border-radius: 10rpx;
		min-height: 120rpx;
		padding: 16rpx;
		font-size: 26rpx;
		.uni-textarea-textarea {
			width: 100%;
		}
	}
	.uni-form-item {
		background: #fff;
		padding: 10rpx 12rpx;
		width: auto;
		border-bottom: 1px solid #eee;
		.title {
			width: 152rpx;
			padding: 10rpx 16rpx;
		}
		.uni-input-placeholder {
			direction: rtl;
		}
		.uni-input {
			padding: 14rpx;
			direction: rtl;
		}
	}
	.module-button {
		padding: 32rpx 120rpx;
		.button-apply {
			padding: 2rpx 0;
			border-radius: 20px;
			font-size: 32rpx;
		}
	}
	.button-upload {
		padding: 4rpx 0 0;
		color: $ds-main-color;
		text-align: center;
	}
	.module-image {
		padding: 0 24rpx 8rpx;
	}
	.media-object {
		display: block;
		margin: 0 auto;
	}
	.module-two {
		.module-image {
			display: flex;
			padding: 0 8rpx 8rpx;
		}
		.media-object {
			width: 300rpx;
			height: 250rpx;
		}
		.media {
			width: 50%;
			padding: 0 16rpx;
		}
	}
	.modal-time {
		.modal-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 30rpx;
			border-bottom: 1px solid #eee;
		}
		.button {
			padding: 20rpx 32rpx;
			margin: 0;
			font-size: 28rpx;
			color: #0079fe;
		}
	}
}
</style>
