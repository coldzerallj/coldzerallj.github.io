<template>
	<view :class="['searcher-entrance-wrap', fixedClass]">
		<view class="searcher-entrance">
			<span class="searcher-icon"></span>
			<span class="searcher-fake-placeholder">{{ fakePlaceholder }}</span>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		fixedClass: {
			type: String,
			default: '',
		},
		fakePlaceholder: {
			type: String,
			default: '',
		},
	},
};
</script>

<style lang="scss" scoped>
.searcher-entrance-wrap {
	position: relative;
	box-sizing: border-box;

	* {
		box-sizing: border-box;
	}

	.searcher-entrance {
		background-color: $searcher-bg-color-primary;
		color: $searcher-font-color-placeholder;
		height: $searcher-height;
		font-size: 0;
		line-height: 0;
		text-align: center;
		@include rounded($searcher-height);

		.searcher-icon {
			display: inline-block;
			vertical-align: middle;
			@include square($searcher-font-size-primary);
			background-image: $icon-searcher;
			background-position: center center;
			background-size: cover;
			background-repeat: no-repeat;
		}

		.searcher-fake-placeholder {
			padding-left: $uni-spacing-sm;
			font-size: $searcher-font-size-primary;
			line-height: $searcher-height;
			display: inline-block;
			vertical-align: middle;
		}
	}
}
</style>
