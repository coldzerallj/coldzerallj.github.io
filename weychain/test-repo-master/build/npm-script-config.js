const inquirer = require('inquirer');

// 选项表
const choices = [
	{
		name: 'mock',
		value: 'mock'
	},
	{
		name: 'dev',
		value: 'dev'
	},
	{
		name: 'sit',
		value: 'sit'
	},
	{
		name: 'uat',
		value: 'uat'
	},
	{
		name: 'stage',
		value: 'stage'
	},
	{
		name: 'prod',
		value: 'prod'
	},
];

choices.unshift(new inquirer.Separator());

inquirer.prompt(
	{
		name: 'type',
		type: 'list',
		message: '项目运行环境选择',
		choices,
		pageSize: choices.length,
	}
).then(answers => {
	if (answers.type === 'mock') {
		inquirer.prompt(
			{
				type: 'list',
				name: 'mockNo',
				message: '选择一个 Mock 库',
				// 例
				choices: [
					{ name: 'Role0 mock 数据', value: '43' },
					{ name: 'Role1 mock 数据', value: '11' },
				],
			}
		).then(answers2 => {
			module.exports = {
				type: answers.type,
				mockNo: answers2.mockNo
			};
			require('./dev-server');
		});
	} else {
		module.exports = {
			type: answers.type,
			mockNo: null,
		};
		require('./dev-server');
	}
});
