import store from '../store';

// 格式化时间戳
function padLeftZero(str) {
	return ('00' + str).substr(str.length);
}

function _formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	const o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
	};
	for (const k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			const str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
		}
	}
	return fmt;
}

export function formatDate(time, format = 'yyyy/MM/dd') {
	if (!time) {
		return '--';
	}

	const date = new Date(time);
	return _formatDate(date, format);
}

// 转时间戳
export function formatDateTimestamp(time) {
	if (!time) {
		return '';
	}
	const date = new Date(time);
	return date.getTime();
}

// 数据状态码转换
export function code2text(n, statusArr) {
	if (!statusArr) {
		return '没有传入状态表';
	}

	// eslint-disable-next-line no-prototype-builtins
	if (!store.state.profile.hasOwnProperty(statusArr)) {
		return '状态表不存在';
	}

	const arr = store.state.profile[statusArr];
	let label = '';

	let a;
	if (n) {
		a = n.toString();
	}

	arr.map((item) => {
		switch (item.code) {
			case a:
				// eslint-disable-next-line prefer-destructuring
				label = item.label;
				break;
			default:
		}
	});
	return label;
}

// 加币种符号，格式化千分位
export function currency(value, prefix) {
	if (value == null) {
		return '--';
	}
	let val = (value / 1).toFixed(2).replace(',', '.');
	val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return prefix ? `${prefix} ${val}` : val;
}

// 格式化百分比
export function percentage(value, decimals) {
	if (value == null) {
		return '--';
	}

	if (!decimals) {
		decimals = 2;
	}

	value = value * 100;
	return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals) + '%';
}

// 截断文字
export function truncate(str, length, unfold) {
	const postfix = '...';

	let ret = '';
	if (unfold) {
		return str;
	}

	if (str) {
		const len = str.length;
		for (let i = 0; i < len; i++) {
			const charCode = str.charCodeAt(i);
			ret += str.charAt(i);

			length -= 1;
			if (charCode > 255) {
				length -= 1;
			}

			if (length <= 3) {
				ret += postfix;
				break;
			}
		}

		return ret;
	} else {
		return '';
	}
}

// 空数据格式化
export function displayNull(value, force) {
	if (value == null || value === '') {
		return '--';
	}

	if (force && value === '0.00') {
		return '--';
	}

	return value;
}
