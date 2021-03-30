import config from './config';
import interceptor from './interceptor';

config.use();
interceptor.use();

import user from './url/user';
import chargeStandardManagement from './url/charge-standard-management';
import chargeManagement from './url/charge-management';
import collectionManagement from './url/collection-management';
import sectionTable from './url/component/section-table';
import couponManagement from './url/coupon-management';
import eventManagement from './url/event-management';
import boutiqueManagement from './url/boutique-management';
import messageManagement from './url/message-management';
import advertisingManagement from './url/advertising-management';
import deliveryManagement from './url/delivery-management';

export default {
	...user,
	...sectionTable,
	chargeStandardManagement,
	chargeManagement,
	couponManagement,
	collectionManagement,
	eventManagement,
	boutiqueManagement,
	messageManagement,
	advertisingManagement,
	deliveryManagement,
};
