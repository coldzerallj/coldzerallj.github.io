<template>
	<section id="table-box" :class="fixedClass">
		<!-- 列表顶部按钮 -->
		<section class="fresh-table-top-btns" v-if="topBtns.length > 0">
			<div class="btns-box">
				<el-tooltip
					effect="dark"
					:content="item.tooltip"
					placement="bottom"
					v-for="(item, index) in topBtns"
					v-bind:key="item.btn"
					:disabled="item.tooltip ? false : true"
				>
					<el-button :icon="item.icon" :type="item.type" :plain="item.noPlain ? false : true" size="small" @click.stop="clickBtn(index)">
						<template v-if="!item.tooltip">
							{{ item.btn }}
						</template>
					</el-button>
				</el-tooltip>
			</div>
		</section>

		<!-- 列表 -->
		<el-table
			v-loading="loading"
			:data="table.tbody"
			style="width: 100%"
			ref="sectionTable"
			@selection-change="handleSelectionChange"
			@current-change="handleSingleSelection"
		>
			<el-table-column type="selection" width="55" v-if="needMultipleSelection" />
			<!-- <el-table-column type="selection" width="55" v-if="needMultipleSelection" /> -->
			<el-table-column
				v-for="(item, index) in table.thead"
				v-bind:key="index"
				:prop="item.prop"
				:label="item.label"
				:min-width="item.width"
				:width="item.fixWidth"
			>
				<template slot-scope="scope">
					<p @click="jumpInside(item.router, item.jump, scope.row)" :class="{ linkcss: item.jump }">
						<template v-if="item.type === 'picture'">
							<div class="listPic" @click="showPic(scope.row[item.prop], item.pictureName)">
								<img :src="scope.row[item.prop]" :alt="item.pictureName" />
							</div>
						</template>
						<template v-else-if="item.prop === 'rate'">{{ scope.row[item.prop] }}<template v-if="scope.row[item.prop]">%</template> </template>
						<template v-else>{{ scope.row[item.prop] }}</template>
					</p>
				</template>
			</el-table-column>
			<el-table-column align="right" width="180" :fixed="isfixed ? 'right' : false" v-if="table.tbody.length > 0 && tbtn.length > 0">
				<template slot-scope="scope">
					<el-tooltip
						:content="changeProps(item.needChangeProp, scope.row.status, scope.row.actStatus, item.prop)"
						placement="top"
						effect="light"
						v-for="(item, index) in table.tbtn"
						:key="index"
					>
						<template v-if="item.needChangeProp">
							<template v-if="scope.row.status === 4 || scope.row.actStatus === 4">
								<el-button size="mini" @click="tbtnClick(scope.$index, scope.row, item.prop)" circle type="success" plain>
									<i class="table-icon-style el-icon-top"></i>
								</el-button>
							</template>
							<template v-else>
								<el-button size="mini" @click="tbtnClick(scope.$index, scope.row, item.prop)" circle type="danger" plain>
									<i class="table-icon-style el-icon-bottom"></i>
								</el-button>
							</template>
						</template>
						<template v-else>
							<el-button size="mini" @click="tbtnClick(scope.$index, scope.row, item.prop)" circle :type="item.type" plain>
								<i class="table-icon-style" :class="item.icon"></i>
							</el-button>
						</template>
					</el-tooltip>
				</template>
			</el-table-column>
		</el-table>

		<!-- 翻页组件 -->
		<div class="pagination-box" v-if="totalSize">
			<el-pagination
				background
				:hide-on-single-page="false"
				layout="total, sizes, prev, pager, next, jumper"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="pageSize"
				@current-change="handleCurrentChange"
				:current-page="pageNum"
				@size-change="handleSizeChange"
				:total="totalSize"
			/>
		</div>
		<!-- 图片弹窗 -->
		<el-dialog :title="picName" :visible.sync="showPicture" :append-to-body="true" width="760px">
			<div class="pic_box">
				<div class="pic">
					<img :src="picUrl" :alt="picName" />
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showPicture = false">取 消 </el-button>
				<!-- <el-button type="primary">确 认 </el-button> -->
			</span>
		</el-dialog>
	</section>
</template>

<script>
// import axios from 'axios';
import api from '@API';
// const baseURL = process.env.API_ROOT;
export default {
	name: 'SectionTable',
	props: {
		fixedClass: {
			type: String,
			default: '',
		},
		needMultipleSelection: {
			type: Boolean,
			default: false,
		},
		needSingleSelection: {
			type: Boolean,
			default: false,
		},
		topBtns: {
			type: Array,
			default() {
				return [];
			},
		},
		thead: {
			type: Array,
			default() {
				return [];
			},
		},
		url: {
			type: String,
			default: '',
		},
		myBaseUrl: {
			type: String,
			default: '',
		},
		tbtn: {
			type: Array,
			default() {
				return [];
			},
		},
		isfixed: {
			type: Boolean,
			default: true,
		},
		usePost: {
			type: Boolean,
			default: false,
		},
		urlParams: {
			type: Object,
			default() {
				return {};
			},
		},
	},

	data() {
		return {
			loading: false,
			table: {
				thead: [],
				tbody: [],
				tbtn: [],
			},
			search: '',
			pageNum: 1,
			pageSize: 10,
			totalSize: 0,
			multipleSelectionNow: [], // 当前一共选择的数据
			showPicture: false,
			picUrl: '',
			picName: '',
		};
	},

	watch: {},

	methods: {
		changeProps(needChangeProp, status, actStatus, prop) {
			if (needChangeProp) {
				if (status === 1 || status === 2 || status === 3) {
					prop = '下线活动';
				} else if (status === 4) {
					prop = '上线活动';
				}

				if (actStatus === 1 || actStatus === 2 || actStatus === 3) {
					prop = '下线活动';
				} else if (actStatus === 4) {
					prop = '上线活动';
				}
				return prop;
			} else {
				return prop;
			}
		},

		// 单选事件
		handleSingleSelection(val) {
			if (this.needSingleSelection) {
				this.$emit('handleSingleSelection', val);
			} else {
				return;
			}
		},

		// 多选事件
		handleSelectionChange(val) {
			this.multipleSelectionNow = val;
			this.$emit('handleSelectionChange', this.multipleSelectionNow);
		},

		handleSizeChange(val) {
			this.pageSize = val;
			// if (this.myBaseUrl === 'pay') {
			// 	axios.defaults.baseURL = 'pay';
			// }
			this.componentsFetchData(this.url);
		},

		clickBtn(index) {
			switch (this.topBtns[index].btn) {
				case '刷新':
					this.$parent.fetchData();
					break;
				default:
					this.$emit('clickBtn', this.topBtns[index].btn);
			}
		},

		initData() {
			this.table = {
				thead: this.thead,
				tbody: this.tbody,
				tbtn: this.tbtn,
			};
			this.$emit('filterData');

			// axios.defaults.baseURL = baseURL;
		},

		async getData(url) {
			this.loading = true;
			const params = {};
			params.params = {};
			// this.$store.state.profile.blockchainId ? (params.params.blockchainId = this.$store.state.profile.blockchainId) : (params.params.blockchainId = null);
			if (this.usePost) {
				this.urlParams.pageNum = this.pageNum ? this.pageNum : 1;
				this.urlParams.pageSize = this.pageSize;
				const res = await api.sectionTableDefaultApiToolPost(url, this.urlParams);
				this.res = res;
				this.changeZh();
				this.$nextTick(() => {
					this.loading = false;
					this.tbody = res.data;
					this.totalSize = Number(res.totalSize);
					this.initData();
				});
			} else {
				params.params.pageNum = this.pageNum;
				let URL = '';
				if (this.pageNum) {
					URL = `${url}&pageSize=${this.pageSize}&pageNum=${this.pageNum}`;
				} else {
					URL = `${url}&pageSize=${this.pageSize}`;
				}
				const res = await api.sectionTableDefaultApiTool(URL);
				this.res = res;
				this.changeZh();
				this.$nextTick(() => {
					this.loading = false;
					this.tbody = res.data;
					this.totalSize = Number(res.totalSize);
					this.initData();
				});
			}
		},
		changeZh() {
			this.thead.map(item => {
				if (item.change) {
					this.res.data.map(r => {
						item.change.map(c => {
							if (c.code === r[item.tprop]) {
								r['zh' + item.tprop] = c.label;
							}
						});
					});
				}
			});
		},
		fetchData(url) {
			this.pageNum = 1;
			this.getData(url);
		},
		componentsFetchData(url) {
			this.getData(url);
		},
		jumpInside(routerUrl, isjump, data) {
			if (!isjump) return;
			this.$store.dispatch(this.$ALL_CONST.STORE_TYPE.GET_BLOCKCHAINID, data.id);
			this.$router.push({
				name: routerUrl,
			});
		},

		handleCurrentChange(val) {
			// 分页
			// 分页刷新
			// if (this.myBaseUrl === 'pay') {
			// 	axios.defaults.baseURL = 'pay';
			// }
			this.pageNum = val;
			this.componentsFetchData(this.url);
		},

		tbtnClick(index, row, prop) {
			const $table = this.$refs.sectionTable;
			switch (prop) {
				case '更多': {
					this.table.tbody.map(item => {
						if (row.id !== item.id) {
							$table.toggleRowExpansion(item, false);
						}
					});
					$table.toggleRowExpansion(row);
					break;
				}
				default:
			}
			this.$emit('tbtnClick', index, row, prop);
		},
		showPic(url, name) {
			this.showPicture = true;
			this.picUrl = url;
			this.picName = name;
		},
	},

	mounted() {
		this.getData(this.url);
	},
};
</script>

<style lang="scss" scoped>
// @import '~@/style/theme/variable';
// @import '~@/style/mixins/mixins';

// .#{$class-name-pre-fixer}-table-top-btns {
// 	padding-bottom: $gapSize-public * 4;
// 	@include clearfix();

// 	.btns-box {
// 		float: left;
// 	}
// }

// .pagination-box {
// 	padding-top: $gapSize-public * 4;
// 	text-align: right;
// }
.pic_box {
	padding: 0 32px;
	.pic {
		width: 80%;
		min-height: 320px;
		margin: 0 auto;
		background: #000;
	}
}
</style>
