import sectionTable from '@SECTION/table';

const components = [sectionTable];

const install = function(Vue) {
	if (install.installed) return;

	components.map(component => {
		Vue.component(component.name, component);
	});
};

export default {
	install,
};
