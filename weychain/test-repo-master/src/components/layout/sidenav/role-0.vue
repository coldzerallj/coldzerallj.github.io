<template>
	<div>
		<div v-if="needNavGroup($ALL_CONST.NAV_GROUP.TASK_MANAGEMENT)">
			<div>
				task management
			</div>
			<router-link
				:to="$ALL_CONST.ROUTE_NAME.RN_ROLE0_TM_LIST"
				v-if="needRouteEntrance($ALL_CONST.ROUTE_NAME.RN_ROLE0_TM_LIST)"
			>
				list
			</router-link>
			<br />
			<router-link
				:to="$ALL_CONST.ROUTE_NAME.RN_ROLE0_TM_REPORT"
				v-if="needRouteEntrance($ALL_CONST.ROUTE_NAME.RN_ROLE0_TM_REPORT)"
			>
				report
			</router-link>
		</div>
		<div v-if="needNavGroup($ALL_CONST.NAV_GROUP.ROLES_MANAGEMENT)">
			<div>
				roles management
			</div>
			<router-link
				:to="$ALL_CONST.ROUTE_NAME.RN_ROLE0_RM_LIST"
				v-if="needRouteEntrance($ALL_CONST.ROUTE_NAME.RN_ROLE0_RM_LIST)"
			>
				list
			</router-link>
			<br />
			<router-link
				:to="$ALL_CONST.ROUTE_NAME.RN_ROLE0_RM_REPORT"
				v-if="needRouteEntrance($ALL_CONST.ROUTE_NAME.RN_ROLE0_RM_REPORT)"
			>
				report
			</router-link>
		</div>
		<br />
		<a href="#" @click="logout()">
			logout
		</a>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { STORE_TYPE, ROUTE_NAME } from '@HELPER/const';

const { LOGOUT } = STORE_TYPE;
const { RN_LOGIN } = ROUTE_NAME;

export default {
	name: 'Role0Nav',

	data() {
		return {};
	},

	computed: {
		...mapState({
			permissions: state => state.profile.permissions,
			permissionsFull: state => state.profile.permissionsFull,
		}),
	},

	methods: {
		...mapActions({
			LOGOUT,
		}),

		needNavGroup(navGroupName) {
			const result = this.permissionsFull.some(item => {
				if (item.resKey === navGroupName) {
					return true;
				}
			});
			return result;
		},

		needRouteEntrance(routeName) {
			const result = this.permissions.some(item => {
				if (item === routeName) {
					return true;
				}
			});
			return result;
		},

		async logout(jump = true) {
			await this[LOGOUT]();
			if (jump) {
				this.$router.push({
					name: RN_LOGIN,
				});
			}
		},
	},
};
</script>
