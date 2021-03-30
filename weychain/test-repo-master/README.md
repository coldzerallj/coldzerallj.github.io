#### 安装依赖
```javascript
yarn // husky包 在 window 系统下通过 yarn 安装可能不起效，超神奇
```
```javascript
npm i
```
尽量不要覆盖原来依赖包 lock 文件，保持统一稳定的运行环境

#### scripts
```javascript
yarn //开发，开发下各种选项参数需要定制配置的，要按照运行mock环境的命令例子去写，统一写法和布局，方便维护
yarn build:env //构建不同环境的代码，加` --report `以查看性能报告
yarn svg //生成`svg sprites`
yarn changelog // 生成提交日志
yarn test // 执行测试
```

#### mock
* mock 数据不在本地建库，转由线上工具(yapi)导入公司 swagger 数据结构，然后本地代理过去
* [线上地址](http://wellwell.wang:3210/);
```javascript
yarn > mock > type?
```

#### 代码布局
#### /build
* 构建项目的配置文件，包括 webpack 等依赖包和环境组装，命令行设计等

#### /config
* webpack 和环境组装的参数配置，主要服务于 /build

#### /static
* 静态资源，可配置的样式代码，或者图片都可以放这里，用 webpack 的别名配置相对指向资源就可以

#### /.babelrc
* webpack.babel独立配置出来，打死也不会改，用100年不过期

#### /.commitlintrc
* commitlint 配置参数，git提交动作的规范
* 提交信息格式： <type>(scope):  <subject>
* 提交信息示例：feat(SPS-0001): All done
* type，scope, subject 为 `必填`，并且 type 只能 `小写`，scope 只能 `大写`
* scope 需使用 `SPS` + `-` + `jira号` 的格式填写，横杠后面只允许填写数字
* subject 前的冒号有空格，并有限制字符数为 144，文末不用加 `.` 号
* type允许使用下面的标识：
```javascript
'chore', // 管理各种依赖包，库，例如：安装，卸载，重装，升级
'docs', // 文档更新
'feat', // 新功能
'bug', // bug 处理
'refactor', // 重构，包括结构，逻辑，样式
'style', // 样式处理
'test', // 本地测试
```
* body，footer 等没有添加限制，非必填
* 建议本地创建提交信息模板，但记得不要提交到项目里面，会影响一些用UI工具的同事使用工具创建模板（有版本问题）

#### /.editorconfig
* IDE 的文本格式配置，可以改，不要太非主流就可以，并且需要提交

#### /.eslintignore
* eslint 白名单
```javascript
.eslintrc.js
package.json
/dist/
/src/i18n/langs/ // 语言工具的词表，版本更新或者使用方式都可能改变文档的格式或类型，保证词表能读就好
node_modules/
src/svg // 项目目录里面 svg 之类的非编译静态资源不用检查
```

#### /.prettierrc
* 使用 prettier 做提交代码的格式化处理，建议 IDE 调用的格式化规则也调整为 prettier

#### /.eslintrc
* es 的格式规范
```javascript
'array-bracket-newline': [2, 'consistent'],
camelcase: [
	2,
	{
		properties: 'always',
	},
],
'no-shadow-restricted-names': 2,
'no-console': 2,
'no-alert': 2,
'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
'no-var': 2,
'prefer-const': 2,
'prefer-destructuring': [
	2,
	{
		array: false,
		object: true,
	},
],
// for vue
'vue/require-v-for-key': 2,
'vue/no-parsing-error': [
	2,
	{
		'x-invalid-end-tag': false,
	},
],
'vue/max-attributes-per-line': [
	2,
	{
		singleline: 10,
		multiline: {
			max: 1,
			allowFirstLine: false,
		},
	},
],
'vue/singleline-html-element-content-newline': 'off',
'vue/multiline-html-element-content-newline': 'off',
'vue/name-property-casing': ['error', 'PascalCase'],
'vue/no-v-html': 'off',
'accessor-pairs': 2,
'arrow-spacing': [
	2,
	{
		before: true,
		after: true,
	},
],
'block-spacing': [2, 'always'],
'brace-style': [
	2,
	'1tbs',
	{
		allowSingleLine: true,
	},
],
'constructor-super': 2,
curly: [2, 'multi-line'],
'dot-location': [2, 'property'],
'eol-last': 2,
eqeqeq: ['error', 'always', { null: 'ignore' }],
'generator-star-spacing': [
	2,
	{
		before: true,
		after: true,
	},
],
'handle-callback-err': [2, '^(err|error)$'],
indent: [
	2,
	"tab",
	{
		SwitchCase: 1,
	},
],
'jsx-quotes': [2, 'prefer-single'],
'key-spacing': [
	2,
	{
		beforeColon: false,
		afterColon: true,
	},
],
'keyword-spacing': [
	2,
	{
		before: true,
		after: true,
	},
],
'new-cap': [
	2,
	{
		newIsCap: true,
		capIsNew: false,
	},
],
'new-parens': 2,
'no-array-constructor': 2,
'no-caller': 2,
'no-class-assign': 2,
'no-cond-assign': 2,
'no-const-assign': 2,
'no-control-regex': 0,
'no-delete-var': 2,
'no-dupe-args': 2,
'no-dupe-class-members': 2,
'no-dupe-keys': 2,
'no-duplicate-case': 2,
'no-empty-character-class': 2,
'no-empty-pattern': 2,
'no-eval': 2,
'no-ex-assign': 2,
'no-extend-native': 2,
'no-extra-bind': 2,
'no-extra-boolean-cast': 2,
'no-extra-parens': [2, 'functions'],
'no-fallthrough': 2,
'no-floating-decimal': 2,
'no-func-assign': 2,
'no-implied-eval': 2,
'no-inner-declarations': [2, 'functions'],
'no-invalid-regexp': 2,
'no-irregular-whitespace': 2,
'no-iterator': 2,
'no-label-var': 2,
'no-labels': [
	2,
	{
		allowLoop: false,
		allowSwitch: false,
	},
],
'no-lone-blocks': 2,
'no-mixed-spaces-and-tabs': 2,
'no-multi-spaces': 2,
'no-multi-str': 2,
'no-multiple-empty-lines': [
	2,
	{
		max: 1,
	},
],
'no-native-reassign': 2,
'no-negated-in-lhs': 2,
'no-new-object': 2,
'no-new-require': 2,
'no-new-symbol': 2,
'no-new-wrappers': 2,
'no-obj-calls': 2,
'no-octal': 2,
'no-octal-escape': 2,
'no-path-concat': 2,
'no-proto': 2,
'no-redeclare': 2,
'no-regex-spaces': 2,
'no-return-assign': [2, 'except-parens'],
'no-self-assign': 2,
'no-self-compare': 2,
'no-sequences': 2,
'no-spaced-func': 2,
'no-sparse-arrays': 2,
'no-this-before-super': 2,
'no-throw-literal': 2,
'no-trailing-spaces': 2,
'no-undef': 2,
'no-undef-init': 2,
'no-unexpected-multiline': 2,
'no-unmodified-loop-condition': 2,
'no-unneeded-ternary': [
	2,
	{
		defaultAssignment: false,
	},
],
'no-unreachable': 2,
'no-unsafe-finally': 2,
'no-unused-vars': [
	2,
	{
		vars: 'all',
		args: 'none',
	},
],
'no-useless-call': 2,
'no-useless-computed-key': 2,
'no-useless-constructor': 2,
'no-useless-escape': 0,
'no-whitespace-before-property': 2,
'no-with': 2,
'one-var': [
	2,
	{
		initialized: 'never',
	},
],
'operator-linebreak': [
	2,
	'after',
	{
		overrides: {
			'?': 'before',
			':': 'before',
		},
	},
],
'padded-blocks': [2, 'never'],
quotes: [
	2,
	'single',
	{
		avoidEscape: true,
		allowTemplateLiterals: true,
	},
],
semi: [2, 'always'],
'semi-spacing': [
	2,
	{
		before: false,
		after: true,
	},
],
'space-before-blocks': [2, 'always'],
'space-in-parens': [2, 'never'],
'space-infix-ops': 2,
'space-unary-ops': [
	2,
	{
		words: true,
		nonwords: false,
	},
],
'spaced-comment': [
	2,
	'always',
	{
		markers: [
			'global',
			'globals',
			'eslint',
			'eslint-disable',
			'*package',Ï
			'!',
			',',
		],
	},
],
'template-curly-spacing': [2, 'never'],
'use-isnan': 2,
'valid-typeof': 2,
'wrap-iife': [2, 'any'],
'yield-star-spacing': [2, 'both'],
yoda: [2, 'never'],
'object-curly-spacing': [
	2,
	'always',
	{
		objectsInObjects: false,
	},
],
'array-bracket-spacing': [2, 'never'],
```

#### /src/api 接口
* `/url` 为服务器接口目录，接口集合以功能模块区分，例子：`user.js`
* `/config.js` axios 的配置参数文件
* `/index.js` 请求模块出口
* `/interceptor.js` axios 拦截器，全局请求和响应的拦截处理
* `/utils.js` 请求处理工具集合
* `/white-list.js` 拦截器白名单，单独如果全局处理钩子

#### /src/components 组件
* `/layout` 页面布局，交互集合型组件，例如导航，页脚
* `/section` 业务类型组件，例如注册激活流程，业务审核流程
* `/ui` 自定义的 ui 组件，在第三个轮子实在满足不到或者比第三方轮子更有效实现需求的时候可以开发

#### /src/directives 自定义 vue API
* `/index.js` 全部自定义 API 均统一全局注册，如处理整数输入，处理小数点输入

#### /src/filters 数据格式化工具
* `/index.js` 统一全局注册，如时间戳，状态转换，百分比转换，千分位转换

#### /src/help 项目配置文件
* `/const.js` 全部项目业务常量均统一在此注册并调用
* `/eventbus.js` 注册组建通信工具

#### /src/route 路由
* `/routes` 路由归类管理
* `/interceptor.js` 路由拦截，全局处理路由进出规则
* `/index.js` 路由

#### /src/store 状态机
* `/modules` 归类管理，dispatch方法命名全部的由 const.js 常量管理，不在 modules 单独命名
* `/index.js` store出口

#### /src/view 供路由调用的页面组件

#### /src/style 状态机
* `/mixins/mixins.scss` scss mixins 工具
* `/theme/variable.scss` 项目自定义样式参数值

#### 命名
* 文件夹和文件的命名全小写，单词用 `-` 分割，例：`role-permissions-route`
* 常量命名全大写，用下划线 `_` 分割单词，例：`STORE_TYPE`
* 变量命名用小驼峰法，变量首字母小写，单词首字母大写，例：`taskListData`
* 样式类名，样式变量，style mixins，和 element 一样使用 [BEM]([https://www.w3cplus.com/css/bem-definitions.html](https://www.w3cplus.com/css/bem-definitions.html)
) 命名规则
