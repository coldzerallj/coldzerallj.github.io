<template>
	<section
		:class="['fresh-default-layout-wrap', modalFilter || globalLoading ? 'filter' : '']"
		v-loading.fullscreen.lock="globalLoading"
		:element-loading-text="$t('wang-luo-tong-xun-zhong')"
	>
		<div class="fresh-nav-container">
			<div class="fresh-nav-box">
				<div class="fresh-nav-logo-box">
					<!-- <router-link :to="{ name: $ALL_CONST.ROUTE_NAME.RN_HOME }" />-->
					<!-- <img :src="imgUrl" alt="logo" class="logo" /> -->
					<div class="solgan">
						{{ $t('sys-name') }}
					</div>
				</div>
				<slot name="nav"> </slot>
			</div>
		</div>
		<div class="fresh-view-wrap">
			<div class="fresh-view-container">
				<div class="fresh-view-content">
					<slot name="header"></slot>
					<slot name="router-view"></slot>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapState } from 'vuex';
const imgUrl = require('@/assets/logo.png');

export default {
	name: 'DefaultLayout',

	data() {
		return {
			imgUrl,
		};
	},

	computed: {
		...mapState({
			globalLoading: state => state.component.globalLoading,
			modalFilter: state => state.component.modalFilter,
		}),
	},
};
</script>

<style lang="scss" scoped>
@import '~@/style/theme/variable.scss';
@import '~@/style/mixins/mixins.scss';

.#{$class-name-pre-fixer}-default-layout-wrap {
	position: relative;
	width: 100%;
	max-width: 100%;
	height: 100%;

	&.filter {
		filter: blur(20px);
	}
}

.#{$class-name-pre-fixer}-nav-logo-box {
	height: $height-logo_box-side_nav;

	.logo {
		display: block;
		outline: none;
		height: $height-logo_box-side_nav;
	}

	.solgan {
		line-height: $height-logo_box-side_nav;
		font-size: 18px;
		color: #fff;
		text-align: center;
	}
}

.#{$class-name-pre-fixer}-nav-container {
	position: fixed;
	overflow-y: auto;
	overflow-x: hidden;
	top: 0;
	left: 0;
	width: $width-side_nav + 30px; // 30像素是留给滚动条的空间，这30像素空间将会被遮挡在内容区域之下，用户会开不见测导航的滚动条，只看到240像素宽的导航内容
	height: 100%;
	background-color: $themeColor-primary;
	z-index: $zIndex-nav;
}

.#{$class-name-pre-fixer}-nav-box {
	width: $width-side_nav;
}

.#{$class-name-pre-fixer}-view-wrap {
	box-sizing: border-box;
	margin-left: $width-side_nav;
	position: relative;
	z-index: $zIndex-view;
	height: 100%;
}

.#{$class-name-pre-fixer}-view-container {
	position: relative;
	box-sizing: border-box;
	display: table;
	height: 100%;
	width: 100%;
}

.#{$class-name-pre-fixer}-view-content {
	display: table-cell;
	width: 100%;
	height: 100%;
	padding-bottom: $gapSize-public * 6;
	background-color: #fff;
}
</style>
