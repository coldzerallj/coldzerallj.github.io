<template>
	<section :class="['fresh-default-panel-wrap', fixClass]">
		<div class="fresh-fake-tabs-wrap" v-if="defaultPanelTab.length > 0 && needDefaultPanelTab">
			<ul class="fresh-fake-tabs">
				<li v-for="item in defaultPanelTab" v-bind:key="item.label" v-if="canVisit(item.to)">
					<router-link :to="{ name: item.to }">
						{{ item.label }}
					</router-link>
				</li>
			</ul>
		</div>
		<div class="fresh-fake-tabs-content-wrap">
			<slot name="router-view"></slot>
		</div>
	</section>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'DefaultPanel',

	props: {
		// 自定义样式
		fixClass: {
			type: String,
			default: '',
		},
	},

	data() {
		return {};
	},

	computed: {
		...mapState({
			permissions: state => state.profile.permissions,
			needDefaultPanelTab: state => state.component.needDefaultPanelTab,
			defaultPanelTab: state => state.component.defaultPanelTab,
		}),
	},

	methods: {
		canVisit(routeName) {
			const result = this.permissions.some(item => {
				if (item === routeName) {
					return true;
				}
			});
			return result;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '~@/style/theme/variable.scss';
@import '~@/style/mixins/mixins.scss';

.#{$class-name-pre-fixer}-default-panel-wrap {
	position: relative;
}

.#{$class-name-pre-fixer}-fake-tabs-content-wrap {
	padding: $gapSize-public * 4 $gapSize-public * 6;
}
</style>

<style lang="scss">
@import '~@/style/theme/variable.scss';
@import '~@/style/mixins/mixins.scss';

@mixin fake-tabs-curr() {
	@include animation-s(fakeTabsCurr, 0.3s, ease, 0, 1, normal, running, both);
}

@keyframes fakeTabsCurr {
	0% {
		width: 0;
		opacity: 0;
	}
	100% {
		width: 100%;
		opacity: 1;
	}
}

.#{$class-name-pre-fixer}-fake-tabs-wrap {
	padding: $gapSize-public * 4 $gapSize-public * 6 0 $gapSize-public * 6;

	&.after-nav-lv3 {
		padding: 0 0 $gapSize-public * 4 0;
	}

	.#{$class-name-pre-fixer}-fake-tabs {
		list-style: none;
		margin: 0;
		padding: 0;
		@include clearfix();
		border-bottom: 1px solid $borderColor-primary;

		> li {
			float: left;
			margin-right: $gapSize-public * 2;

			> a {
				padding: 0 $gapSize-public * 4;
				position: relative;
				color: $fontColor-secondary;
				display: block;
				line-height: $tabBtnHeight-default_panel;
				font-size: $fontSize-default;
				height: $tabBtnHeight-default_panel;
				text-decoration: none;

				&:after {
					position: absolute;
					bottom: -1px;
					left: 50%;
					transform: translate(-50%, 0);
					background-color: lighten($themeColor-primary, 20);
					height: 2px;
				}

				&.router-link-active {
					color: $themeColor-primary;
					background-color: #fff;

					&:after {
						content: '';
						@include rounded(2px);
						@include fake-tabs-curr();
					}
				}
			}
		}

		> li:first-child > a {
			padding-left: 0;
		}
	}
}
</style>
