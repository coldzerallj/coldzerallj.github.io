// import axios from 'axios';
// import { eraseEmpty } from '../utils'; // 表单内容用它在提交时去空格也可以/

// 骑手列表
const riderList = data => {
	// return `/mbs/v1_0_0/boss/mallRider/queryList?userId=${data.userId}&riderType=${data.riderType}&mobile=${data.mobile}`;
	return `/mbs/v1_0_0/boss/mallRider/queryList`;
};
// 骑手申请列表
const riderApplyList = data => {
	return `/mbs/v1_0_0/boss/mallRider/queryApplyList?userId=${data.userId}&riderType=${data.riderType}&mobile=${data.mobile}`;
	// return `/mbs/v1_0_0/boss/mallRider/queryApplyList`;
};
// const exportRiderList = data => {
// 	return axios.get(`mbs/v1_0_0/boss/mallRider/exportList`, data, {
// 		responseType: 'arraybuffer',
// 	});
// };
export default {
	riderList,
	riderApplyList,
	// exportRiderList,
};
