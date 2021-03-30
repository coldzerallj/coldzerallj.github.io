<template>
	<!-- 活动列表 -->
	<section>活动列表（开发暂时搁置）</section>
</template>

<script>
import store from '@STORE';

export default {
	data() {
		return {
			tabs: [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_ACTIVITY_TEMPLATE_LABEL,
					to: this.$ALL_CONST.ROUTE_NAME.RN_ACTIVITY_TEMPLATE,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_EVENT_LIST_LABEL,
					to: this.$ALL_CONST.ROUTE_NAME.RN_EVENT_LIST,
				},
			],
			breadcrumb: [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_EVENT_MANAGEMENT_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_EVENT_LIST_LABEL,
				},
			],
		};
	},

	methods: {},

	created() {
		// 初始化面包屑
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_BREADCRUMB, this.breadcrumb);
		// 初始化 tab 按钮
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB, this.tabs);
	},
};
</script>
