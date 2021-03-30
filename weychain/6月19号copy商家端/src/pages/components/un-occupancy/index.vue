<template>
	<view class="open">
		<view class="tip-unline" v-if="type === '0'">
			<view class="top-icon"></view>
			<view class="title-tip-line"> 您还没登陆，请登录查看 </view>
			<!-- <view v-show="publish" class="title-tip"> 您未入驻，暂不可发布商品 </view> -->
			<view> <button type="main" class="infoBtn" @tap="forNewLogin">去登录</button></view>
		</view>
		<view class="tip" v-if="type === '1'">
			<view v-show="!publish" class="title-tip"> 您未入驻，暂无数据 </view>
			<view v-show="publish" class="title-tip"> 您未入驻，暂不可发布商品 </view>
			<view> <button type="main" class="infoBtn" @tap="forInfo">马上入驻</button></view>
		</view>
		<view class="tip-on" v-if="type === '2'">
			<view class="title-tip"> 店铺审核中，暂无数据</view>
			<!-- <view v-show="publish" class="title-tip"> 您的店铺正在审核中，暂不可销售商品，您可先发布商品，店铺审核通过之后再上架。</view> -->
			<view>
				<button type="main" class="infoBtn" @tap="forInfo">查看审核详情</button>
				<!-- <button v-if="publish" type="main" class="infoBtn" @tap="forPublish">发布商品</button>-->
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		type: {
			type: String,
			default: '',
		},
		publish: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		forInfo() {
			// console.log('tiaozhaung');

			uni.navigateTo({
				url: '/pages/user/my-shop/index',
			});
		},
		forPublish() {
			// console.log('tiaozhaungshenghe');
			uni.navigateTo({
				url: '/pages/product-manage/add/index',
			});
		},
		forNewLogin() {
			uni.navigateTo({
				url: '/pages/user/new-login/index',
			});
		},
	},
};
</script>
<style scoped lang="scss">
.open {
	background: #fff;
	z-index: 100;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	// 图片
	.top-icon {
		width: 174rpx;
		height: 174rpx;
		margin: 0 auto;
		// padding-top: 400rpx;
		background-image: $icon-store;
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: bottom;
		img {
			width: 174rpx;
			height: 174rpx;
		}
	}
	// 入驻,审核状态样式
	.tip,
	.tip-on {
		padding-top: 500rpx;
		height: 100rpx;
		position: relative;
		margin: 0 auto;
		text-align: center;
	}
	.title-tip {
		text-align: center;
		color: #616b80;
		font-size: 32rpx;
		padding: 0 60rpx;
		padding-top: 37rpx;
		padding-bottom: 37rpx;
	}
	// 未登录状态样式
	.tip-unline {
		padding-top: 300rpx;
		height: 100rpx;
		position: relative;
		margin: 0 auto;
		text-align: center;
	}
	.title-tip-line {
		text-align: center;
		color: #616b80;
		font-size: 32rpx;
		padding: 0 60rpx;
		padding-top: 37rpx;
		padding-bottom: 100rpx;
	}
	// 按钮
	.infoBtn {
		border-radius: 40rpx;
		width: 272rpx;
		height: 80rpx;
		font-size: 32rpx;
		margin-bottom: 32rpx;
	}
}
</style>
