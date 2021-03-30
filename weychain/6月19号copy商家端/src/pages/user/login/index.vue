<template>
	<view class="module-login">
		<view class="tab-button">
			<view
				class="item"
				:class="{ active: index == curIndex }"
				v-for="(item, index) in tabList"
				:key="index"
				@click="handleTab(index)"
			>
				{{ item }}
			</view>
		</view>
		<view
			:class="{ 'animation-slide-left': curIndex == 0 }"
			v-show="curIndex == 0"
		>
			<LoginPassword @loginResult="loginPasswordResult"></LoginPassword>
		</view>
		<view
			:class="{ 'animation-slide-right': curIndex == 1 }"
			v-show="curIndex == 1"
		>
			<LoginPhone @loginResult="loginPhoneResult"></LoginPhone>
		</view>

		<view class="block-register">
			<navigator url="../register/index">创建账号</navigator>
		</view>

		<!-- #ifdef MP-WEIXIN -->
		<view class="other-tips">OR</view>
		<view class="other-login">
			<!-- #ifdef MP-WEIXIN -->
			<view class="button-wechat">
				<span class="iconfont iconweixindenglu"></span>
				<button open-type="getUserInfo" @getuserinfo="getuserinfo"></button>
				<!-- #endif -->
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
// import { Login } from '../../api/index.js';
import LoginPassword from '@/pages/components/login-password/login-password.vue';
import LoginPhone from '@/pages/components/login-phone/login-phone.vue';
export default {
	components: {
		LoginPassword,
		LoginPhone,
	},
	data() {
		return {
			tabList: ['密码登录', '短信快捷登录'],
			curIndex: 0,
			pageName: '',
			phone: '',
			code: '',
			validCode: true,
			getCodeTitle: '',
			getPhone: true,
			showPassword: true,
		};
	},

	onLoad(options) {
		if (options.page === undefined) {
			this.pageName = 'index';
		} else {
			this.pageName = options.page;
		}
	},
	methods: {
		handleTab(index) {
			this.curIndex = index;
		},
		loginPasswordResult(data) {
			uni.switchTab({
				url: '../../user/index',
			});
		},
		loginPhoneResult(data) {
			uni.switchTab({
				url: '../../user/index',
			});
		},
		getuserinfo: function (e) {
			const that = this;
			if (e.detail.encryptedData) {
				// 登录
				uni.login({
					success: function (res) {},
				});
			} else {
				// 用户按了拒绝按钮
				uni.switchTab({
					url: '/pages/' + that.pageName + '/index',
				});
			}
		},
	},
};
</script>

<style lang="scss">
.module-login {
	padding: 52rpx;

	.tab-button {
		display: flex;
		padding: 0 0 32rpx;

		.item {
			width: 50%;
			text-align: center;
			color: $uni-text-color-grey;
			&.active {
				color: $ds-main-color;
			}
		}
	}

	.block-register {
		padding: 32rpx 0 0;
		text-align: center;
		color: $ds-main-color;
	}

	.other-tips {
		margin: 80rpx 0 0;
		font-size: 26rpx;
		color: #999;
		text-align: center;
	}

	.other-login {
		display: flex;
		justify-content: center;
	}

	.button-wechat {
		position: relative;
	}

	.iconweixindenglu {
		font-size: 70rpx;
		color: #09bb07;
	}

	.button-wechat button {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		opacity: 0;
	}
}
</style>
