<template>
	<default-panel>
		<template slot="router-view">
			<router-view></router-view>
		</template>
	</default-panel>
</template>

<script>
import defaultPanel from '@LAYOUT/default-panel/index';

export default {
	components: {
		defaultPanel,
	},

	data() {
		return {};
	},

	methods: {},

	created() {},
};
</script>
