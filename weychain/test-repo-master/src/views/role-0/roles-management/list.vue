<template>
	<div>
		role_0 roles management list
		<br />
		<el-button>默认按钮</el-button>
		<br />
		<router-link :to="{ name: $ALL_CONST.ROUTE_NAME.RN_ROLE0_RM_DETAIL }">
			detail
		</router-link>
		<br />
		<router-link :to="{ name: $ALL_CONST.ROUTE_NAME.RN_ROLE0_RM_FORM }">
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
