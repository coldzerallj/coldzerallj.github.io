<template>
	<section>
		<el-menu class="el-menu-vertical custom-side-nav" router :default-active="path">
			<!-- 缴费标准管理 -->
			<!-- <el-menu-item :index="`/${$ALL_CONST.ROUTE_NAME.RN_CHARGE_STANDARD_MANAGEMENT}`" v-if="needNavGroup($ALL_CONST.NAV_GROUP.CHARGE_STANDARD_MANAGEMENT)">
				<i class="el-icon-s-operation side-nav-icon" />
				<div slot="title" class="side-nav-title">{{ $ALL_CONST.ROUTE_NAME.RN_CHARGE_STANDARD_MANAGEMENT_LABEL }}</div>
				<span class="current-sign">
					<i class="el-icon-arrow-left" />
				</span>
			</el-menu-item> -->

			<!-- 缴费管理 -->
			<el-menu-item
				:index="`/${$ALL_CONST.ROUTE_NAME.RN_CHARGE_MANAGEMENT}`"
				v-if="needNavGroup($ALL_CONST.NAV_GROUP.CHARGE_MANAGEMENT)"
				@click="changeBreadCrumb($ALL_CONST.ROUTE_NAME.RN_CHARGE_MANAGEMENT)"
			>
				<i class="el-icon-coin side-nav-icon" />
				<div slot="title" class="side-nav-title">{{ $ALL_CONST.ROUTE_NAME.RN_CHARGE_MANAGEMENT_LABEL }}</div>
				<span class="current-sign">
					<i class="el-icon-arrow-left" />
				</span>
			</el-menu-item>

			<!-- 优惠券管理 -->
			<el-menu-item
				:index="`/${$ALL_CONST.ROUTE_NAME.RN_COUPON_MANAGEMENT}`"
				v-if="needNavGroup($ALL_CONST.NAV_GROUP.COUPON_MANAGEMENT)"
				@click="changeBreadCrumb($ALL_CONST.ROUTE_NAME.RN_COUPON_MANAGEMENT)"
			>
				<i class="el-icon-present side-nav-icon" />
				<div slot="title" class="side-nav-title">{{ $ALL_CONST.ROUTE_NAME.RN_COUPON_MANAGEMENT_LABEL }}</div>
				<span class="current-sign">
					<i class="el-icon-arrow-left" />
				</span>
			</el-menu-item>

			<!-- 代收管理 -->
			<el-menu-item
				:index="`/${$ALL_CONST.ROUTE_NAME.RN_COLLECTION_MANAGEMENT}`"
				v-if="needNavGroup($ALL_CONST.NAV_GROUP.COLLECTION_MANAGEMENT)"
				@click="changeBreadCrumb($ALL_CONST.ROUTE_NAME.RN_COLLECTION_MANAGEMENT)"
			>
				<i class="el-icon-money side-nav-icon" />
				<div slot="title" class="side-nav-title">{{ $ALL_CONST.ROUTE_NAME.RN_COLLECTION_MANAGEMENT_LABEL }}</div>
				<span class="current-sign">
					<i class="el-icon-arrow-left" />
				</span>
			</el-menu-item>

			<!-- 活动管理 -->
			<el-menu-item
				:index="`/${$ALL_CONST.ROUTE_NAME.RN_EVENT_MANAGEMENT}`"
				v-if="needNavGroup($ALL_CONST.NAV_GROUP.EVENT_MANAGEMENT)"
				@click="changeBreadCrumb($ALL_CONST.ROUTE_NAME.RN_EVENT_MANAGEMENT)"
			>
				<i class="el-icon-shopping-bag-2 side-nav-icon" />
				<div slot="title" class="side-nav-title">{{ $ALL_CONST.ROUTE_NAME.RN_EVENT_MANAGEMENT_LABEL }}</div>
				<span class="current-sign">
					<i class="el-icon-arrow-left" />
				</span>
			</el-menu-item>
			<!-- 广告位管理 -->
			<el-menu-item
				:index="`/${$ALL_CONST.ROUTE_NAME.RN_ADVERTISING_MANAGEMENT}`"
				v-if="needNavGroup($ALL_CONST.NAV_GROUP.ADVERTISING_MANAGEMENT)"
				@click="changeBreadCrumb($ALL_CONST.ROUTE_NAME.RN_ADVERTISING_MANAGEMENT)"
			>
				<i class="el-icon-picture-outline side-nav-icon" />
				<div slot="title" class="side-nav-title">{{ $ALL_CONST.ROUTE_NAME.RN_ADVERTISING_MANAGEMENT_LABEL }}</div>
				<span class="current-sign">
					<i class="el-icon-arrow-left" />
				</span>
			</el-menu-item>

			<!-- 内容管理 -->
			<el-menu-item
				:index="`/${$ALL_CONST.ROUTE_NAME.RN_CONTENT_MANAGEMENT}`"
				v-if="needNavGroup($ALL_CONST.NAV_GROUP.CONTENT_MANAGEMENT)"
				@click="changeBreadCrumb($ALL_CONST.ROUTE_NAME.RN_CONTENT_MANAGEMENT)"
			>
				<i class="el-icon-document-copy side-nav-icon" />
				<div slot="title" class="side-nav-title">{{ $ALL_CONST.ROUTE_NAME.RN_CONTENT_MANAGEMENT_LABEL }}</div>
				<span class="current-sign">
					<i class="el-icon-arrow-left" />
				</span>
			</el-menu-item>
			<!-- 消息推送管理 -->
			<el-menu-item
				:index="`/${$ALL_CONST.ROUTE_NAME.RN_MESSAGE_MANAGEMENT}`"
				v-if="needNavGroup($ALL_CONST.NAV_GROUP.MESSAGE_MANAGEMENT)"
				@click="changeBreadCrumb($ALL_CONST.ROUTE_NAME.RN_MESSAGE_MANAGEMENT)"
			>
				<i class="el-icon-shopping-bag-2 side-nav-icon" />
				<div slot="title" class="side-nav-title">{{ $ALL_CONST.ROUTE_NAME.RN_MESSAGE_MANAGEMENT_LABEL }}</div>
				<span class="current-sign">
					<i class="el-icon-arrow-left" />
				</span>
			</el-menu-item>
			<!-- 配送管理 -->
			<el-menu-item
				:index="`/${$ALL_CONST.ROUTE_NAME.RN_DELIVERY_MANAGEMENT}`"
				v-if="needNavGroup($ALL_CONST.NAV_GROUP.DELIVERY_MANAGEMENT)"
				@click="changeBreadCrumb($ALL_CONST.ROUTE_NAME.RN_DELIVERY_MANAGEMENT)"
			>
				<i class="el-icon-truck side-nav-icon" />
				<div slot="title" class="side-nav-title">{{ $ALL_CONST.ROUTE_NAME.RN_DELIVERY_MANAGEMENT_LABEL }}</div>
				<span class="current-sign">
					<i class="el-icon-arrow-left" />
				</span>
			</el-menu-item>
		</el-menu>
	</section>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'Role0Nav',

	data() {
		return {
			path: '',
		};
	},

	computed: {
		...mapState({
			permissionsFull: state => state.profile.permissionsFull,
			currentRoutePath: state => state.component.currentRoutePath,
		}),
	},

	mounted() {
		this.path = this.currentRoutePath;
	},

	watch: {
		currentRoutePath() {
			this.path = this.currentRoutePath;
		},
	},

	methods: {
		changeBreadCrumb(name) {
			switch (name) {
				case this.$ALL_CONST.ROUTE_NAME.RN_CHARGE_MANAGEMENT:
					this.$EventBus.$emit(this.$ALL_CONST.EVENT_BUS_BACK_TO_CHARGE_LIST);
					break;
				default:
			}
		},

		needNavGroup(navGroupName) {
			const result = this.permissionsFull.some(item => {
				if (item.resKey === navGroupName) {
					return true;
				}
			});
			return result;
		},
	},
};
</script>
