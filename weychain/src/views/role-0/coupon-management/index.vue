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
					label: this.$ALL_CONST.ROUTE_NAME.RN_DIGITAL_PRODUCTS_MANAGEMENT_LABEL,
					to: this.$ALL_CONST.ROUTE_NAME.RN_DIGITAL_PRODUCTS_MANAGEMENT,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_COUPON_ISSUE_MANAGEMENT_LABEL,
					to: this.$ALL_CONST.ROUTE_NAME.RN_COUPON_ISSUE_MANAGEMENT,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_COUPON_ISSUE_RECORD_LABEL,
					to: this.$ALL_CONST.ROUTE_NAME.RN_COUPON_ISSUE_RECORD,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_COUPON_TRANSACTION_LABEL,
					to: this.$ALL_CONST.ROUTE_NAME.RN_COUPON_TRANSACTION,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_COUPON_WRITE_OFF_RECORD_LABEL,
					to: this.$ALL_CONST.ROUTE_NAME.RN_COUPON_WRITE_OFF_RECORD,
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
