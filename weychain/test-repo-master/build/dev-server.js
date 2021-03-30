require('./check-versions')();

const config = require('../config');

if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const chalk = require('chalk');
const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const { createProxyMiddleware  } = require('http-proxy-middleware');
const webpackConfig = require('./webpack.dev.conf');
const mockType = require('./npm-script-config');
const port = process.env.PORT || config.dev.port;
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
// 代理 https://github.com/chimurai/http-proxy-middleware
// var proxyTable = config.dev.proxyTable;

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
	log: false,
	heartbeat: 2000
});

// 简化创建服务于 webpack bundle 的 HTML 文件
compiler.plugin('compilation', function (compilation) {
	compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
		hotMiddleware.publish({
			action: 'reload'
		});
		cb();
	});
});

const ROOT_MAP = {
	mock: 'http://www.wellwell.wang:3210/mock/' + mockType.mockNo + '/',
	dev: 'http://www.foo.com:8280/',
	sit: 'https://www.foo-sit.com/',
	uat: 'https://www.foo-uat.com/',
	stage: 'https://www.foo-stage.com',
	prod: 'https://www.foo-prod.com',
};

app.use(createProxyMiddleware('/api', {
	target: ROOT_MAP[mockType.type],
	changeOrigin: true,
	secure: true,
}));

// 解决路由模式为 history 时，刷新页面会 404 的情况
app.use(require('connect-history-api-fallback')());

// w监听代码变更，webpack 走内存打包输出给浏览器，提高编译速度
app.use(devMiddleware);

// 实时监听实时编译之后当然是的实现刷新 view
app.use(hotMiddleware);

const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

const uri = 'http://localhost:' + port;

let _resolve;
const readyPromise = new Promise(resolve => {
	_resolve = resolve;
});

// eslint-disable-next-line no-console
console.log(chalk.magenta('Go Go Go...'));

devMiddleware.waitUntilValid(() => {
	// eslint-disable-next-line no-console
	console.log(chalk.cyanBright('> Listening at ' + uri + '\n'));

	if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
		opn(uri);
	}

	_resolve();
});

const server = app.listen(port);

module.exports = {
	ready: readyPromise,
	close: () => {
		server.close();
	}
};
