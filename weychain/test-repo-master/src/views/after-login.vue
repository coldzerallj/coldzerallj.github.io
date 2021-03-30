<template>
	<div>
		<div>
			导航--------
			<role-nav></role-nav>
		</div>
		<div>
			<br />
			<br />
			<br />
			页面内容--------
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import roleNav from '@LAYOUT/sidenav/index';

export default {
	components: {
		roleNav,
	},
};
</script>
