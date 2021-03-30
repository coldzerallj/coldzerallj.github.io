<template>
	<view class="page-info-none">
		<view class="module-none">
			<view class="iconfont" :class="[noneContent.icon]"></view>
			<view class="info-tips">{{ noneContent.tips }}</view>
		</view>
		<view class="module-button" v-if="needChangRouter">
			<navigator v-if="noneBtn.isToTabbar" open-type="switchTab" class="btn" :url="noneBtn.url">
				{{ noneBtn.title }}
			</navigator>
			<navigator v-else class="btn" :url="noneBtn.url">
				{{ noneBtn.title }}
			</navigator>
		</view>
	</view>
</template>
<script>
/**
 * pageInfoNone 页面空态组件
 * @property {Object} noneContent 页面图标和提示语
 * @property {Object} noneBtn 页面按钮文字和链接
 *
 * @example <pageInfoNone :noneContent="{icon:'',tips:''}" :noneBtn="{isToTabbar: true,url:'',title:''}"></skuList>
 */
export default {
	props: {
		noneContent: {
			type: Object,
			default: function () {
				return {};
			},
		},
		noneBtn: {
			type: Object,
			default: function () {
				return {};
			},
		},
		needChangRouter: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {};
	},
	mounted() {},
	methods: {},
};
</script>

<style lang="scss" scoped>
.page-info-none {
	.module-none {
		padding: 150rpx 0 80rpx;
		text-align: center;

		.iconfont {
			display: block;
			margin: 0 0 20rpx;
			font-size: 140rpx;
			color: $uni-color-main;
		}
		.info-tips {
			margin: 0 0 64rpx;
			font-size: $uni-font-size-lg;
			color: $uni-text-color-grey;
		}
	}
	.module-button {
		padding: 0 0 72rpx;
		display: flex;
		justify-content: center;
		.btn {
			background: $uni-color-main;
			padding: 18rpx 70rpx;
			margin: 0 20rpx;
			color: #fff;
			font-size: $uni-font-size-lg;
			border-radius: 40rpx;
		}
	}
}
</style>
