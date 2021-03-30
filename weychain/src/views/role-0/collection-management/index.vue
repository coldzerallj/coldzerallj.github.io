<template>
	<default-panel>
		<template slot="router-view">
			<router-view></router-view>
		</template>
	</default-panel>
</template>

<script>
import store from '@STORE';
import defaultPanel from '@LAYOUT/default-panel/index';

export default {
	components: {
		defaultPanel,
	},

	data() {
		return {
			tabs: [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_SUB_MERCHANTS_LABEL,
					to: this.$ALL_CONST.ROUTE_NAME.RN_SUB_MERCHANTS,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_TRANSACTION_FLOW_LABEL,
					to: this.$ALL_CONST.ROUTE_NAME.RN_TRANSACTION_FLOW,
				},
			],
		};
	},

	methods: {
		// 初始化面包屑
		initBreadcrumb() {
			this.breadcrumb = [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_COLLECTION_MANAGEMENT_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_SUB_MERCHANTS_LABEL,
				},
			];
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_BREADCRUMB, this.breadcrumb);
		},
	},

	created() {
		this.$EventBus.$on(this.$ALL_CONST.EVENT_BUS_BACK_TO_COLLECTION_MANAGEMENT, () => {
			this.initBreadcrumb();
		});
		this.initBreadcrumb();
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB, this.tabs);
	},
};
</script>
