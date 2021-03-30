<template>
	<!-- 结算账户改绑 -->
	<view class="change-account">
		<!-- 账户类型 -->
		<view class="list-box">
			<picker @change="bindPickerChange" range-key="title" value="0" :range="accountType">
				<view class="list-top">账户类型</view>
				<view class="list-content">
					{{ accountTypeVal.title }}
					<span class="riht-bottom"><span class="iconfont iconjiantou"> </span></span>
				</view>
			</picker>
		</view>
		<!-- 开户银行 -->
		<view class="list-box">
			<picker @change="bindPickerBank" range-key="bankName" value="0" :range="bankArray">
				<view class="list-top">开户银行</view>
				<view class="list-content">
					{{ bankArrayVal.bankName }}
					<span class="riht-bottom"><span class="iconfont iconjiantou"> </span></span>
				</view>
			</picker>
		</view>
		<!-- 开户银行全称 -->
		<view class="list-box">
			<picker range-key="branchName" @change="bindPickerBankList" value="0" :range="bankBranchList">
				<view class="list-top">开户银行全称</view>
				<view class="list-content">
					{{ bankBranchListVal.branchName }}
					<span class="riht-bottom"><span class="iconfont iconjiantou"> </span></span>
				</view>
			</picker>
		</view>
		<!-- 开户行地址 -->
		<view class="list-box">
			<picker
				mode="multiSelector"
				range-key="name"
				@change="bindPickerRegionVal"
				@columnchange="bindPickerRegion"
				:value="regionIndex"
				:range="region"
			>
				<view class="list-top">开户行地址</view>
				<view class="list-content">
					{{ province.name }} {{ city.name }} {{ district.name }}
					<span class="riht-bottom"><span class="iconfont iconjiantou"> </span></span>
				</view>
			</picker>
		</view>
		<!-- 开户名称 -->
		<view class="list-box">
			<view class="list-top">开户名称</view>
			<view class="list-content">
				企业名称（不可修改）
			</view>
		</view>
		<!-- 银行账号 -->
		<view class="list-box">
			<view class="list-top">银行账号</view>
			<view class="list-content">
				<!-- 2566 2222 2222 2222 555 -->
				<input type="number" v-model="bankAccount" placeholder="请输入" />
				<!-- <span class="riht-bottom"><span class="iconfont iconjiantou"> </span></span> -->
			</view>
		</view>
		<!-- footer -->
		<view class="footer">
			<view class="footer-btn">
				<button type="main" @click="sub">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
import { BusinessBankAccount, Region, BankBranchList, GetBank } from '@/api/user';
const accountType = ['', '对私账户', '对公账户'];
export default {
	data() {
		return {
			// 省市区
			allRegion: [],
			regionVal: '',
			provinceArray: [],
			province: { name: '请选择' },
			cityArray: [],
			city: { name: '' },
			districtArray: [],
			district: { name: '' },
			regionIndex: [0, 0, 0],
			// 银行
			bankArray: [],
			bankArrayVal: { bankName: '请选择' },
			// 银行支行
			bankBranchList: [],
			bankBranchListVal: { branchName: '请选择' },
			// 账户类型：1、对私；2、对公,
			accountType: [
				{ val: 1, title: '对私账户' },
				{ val: 2, title: '对公账户' },
			],
			accountTypeVal: { val: '', title: '请选择' },
			// 银行账号
			bankAccount: '',
			accountData: {},
		};
	},
	computed: {
		// 省市区
		region() {
			return [this.allRegion, this.cityArray, this.districtArray];
		},
	},
	created() {
		// console.log('111111');
		const that = this;
		// 省市区
		Region().then((res) => {
			if (res.code === 200) {
				const province = res.data.children;
				const city = province[0].children;
				const district = city[0].children;
				that.allRegion = province;
				that.cityArray = city;
				that.districtArray = district;
			}
		});
		//  银行
		GetBank().then((res) => {
			if (res.code === 200) {
				that.bankArray = res.data;
			}
		});
		// 银行支行
		this.fetchBankBranchList();
	},
	onLoad() {},
	onShow() {
		let getData = uni.getStorageSync('businessBankAccount');
		if (getData) {
			getData = JSON.parse(getData);
			this.accountData = getData;
			this.accountTypeVal = {
				val: getData.accountType,
				title: accountType[getData.accountType],
			};
		}
	},
	methods: {
		// 账户类型
		bindPickerChange(e) {
			this.accountTypeVal = this.accountType[e.target.value];
		},
		// 开户银行
		bindPickerBank(e) {
			this.bankArrayVal = this.bankArray[e.target.value];
			this.fetchBankBranchList(this.bankArrayVal.bankName);
		},
		// 银行支行 开户银行全称
		bindPickerBankList(e) {
			this.bankBranchListVal = this.bankBranchList[e.target.value];
		},
		// 省市区
		bindPickerRegion(e) {
			// console.log(e.target, 'e.target.');
			switch (e.target.column) {
				case 0:
					this.cityArray = this.allRegion[e.target.value].children;
					this.districtArray = this.cityArray[0].children;
					// this.regionIndex[1] = 0;
					// this.regionIndex[2] = 0;
					// console.log(this.regionIndex, 'thqqqq');
					// e.target.value = 0;
					break;
				case 1:
					this.districtArray = this.cityArray[e.target.value].children;
					// this.regionIndex[2] = 0;
					// console.log(this.regionIndex, 'this.111111');
					// e.target.value = 0;
					break;
			}
		},
		bindPickerRegionVal(e) {
			// [0,1,2]
			// console.log(1111, e.target.value);
			this.province = this.allRegion[e.target.value[0]];
			this.city = this.cityArray[e.target.value[1]];
			this.district = this.districtArray[e.target.value[2]];
		},
		// 获取 银行支行
		fetchBankBranchList(postData = '') {
			const that = this;
			BankBranchList({ branchName: postData }).then((res) => {
				if (res.code === 200) {
					that.bankBranchList = res.data.data;
				}
			});
		},
		// 改绑
		sub() {
			// const data = {accountData
			// 	// 开户名称
			// 	accountName; this.bankAccount,
			// 	// 银行账号
			// 	accountNo:this.bankAccount,
			// 	// 账户类型：1、对私；2、对公
			// 	accountType: this.accountTypeVal.val,
			// 	// 开户银行地址
			// 	bankAddress
			// 	// 银行地区
			// 	bankArea
			// 	// 银行地区id
			// 	bankAreaId
			// 	// 分支行联行id
			// 	bankBranchId
			// 	// 分支行名称
			// 	bankBranchName
			// 	// 银行编码
			// 	bankCode
			// 	// 银行id
			// 	bankId
			// 	// 开户银行
			// 	bankName: this.bankArrayVal.bankName,
			// 	// 银行省份
			// 	bankProvince
			// 	// 银行省份id
			// 	bankProvinceId
			// 	// 联行号
			// 	cnapsCode
			// };
			BusinessBankAccount();
		},
	},
};
</script>
<style lang="scss" scoped>
page {
	background-color: #fff;
}
.change-account {
	padding-bottom: 160rpx;
}
.list-box {
	padding: 32rpx;
}
.list-box + .list-box {
	margin-top: 32rpx;
}
.list-top {
	font-size: 28rpx;
	color: #616b80;
}
.list-content {
	margin-top: 16rpx;
	font-size: 32rpx;
	color: #252525;
	padding-bottom: 18rpx;
	border-bottom: 1rpx solid #eceff5;
}

span.riht-bottom {
	float: right;
}

// footer
.footer {
	position: fixed;
	width: 100%;
	bottom: 40rpx;
	z-index: 10;
}

.footer-btn {
	margin: 0 32rpx;
	margin-top: 48rpx;

	button {
		border-radius: 48rpx;
	}
}
</style>
