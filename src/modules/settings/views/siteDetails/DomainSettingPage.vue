<template>
	<div class="flex-1 mt-8 xs:mt-2">
		<div class="mx-auto py-2 lg:py-4">
			<div class="mt-10 sm:mt-0">
				<div class="md:grid md:grid-cols-3 md:gap-6">
					<div class="md:col-span-1">
						<div class="px-4 sm:px-0 text-untitled-gray-600">
							<h3
								class="text-lg font-medium leading-6 text-gray-900">
								Domain Settings
							</h3>
							<p class="mt-1 text-sm text-gray-600">
								This is the default subdomain connected to your
								RevDojo site -- all sites get one.
							</p>
						</div>
					</div>
					<div
						class="mt-5 md:col-span-2 md:mt-0"
						v-if="!loadingDomain">
						<div>
							<div class="overflow-hidden shadow sm:rounded-md">
								<div class="bg-white px-4 py-5 sm:p-6">
									<div
										class="py-2 flex mb-5"
										v-if="
											companyDomain && companyDomain.name
										">
										<ComputerDesktopIcon
											class="mr-1.5 h-8 w-8 flex-shrink-0 text-gray-400 mr-2"
											aria-hidden="true" />
										<span
											class="text-sm text-untitled-gray-500 inline-block align-middle"
											>{{
												companyDomain &&
												companyDomain.domain
											}}
										</span>
										&nbsp;
										<span
											class="text-sm text-untitled-gray-500 inline-block align-middle">
											RevDojo domain is connected
										</span>
									</div>
									<div
										class="border rounded-xl border-untitled-gray-400 py-5">
										<div
											class="border-b border-untitled-gray-400 px-5 py-4">
											<span
												class="text-untitled-gray-600 font-semibold"
												>Subdomain</span
											>
										</div>
										<div class="px-2 py-2">
											<div
												class="overflow-hidden bg-white sm:rounded-md">
												<ul
													role="list"
													class="divide-y divide-gray-200">
													<li>
														<span
															class="block hover:bg-gray-50">
															<div
																class="flex items-center px-4 py-4 sm:px-6">
																<div
																	class="flex min-w-0 flex-1 items-center">
																	<div
																		class="min-w-0 flex-1 px-4 md:grid md:grid-cols-4 md:gap-4">
																		<div
																			class="flex col-span-3">
																			<p
																				class="truncate mr-2 text-sm font-medium text-untitled-gray-600"
																				ref="url">
																				{{
																					companyDomain &&
																					companyDomain.name
																						? companyDomain.domain
																						: 'Create custom domain'
																				}}
																			</p>
																			<ClipboardDocumentListIcon
																				@click="
																					handleClickCopy
																				"
																				class="w-7 cursor-pointer text-untitled-gray-400" />
																		</div>
																		<div
																			class="hidden md:block">
																			<div>
																				<p
																					class="text-sm text-white bg-blue-400 w-32 text-center rounded-lg">
																					RevDojo
																					Domain
																				</p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</span>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div
									class="bg-gray-50 px-4 py-3 text-right sm:px-6" v-if="!isCompanyAdmin">
									<button
										type="button"
										@click="handleClickDomain"
										class="inline-flex justify-center rounded-md border border-transparent bg-untitled-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-untitled-gray-700 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2">
										Change domain
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="hidden sm:block" aria-hidden="true">
				<div class="py-5">
					<div class="border-t border-gray-200" />
				</div>
			</div>
		</div>
	</div>
	<CompanyDomainModal
		:open-modal="openModal"
		:company-domain="companyDomain"
		:company-profile="companyProfile" 
        @closeModal="handleCloseModal"
        @updatedDomain="handleUpdateDomain"/>
    
    <ReloadModal :open-modal="openReloadModal" :domain="newDomain"/>

	<global-popup-notification
		v-if="showNotification"
		:show-notification="showNotification"
		:message="messageNotification" />
</template>
<script>
export default {
    inheritAttrs: false,
};
</script>
<script setup>
import { useCompanyStore } from '@/store/useCompanyStore';
import {
	ClipboardDocumentListIcon,
	ComputerDesktopIcon,
} from '@heroicons/vue/24/outline';
import { ref, onMounted, computed, watch, inject } from 'vue';
import CompanyDomainModal from '../../components/domainSetting.vue/CompanyDomainModal.vue';
import useClipboard from 'vue-clipboard3'
import { useUserStore } from '@/store/useUserStore';
import ReloadModal from '../../components/domainSetting.vue/ReloadModal.vue';

const { toClipboard } = useClipboard()
const NotificationMessage = inject('NOTIFICATION_MESSAGE');
const companyStore = useCompanyStore();
const userStore = useUserStore();
const newDomain = ref(null)

const companyProfile = computed({
	get() {
		return companyStore.companyProfile ? companyStore.companyProfile : {};
	},
	set(newValue) {
		newValue;
	},
});
const userProfile = computed({
    get() {
        return userStore.userProfile
    },
    set(newValue) {
        newValue
    }
})

const isCompanyAdmin = computed(() => userStore.isAdministrator)
const companyDomain = ref({});
const loadingDomain = ref(false);
const openModal = ref(false);
const showNotification = ref(false);
const messageNotification = ref(null)
const openReloadModal = ref(false);

const handleClickCopy = async () => {
    await toClipboard(companyDomain.value.domain)
    notification(`You just copied this url ${companyDomain.value.domain}`)
};

const handleClickDomain = () => {
	openModal.value = true;
};

const handleCloseModal = () => {
    openModal.value = false;
}

const handleUpdateDomain = (company) => {
    openModal.value = false;
    notification(NotificationMessage.UPDATED)
	newDomain.value = company.domain
    setTimeout(() => {
        openReloadModal.value = true
    }, 500)
}


const notification = (message) => {
	messageNotification.value = message;
	showNotification.value = true;
	setTimeout(() => {
		showNotification.value = false;
	}, 2000);
};

onMounted( async () => {
    if(!companyProfile.value && !companyProfile.value.id && !companyProfile.value.domain) {
        await companyStore.getCompany(userProfile.value.company_id)
    }

    if(companyProfile.value && companyProfile.value.id) {
        companyDomain.value = companyProfile.value.domain
    }
});

watch(companyProfile, (val) => {
	if(val && val.id) {
        companyDomain.value = val.domain;
    }
});
</script>
