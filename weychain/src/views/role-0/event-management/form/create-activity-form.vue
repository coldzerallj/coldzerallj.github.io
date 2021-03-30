<template>
	<section>
		<!-- 添加 触发型规则 -->
		<!-- 表单 -->
		<el-form label-position="top" label-width="auto" :model="form" :class="'custom-el-form'" ref="form" :rules="rules">
			<el-row>
				<el-col :md="16" :lg="10">
					<el-form-item label="规则类型" :required="true">
						<el-select :disabled="addForm.id ? true : false" v-model="addForm.templateId" :class="'block-select'" placeholder="请选择规则类型">
							<el-option v-for="item in templateSelectList" :key="item.id" :label="item.name" :value="item.id" />
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row v-if="addForm.templateId == ''">
				<el-col :md="16" :lg="10">
					<div class="custom-form-btns-wrap">
						<el-button type="default" @click="goBack">
							<template>{{ $t('fan-hui') }}</template>
						</el-button>
					</div>
				</el-col>
			</el-row>
			<template v-if="addForm.templateId == '1'">
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="场景" :required="true">
							<!-- <el-input value="注册" /> -->
							<el-select
								:disabled="addForm.id ? true : false"
								v-model="addForm.sceneCode"
								:class="'block-select'"
								placeholder="请选择场景"
								@change="handleSelectScene"
							>
								<!-- <el-option label="下单付款成功" value="下单付款成功" /> -->
								<el-option v-for="item in sceneList" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="规则名称" :required="true">
							<el-input :disabled="addForm.myStatus && addForm.myStatus !== 4" v-model="addForm.name" placeholder="请输入规则名称" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="规则有效期" :required="true">
							<el-date-picker
								:disabled="addForm.myStatus && addForm.myStatus !== 4"
								v-model="selectDate"
								:picker-options="actPickerOptions"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								value-format="yyyy-MM-dd"
							>
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="16" :lg="8">
						<el-form-item label="规则生效时段" :required="true">
							<el-time-picker
								:disabled="addForm.myStatus && addForm.myStatus !== 4"
								is-range
								v-model="selectTime"
								value-format="HH:mm:ss"
								format="HH:mm:ss"
								range-separator="至"
								start-placeholder="开始时间段"
								end-placeholder="结束时间段"
								placeholder="选择时间范围"
							>
							</el-time-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="规则简介" :required="true">
							<el-input
								:disabled="addForm.myStatus && addForm.myStatus !== 4"
								class="input-textarea"
								:autosize="{ maxRows: 8 }"
								v-model="addForm.comment"
								type="textarea"
								maxlength="500"
								show-word-limit
							/>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="发券设置" class="module-title"> </el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="数字产品类型" :required="true">
							<el-select v-model="addForm.prizeType" :class="'block-select'" :disabled="addForm.id ? true : false">
								<el-option label="优惠劵" value="1" />
								<!-- <el-option label="积分" value="2" /> -->
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="优惠券选择" :required="true">
							<el-input v-model="addForm.productName" readonly>
								<el-button v-if="!addForm.id" @click="choosePrize" slot="append">点击选择</el-button>
								<el-button v-else slot="append">不可修改</el-button>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="发券总数量" :required="true">
							<el-input v-model="addForm.prizeAmount" value="" type="number" :disabled="addForm.myStatus && addForm.myStatus !== 4" />
						</el-form-item>
						<div class="custom-tips-in-form">
							*说明：发放的优惠券达到该数量时，系统将不再发券，用户不可领券
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="发券数量（单次）" :required="true">
							<el-input
								v-model="addForm.prizeCount"
								value=""
								type="number"
								:disabled="(addForm.myStatus && addForm.myStatus !== 4) || addForm.sceneCode == 3"
							/>
						</el-form-item>
						<div class="custom-tips-in-form">
							*说明：指单个用户参与1次规则可领取的优惠券数量
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="优惠券有效期" :required="true" class="module-title-coupon"> </el-form-item>
						<el-radio-group v-model="addForm.prizeTimeType" style="padding:12px 0">
							<el-radio :label="1">固定起止时间</el-radio>
							<el-radio :label="2">固定可用时长</el-radio>
						</el-radio-group>
						<template v-if="addForm.prizeTimeType == 1">
							<el-date-picker
								:disabled="(addForm.myStatus && addForm.myStatus !== 4) || addForm.productId == ''"
								v-model="selectCouponDate"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								value-format="yyyy-MM-dd"
								:picker-options="couponPickerOptions"
							>
							</el-date-picker>

							<div class="custom-tips-in-form">
								*说明：选择该项，则发出的券的有效期都一致，生效日期当天0点生效，截止日期当天24点过期
							</div>
						</template>
						<template v-if="addForm.prizeTimeType == 2">
							<el-input
								v-model="addForm.prizeDuration"
								:disabled="(addForm.myStatus && addForm.myStatus !== 4) || addForm.productId == ''"
								placeholder=""
								type="number"
							>
								<template slot="append">天</template>
							</el-input>
							<div class="custom-tips-in-form">
								*说明：优惠券起止时日期从发放当前计算，如有效期是10天，发放日期是 6月1日，则起止日期是6月1日 0点~6月10日
								24点。发放日期不同，起止日期也不相同，但可用时长一致 ;如固定时长是10天，规则将在已发行优惠券截止时间10天前失效。
							</div>
						</template>
					</el-col>
				</el-row>

				<el-row class="row-spe">
					<el-col :md="13" :lg="8">
						<el-form-item label="优惠券可用时段限制" :required="true">
							<el-time-picker
								:disabled="(addForm.myStatus && addForm.myStatus !== 4) || addForm.couponTimeNo"
								is-range
								v-model="selectCouponTime"
								value-format="HH:mm"
								format="HH:mm"
								range-separator="至"
								start-placeholder="开始时间段"
								end-placeholder="结束时间段"
								placeholder="选择时间范围"
							>
							</el-time-picker>
						</el-form-item>
					</el-col>
					<el-col :md="1" :lg="1">
						<el-checkbox @change="handleCouponTimeNo" v-model="addForm.couponTimeNo">
							不限制
						</el-checkbox>
					</el-col>
				</el-row>

				<el-row>
					<el-col :md="16" :lg="10">
						<div class="custom-tips-in-form">
							*说明：优惠券可用时段是指优惠券在一天中指定时段可用该券，指定时段之外不可用
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="优惠券适用场景" :required="true">
							<!-- <el-input value="注册" /> -->
							<el-select
								:disabled="addForm.myStatus && addForm.myStatus !== 4"
								v-model="addForm.useScene"
								:class="'block-select'"
								placeholder="选择优惠券适用场景"
								@change="handleSelectScene"
							>
								<el-option label="线上" value="10" />
								<el-option label="线下" value="30" />
								<el-option label="不限" value="20" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="领券限制" class="module-title"> </el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="24" :lg="24">
						<el-row>
							<el-col :md="16" :lg="10">
								<el-form-item label="总领券次数" class="module-spe" :required="true">
									<el-input
										v-model="addForm.limitTypeOne.val"
										placeholder=""
										type="number"
										:disabled="addForm.limitTypeOne.isAll || (addForm.myStatus && addForm.myStatus !== 4)"
									>
										<template slot="append">
											<span v-if="addForm.myStatus && addForm.myStatus !== 4" class="checkbox-mask"></span>
											<span>次/人</span>
											<el-checkbox
												@change="handleCheckCount(addForm.limitTypeOne.isAll, 'limitTypeOne')"
												style="padding-left:20px"
												v-model="addForm.limitTypeOne.isAll"
											>
												不限制
											</el-checkbox>
										</template>
									</el-input>
								</el-form-item>
								<div class="custom-tips-in-form">
									*说明：指规则有效期内，一个用户可参加活动、获取奖励的总次数。优先级：总次数>每月次数>每天次数
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col :md="16" :lg="10">
								<el-form-item label="月领券次数" class="module-spe" :required="true">
									<el-input
										v-model="addForm.limitTypeTwo.val"
										placeholder=""
										type="number"
										:disabled="addForm.limitTypeTwo.isAll || (addForm.myStatus && addForm.myStatus !== 4)"
									>
										<template slot="append">
											<span v-if="addForm.myStatus && addForm.myStatus !== 4" class="checkbox-mask"></span>
											<span>次/人</span>
											<el-checkbox
												@change="handleCheckCount(addForm.limitTypeTwo.isAll, 'limitTypeTwo')"
												style="padding-left:20px"
												v-model="addForm.limitTypeTwo.isAll"
												label="-1"
												>不限制</el-checkbox
											>
										</template>
									</el-input>
								</el-form-item>
								<div class="custom-tips-in-form">
									*说明：指规则有效期内，一个用户一个月可领券的次数，不可多于总参与次数
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col :md="16" :lg="10">
								<el-form-item label="每天领取次数" class="module-spe" :required="true">
									<el-input
										v-model="addForm.limitTypeThr.val"
										placeholder=""
										type="number"
										:disabled="addForm.limitTypeThr.isAll || (addForm.myStatus && addForm.myStatus !== 4)"
									>
										<template slot="append">
											<span v-if="addForm.myStatus && addForm.myStatus !== 4" class="checkbox-mask"></span>
											<span>次/人</span>
											<el-checkbox
												@change="handleCheckCount(addForm.limitTypeThr.isAll, 'limitTypeThr')"
												style="padding-left:20px"
												v-model="addForm.limitTypeThr.isAll"
												label="-1"
											>
												不限制
											</el-checkbox>
										</template>
									</el-input>
								</el-form-item>
								<div class="custom-tips-in-form">
									*说明：指活动期间，一个用户一天内领券的次数，不可多于每月参与次数。适用于类似每日签到之类的场景。如不须每日限制，限制总领取次数或每月领取次数即可。
								</div>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="面向用户群" :required="true">
							<el-select v-model="addForm.userType" :class="'block-select'" disabled>
								<el-option label="消费者端" value="2" />
								<el-option label="商家端" value="1" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- <el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="封面图片" :required="true">
							<img src="" alt="封面图片" />
							<el-upload
								:limit="1"
								action="mbs/file/storage/upload"
								:headers="myHeaders"
								list-type="picture-card"
								:file-list="fileList"
								:on-success="handlePictureSuc"
								:on-remove="handleRemove"
								:on-exceed="handleexceed"
								:disabled="addForm.myStatus && addForm.myStatus !== 4"
								:before-upload="beforeImgUpload"
							>
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
								<img width="100%" :src="dialogImageUrl" alt="" />
							</el-dialog>
						</el-form-item>
					</el-col>
				</el-row> -->

				<el-row>
					<el-col :md="16" :lg="10">
						<div class="custom-form-btns-wrap">
							<el-button type="primary" @click="submit" v-if="!addForm.myStatus || addForm.myStatus == 4">
								{{ $t('que-ren-ti-jiao') }}
							</el-button>
							<el-button type="default" @click="goBack">
								<template>{{ $t('fan-hui') }}</template>
							</el-button>
						</div>
					</el-col>
				</el-row>
			</template>

			<template v-if="addForm.templateId == '2'">
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="适用场景" :required="true">
							<el-input value="商家报名" disabled />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="规则名称" :required="true">
							<el-input :disabled="addFormSignUp.myStatus && addFormSignUp.myStatus !== 4" v-model="addFormSignUp.name" placeholder="请输入规则名称" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="规则有效期" :required="true">
							<el-date-picker
								:disabled="addFormSignUp.myStatus && addFormSignUp.myStatus !== 4"
								:picker-options="actPickerOptions"
								v-model="selectDate"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								value-format="yyyy-MM-dd"
							>
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="16" :lg="8">
						<el-form-item label="规则生效时段" :required="true">
							<el-time-picker
								:disabled="addFormSignUp.myStatus && addFormSignUp.myStatus !== 4"
								is-range
								value-format="HH:mm:ss"
								format="HH:mm:ss"
								v-model="selectTime"
								range-separator="至"
								start-placeholder="开始时间段"
								end-placeholder="结束时间段"
								placeholder="选择时间范围"
							>
							</el-time-picker>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item :required="true">
							<div class="module-title-tips"><span class="ic">* </span>宣传图<span class="img-tips">（建议尺寸为750x560px）</span></div>
							<el-upload
								:disabled="addFormSignUp.myStatus && addFormSignUp.myStatus !== 4"
								:limit="1"
								action="mbs/file/storage/upload"
								:headers="myHeaders"
								list-type="picture-card"
								:file-list="propagandaImageList"
								:on-success="getPropagandaImage"
								:on-remove="handleRemove"
								:on-exceed="handleexceed"
								:before-upload="beforeImgUpload"
							>
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
								<img width="100%" :src="dialogImageUrl" alt="" />
							</el-dialog>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="规则简介" :required="true">
							<el-input
								:disabled="addFormSignUp.myStatus && addFormSignUp.myStatus !== 4"
								class="input-textarea"
								:autosize="{ maxRows: 8 }"
								v-model="addFormSignUp.actDesc"
								type="textarea"
								maxlength="500"
								show-word-limit
							/>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row class="module-coupon">
					<el-col :md="16" :lg="10">
						<el-form-item label="奖品选择" :required="true">
							<el-button class="coupon-btn-add" type="primary" @click="choosePrize" size="mini" v-if="!addForm.id">
								添加优惠券
							</el-button>

							<div class="module-coupon-content">
								<div class="coupon-header">
									<div class="item">
										优惠券ID
									</div>
									<div class="item">
										优惠券名称
									</div>
									<div class="item"></div>
								</div>
								<div class="coupon-list" v-for="(item, index) in addFormSignUp.prods" :key="index">
									<div class="item">
										{{ item.productId }}
									</div>
									<div class="item">
										{{ item.productName }}
									</div>
									<div class="item" style="text-align:right">
										<el-button class="coupon-btn-delete" type="danger" size="mini" @click="handleDeleteCoupon(item, index)" v-if="!addForm.id">
											删除
										</el-button>
									</div>
								</div>
							</div>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item label="面向用户群" :required="true">
							<el-select v-model="addFormSignUp.userType" :class="'block-select'" disabled>
								<el-option label="消费者端" value="2" />
								<el-option label="商家端" value="1" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item :required="true">
							<div class="module-title-tips"><span class="ic">* </span>商家者端首页广告图<span class="img-tips">（建议尺寸为750x272px）</span></div>
							<el-upload
								:disabled="addFormSignUp.myStatus && addFormSignUp.myStatus !== 4"
								:limit="1"
								action="mbs/file/storage/upload"
								:headers="myHeaders"
								list-type="picture-card"
								:file-list="businessRotationList"
								:on-success="getBusinessRotationImage"
								:on-remove="handleRemove"
								:on-exceed="handleexceed"
								:before-upload="beforeImgUpload"
							>
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
								<img width="100%" :src="dialogImageUrl" alt="" />
							</el-dialog>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md="16" :lg="10">
						<el-form-item>
							<div class="module-title-tips"><span class="ic">* </span>消费者端首页广告图<span class="img-tips">（建议尺寸为750x272px）</span></div>
							<el-upload
								:disabled="addFormSignUp.myStatus && addFormSignUp.myStatus !== 4"
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
							<el-dialog :visible.sync="dialogVisible">
								<img width="100%" :src="dialogImageUrl" alt="" />
							</el-dialog>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- {{ test }} -->
				<el-row>
					<el-col :md="16" :lg="10">
						<div class="custom-form-btns-wrap">
							<el-button type="primary" @click="handleAddSignUp" v-if="!addFormSignUp.myStatus || addFormSignUp.myStatus == 4">
								{{ $t('que-ren-ti-jiao') }}
							</el-button>
							<el-button type="default" @click="goBack">
								<template>{{ $t('fan-hui') }}</template>
							</el-button>
						</div>
					</el-col>
				</el-row>
			</template>
		</el-form>

		<!-- 奖品选择弹窗 -->
		<el-dialog title="选择优惠券" :visible.sync="dialogAdd" :append-to-body="true" @close="closeDialog" width="70%">
			<div class="module-form">
				<el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
					<!-- <el-table-column type="index" width="50"> </el-table-column> -->
					<el-table-column property="productId" label="数字产品ID" width="120"> </el-table-column>
					<el-table-column property="productName" label="数字产品名称" width="120"> </el-table-column>
					<el-table-column property="tokenId" label="tokenID"> </el-table-column>
					<el-table-column prop="productValue" label="面值" width="120">
						<template slot-scope="scope">
							{{ '￥' + scope.row.productValue }}
						</template>
					</el-table-column>
					<el-table-column prop="minAmount" label="最小消费金额" width="120">
						<template slot-scope="scope">
							{{ '￥' + scope.row.minAmount }}
						</template>
					</el-table-column>
					<el-table-column property="publishNum" label="发行数量"> </el-table-column>
					<el-table-column property="availableNum" label="可用数量"> </el-table-column>
					<!-- <el-table-column property="cancelNum" label="作废数量"> </el-table-column> -->
					<el-table-column property="publishTime" label="发行日期"> </el-table-column>
					<el-table-column property="startTime" label="生效日期"> </el-table-column>
					<el-table-column property="endTime" label="截止日期"> </el-table-column>
				</el-table>
			</div>

			<el-pagination
				class="module-page"
				@current-change="handleCouponPage"
				:page-size="couponProduct.pageSize"
				layout="prev, pager, next, jumper"
				:total="couponProduct.total"
			>
			</el-pagination>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeDialog">取 消 </el-button>
				<!-- <el-button type="primary" @click="handleSureAdd">确 认 </el-button> -->
			</span>
		</el-dialog>
		<!-- 奖品选择弹窗 -->
		<el-dialog title="选择数字产品（只显示上架中的数字产品）" :visible.sync="dialogSignUpAdd" @close="closeDialog" :append-to-body="true" width="70%">
			<div class="module-form">
				<el-table ref="multipleTable" :data="tableCouponData" tooltip-effect="dark" style="width: 100%" @selection-change="handleCurrentChange">
					<el-table-column type="selection" width="55"> </el-table-column>
					<el-table-column property="id" label="数字产品ID" width="100"> </el-table-column>
					<el-table-column property="productName" label="优惠券名称" width="120"> </el-table-column>
					<el-table-column prop="productValue" label="优惠券面值" width="120">
						<template slot-scope="scope">
							{{ '￥' + scope.row.productValue }}
						</template>
					</el-table-column>
					<!-- <el-table-column property="effectiveDays" label="有效期（天）" width="140"> </el-table-column> -->
					<el-table-column property="pubOrgName" label="发券机构类型" width="160"> </el-table-column>
					<el-table-column property="pubOrgName" label="发券机构名称/ID">
						<template slot-scope="scope">
							{{ scope.row.pubOrgName + '/' + scope.row.pubOrgId }}
						</template>
					</el-table-column>
					<el-table-column property="minAmount" label="最小消费金额">
						<template slot-scope="scope">
							{{ '￥' + scope.row.minAmount }}
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					class="module-page"
					@current-change="handlePage"
					:page-size="numberProduct.pageSize"
					layout="prev, pager, next, jumper"
					:total="numberProduct.total"
				>
				</el-pagination>
			</div>

			<span slot="footer" class="dialog-footer">
				<el-button @click="closeDialog">取 消 </el-button>
				<el-button type="primary" @click="handleSureAdd">确 认 </el-button>
			</span>
		</el-dialog>
		<!-- 奖品选择弹窗 -->
	</section>
</template>

<script>
import store from '@STORE';
import api from '@API';
import cookie from 'js-cookie';
import axios from 'axios';
import { DATA_ONLY_READ, DATA_ACTION_LIST, LOGIN_COOKIE_KEY } from '@HELPER/const';
// import { delete } from 'vue/types/umd';

export default {
	data() {
		// 面向用户群, 1是商家，2是消费者
		return {
			// 限制优惠券有效期
			couponPickerOptions: {
				disabledDate: time => {
					const minDate = new Date(new Date(this.couponMinDate).getTime() - 24 * 60 * 60 * 1000);
					const maxDate = new Date(this.couponMaxDate);
					return time.getTime() < minDate || time.getTime() > maxDate;
				},
			},
			// 限制规则有效期
			actPickerOptions: {
				disabledDate: time => {
					return time.getTime() < Date.now() - 8.64e7;
				},
			},
			test: {},
			breadcrumb: [
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_EVENT_MANAGEMENT_LABEL,
				},
				{
					label: this.$ALL_CONST.ROUTE_NAME.RN_ACTIVITY_TEMPLATE_LABEL,
				},
				{
					label: `${DATA_ACTION_LIST[this.$route.query.toDo]}规则`,
				},
			],
			couponMinDate: '',
			couponMaxDate: '',
			templateSelectList: [],
			selectDate: '',
			selectTime: '',
			selectCouponTime: '',
			selectCouponDate: '',
			addForm: {
				// 规则级别, 1-商家级, 2-平台级
				actType: 2,
				templateId: '',
				sceneCode: '',
				sceneName: '',
				name: '',
				startTime: '',
				endTime: '',
				timeRangeStart: '',
				timeRangeEnd: '',
				comment: '',
				prizeType: '1',
				prizeCount: '',
				prizeStartTime: '',
				prizeEndTime: '',
				prizeAmount: '',
				prizeTimeType: 1,
				prizeDuration: '',
				limitTypeOne: {
					val: '',
					isAll: '',
					limitType: 1,
				},
				limitTypeTwo: {
					val: '',
					isAll: '',
					limitType: 2,
				},
				limitTypeThr: {
					val: '',
					isAll: '',
					limitType: 3,
				},
				userType: '2',
				coverPic: '',
				productId: '',
				productName: '',
				tokenId: '',
				userId: 11,
				couponTimeNo: false,
				useScene: '',
			},
			sceneList: [
				{
					value: '1',
					label: '注册',
				},
				{
					value: '3',
					label: '领取',
				},
			],
			addFormSignUp: {
				// 规则级别, 1-商家级, 2-平台级
				actType: 2,
				sceneCode: 2,
				templateId: '',
				sceneName: '商家报名',
				name: '',
				startTime: '',
				endTime: '',
				startActiveTime: '',
				endActiveTime: '',
				prods: [],
				actDesc: '',
				userType: '1',
				productType: '1',
				propagandaImage: '',
				consumerRotationImage: '',
				businessRotationImage: '',
			},
			// 规则模板名称
			DATA_ONLY_READ,
			toDo: '',
			form: {
				chargeName: '',
				chargePeriod: '',
				id: '',
			},
			fileList: [],
			propagandaImageList: [],
			consumerRotationList: [],
			businessRotationList: [],
			rules: {
				huodongmubang: [
					{
						required: true,
						message: '请输入规则模板',
						trigger: 'blur',
					},
				],
				huodongcjing: [
					{
						required: true,
						message: '请输入规则模板',
						trigger: 'blur',
					},
				],
				huodongmingc: [
					{
						required: true,
						message: '请输入规则名称',
						trigger: 'blur',
					},
				],
				huodongjianj: [
					{
						required: true,
						message: '请输入规则简介',
						trigger: 'blur',
					},
				],
				chargeName: [
					{
						required: true,
						message: this.$t('qing-shu-ru-zhang-dan-ming-cheng'),
						trigger: 'blur',
					},
				],
				chargePeriod: [
					{
						required: true,
						message: this.$t('qing-xuan-ze-zhang-dan-yue-fen'),
						trigger: 'blur',
					},
				],
			},
			dialogImageUrl: '',
			dialogVisible: false,
			dialogSignUpAdd: false,
			dialogAdd: false,
			tableData: [],
			tableCouponData: [],
			currentRow: null,
			availableNum: 10000,
			couponProduct: {
				pageSize: 10,
				pageNum: 1,
				total: 0,
			},
			numberProduct: {
				pageSize: 10,
				pageNum: 1,
				status: 1,
				pubOrgType: 1,
				total: 0,
			},
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
		// 选择场景
		handleSelectScene(val) {
			let obj = {};
			obj = this.sceneList.find(item => {
				return item.value === val;
			});
			this.addForm.sceneName = obj.label;
			if (val === '1') {
				this.addForm.prizeCount = '';
			} else if (val === '3') {
				this.addForm.prizeCount = 1;
			}
		},

		// 是否限制优惠券时间段
		handleCouponTimeNo() {
			this.selectCouponTime = '';
		},

		handleCheckCount(val, type) {
			this.addForm[type].val = '';
		},
		async getTplList() {
			const loading = this.$loading({
				lock: true,
				text: '获取规则类型中',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0)',
			});
			const resData = await axios.get(api.eventManagement.getTplList());

			loading.close();
			if (resData.code === 200) {
				this.templateSelectList = resData.data;
			}
		},
		// 图片上传
		handleRemove(file, fileList) {
			// console.log(file, fileList);
		},
		// handlePictureCardPreview(file) {
		// 	this.dialogImageUrl = file.url;
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
				this.addForm.coverPic = response.data[0];
			}
		},
		getPropagandaImage(response, file, fileList) {
			this.addFormSignUp.propagandaImage = response.data[0];
		},
		getBusinessRotationImage(response, file, fileList) {
			this.addFormSignUp.businessRotationImage = response.data[0];
		},
		getConsumerRotationImage(response, file, fileList) {
			this.addFormSignUp.consumerRotationImage = response.data[0];
		},

		// 奖品选择
		choosePrize() {
			if (this.addForm.templateId === '1') {
				this.dialogAdd = true;
			} else {
				this.dialogSignUpAdd = true;
			}
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_MODAL_FILTER, true);
		},

		handlePage(val) {
			this.numberProduct.pageNum = val;
			this.getDigitalProductList();
		},
		handleCouponPage(val) {
			this.couponProduct.pageNum = val;
			this.getOprProdPubApply();
		},
		// 关闭对话框
		closeDialog() {
			store.commit(this.$ALL_CONST.STORE_TYPE.SET_MODAL_FILTER, false);
			this.dialogAdd = false;
			this.dialogSignUpAdd = false;
		},
		// 奖品选择 列表
		handleCurrentChange(val) {
			this.currentRow = val;
			if (this.addForm.templateId === '1') {
				this.addForm.productId = this.currentRow.productId;
				this.addForm.productName = this.currentRow.productName;
				this.addForm.tokenId = this.currentRow.tokenId;
				this.availableNum = this.currentRow.availableNum;
				this.couponMinDate = this.currentRow.startTime;
				this.couponMaxDate = this.currentRow.endTime;
				this.selectCouponDate = '';
				this.closeDialog();
			}
		},
		// 奖品选择 确认
		handleSureAdd() {
			this.addFormSignUp.prods = [];
			this.currentRow.map(item => {
				const addItem = {
					productId: item.id,
					productName: item.productName,
					productType: item.productType,
					productValue: item.productValue,
					tokenId: '',
				};
				this.addFormSignUp.prods.push(addItem);
			});

			this.closeDialog();
		},
		handleDeleteCoupon(item, index) {
			this.addFormSignUp.prods.splice(index, 1);
		},

		// 提交
		async submit(formName) {
			// const me = this;

			// 新建规则字段校验

			if (this.addForm.sceneCode === '') {
				this.$message.error('请选择场景');
				return false;
			}
			if (this.addForm.name === '') {
				this.$message.error('请填写规则名称');
				return false;
			}
			if (this.selectDate === '') {
				this.$message.error('请选择规则有效期');
				return false;
			}
			if (this.selectTime === '') {
				this.$message.error('请选择规则生效时段');
				return false;
			}

			if (this.addForm.comment === '') {
				this.$message.error('请填写规则简介');
				return false;
			}
			if (this.addForm.prizeType === '') {
				this.$message.error('请选择数字产品类型');
				return false;
			}
			if (this.addForm.productId === '') {
				this.$message.error('请选择数字产品类型');
				return false;
			}

			if (this.addForm.prizeAmount === '') {
				this.$message.error('请填写发券总数量');
				return false;
			}
			if (this.addForm.prizeAmount <= 0) {
				this.$message.error('发券总数量不能少于0');
				return false;
			}
			if (Number(this.addForm.prizeAmount) > Number(this.availableNum)) {
				this.$message.error('发券总数量超过奖品可用数量');
				return false;
			}

			if (this.addForm.prizeCount === '') {
				this.$message.error('请填写单次发券数量');
				return false;
			}
			if (this.addForm.prizeCount <= 0) {
				this.$message.error('单次发券数量不能少于0');
				return false;
			}
			if (Number(this.addForm.prizeCount) > Number(this.addForm.prizeAmount)) {
				this.$message.error('单次发券数量不能大于发券总数量');
				return false;
			}
			if (this.addForm.prizeTimeType === 1 && this.selectCouponDate === '') {
				this.$message.error('请选择优惠券有效期');
				return false;
			}

			if (this.selectCouponTime === '' && !this.addForm.couponTimeNo) {
				this.$message.error('请选择优惠券时间段');
				return false;
			}
			const day = (new Date(this.couponMaxDate).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24;

			if (this.addForm.prizeTimeType === 2 && this.addForm.prizeDuration === '') {
				this.$message.error('请输入固定可用时长');
				return false;
			}
			if (this.addForm.prizeTimeType === 2 && this.addForm.prizeDuration >= day) {
				this.$message.error('可用时长不可大于优惠券有效期');
				return false;
			}

			if (this.addForm.useScene === '') {
				this.$message.error('请选择优惠券适用场景');
				return false;
			}

			// 判断每人总参加次数
			if (!this.addForm.limitTypeOne.isAll) {
				if (this.addForm.limitTypeOne.val === '') {
					this.$message.error('请输入每人总领券次数');
					return false;
				}
				if (this.addForm.limitTypeOne.val <= 0) {
					this.$message.error('每人总领券次数应大于0');
					return false;
				}

				if (Number(this.addForm.limitTypeOne.val) < Number(this.addForm.limitTypeTwo.val)) {
					this.$message.error('每人总领券次数应大于月领券次数');
					return false;
				}

				if (Number(this.addForm.limitTypeOne.val) < Number(this.addForm.limitTypeThr.val)) {
					this.$message.error('每人总领券次数应大于每天领券次数');
					return false;
				}
			}

			// 判断每人每月参加次数
			if (!this.addForm.limitTypeTwo.isAll) {
				if (this.addForm.limitTypeTwo.val === '') {
					this.$message.error('请输入每人每月领券次数');
					return false;
				}
				if (this.addForm.limitTypeTwo.val <= 0) {
					this.$message.error('每人每月领券次数应大于0');
					return false;
				}

				if (Number(this.addForm.limitTypeTwo.val) < Number(this.addForm.limitTypeThr.val)) {
					this.$message.error('每人每月领券次数应大于每天领券次数');
					return false;
				}
			}
			// 判断每人每天参加次数
			if (!this.addForm.limitTypeThr.isAll) {
				if (this.addForm.limitTypeThr.val === '') {
					this.$message.error('请输入每人每天领券次数');
					return false;
				}
				if (this.addForm.limitTypeThr.val <= 0) {
					this.$message.error('每人每天领券次数应大于0');
					return false;
				}
			}
			// if (this.addForm.coverPic === '') {
			// 	this.$message.error('请选择封面图');
			// 	return false;
			// }
			const data = JSON.parse(JSON.stringify(this.addForm));

			// 处理日期和时间段数据
			data.startTime = this.selectDate[0];
			data.endTime = this.selectDate[1];

			data.useScene = Number(this.addForm.useScene);
			if (this.selectTime[0].length) {
				data.timeRangeStart = this.selectTime[0];
				data.timeRangeEnd = this.selectTime[1];
				data.timeRange = this.selectTime[0] + '~' + this.selectTime[1];
			}

			if (this.addForm.prizeTimeType === 1) {
				data.prizeStartTime = this.selectCouponDate[0];
				data.prizeEndTime = this.selectCouponDate[1];
			}

			if (this.addForm.couponTimeNo) {
				data.prizeAvailableRange = '';
			} else {
				if (this.selectCouponTime[0].length) {
					data.prizeAvailableRange = this.selectCouponTime[0] + '~' + this.selectCouponTime[1];
				}
			}
			// 优惠券产品有效期
			data.applyStartTime = this.couponMinDate;
			data.applyEndTime = this.couponMaxDate;

			data.oprTriggerActRules = [];
			data.oprTriggerActRules.push({
				// hasParticipatedCount: this.addForm.limitTypeOne.val,
				limitNumber: this.addForm.limitTypeOne.isAll ? '-1' : this.addForm.limitTypeOne.val,
				limitType: this.addForm.limitTypeOne.limitType,
				id: this.addForm.limitTypeOne.id,
			});
			data.oprTriggerActRules.push({
				// hasParticipatedCount: this.addForm.limitTypeTwo.val,
				limitNumber: this.addForm.limitTypeTwo.isAll ? '-1' : this.addForm.limitTypeTwo.val,
				limitType: this.addForm.limitTypeTwo.limitType,
				id: this.addForm.limitTypeTwo.id,
			});
			data.oprTriggerActRules.push({
				// hasParticipatedCount: this.addForm.limitTypeThr.val,
				limitNumber: this.addForm.limitTypeThr.isAll ? '-1' : this.addForm.limitTypeThr.val,
				limitType: this.addForm.limitTypeThr.limitType,
				id: this.addForm.limitTypeThr.id,
			});

			delete data.limitTypeOne;
			delete data.limitTypeTwo;
			delete data.limitTypeThr;
			// const res = await api.eventManagement.addOprTriggerAct(data);
			let res = null;

			const loading = this.$loading({
				lock: true,
				text: '提交中',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0)',
			});
			setTimeout(() => {
				loading.close();
			}, 1000);
			if (!data.id) {
				// 添加触发型规则
				res = await api.eventManagement.addOprTriggerAct(data);
			} else {
				// 编辑触发型规则
				data.id = Number(data.id);
				data.templateId = Number(data.templateId);
				res = await api.eventManagement.uploadOprTriggerAct(data);
			}
			if (res.code === 200) {
				this.$notify.success({
					title: `${DATA_ACTION_LIST[this.toDo]}${this.$t('cheng-gong')}`,
					// eslint-disable-next-line prettier/prettier
					message: `${DATA_ACTION_LIST[this.toDo]}${this.$t('cheng-gong')}，将返回触发型规则列表`,
				});

				this.$router.push({
					name: this.$ALL_CONST.ROUTE_NAME.RN_TRIGGER_TYPE,
					query: {
						from: this.$ALL_CONST.ROUTE_NAME.RN_ACTIVITY_TEMPLATE,
					},
				});
			} else {
				this.$notify.error({
					title: `${DATA_ACTION_LIST[this.toDo]}${this.$t('shi-bai')}`,
					message: res.data ? res.data : res.error,
				});
			}
		},

		// 提交编辑创建型规则
		async handleAddSignUp() {
			// const me = this;

			// 新建规则字段校验
			if (this.addFormSignUp.name === '') {
				this.$message.error('请填写规则名称');
				return false;
			}
			if (this.selectDate === '') {
				this.$message.error('请选择规则有效期');
				return false;
			}
			if (this.selectTime === '') {
				this.$message.error('请选择规则生效时段');
				return false;
			}

			if (this.addFormSignUp.propagandaImage === '') {
				this.$message.error('请选择宣传图');
				return false;
			}

			if (this.addFormSignUp.actDesc === '') {
				this.$message.error('请填写规则简介');
				return false;
			}
			if (this.addFormSignUp.prods.length <= 0) {
				this.$message.error('请选择关联优惠券');
				return false;
			}
			if (this.addFormSignUp.businessRotationImage === '') {
				this.$message.error('请选择商家端首页广告图');
				return false;
			}
			if (this.addFormSignUp.consumerRotationImage === '') {
				this.$message.error('请选择消费者端首页广告图');
				return false;
			}

			const data = JSON.parse(JSON.stringify(this.addFormSignUp));

			// 处理日期和时间段数据

			data.startTime = this.selectDate[0];
			data.endTime = this.selectDate[1];

			if (this.selectTime[0].length) {
				data.startActiveTime = this.selectTime[0];
				data.endActiveTime = this.selectTime[1];
			}
			data.templateId = this.addForm.templateId;

			this.test = data;
			// const res = await api.eventManagement.addOprTriggerAct(data);
			let res = null;

			const loading = this.$loading({
				lock: true,
				text: '提交中',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0)',
			});
			setTimeout(() => {
				loading.close();
			}, 1000);
			if (!data.id) {
				// 添加报名型规则
				res = await api.eventManagement.addSignupAct(data);
			} else {
				// 编辑报名型规则
				data.id = Number(data.id);
				data.templateId = Number(data.templateId);
				res = await api.eventManagement.updateSignupAct(data);
			}

			// 添加报名型规则
			if (res.code === 200) {
				this.$notify.success({
					title: `${DATA_ACTION_LIST[this.toDo]}${this.$t('cheng-gong')}`,
					// eslint-disable-next-line prettier/prettier
					message: `${DATA_ACTION_LIST[this.toDo]}${this.$t('cheng-gong')}，将返回报名型型规则列表`,
				});

				this.$router.push({
					name: this.$ALL_CONST.ROUTE_NAME.RN_SIGN_UP,
					query: {
						from: this.$ALL_CONST.ROUTE_NAME.RN_ACTIVITY_TEMPLATE,
					},
				});
			} else {
				this.$notify.error({
					title: `${DATA_ACTION_LIST[this.toDo]}${this.$t('shi-bai')}`,
					message: res.data ? res.data : res.error,
				});
			}
		},

		// 返回、取消
		goBack() {
			this.$router.push({
				name: this.$route.query.from,
				query: {
					from: this.$ALL_CONST.ROUTE_NAME.RN_ACTIVITY_TEMPLATE,
				},
			});
		},

		// 获取优惠劵列表
		async getOprProdPubApply() {
			const res = await api.eventManagement.getOprProdPubUsableList(this.couponProduct);
			if (res.code === 200 && res.message === 'success') {
				this.couponProduct.total = res.totalSize;
				this.tableData = res.data;
			}
		},
		// 获取上架的数字产品
		async getDigitalProductList() {
			const res = await api.eventManagement.getDigitalProductListForCouponIssueForm(this.numberProduct);
			if (res.code === 200 && res.message === 'success') {
				this.numberProduct.total = res.totalSize;
				this.tableCouponData = res.data;
			}
		},
		// 获取触发型规则详情,处理数据回显
		async selectOprTriggerAct() {
			const res = await api.eventManagement.selectOprTriggerAct(this.addForm.id);
			if (res.code === 200 && res.message === 'success') {
				// this.form.chargeName = res.data.chargeName;
				// this.form.chargePeriod = res.data.chargePeriod;
				// this.tableData = res.data;
				const { data } = res;

				this.addForm.templateId = String(data.templateId);
				this.addForm.sceneName = data.sceneName;
				this.addForm.sceneCode = data.sceneCode;

				this.addForm.myStatus = data.status;
				this.addForm.name = data.name;
				this.addForm.startTime = data.startTime;
				this.addForm.endTime = data.endTime;
				this.selectDate = [data.startTime, data.endTime];
				// 规则时间段回显
				if (data.timeRange && data.timeRange.length > 0) {
					const timeRange = data.timeRange.split('~');
					const timeS = timeRange[0].split(':');
					const timeE = timeRange[1].split(':');
					this.selectTime = [new Date(2016, 9, 10, timeS[0], timeS[1], timeS[2]), new Date(2016, 9, 10, timeE[0], timeE[1], timeE[2])];
				}
				// 优惠券时间段回显
				if (data.prizeAvailableRange && data.prizeAvailableRange.length > 0) {
					const couponTime = data.prizeAvailableRange.split('~');
					const couponTimeS = couponTime[0].split(':');
					const couponTimeE = couponTime[1].split(':');
					this.selectCouponTime = [new Date(2016, 9, 10, couponTimeS[0], couponTimeS[1]), new Date(2016, 9, 10, couponTimeE[0], couponTimeE[1])];
				}
				if (data.prizeAvailableRange === '') {
					this.addForm.couponTimeNo = true;
				}

				this.selectCouponDate = [data.prizeStartTime, data.prizeEndTime];
				this.addForm.timeRangeStart = data.timeRangeStart;
				this.addForm.timeRangeEnd = data.timeRangeEnd;
				this.addForm.timeRange = data.timeRange;
				this.addForm.comment = data.comment;
				this.addForm.prizeAmount = data.prizeAmount;
				this.addForm.prizeDuration = data.prizeDuration;
				this.addForm.prizeTimeType = data.prizeTimeType;
				this.addForm.prizeType = data.prizeType.toString();
				this.addForm.prizeCount = data.prizeCount;
				this.addForm.prizeStartTime = data.prizeStartTime;
				this.addForm.prizeEndTime = data.prizeEndTime;
				this.addForm.userType = data.userType.toString();
				this.addForm.coverPic = data.coverPic;
				this.dialogImageUrl = data.coverPic;
				this.fileList.push({
					url: data.coverPic,
					name: '封面图片',
				});
				this.addForm.productId = data.productId;
				this.addForm.productName = data.productName;
				this.addForm.tokenId = data.tokenId;
				this.addForm.useScene = data.useScene.toString();
				if (data.applyStartTime) {
					// 优惠券产品有效期
					this.couponMinDate = data.applyStartTime;
					this.couponMaxDate = data.applyEndTime;
				}

				// 规则参与次数限制回显
				data.oprTriggerActRules.map(item => {
					if (item.limitType === 1) {
						this.addForm.limitTypeOne = {
							val: item.limitNumber === -1 ? '' : item.limitNumber,
							isAll: item.limitNumber === -1,
							limitType: 1,
							id: Number(item.id),
						};
					} else if (item.limitType === 2) {
						this.addForm.limitTypeTwo = {
							val: item.limitNumber === -1 ? '' : item.limitNumber,
							isAll: item.limitNumber === -1,
							limitType: 2,
							id: Number(item.id),
						};
					} else if (item.limitType === 3) {
						this.addForm.limitTypeThr = {
							val: item.limitNumber === -1 ? '' : item.limitNumber,
							isAll: item.limitNumber === -1,
							limitType: 3,
							id: Number(item.id),
						};
					}
				});
			}
		},
		// 获取报名型规则详情
		async getSignUpDetails() {
			const res = await api.eventManagement.getSignUpDetails(this.addFormSignUp.id);
			if (res.code === 200 && res.message === 'success') {
				// this.form.chargeName = res.data.chargeName;
				// this.form.chargePeriod = res.data.chargePeriod;
				// this.tableData = res.data;
				const { data } = res;
				this.addForm.templateId = String(data.templateId);
				this.addFormSignUp.templateId = data.templateId;
				this.addFormSignUp.sceneName = data.sceneName;
				this.addFormSignUp.name = data.name;
				this.addFormSignUp.actDesc = data.actDesc;
				this.addFormSignUp.myStatus = data.actStatus;
				this.addFormSignUp.startTime = data.startTime;
				this.addFormSignUp.endTime = data.endTime;
				this.addFormSignUp.startActiveTime = data.startActiveTime;
				this.addFormSignUp.endActiveTime = data.endActiveTime;
				this.selectDate = [data.startTime, data.endTime];

				// 规则时间段回显

				if (data.startActiveTime && data.startActiveTime.length > 0) {
					const timeS = data.startActiveTime.split(':');
					const timeE = data.endActiveTime.split(':');
					this.selectTime = [new Date(2016, 9, 10, timeS[0], timeS[1], timeS[2]), new Date(2016, 9, 10, timeE[0], timeE[1], timeE[2])];
				}
				this.selectCouponDate = [data.prizeStartTime, data.prizeEndTime];
				this.addFormSignUp.comment = data.comment;
				this.addFormSignUp.userType = data.userType.toString();
				this.addForm.coverPic = data.coverPic;

				this.addFormSignUp.propagandaImage = data.propagandaImage;
				this.addFormSignUp.consumerRotationImage = data.consumerRotationImage;
				this.addFormSignUp.businessRotationImage = data.businessRotationImage;

				this.addFormSignUp.prods = data.prods;

				this.propagandaImageList.push({
					url: data.propagandaImage,
					name: '宣传图',
				});
				this.consumerRotationList.push({
					url: data.consumerRotationImage,
					name: '商家端首页广告图',
				});
				this.businessRotationList.push({
					url: data.businessRotationImage,
					name: '宣传图',
				});
			}
		},
	},

	created() {
		// 获取模板列表
		this.getTplList();
		this.getOprProdPubApply();
		this.getDigitalProductList();

		// 进来确定你要什么
		this.toDo = this.$route.query.toDo;

		// 有 id 拿 id
		if (this.$route.query.id) {
			// 有 template判断规则模板
			this.addForm.id = this.$route.query.id;
			this.addForm.templateId = this.$route.query.templateId;
			if (this.$route.query.template === '1') {
				this.selectOprTriggerAct();
			} else if (this.$route.query.template === '2') {
				this.addFormSignUp.id = this.$route.query.id;
				this.addFormSignUp.templateId = this.$route.query.templateId;
				this.getSignUpDetails();
			}
		}

		// 初始化面包屑
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_BREADCRUMB, this.breadcrumb);
		// 暂时关闭 tab 按钮
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB_NEED_OR_NOT, false);
	},

	beforeDestroy() {
		// 重新打开 tab 按钮
		store.commit(this.$ALL_CONST.STORE_TYPE.SET_DEFAULT_PANEL_TAB_NEED_OR_NOT, true);
	},
};
</script>
<style>
.input-textarea .el-textarea__inner {
	min-height: 100px !important;
}
.module-coupon {
	position: relative;
}
.module-coupon .coupon-btn-add {
	position: absolute;
	right: 0;
	top: -32px;
}
.module-coupon-content {
	padding: 6px 12px;
	margin: 6px 0;
	border: 1px solid #eee;
	border-radius: 5px;
}
.module-coupon .coupon-header {
	display: flex;
	justify-content: center;
}
.module-coupon .coupon-list {
	display: flex;
	justify-content: center;
	padding: 6px 0;
	border-bottom: 1px solid #eee;
}
.module-coupon .coupon-list:last-child {
	border-bottom: none;
}
.module-coupon .item {
	width: 33.2%;
	color: #606266;
	text-align: center;
}
.module-page {
	padding: 12px 0 0;
	text-align: right;
}
.module-spe .el-input-group__append {
	position: relative;
}
.module-spe .checkbox-mask {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 10;
}
.module-title .el-form-item__label {
	font-size: 18px;
}
.module-title-coupon .el-form-item__label {
	font-size: 16px;
}

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
.row-spe {
	display: flex;
	align-items: flex-end;
}
</style>
