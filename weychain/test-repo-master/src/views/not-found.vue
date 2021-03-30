<template>
	<section>
		<div>
			<img :src="imgUrl" :srcset="imgUrl2x + ' 2x'" width="444" />
		</div>
		<router-link to="/">
			{{ $t('hui-shou-ye') }}
		</router-link>
	</section>
</template>

<script>
const imgUrl = require('@/assets/404.png');
const imgUrl2x = require('@/assets/404@2x.png');

export default {
	data() {
		return {
			imgUrl,
			imgUrl2x,
		};
	},
};
</script>
