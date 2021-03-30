// 去掉左右空格
const trim = (string) => {
	return string.replace(/(^\s*)|(\s*$)/g, '');
};

module.exports = {
	trim,
};
