import uiIcon from '@UI/icon';
import uiDataStatistical from '@UI/data-statistical';

const components = [uiIcon, uiDataStatistical];

const install = function(Vue) {
	if (install.installed) return;

	components.map(component => {
		Vue.component(component.name, component);
	});
};

export default {
	install,
};
