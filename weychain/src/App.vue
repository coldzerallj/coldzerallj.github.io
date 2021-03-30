<template>
	<transition name="el-fade-in">
		<router-view :key="$route.fullpath"></router-view>
	</transition>
</template>

<script>
export default {
	data() {
		return {};
	},
};
</script>
