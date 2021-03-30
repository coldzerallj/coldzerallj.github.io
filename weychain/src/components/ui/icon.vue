<template>
	<svg class="ui-icon" :class="typeCls">
		<use :xlink:href="'#' + sid"></use>
	</svg>
</template>

<script>
export default {
	name: 'UiIcon',

	props: {
		sid: {
			type: String,
			default: '',
		},
		type: {
			type: [Array, String],
			default: 'md',
		},
	},
	computed: {
		typeCls() {
			let ret = '';
			if (Array.isArray(this.type)) {
				for (let i = 0; i < this.type.length; i++) {
					ret += ` ui-icon--${this.type[i]}`;
				}
			} else {
				ret = `ui-icon--${this.type}`;
			}
			return ret;
		},
	},
};
</script>

<style lang="scss" scoped>
.ui-icon {
	$size: 16px;

	fill: #333333;
	transition: transform 0.3s;
	width: $size;
	height: $size;
	&--xxl {
		width: $size * 2.5;
		height: $size * 2.5;
	}
	&--md {
	}
	&--lg {
		width: $size * 1.2;
		height: $size * 1.2;
	}

	&--sm {
		width: $size / 1.2;
		height: $size / 1.2;
	}

	&--xs {
		width: 9px;
		height: 9px;
	}

	&--rev180 {
		transform: rotate(180deg);
	}

	&--rev270 {
		transform: rotate(270deg);
	}

	&--grey {
		fill: #999;
	}
}
</style>
