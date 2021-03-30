<template>
	<section>
		<transition name="el-fade-in">
			<router-view :key="$route.fullpath"></router-view>
		</transition>
	</section>
</template>

<script>
export default {
	data() {
		return {};
	},
};
</script>
