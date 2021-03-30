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
					label: this.$ALL_CONST.ROUTE_NAME.RN_MESSAGE_LIST_LABEL,
					to: this.$ALL_CONST.ROUTE_NAME.RN_MESSAGE_LIST,
				},
				// {
				// 	label: this.$ALL_CONST.ROUTE_NAME.RN_CREATE_MESSAGE_PUSH_LABEL,
				// 	to: this.$ALL_CONST.ROUTE_NAME.RN_CREATE_MESSAGE_PUSH,
				// },
			],
		};
	},

	methods: {
		// 初始化面包屑
		initBreadcrumb() {
			// this.breadcrumb = [
			// 	{
			// 		label: this.$ALL_CONST.ROUTE_NAME.RN_MESSAGE_MANAGEMENT_LABEL,
			// 	},
			// 	{
			// 		label: this.$ALL_CONST.ROUTE_NAME.RN_MESSAGE_LIST,
			// 	},
			// ];
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_BREADCRUMB, this.breadcrumb);
		},
	},

	created() {
		// this.$EventBus.$on(this.$ALL_CONST.EVENT_BUS_BACK_TO_COLLECTION_MANAGEMENT, () => {
		// 	this.initBreadcrumb();
		// });
		// this.initBreadcrumb();
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB, this.tabs);
	},
};
</script>
