<template>
	<view class="my-shop" :class="{ 'bg-color': bgColor }">
		<notSettledShop v-if="currentTabComponent"></notSettledShop>
		<SettledShop ref="settledShop" v-else></SettledShop>
	</view>
</template>
<script>
import notSettledShop from '@/pages/components/not-settled-shop/index.vue';
import SettledShop from '@/pages/components/settled-shop/index.vue';
import { SettleInStatus } from '@/api/index.js';
export default {
	components: {
		notSettledShop,
		SettledShop,
	},
	data() {
		return {
			// currentTabComponent: this.$store.state.user.applyProgress.applyStatus !== 9,
			// bgColor: this.$store.state.user.applyProgress.applyStatus === 9 || this.$store.state.user.applyProgress.applyStatus === 1,
		};
	},
	computed: {
		currentTabComponent() {
			return this.$store.state.user.applyProgress.applyStatus !== 9;
		},
		bgColor() {
			return this.$store.state.user.applyProgress.applyStatus === 9 || this.$store.state.user.applyProgress.applyStatus === 1;
		},
	},
	created() {
		const that = this;
		uni.showLoading();
		SettleInStatus().then((res) => {
			uni.hideLoading();
			const { data } = res;
			// 入驻状态 1、未入驻；2、运营平台待审核；3、运营平台审核不通过；
			// 4、支付平台待审核；5、支付平台审核不通过；6、待账户验证；7、待签约；8、正常运营
			if (res.code === 200) {
				that.$store.dispatch('user/applyProgress', data);
				if (data.applyStatus === 9) {
					uni.setStorageSync('status', '3');
				}
			}
			// uni.navigateTo({
			// 	url: '/pages/user/my-shop/index',
			// });
		});
	},
	onShow() {
		this.$refs['settledShop'].refreshData();
	},
	onHide() {
		uni.removeStorage('storeData');
	},
	onLoad() {},
	methods: {},
};
</script>
<style lang="scss" scoped>
// page {
// 	background-color: $uni-bg-color-grey;
// }
.my-shop {
	min-height: 100vh;
	margin: 0;
	padding: 0;
	background-color: #fff;
}
.bg-color {
	background-color: $uni-bg-color-grey;
}
</style>
