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
					label: this.$ALL_CONST.ROUTE_NAME.RN_RIDER_LIST_LABEL,
					to: this.$ALL_CONST.ROUTE_NAME.RN_RIDER_LIST,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_SETTLEMENT_APPLY_LABEL,
					to: this.$ALL_CONST.ROUTE_NAME.RN_SETTLEMENT_APPLY,
				},
			],
		};
	},

	methods: {},

	created() {
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB, this.tabs);
	},
};
</script>
