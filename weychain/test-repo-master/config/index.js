const path = require('path'); // see http://vuejs-templates.github.io/webpack for documentation.

module.exports = {
	build: {
		env: require('./env'),
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: './',
		productionSourceMap: false,
		productionGzip: false, // 不自行生成 gizp // productionGzip 设置 true 打包生成 gzip ，并需安装 compression-webpack-plugin 例如：npm install --save-dev compression-webpack-plugin
		productionGzipExtensions: ['js', 'css'],
		bundleAnalyzerReport: process.env.npm_config_report, // 需要生成打包状况则运行打包命令的时候传入 --report，例如：`npm run build --report` // 长期需要生成则直接将 bundleAnalyzerReport 设置项改为 true
	},
	dev: {
		env: require('./env'),
		port: 8090,
		autoOpenBrowser: true,
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: require('./env').PROXY_TABLE,
		cssSourceMap: false,
	},
};
