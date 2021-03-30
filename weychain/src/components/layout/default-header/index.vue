<template>
	<section :class="['fresh-default-header-wrap', fixClass]">
		<div class="fresh-default-header">
			<div class="fresh-default-header-left">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>
						<i class="el-icon-s-home breadcrumb-home-icon"></i>
					</el-breadcrumb-item>
					<el-breadcrumb-item v-for="item in breadcrumb" v-bind:key="item.label">
						{{ item.label }}
					</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="fresh-default-header-right">
				<!-- <span class="fresh-default-header-right-btn">
					<span class="todo-tag" v-if="todoQty > 0">{{ todoQty }}</span>
					<i class="el-icon-message-solid"></i>
				</span> -->
				<!-- <el-tooltip class="item" effect="dark" :content="email" placement="bottom-end">
					<span class="fresh-default-header-right-btn not-entrance">
						<i class="el-icon-s-custom"></i>
					</span>
				</el-tooltip> -->
				<!-- <div class="non"></div> -->
				<!-- 测试 -->
				<el-tooltip class="item" effect="dark" :content="$t('deng-chu')" placement="bottom">
					<span class="fresh-default-header-right-btn logout" @click="logout()">
						<i class="el-icon-switch-button"></i>
					</span>
				</el-tooltip>
			</div>
		</div>
	</section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { STORE_TYPE, ROUTE_NAME } from '@HELPER/const';

const { LOGOUT } = STORE_TYPE;
const { RN_LOGIN } = ROUTE_NAME;

export default {
	name: 'Header',

	props: {
		// 自定义样式
		fixClass: {
			type: String,
			default: '',
		},
		// 账号
		email: {
			type: String,
			default: '',
		},
		// 未完成任务统计
		todoQty: {
			type: Number,
			default: 0,
		},
		// 面包屑
		breadcrumb: {
			type: Array,
			default() {
				return [];
			},
		},
	},

	data() {
		return {};
	},

	computed: {
		...mapState({
			userId: state => state.profile.userId,
			userName: state => state.profile.userName,
		}),
	},

	methods: {
		...mapActions({
			LOGOUT,
		}),

		async logout() {
			const params = new FormData();
			params.append('tenantId', 0);
			params.append('userName', this.userName);

			try {
				const res = await this[LOGOUT](params);
				if (res.code === 200 && res.message === 'success') {
					this.$notify.success({
						title: this.$t('deng-chu-cheng-gong'),
						message: this.$t('fan-hui-deng-lu-ye-mian'),
					});
					this.$router.push({
						name: RN_LOGIN,
					});
				} else {
					this.$notify.error({
						title: this.$t('shi-bai'),
						message: res.data,
					});
				}
			} catch (e) {
				if (e.errorMsg) {
					this.$notify.error({
						title: this.$t('shi-bai'),
						message: e.errorMsg,
					});
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import '~@/style/theme/variable.scss';
@import '~@/style/mixins/mixins.scss';

.breadcrumb-home-icon {
	font-size: $fontSize-large;
	color: $themeColor-secondary;
	vertical-align: text-top;
}

.#{$class-name-pre-fixer}-default-header-wrap {
	padding: 0 $gapSize-public * 6;
}

.#{$class-name-pre-fixer}-default-header {
	@include clearfix();
	border-bottom: 2px solid lighten($themeColor-secondary, 10);
	padding: 15px 0;

	&-left {
		float: left;
	}

	&-right {
		float: right;
		font-size: 0;
		line-height: 0;

		.non {
			display: inline-block;
			vertical-align: middle;
			width: 1px;
			height: $lineHeight-default_header * 0.6;
			background-color: $borderColor-primary;
			margin: 0 $gapSize-public * 3;
		}

		&-btn + &-btn {
			margin-left: $gapSize-public * 3;
		}

		&-btn {
			position: relative;
			display: inline-block;
			vertical-align: middle;
			box-sizing: border-box;
			border: 1px solid $borderColor-primary;
			background-color: lighten($themeColor-primary, 60);
			text-align: center;
			cursor: pointer;
			@include rounded(50%);
			@include square($lineHeight-default_header);
			@include transition(all, 0.3s, ease, 0);

			&.not-entrance {
				cursor: default;
			}

			> i {
				@include transition(all, 0.3s, ease, 0);
				font-size: $fontSize-large;
				line-height: $lineHeight-default_header - 2px; // 减去 border-box 模式下 border 体量占去的空间
				color: lighten($themeColor-primary, 30);
			}

			&:hover {
				box-shadow: 0 0 0 5px lighten($themeColor-primary, 55);
				border-color: lighten($themeColor-primary, 35);
				background-color: transparent;

				> i {
					color: $themeColor-primary;
				}
			}

			.todo-tag {
				position: absolute;
				top: -($lineHeight-default_header / 4);
				right: -($lineHeight-default_header / 4);
				background-color: $statusColor-error;
				@include square($lineHeight-default_header / 2);
				@include rounded(3px);
				padding: 0 1px;
				font-size: $fontSize-small;
				line-height: $lineHeight-default_header / 2;
				color: #fff;
			}

			&.logout {
				border: 1px solid lighten($statusColor-error, 25);
				background-color: lighten($statusColor-error, 28);

				> i {
					color: lighten($statusColor-error, 10);
					line-height: $lineHeight-default_header - 4px; // 微调图标位置
				}

				&:hover {
					box-shadow: 0 0 0 5px lighten($statusColor-error, 26);
					border-color: lighten($statusColor-error, 15);
					background-color: transparent;

					> i {
						color: $statusColor-error;
					}
				}
			}
		}
	}
}
</style>
