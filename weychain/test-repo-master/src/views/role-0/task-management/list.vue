<template>
	<section>
		<section-table :thead="table.thead" :tbody="table.tbody" />
	</section>

	<!-- <div>
		role_0 task management list
		<br />
		<router-link :to="{ name: $ALL_CONST.ROUTE_NAME.RN_ROLE0_TM_DETAIL }">
			detail
		</router-link>
		<br />
		<router-link :to="{ name: $ALL_CONST.ROUTE_NAME.RN_ROLE0_TM_FORM }">
			form
		</router-link>
		<router-view></router-view>
	</div> -->
</template>

<script>
export default {
	data() {
		return {
			table: {
				thead: [
					{
						prop: `date`,
						label: `日期`,
						width: `180`,
					},
					{
						prop: `name`,
						label: `姓名`,
						width: `180`,
					},
					{
						prop: `address`,
						label: `地址`,
						width: ``,
					},
				],
				tbody: [
					{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
					},
					{
						date: '2016-05-04',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1517 弄',
					},
					{
						date: '2016-05-01',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1519 弄',
					},
					{
						date: '2016-05-03',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1516 弄',
					},
				],
			},
		};
	},
};
</script>
