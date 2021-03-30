<script>
import { loginAgain } from '@/api/index.js';
export default {
	// 当uni-app 初始化完成时触发（全局只触发一次）
	onLaunch: function () {
		// const that = this;
		// #ifdef H5
		uni.navigateTo({
			url: '/pages/user/apply-residence/index',
		});
		// #endif
		// 	// #ifdef MP-WEIXIN
		loginAgain();
		// 	// #endif
		// if (!uni.getStorageSync('xToken')) {
		// 	// #ifdef MP-WEIXIN
		// 	loginAgain();
		// 	// #endif
		// }
	},
	// 当 uni-app 启动，或从后台进入前台显示
	onShow: function () {},
	// 	当 uni-app 从前台进入后台
	onHide: function () {},
};
</script>

<style lang="scss">
/*全局引入页面公共css */
@import url('./static/css/uni.css');
@import url('./static/css/iconfont.css');
@import url('./static/css/animation.css');

page {
	background-color: $uni-bg-color-othergrey;
}

::-webkit-scrollbar {
	display: none;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: none;
	background: transparent;
}

/* 重置 uni-app 上传图片组件的自带样式 by ray */
uni-image > div {
	background-size: auto 100% !important;
	background-position: center center;
}
</style>
