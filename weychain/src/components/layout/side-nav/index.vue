<template>
	<component :is="navComponent"></component>
</template>

<script>
import { mapState } from 'vuex';
import { ROLE_0, ROLE_1 } from '@HELPER/const';
import role0Nav from './role-0';
// import role1Nav from './role-1';

export default {
	name: 'RoleNav',

	components: {
		role0Nav,
		// role1Nav,
	},

	data() {
		return {};
	},

	computed: {
		...mapState({
			roleType: state => state.profile.roleType,
		}),

		navComponent() {
			return {
				[ROLE_0]: 'role0Nav',
				[ROLE_1]: 'role0Nav',
				// [ROLE_1]: 'role1Nav',
			}[this.roleType];
		},
	},
};
</script>
