<template>
	<default-panel>
		<template slot="router-view">
			<router-view></router-view>
		</template>
	</default-panel>
</template>

<script>
import defaultPanel from '@LAYOUT/default-panel/index';
import store from '@STORE';
export default {
	components: {
		defaultPanel,
	},

	data() {
		return {
			tabs: [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_BOUTIQUE_LIST_LABEL,
					to: this.$ALL_CONST.ROUTE_NAME.RN_BOUTIQUE_LIST,
				},
				// {
				// 	label: this.$ALL_CONST.ROUTE_NAME.RN_CREATE_MESSAGE_PUSH_LABEL,
				// 	to: this.$ALL_CONST.ROUTE_NAME.RN_CREATE_MESSAGE_PUSH,
				// },
			],
		};
	},

	methods: {},

	created() {
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB, this.tabs);
	},
};
</script>
