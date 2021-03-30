<template>
	<div>
		role_1 roles management list
		<br />
		<router-link :to="{ name: $ALL_CONST.ROUTE_NAME.RN_ROLE1_RM_DETAIL }">
			detail
		</router-link>
		<br />
		<router-link :to="{ name: $ALL_CONST.ROUTE_NAME.RN_ROLE1_RM_FORM }">
			form
		</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
};
</script>
