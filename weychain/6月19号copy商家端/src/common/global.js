import urlConfig from './config.js';

// api 版本号
export const APIVERSION = 'v1_0_0/';
// 上传文件接口
export const UPLOAD_URL = `${urlConfig}file/storage/upload`;
// 商品列表待上架状态、商品进行下架
export const PRODUCT_OFF_SHELF = 0;
// 商品列表出售中状态、商品进行上架
export const PRODUCT_ON_SALE = 1;
// 订阅消息模板
export const WX_MESSAGE_TEMPLATE = [
	'UL_nlW65PDi16xsIUq7DxEV_Ou7DxOoFJ85QkWEQFd0',
	'Ww3tY9lMnPXWDsTd8gsPiRolDlDX65OQxteCMC0Fi8A',
	'9l7FArsBFlP4RG7ONQaeJ96aDHUZhZqogjKboVOYmJI',
];
