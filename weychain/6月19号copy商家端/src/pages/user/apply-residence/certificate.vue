<template>
	<!-- <view class="module-header">
				{{ title }}
			</view>
			<view class="module-header-secondary">
				{{ describe }}
			</view> -->

	<view class="module-images">
		<view class="item" v-if="form.image !== ''">
			<span class="reset-img" @tap="handleChoose()">
				重新上传
			</span>
			<image :src="form.image" class="media-object" mode="widthFix" />
		</view>
		<view class="item button-upload" @tap="handleChoose()" v-else>
			<span>
				+
			</span>
			<!-- <view class="footerTip">正面照片（门头照）</view> -->
		</view>
	</view>
</template>
<script>
import { UPLOAD_URL } from '@/common/global';
export default {
	props: {
		title: {
			type: String,
			default: '',
		},
		describe: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: '',
		},
		imageURL: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			form: { image: '' },
		};
	},
	watch: {
		imageURL(value) {
			this.form.image = value;
		},
	},
	methods: {
		// 上传图片
		handleChoose() {
			const that = this;
			uni.chooseImage({
				count: 1,
				sizeType: [
					// 可以指定是原图还是压缩图，默认二者都有
					// 'original', // 暂时先只能上传压缩图
					'compressed',
				],
				sourceType: ['album', 'camera'], // 从相册选择或者拍照
				success: (res) => {
					// console.log('resdresres', res, this.form.OrganizationURL.length);

					that.uploadFile(res.tempFilePaths[0]);
				},
			});
		},
		// 上传文件到我们的服务器
		uploadFile(filePath) {
			uni.showLoading({
				title: `上传中...`,
				mask: true,
			});
			uni.uploadFile({
				url: UPLOAD_URL,
				filePath,
				name: 'file',
				header: {
					'x-token': uni.getStorageSync('xToken'),
				},
				success: (uploadFileRes) => {
					const { data } = JSON.parse(uploadFileRes.data);
					// console.log('datadatadata', data);
					this.$emit('transmitImage', data);
					this.form.image = data;

					uni.hideLoading();
					uni.showToast({
						icon: 'success',
						title: '上传成功',
						duration: 1500,
					});
				},
				fail: () => {
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: '上传失败',
						duration: 1500,
					});
				},
			});
		},
	},
};
</script>
<style scoped lang="scss">
.module-images {
	width: 210rpx;
	height: 210rpx;
	display: inline-block;

	margin-right: 28rpx;
	@include clearfix();
	.item {
		width: 210rpx;
		height: 210rpx;
		border-radius: 10rpx;
		@include rounded($uni-border-radius-lg);
		float: left;
		position: relative;
		box-sizing: border-box;
		overflow: hidden;
		// &:nth-child(3n) {
		// 	margin-right: 0;
		// }

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
.footerTip {
	padding-top: 20rpx;
	font-size: 20rpx;
	background: #fff;
	text-align: center;
}
</style>
