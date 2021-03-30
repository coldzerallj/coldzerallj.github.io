<template>
	<div>
		role_1 task management list
		<br />
		<router-link :to="{ name: $ALL_CONST.ROUTE_NAME.RN_ROLE1_TM_DETAIL }">
			detail
		</router-link>
		<br />
		<router-link :to="{ name: $ALL_CONST.ROUTE_NAME.RN_ROLE1_TM_FORM }">
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
