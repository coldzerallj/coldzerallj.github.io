<template>
	<el-table :data="table.tbody" style="width: 100%">
		<el-table-column
			v-for="item in table.thead"
			v-bind:key="item.label"
			:prop="item.prop"
			:label="item.label"
			:width="item.width"
		>
		</el-table-column>
		<el-table-column align="right">
			<template slot="header" slot-scope="scope">
				<el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
			</template>
			<template slot-scope="scope">
				<el-tooltip content="详情" placement="top" effect="light">
					<el-button
						size="mini"
						@click="handleEdit(scope.$index, scope.row)"
						circle
					>
						<i class="el-icon-document table-icon-style"></i>
					</el-button>
				</el-tooltip>
				<el-tooltip content="修改" placement="top" effect="light">
					<el-button
						size="mini"
						@click="handleEdit(scope.$index, scope.row)"
						circle
					>
						<i class="el-icon-edit table-icon-style"></i>
					</el-button>
				</el-tooltip>
				<el-tooltip content="删除" placement="top" effect="light">
					<el-button
						size="mini"
						type="danger"
						@click="handleDelete(scope.$index, scope.row)"
						plain
						circle
					>
						<i class="el-icon-delete table-icon-style"></i>
					</el-button>
				</el-tooltip>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
export default {
	name: 'SectionTable',

	props: {
		thead: {
			type: Array,
			default() {
				return [];
			},
		},
		tbody: {
			type: Array,
			default() {
				return [];
			},
		},
	},

	data() {
		return {
			table: {
				thead: [],
				tbody: [],
			},
			search:""
		};
	},

	computed: {},

	methods: {
		initData() {
			this.table = {
				thead: this.thead,
				tbody: this.tbody,
			};
		},
	},

	created() {
		this.initData();
	},
};
</script>

<style lang="scss" scoped>
@import '~@/style/theme/variable';
@import '~@/style/mixins/mixins';

.table-button-style {
	padding-left: 7px;
	padding-right: 7px;
}

.table-icon-style {
	font-size: 18px;
}
</style>
