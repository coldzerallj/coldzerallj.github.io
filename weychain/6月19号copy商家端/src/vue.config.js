// vue.config.js
module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'https://dssxapi.weychain.com:60443/',
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/api': '',
				},
			},
		},
	},
};
