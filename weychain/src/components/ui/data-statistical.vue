<template>
	<section :class="['data-statistical', fixClass]" v-if="data">
		<el-row class="data-statistical-row" v-for="(item, index) in data" v-bind:key="index">
			<template v-for="i in item.row">
				<!-- eslint-disable-next-line vue/valid-v-for -->
				<el-col :md="i.colLabelMd || 3" :lg="i.colLabelLg || 2" class="data-statistical-label">{{ i.label }}:</el-col>
				<!-- eslint-disable-next-line vue/valid-v-for -->
				<el-col :md="i.colValueMd || 5" :lg="i.colValueLg || 6" class="data-statistical-value">{{ i.value ? i.value : '--' }}</el-col>
			</template>
		</el-row>
	</section>
</template>

<script>
export default {
	name: 'DataStatistical',

	props: {
		// 自定义样式
		fixClass: {
			type: String,
			default: '',
		},
		data: {
			type: Array,
			default() {
				return [];
			},
		},
	},
};
</script>

<style lang="scss" scoped>
@import '~@/style/theme/variable.scss';
@import '~@/style/mixins/mixins.scss';

.data-statistical {
	border: 1px solid $borderColor-primary;
	box-sizing: border-box;
	@include rounded($borderRadius-public);
	padding: $gapSize-public * 4 $gapSize-public * 4 $gapSize-public * 4 $gapSize-public * 2;
	margin-bottom: $gapSize-public * 4;
	font-size: $fontSize-default;
	line-height: $fontSize-default * 1.4;
	background-color: $background-color-secondary;

	&-row {
		margin-bottom: $gapSize-public * 4;

		&:last-child {
			margin-bottom: 0;
		}
	}

	&-label {
		color: $fontColor-secondary;
		box-sizing: border-box;
		padding-left: $gapSize-public * 2;
		float: left;
	}

	&-value {
		color: $themeColor-thirdly;
		box-sizing: border-box;
		padding-left: $gapSize-public * 2;
		float: left;
	}
}
</style>
