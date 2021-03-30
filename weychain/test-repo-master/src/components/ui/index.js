import uiIcon from '@UI/icon';

const components = [uiIcon];

const install = function(Vue) {
	if (install.installed) return;

	components.map(component => {
		Vue.component(component.name, component);
	});
};

export default {
	install,
};
