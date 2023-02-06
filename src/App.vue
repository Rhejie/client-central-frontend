<template>
	<PageLoader v-if="loading" />
	<router-view v-else></router-view>
</template>
<script setup>
import { getUserProfile } from '@/composables/authentication';
import { onMounted, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useUserStore } from './store/useUserStore';
import { useCompanyStore } from './store/useCompanyStore';
import { setCompanyProfileLocalStorage } from './composables/company-local-storage';
import { accessToken } from './composables/local_storage';
import PageLoader from './components/loader/PageLoader.vue';
import { getCompanyProfileByDomain } from './composables/domain';
import { tabBrowserSetting } from '@/composables/tab-browser';

const router = useRouter();
const route = useRoute()
const userStore = useUserStore();
const companyStore = useCompanyStore();

const loading = ref(false);
const getLoggedInUser = async () => {
	loading.value = true;
	const { loadUser, data } = getUserProfile();
	await loadUser();
	userStore.setUserProfile(data.value);
	companyStore.getCompany(data.value.company_id);
	setCompanyProfileLocalStorage(JSON.stringify(data.value.company));
	loading.value = false;
};

const getDomainProfile = async () => {
	const { load, data } = getCompanyProfileByDomain();
	await load();
	companyStore.setCompanyDomain(data.value);
};

onMounted(async () => {
	if (accessToken()) {
		await getLoggedInUser();
	}

	await getDomainProfile();
	tabBrowserSetting(route.meta.title);
});

watch(route, () => {
	tabBrowserSetting(route.meta.title);
})
</script>
