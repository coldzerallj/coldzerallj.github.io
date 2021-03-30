/* eslint-disable no-unused-vars */
<template>
	<view :class="['navTabBox', fixedClass]">
		<view class="longTab">
			<scroll-view scroll-x="true" style="white-space: nowrap; display: flex;" scroll-with-animation :scroll-left="tabLeft">
				<view
					class="longItem"
					:style="'width:' + isWidth + 'px'"
					:data-index="index"
					:class="index === tabClick ? 'click' : ''"
					v-for="(item, index) in tabTitle"
					:key="index"
					:id="'id' + index"
					@click="longClick(index)"
					>{{ item.name }}</view
				>
				<view class="underlineBox" :style="'transform:translateX(' + isLeft + 'px);width:' + isWidth + 'px'">
					<view class="underline"></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		fixedClass: {
			type: String,
			default: '',
		},

		tabTitle: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	data() {
		return {
			tabClick: 0, // 导航栏被点击
			isLeft: 0, // 导航栏下划线位置
			isWidth: 0, // 每个导航栏占位
			tabLeft: 0,
		};
	},
	created() {
		const that = this;
		// 获取设备宽度
		uni.getSystemInfo({
			success(e) {
				if (that.tabTitle.length <= 5) {
					that.isWidth = e.windowWidth / that.tabTitle.length; // 宽度除以导航标题个数=一个导航所占宽度
				} else {
					that.isWidth = e.windowWidth / 5;
				}
			},
		});
	},
	methods: {
		// 导航栏点击
		longClick(index) {
			if (this.tabTitle.length > 5) {
				// eslint-disable-next-line no-unused-vars
				let tempIndex = index - 2;
				tempIndex = tempIndex <= 0 ? 0 : tempIndex;
				this.tabLeft = (index - 2) * this.isWidth; // 设置下划线位置
			}
			this.tabClick = index; // 设置导航点击了哪一个
			this.isLeft = index * this.isWidth; // 设置下划线位置
			// console.log(index);
			this.$emit('changeTab', index); // 设置swiper的第几页
			// this.$parent.currentTab = index //设置swiper的第几页
		},
	},
};
</script>

<style lang="scss">
.navTabBox {
	width: 100vw;
	color: #888;
	background-color: $uni-bg-color;

	&.border-bottom {
		box-shadow: 0 -1px 0 0 $uni-border-color inset;
	}

	.click {
		color: $ds-main-color;
		font-weight: 900;
	}
	.longTab {
		width: 100%;
		.longItem {
			display: inline-block;
			padding: $uni-spacing-col-base 0;
			text-align: center;
			font-size: $uni-font-size-base;
		}
		.underlineBox {
			background: $ds-main-color;
			height: 3px;
			width: 20%;
			display: flex;
			align-content: center;
			justify-content: center;
			transition: 0.5s;
			.underline {
				width: 84upx;
				height: 4px;
			}
		}
	}
}
</style>
