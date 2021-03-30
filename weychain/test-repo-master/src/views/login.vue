<template>
	<div>
		<div id="bgimg"></div>
		<section class="loginForm">
			<input
				type="text"
				v-model.trim="username"
				id="username"
				:placeholder="$t('qing-shu-ru-yong-hu-ming')"
			/>
			<input
				@keyup.enter="login()"
				type="password"
				v-model.trim="password"
				id="password"
				:placeholder="$t('qing-shu-ru-mi-ma')"
			/>
			<button @click="login()" :disabled="isDisabled">
				<ui-icon sid="chevron-thin-right" />
				{{ $t('deng-lu') }}
				<ui-icon sid="chevron-thin-left" />
			</button>
			<div class="error">{{ errorMsg }}</div>
		</section>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import { STORE_TYPE } from '@HELPER/const';

const { LOGIN, GET_PROFILE } = STORE_TYPE;

export default {
	data() {
		return {
			username: '',
			password: '',
			errorMsg: '',
			isDisabled: false,
			code: this.$route.query.code,
		};
	},

	methods: {
		...mapActions({
			LOGIN,
			GET_PROFILE,
		}),

		async login() {
			if (!this.check()) {
				return;
			}

			this.isDisabled = true;

			const params = {
				username: this.username,
				password: this.password,
				code: this.code,
			};

			try {
				await this[LOGIN](params);
				await this[GET_PROFILE]();
				this.redirect();
			} catch (e) {
				if (e.errorMsg) {
					this.errorMsg = e.errorMsg;
				}
				this.isDisabled = false;
			}
		},

		check() {
			// 将第三方的验证加进来
			return true;
		},

		async redirect() {
			this.$router.push({
				name: this.$ALL_CONST.ROUTE_NAME.RN_HOME,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
#bgimg{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	min-width: 800px;
	z-index: -10;
	zoom: 1;
	background-image: url(../assets/bgimg.jpg);
	background-color: #fff;
	background-repeat: no-repeat;
	background-size: cover;
	-webkit-background-size: cover;
	-o-background-size: cover;
	background-position: center 0;
}
.loginForm{
	width: 400px;
	height: 300px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	display: flex;
	flex-flow: column;
	justify-content: center;
	border: #3e3e3e solid 1px;
	border-radius: 8px;
	background: #918F7A;
	opacity: 0.7;
	input{
		margin: 0 auto;
		width: 80%;
	}
	input + input{
		margin-top: 30px;
	}
	button{
		margin: 0 auto;
		margin-top: 30px;
		width: 40%;
	}
	.error{
		margin: 0 auto;
		width: 80%;
		color: red;
		text-align: center;
		position: relative;
		top: 30px;
	}
}
</style>