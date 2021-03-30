import i18n from '@/i18n';
import packageConfig from '../../package.json';

// ***
// 版本号
// ***
export const VERSION = packageConfig.version;

// ***
// 登录 cookie key name
// ***
export const LOGIN_COOKIE_KEY = 'DA476D63DC8EB3504DF1A5C168CBE366';

// ***
// local storage 里面的当前用户信息的 key name
// ***
export const STORAGE_CURRENT_USER_INFO = 'STORAGE_CURRENT_USER_INFO';

// ***
// local storage 里面的本地用户集的 key name
// ***
export const STORAGE_USERS = 'STORAGE_USERS';

// ***
// eventBus 事件名称
// ***
export const EVENT_BUS_BACK_TO_CHARGE_LIST = 'EVENT_BUS_BACK_TO_CHARGE_LIST';
export const EVENT_BUS_GET_CHARGE_COUNT = 'EVENT_BUS_GET_CHARGE_COUNT';

// ***
// 账单数据导入模板下载路径
// ***
function switchTemDownloadUrl() {
	let url = '';
	if (process.env.NODE_ENV === 'production') {
		url = 'https://dssxapi.weychain.com/oss/template/缴费数据模板.xlsx';
	} else {
		url = 'https://sx-test.weychain.com:60443/oss/template/缴费数据模板.xlsx';
	}
	return url;
}
export const CHARGE_TEMPLATE_DOWNLOAD_URL = switchTemDownloadUrl();

// ***
// vux 类型
// ***
export const STORE_TYPE = {
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT',
	GET_PERMISSIONS: 'GET_PERMISSIONS',
	SET_EMAIL: 'SET_EMAIL',
	SET_USERNAME: 'SET_USERNAME',
	SET_USERID: 'SET_USERID',
	SET_ROLE_TYPE: 'SET_ROLE_TYPE',
	SET_PERMISSIONS_ROUTER: 'SET_PERMISSIONS_ROUTER',
	SET_PERMISSIONS_FULL: 'SET_PERMISSIONS_FULL',
	SET_BREADCRUMB: 'SET_BREADCRUMB',
	SET_DEFAULT_PANEL_TAB_NEED_OR_NOT: 'SET_DEFAULT_PANEL_TAB_NEED_OR_NOT',
	SET_DEFAULT_PANEL_TAB: 'SET_DEFAULT_PANEL_TAB',
	SET_CURRENT_NAV: 'SET_CURRENT_NAV',
	SET_GLOBAL_LOADING: 'SET_GLOBAL_LOADING',
	SET_MODAL_FILTER: 'SET_MODAL_FILTER',
};

// ***
// 所有数据的 新建 / 查看 / 编辑 状态代码 // 字符串!
// for form only
// ***
export const DATA_ONLY_READ = '0';
export const DATA_MODIFY = '1';
export const DATA_ADDITION = '2';
export const DATA_ACTION_LIST = {
	[DATA_ONLY_READ]: i18n.t('cha-kan'),
	[DATA_MODIFY]: i18n.t('bian-ji'),
	[DATA_ADDITION]: i18n.t('xin-jian'),
};
// ***
// 角色
// ***
export const ROLE_0 = 0;
export const ROLE_1 = 1;

// ***
// 数字产品类型
// ***
export const COUPON = '1';
export const INTEGRAL = '2';
export const DIGITAL_PRODUCT_TYPE_LIST = [
	{
		label: i18n.t('you-hui-quan'),
		code: COUPON,
	},
	{
		label: i18n.t('ji-fen'),
		code: INTEGRAL,
	},
];

// ***
// 数字产品状态
// ***
export const DIGITAL_PRODUCT_OFF_SHELF = 2; // 下架
export const DIGITAL_PRODUCT_ON_SHELF = 1; // 上架
export const DIGITAL_PRODUCT_STATUS_LIST = [
	{
		label: i18n.t('xia-jia'),
		code: DIGITAL_PRODUCT_OFF_SHELF,
	},
	{
		label: i18n.t('shang-jia'),
		code: DIGITAL_PRODUCT_ON_SHELF,
	},
];

// ***
// 使用店铺绑定方式
// ***
export const SUIT_STORE_WHITE = 1; // 白名单
export const SUIT_STORE_BLACK = 2; // 黑名单
export const SUIT_STORE_FROM_WHERE = [
	{
		label: i18n.t('bai-ming-dan'),
		code: SUIT_STORE_WHITE,
	},
	{
		label: i18n.t('hei-ming-dan'),
		code: SUIT_STORE_BLACK,
	},
];

// ***
// 机构类型
// ***
export const ORGANIZATION_TYPE_PLATFORM = '1'; // 平台
export const ORGANIZATION_TYPE_MERCHANT = '2'; // 商家
export const ORGANIZATION_LIST = [
	{
		label: i18n.t('ping-tai'),
		code: ORGANIZATION_TYPE_PLATFORM,
	},
	{
		label: i18n.t('shangjia'),
		code: ORGANIZATION_TYPE_MERCHANT,
	},
];

// ***
// 结算费状态
// ***
export const SETTLEMENT_NOT = 0; // 无需结算
export const SETTLEMENT_WAITING = 1; // 待结算
export const SETTLEMENT_DONE = 2; // 已结算
export const SETTLEMENT_STATUS = [
	{
		label: i18n.t('wu-xu-jie-suan'),
		code: SETTLEMENT_NOT,
	},
	{
		label: i18n.t('dai-jie-suan'),
		code: SETTLEMENT_WAITING,
	},
	{
		label: i18n.t('yi-jie-suan'),
		code: SETTLEMENT_DONE,
	},
];

// ***
// 路由名 (作为后端返回的路由权限表的映射表, 双方统一的值)
// ***
export const ROUTE_NAME = {
	RN_HOME: 'home',
	RN_LOGIN: 'login',
	RN_NOT_FOUND: 'notFound',

	// 优惠券管理
	RN_COUPON_MANAGEMENT: 'coupon_management',
	RN_COUPON_MANAGEMENT_LABEL: i18n.t('you-hui-quan-guan-li'),
	RN_DIGITAL_PRODUCTS_MANAGEMENT: 'digital_products_management',
	RN_DIGITAL_PRODUCTS_MANAGEMENT_LABEL: i18n.t('shu-zi-chan-pin-guan-li'),
	RN_DIGITAL_PRODUCTS_FORM: 'digital_products_form',
	RN_DIGITAL_PRODUCTS_FORM_LABEL: i18n.t('shu-zi-chan-pin'),
	RN_DIGITAL_PRODUCTS_SUIT_STORE: 'digital_products_suit_store',
	RN_DIGITAL_PRODUCTS_SUIT_STORE_LABEL: i18n.t('shi-yong-dian-pu'),
	RN_DIGITAL_PRODUCTS_NOT_SUIT_STORE: 'digital_products_not_suit_store',
	RN_DIGITAL_PRODUCTS_NOT_SUIT_STORE_LABEL: i18n.t('hei-ming-dan-dian-pu'),
	RN_COUPON_ISSUE_MANAGEMENT: 'coupon_issue_management',
	RN_COUPON_ISSUE_MANAGEMENT_LABEL: i18n.t('you-hui-quan-fa-hang-guan-li'),
	RN_COUPON_ISSUE_FORM: 'coupon_issue_form',
	RN_COUPON_ISSUE_FORM_LABEL: i18n.t('you-hui-quan-fa-hang-shen-qing'),
	RN_COUPON_ISSUE_RECORD: 'coupon_issue_record',
	RN_COUPON_ISSUE_RECORD_LABEL: i18n.t('you-hui-quan-fa-fang-ji-lu'),
	RN_COUPON_TRANSACTION: 'coupon_transaction',
	RN_COUPON_TRANSACTION_LABEL: i18n.t('you-hui-quan-jiao-yi-liu-shui'),
	RN_COUPON_WRITE_OFF_RECORD: 'coupon_write_off_record',
	RN_COUPON_WRITE_OFF_RECORD_LABEL: i18n.t('you-hui-quan-he-xiao-ji-lu'),

	// 财务管理
	RN_COLLECTION_MANAGEMENT: 'collection_management',
	RN_COLLECTION_MANAGEMENT_LABEL: i18n.t('cai-wu-guan-li'),
	RN_SUB_MERCHANTS: 'sub_merchants',
	RN_SUB_MERCHANTS_LABEL: i18n.t('shang-hu-guan-li'),
	RN_TRANSACTION_FLOW: 'transaction_flow',
	RN_TRANSACTION_FLOW_LABEL: i18n.t('xian-xia-shou-kuan-ding-dan-cha-xun'),

	// 活动管理
	RN_EVENT_MANAGEMENT: 'event_management',
	RN_EVENT_MANAGEMENT_LABEL: '优惠券规则管理',
	RN_EVENT_LIST: 'event_list',
	RN_EVENT_LIST_LABEL: '优惠券规则总表',
	RN_ACTIVITY_TEMPLATE: 'activity_template',
	RN_ACTIVITY_TEMPLATE_LABEL: '规则类型列表',
	RN_TRIGGER_TYPE: 'trigger_type',
	RN_TRIGGER_TYPE_LABEL: '发券规则列表',
	RN_SIGN_UP: 'sign_up',
	RN_SIGN_UP_LABEL: '商家报名规则列表',
	RN_CREATE_ACTIVITY_FORM: 'create_trigger_type_form',
	RN_CREATE_ACTIVITY_FORM_LABEL: i18n.t('chuang-jiang-huo-dong'),
	RN_SIGN_UP_FORM: 'create_sign_up_form',
	RN_SIGN_UP_FORM_LABEL: '商家报名规则列表',
	RN_TRIGGER_TYPE_RECORD: 'trigger_type_record',
	RN_TRIGGER_TYPE_RECORD_LABEL: '发券规则生效记录',
	RN_SIGN_UP_RECORD: 'sign_up_record',
	RN_SIGN_UP_RECORD_LABEL: '商家报名记录',
	// 广告位管理
	RN_ADVERTISING_MANAGEMENT: 'advertising_management',
	RN_ADVERTISING_MANAGEMENT_LABEL: i18n.t('guang-gao-wei-guan-li'),
	RN_ADVERTISING_LIST: 'advertising_list',
	RN_ADVERTISING_LIST_LABEL: i18n.t('guang-gao-wei-lie-biao'),
	RN_ADVERTISING_DETAIL: 'advertising_detail',
	RN_ADVERTISING_DETAIL_LABEL: i18n.t('cha-kan-guang-gao'),
	// 内容管理
	RN_CONTENT_MANAGEMENT: 'content_management',
	RN_CONTENT_MANAGEMENT_LABEL: i18n.t('nei-rong-guan-li'),
	RN_BOUTIQUE_LIST: 'boutique_list',
	RN_BOUTIQUE_LIST_LABEL: i18n.t('jing-xuan-shang-pin-guan-li'),
	RN_BOUTIQUE_ADD: 'boutique_add',
	RN_BOUTIQUE_ADD_LABEL: i18n.t('xin-zeng-jing-xuan-shang-pin-ka-pian'),
	// 消息推送管理
	RN_MESSAGE_MANAGEMENT: 'message_management',
	RN_MESSAGE_MANAGEMENT_LABEL: i18n.t('xiao-xi-tui-song-guan-li'),
	RN_MESSAGE_LIST: 'message_list',
	RN_MESSAGE_LIST_LABEL: i18n.t('xiao-xi-lie-biao'),
	RN_CREATE_MESSAGE_PUSH: 'create_message_push',
	RN_CREATE_MESSAGE_PUSH_LABEL: i18n.t('xin-zeng-xiao-xi-tui-song'),
	// 配送管理
	RN_DELIVERY_MANAGEMENT: 'delivery_management',
	RN_DELIVERY_MANAGEMENT_LABEL: '配送管理',
	RN_RIDER_LIST: 'rider_list',
	RN_RIDER_LIST_LABEL: '骑手列表',
	RN_SETTLEMENT_APPLY: 'settlement_apply',
	RN_SETTLEMENT_APPLY_LABEL: '骑手入驻申请',
};

// ***
// 菜单导航组名称 (显示路由的界面入口)
// ***
export const NAV_GROUP = {
	COLLECTION_MANAGEMENT: ROUTE_NAME.RN_COLLECTION_MANAGEMENT,
	COUPON_MANAGEMENT: ROUTE_NAME.RN_COUPON_MANAGEMENT,
	EVENT_MANAGEMENT: ROUTE_NAME.RN_EVENT_MANAGEMENT,
	ADVERTISING_MANAGEMENT: ROUTE_NAME.RN_ADVERTISING_MANAGEMENT,
	CONTENT_MANAGEMENT: ROUTE_NAME.RN_CONTENT_MANAGEMENT,
	MESSAGE_MANAGEMENT: ROUTE_NAME.RN_MESSAGE_MANAGEMENT,
	DELIVERY_MANAGEMENT: ROUTE_NAME.RN_DELIVERY_MANAGEMENT,
};

// ***
// 不需要权限的路由表
// ***
export const NO_PERMISSIONS_REQUIRED_ROUTES_MAP = [ROUTE_NAME.RN_LOGIN, ROUTE_NAME.RN_NOT_FOUND];
