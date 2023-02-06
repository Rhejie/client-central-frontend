import { useCompanyStore } from '@/store/useCompanyStore';
import { computed } from 'vue';

export const tabBrowserSetting = (routeTitle) => {
	const companyStore = useCompanyStore();
	const domainSetting = computed({
		get() {
			if (companyStore.domain) {
				return companyStore.domain;
			}

			return {};
		},
		set(newValue) {
			newValue;
		},
	});

	let link = document.querySelector("link[rel~='icon']");

	if (!link) {
		link = document.createElement('link');
		link.rel = 'icon';
		document.getElementsByTagName('head')[0].appendChild(link);
	}

	link.href = domainSetting.value.favicon_photo
		? domainSetting.value.favicon_photo
		: domainSetting.value.default_favicon_photo

	let title = routeTitle
		? domainSetting.value.company_name + ' | ' + routeTitle
		: domainSetting.value.company_name;
	document.title = title;
};
