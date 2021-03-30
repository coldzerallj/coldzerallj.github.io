<template>
	<div>
		<el-form label-position="top" label-width="auto" :model="addForm" :class="'custom-el-form'">
			<el-row>
				<el-col :md="6" :lg="6">
					<el-form-item label="消息标题">
						<el-input v-model="addForm.title" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="1" :lg="15">
					<el-form-item label="消息内容" class="letter_wirter">
						<!-- <el-input type="textarea" v-model="addForm.content" /> -->
						<textarea
							placeholder="请输入内容..."
							style="resize:none;line-height: 2;text-indent:7px"
							name=""
							rows=""
							cols=""
							v-model="addForm.content"
						></textarea>
						<!-- <span class="num">{{ (txtVal = addForm.content.length) }}/300</span> -->
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="16" :lg="10">
					<el-form-item>
						<div class="module-title-tips">
							<span class="ic"></span>上传图片<span class="img-tips">（上传图片格式为jpg,png等格式,建议尺寸为750x250px）</span>
						</div>
						<el-upload
							:limit="1"
							action="mbs/file/storage/upload"
							:headers="myHeaders"
							list-type="picture-card"
							:file-list="consumerRotationList"
							:on-success="getConsumerRotationImage"
							:on-remove="handleRemove"
							:on-exceed="handleexceed"
							:before-upload="beforeImgUpload"
						>
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog>
							<img width="100%" :src="addForm.picUrl" alt="" />
						</el-dialog>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="6" :lg="16">
					<el-form-item label="选择发送对象">
						<el-radio v-model="addForm.sendType" label="1">所有人</el-radio>
						<el-radio v-model="addForm.sendType" label="2">所有消费者</el-radio>
						<el-radio v-model="addForm.sendType" label="3">所有商家</el-radio>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :md="16" :lg="16" style="display:flex;" v-for="(item, index) in linkList" :key="index">
					<el-form-item label="填写链接名称（选填）">
						<el-input
							v-model.trim="linkList[index].nickName"
							style="width:260px"
							maxlength="10"
							show-word-limit
							@keyup.native="
								$event.target.value = $event.target.value.replace(
									/[‘’~!@#$%^&*()_\-+=<>?: {}|,.\/ ;\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘，。、]/,
									'',
								)
							"
						/>
						<div class="img-tips">链接名称不能未特殊符号，最多输入十个字符串</div>
					</el-form-item>
					<el-form-item label="填写链接地址" style="margin-left:40px">
						<el-input v-model.trim="linkList[index].linkUrl" style="width:260px" />
					</el-form-item>
					<div style="position:relative;top:40px;margin-left:40px" v-if="index === 0">
						<el-button type="primary" @click="addLink">添加新连接</el-button>
					</div>
					<div style="position:relative;top:40px;margin-left:40px" v-else>
						<el-button type="danger" @click="delLink(index)">删除</el-button>
					</div>
				</el-col>
			</el-row>
		</el-form>
		<div>
			<el-button type="primary" @click="saveList(1)">保存并发送</el-button>
			<el-button type="primary" @click="saveList(2)">保存</el-button>
			<el-button type="default" @click="goBack()">取消</el-button>
		</div>
	</div>
</template>

<script>
import store from '@STORE';
import api from '@API';
import cookie from 'js-cookie';
import { DATA_MODIFY, DATA_ADDITION, LOGIN_COOKIE_KEY } from '@HELPER/const';
export default {
	data() {
		return {
			loading: false,
			DATA_MODIFY,
			DATA_ADDITION,
			breadcrumb: [],
			filter: {
				tenantId: '',
				tenantName: '',
				startTime: '',
				endTime: '',
				pageNum: 1,
				pageSize: 10,
			},
			tableData: [],
			addForm: {
				sendType: '',
				title: '',
				content: '',
				picUrl: '',
				createdTime: '',
				deleteFlag: false,
				id: '',
				messageNo: '',
				status: 0,
				updatedTime: '',
			},
			consumerRotationList: [],
			isAddModify: true, // 编辑还是新增
			txtVal: 0,
			linkList: [{}],
		};
	},

	computed: {
		myHeaders() {
			if (cookie.get(LOGIN_COOKIE_KEY)) {
				return {
					'X-TOKEN': cookie.get(LOGIN_COOKIE_KEY),
				};
			}
		},
	},
	methods: {
		// 列表请求 url + 当前参数
		async setRequestUrl() {
			this.loading = true;
			const resData = await api.collectionManagement.getFlowList(this.filter);
			const data = JSON.parse(JSON.stringify(resData.data));
			this.tableData = data;
			this.loading = false;
		},
		// 保存/发送
		async saveList(type) {
			// 校验字段
			if (this.addForm.title === '') {
				this.$message.error('请填写消息标题');
				return false;
			}
			if (this.addForm.content === '') {
				this.$message.error('请填写消息内容');
				return false;
			}
			// if (this.addForm.picUrl === '') {
			// 	this.$message.error('请上传图片');
			// 	return false;
			// }
			if (this.addForm.sendType === '') {
				this.$message.error('请选择发送对象');
				return false;
			}
			this.addForm.sendType = Number(this.addForm.sendType);
			const parmas = this.addForm;
			parmas.links = this.linkList;
			const loading = this.$loading({
				lock: true,
				text: '处理中',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0)',
			});
			// isAddModify  编辑或新增
			if (this.isAddModify) {
				// 新增
				if (type === 1) {
					//  保存和发送
					const res = await api.messageManagement.addMallNotice(parmas);
					if (res.code !== 200) {
						this.$message.error(res.message);
						loading.close();
					}
					parmas.status = 1;
					parmas.id = res.data; // 新增完后，取id发送消息。
					const resData = await api.messageManagement.updateMallNotice(parmas);
					if (res.code === 200 && resData.code === 200) {
						loading.close();
						this.$notify.success({
							title: this.$t('cheng-gong'),
							message: '',
						});
						this.$router.go(-1);
					} else {
						loading.close();
						this.$message.error(resData.message);
					}
				} else {
					// 只保存
					loading.close();
					parmas.status = 0;
					const saveRes = await api.messageManagement.addMallNotice(parmas);
					if (saveRes.code === 200) {
						loading.close();
						this.$notify.success({
							title: this.$t('cheng-gong'),
							message: '',
						});
						this.$router.go(-1);
					} else {
						this.$message.error(saveRes.message);
					}
				}
			} else {
				// 修改发送状态
				if (type === 1) {
					loading.close();
					parmas.status = 1;
					const resData = await api.messageManagement.updateMallNotice(parmas);
					if (resData.code === 200) {
						loading.close();
						this.$notify.success({
							title: this.$t('cheng-gong'),
							message: '',
						});
						this.$router.go(-1);
					} else {
						this.$message.error(resData.message);
					}
				} else {
					// 只更新，不发送
					loading.close();
					parmas.status = 0;
					const saveRes = await api.messageManagement.updateMallNotice(parmas);
					if (saveRes.code === 200) {
						loading.close();
						this.$notify.success({
							title: this.$t('cheng-gong'),
							message: '',
						});
						this.$router.go(-1);
					} else {
						this.$message.error(saveRes.message);
					}
				}
			}
		},
		// 取消/返回
		goBack() {
			this.$router.go(-1);
		},

		// 图片上传
		handleRemove(file, fileList) {
			this.addForm.picUrl = '';
			// console.log(file, fileList);
		},
		// handlePictureCardPreview(file) {

		// 	this.dialogVisible = true;
		// },
		handleexceed(files, fileList) {
			// console.log('file', files);
			// console.log('fileList', fileList);
			this.$message.error('只能上传一张图片');
		},
		// 文件上传前的钩子
		beforeImgUpload(file, fileList) {
			const isImage = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg';
			if (!isImage) {
				this.$message.error('只能上传png,jpg,jpeg格式!');
				return false;
			}

			// if (isImage && isLt5M) {
			// 	this.uploadFile = file.raw || null;
			// } else {
			// 	fileList.splice(-1, 1);
			// }
		},
		// 文件上传成功时的钩子
		handlePictureSuc(response, file, fileList) {
			if (response.code === 200) {
				this.addForm.picUrl = response.data[0];
			}
		},
		getConsumerRotationImage(response, file, fileList) {
			this.addForm.picUrl = response.data[0];
		},

		// 重置列表
		resetList() {
			this.date = '';
			this.filter = {
				tenantId: '',
				tenantName: '',
				startTime: '',
				endTime: '',
				pageNum: 1,
				pageSize: 10,
			};
			this.getList();
		},
		// descInput() {
		// 	this.txtVal = this.desc.length;
		// },
		// 初始化面包屑
		initBreadcrumb() {
			this.breadcrumb = [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_MESSAGE_MANAGEMENT_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_CREATE_MESSAGE_PUSH_LABEL,
				},
			];
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_BREADCRUMB, this.breadcrumb);
		},
		addLink() {
			if (this.linkList.length >= 5) {
				this.$message.error('最多创建5个链接');
				return false;
			}
			this.linkList.push({});
			const linkListCopy = this.linkList;
			this.linkList = linkListCopy;
		},
		delLink(index) {
			this.linkList.splice(index, 1);
			const linkListCopy = this.linkList;
			this.linkList = linkListCopy;
		},
	},

	created() {
		if (this.$route.query.data) {
			const { data } = this.$route.query;
			this.addForm = JSON.parse(data);
			if (this.addForm.extJson) {
				this.linkList = JSON.parse(this.addForm.extJson);
			}
			this.addForm.sendType = String(this.addForm.sendType);
			if (this.addForm.picUrl.length > 44) {
				this.consumerRotationList.push({
					url: this.addForm.picUrl,
					name: '',
				});
			}
			this.isAddModify = false;
		}

		this.setRequestUrl();
		this.$EventBus.$on(this.$ALL_CONST.EVENT_BUS_BACK_TO_COLLECTION_MANAGEMENT, () => {
			this.initBreadcrumb();
		});
		this.initBreadcrumb();
	},
};
</script>
<style scoped>
.module-title-tips {
	padding: 0 0 3px;
	color: #606266;
}
.img-tips {
	font-size: 12px;
	color: #888;
}
.module-title-tips .ic {
	color: #f56c6c;
}

.letter_wirter {
	position: relative;
	width: 100%;
	height: auto;
	overflow: hidden;
}
textarea {
	width: 100%;
	height: 160px;
	padding: 9px;
	box-sizing: border-box;
	border-radius: 4px;
	border: 1px solid #dcdfe6;
	outline: none;
	color: #606266;
}
.num {
	position: absolute;
	bottom: 10px;
	right: 10px;
	color: #606266;
}
</style>
