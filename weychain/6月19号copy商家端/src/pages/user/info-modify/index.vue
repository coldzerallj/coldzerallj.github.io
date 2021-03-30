<template>
	<view class="module-info-modify">
		<view class="module-image">
			<image class="media-object" mode="widthFix"></image>
			<view class="button-upload" @tap="handleChoose">修改头像</view>
		</view>
		<view class="uni-form-item">
			<text class="input-addon">修改用户名</text>
			<input class="uni-input" type="text" placeholder="请输入用户名" />
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imgArr: [],
		};
	},
	onLoad(options) {},
	methods: {
		handleChoose() {
			uni.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], // 从相册选择
				success: (res) => {
					window.console.log(JSON.stringify(res.tempFilePaths));
					this.imgArr = res.tempFilePaths;
				},
			});
		},
	},
};
</script>

<style lang="scss">
.module-info-modify {
	padding: 80rpx 0 0;
	.module-image {
		margin: 0 0 60rpx;
	}
	.media-object {
		background: #ccc;
		display: block;
		width: 170rpx;
		height: 170rpx;
		margin: 0 auto;
		border-radius: $uni-border-radius-circle;
	}
	.button-upload {
		padding: $uni-spacing-base 0 0;
		text-align: center;
		color: $uni-color-main;
		font-size: 30rpx;
	}
	.uni-form-item {
		padding: 0 $uni-spacing-base;
		align-items: center;
		@include borderCreator('top', solid, #ddd);
		@include borderCreator('bottom', solid, #ddd);
	}
}
</style>
