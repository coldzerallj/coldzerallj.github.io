const DOMAIN_ROOT_MAP = {
	local: '"http://localhost:8090/"',
	dev: '""',
	sit: '""',
	uat: '""',
	stage: '""',
	prod: '""',
};

const API_ROOT_MAP = {
	local: '"http://localhost:8090/api"',
	dev: '"api"',
	sit: '"api"',
	uat: '"api"',
	stage: '"api"',
	prod: '"api"',
};

const env = process.env.ENV;

module.exports = {
	NODE_ENV: env === 'prod' ? '"production"' : '"development"',
	DOMAIN_ROOT: DOMAIN_ROOT_MAP[env],
	API_ROOT: API_ROOT_MAP[env],
};
