<template>
	<PageLoader v-if="loadingCompanyInformation" />
	<div class="flex-1 mt-4 shadow-lg bg-white" v-else>
		<div class="mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
			<h1
				class="text-3xl font-bold tracking-tight text-untitled-gray-500">
				Profile
			</h1>

			<form class="divide-y-untitled-gray-200 mt-6 space-y-8 divide-y">
				<div class="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
					<div class="sm:col-span-3">
						<label
							for="first-name"
							class="block text-sm text-untitled-gray-900">
							Name <RequiredSpan
						/></label>
						<input
							type="text"
							v-model="companyProfile.name"
							class="mt-1 block w-full rounded-md border-untitled-gray-300 text-untitled-gray-900 shadow-sm focus:border-untitled-gray-500 focus:ring-untitled-gray-500 sm:text-sm" />
						<ErrorSpanMessage v-if="errorValue && errorValue.name">
							{{ errorValue.name[0] }}
						</ErrorSpanMessage>
					</div>
					<div class="sm:col-span-3">
						<label
							for="first-name"
							class="block text-sm text-untitled-gray-900">
							Phone</label
						>

						<SelectPhoneNumber
							v-model="result"
							:phone="
								companyProfile.phone_number
									? `+${companyProfile.phone_code}${companyProfile.phone_number}`
									: ''
							"
							@removePhone="handleRemovePhoneNumber"
							@addPhoneNumber="handleAddPhoneNumber" />

						<ErrorSpanMessage
							v-if="errorValue && errorValue.phone_number">
							{{ errorValue.phone_number[0] }}
						</ErrorSpanMessage>
					</div>

					<div class="sm:col-span-3">
						<label
							for="website"
							class="block text-sm text-untitled-gray-900">
							Website
						</label>
						<div class="mt-1 flex rounded-md shadow-sm">
							<span
								class="inline-flex items-center rounded-l-md border border-r-0 border-untitled-gray-300 bg-untitled-gray-50 px-3 text-untitled-gray-500 sm:text-sm"
								>https://</span
							>
							<input
								type="text"
								name="website"
								v-model="companyProfile.website"
								id="website"
								autocomplete="website"
								class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-untitled-gray-300 text-untitled-gray-900 focus:border-untitled-gray-500 focus:ring-untitled-gray-500 sm:text-sm" />
						</div>
						<ErrorSpanMessage
							v-if="errorValue && errorValue.website">
							{{ errorValue.website[0] }}
						</ErrorSpanMessage>
					</div>

					<div class="sm:col-span-3 relative">
						<label
							for="default_password"
							class="block text-sm text-untitled-gray-900">
							Default Password <RequiredSpan />
						</label>
						<div class="mt-1 relative">
							<input
								id="password"
								name="password"
								placeholder="Enter your password"
								v-model="companyProfile.default_password"
								:type="!isViewPassword ? 'password' : 'text'"
								autocomplete="password"
								class="block w-full appearance-none rounded-md border border-untitled-gray-300 px-3 py-2 placeholder-untitled-gray-400 shadow-sm focus:border-untitled-gray-500 focus:outline-none focus:ring-untitled-gray-500 sm:text-sm" />
							<div
								class="absolute inset-y-0 right-0 flex items-center pr-3">
								<component
									:is="viewPasswordIcon"
									@click="handleCLickViewPassword"
									class="h-5 w-5 text-untitled-gray-500 cursor-pointer"
									aria-hidden="true" />
							</div>
						</div>
					</div>
				</div>

				<div
					class="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
					<div class="sm:col-span-6">
						<h2 class="text-xl text-untitled-gray-900">
							Address Information
						</h2>
						<p class="mt-1 text-sm text-untitled-gray-500">
							This information will be displayed publicly so be
							careful what you share.
						</p>
					</div>

					<div class="sm:col-span-6">
						<label
							for="description"
							class="block text-sm text-untitled-gray-900"
							>Address</label
						>
						<div class="mt-1">
							<textarea
								v-model="companyProfile.address"
								id="description"
								name="description"
								rows="4"
								class="block w-full rounded-md border-untitled-gray-300 shadow-sm focus:border-untitled-gray-500 focus:ring-untitled-gray-500 sm:text-sm" />
						</div>
					</div>

					<div class="sm:col-span-3">
						<label
							for="email-address"
							class="block text-sm text-untitled-gray-900">
							State
						</label>
						<input
							type="text"
							v-model="companyProfile.state"
							autocomplete="email"
							class="mt-1 block w-full rounded-md border-untitled-gray-300 text-untitled-gray-900 shadow-sm focus:border-untitled-gray-500 focus:ring-untitled-gray-500 sm:text-sm" />
					</div>

					<div class="sm:col-span-3">
						<label
							for="phone-number"
							class="block text-sm text-untitled-gray-900">
							City
						</label>
						<input
							type="text"
							name="phone-number"
							v-model="companyProfile.city"
							id="phone-number"
							autocomplete="tel"
							class="mt-1 block w-full rounded-md border-untitled-gray-300 text-untitled-gray-900 shadow-sm focus:border-untitled-gray-500 focus:ring-untitled-gray-500 sm:text-sm" />
					</div>

					<div class="sm:col-span-3">
						<label
							for="email-address"
							class="block text-sm text-untitled-gray-900">
							Country
						</label>
						<input
							type="text"
							v-model="companyProfile.country"
							autocomplete="email"
							class="mt-1 block w-full rounded-md border-untitled-gray-300 text-untitled-gray-900 shadow-sm focus:border-untitled-gray-500 focus:ring-untitled-gray-500 sm:text-sm" />
						<ErrorSpanMessage
							v-if="errorValue && errorValue.country">
							{{ errorValue.country[0] }}
						</ErrorSpanMessage>
					</div>

					<div class="sm:col-span-3">
						<label
							for="language"
							class="block text-sm text-untitled-gray-900"
							>Zip Code</label
						>
						<input
							type="number"
							v-model="companyProfile.zip"
							name="language"
							id="language"
							class="mt-1 block w-full rounded-md border-untitled-gray-300 text-untitled-gray-900 shadow-sm focus:border-untitled-gray-500 focus:ring-untitled-gray-500 sm:text-sm" />
						<ErrorSpanMessage v-if="errorValue && errorValue.zip">
							{{ errorValue.zip[0] }}
						</ErrorSpanMessage>
					</div>
				</div>

				<div class="flex justify-end pt-8">
					<button
						type="button"
						:disabled="loadingSave"
						@click="handleClickSave()"
						class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-untitled-gray-600 py-2 px-4 text-sm text-white shadow-sm hover:bg-untitled-gray-700 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2">
						{{ loadingSave ? 'Updating....' : 'Save' }}
					</button>
				</div>
			</form>
		</div>
	</div>

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
import ErrorSpanMessage from '@/components/ErrorSpanMessage.vue';
import SelectPhoneNumber from '@/components/forms/SelectPhoneNumber.vue';
import PageLoader from '@/components/loader/PageLoader.vue';
import RequiredSpan from '@/components/RequiredSpan.vue';
import { useUserStore } from '@/store/useUserStore';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';
import { ref, onMounted, watch, computed, inject } from 'vue';
import { getCompany } from '../../composables/companySettings/companyInformation/get_company';
import { updateCompany } from '../../composables/companySettings/companyInformation/update_company';

const NotificationMessage = inject('NOTIFICATION_MESSAGE')

const userStore = useUserStore();

const companyId = computed(() => userStore.userProfile.company_id);

const loadingCompanyInformation = ref(false);
const companyProfile = ref({});
const result = ref(null);
const errorValue = ref(null);
const errorMessage = ref(null);
const viewPasswordIcon = ref(EyeIcon);
const isViewPassword = ref(false);
const loadingSave = ref(false);
const messageNotification = ref(null);
const showNotification = ref(false)

const fetchCompanyInformation = async () => {
	loadingCompanyInformation.value = true;
	const { load, data } = getCompany(companyId.value);
	await load();
	companyProfile.value = data.value;
	loadingCompanyInformation.value = false;
};

const handleAddPhoneNumber = (number) => {
	companyProfile.value.phone_number = number;
};

const handleRemovePhoneNumber = () => {
	companyProfile.value.phone_number = null;
};

const handleClickSave = async () => {
	loadingSave.value = true;
	if (result.value && result.value.nationalNumber) {
		companyProfile.value.phone_number = result.value.nationalNumber;
		companyProfile.value.phone_code = result.value.countryCallingCode;
		companyProfile.value.phone_country = result.value.countryCode;
	}
	
	const { update, data, errorData, message } = updateCompany(companyProfile.value, companyProfile.value.id);
	await update();

	errorValue.value = errorData.value;
	errorMessage.value = message.value;
	loadingSave.value = false;
	if (!data.value) return;
	notification(NotificationMessage.UPDATED)
	companyProfile.value = data.value;
};

const handleCLickViewPassword = () => {
	isViewPassword.value = !isViewPassword.value;

	if (isViewPassword.value) {
		viewPasswordIcon.value = EyeSlashIcon;
		return;
	}

	viewPasswordIcon.value = EyeIcon;
};


const notification = (message) => {
	messageNotification.value = message;
	showNotification.value = true;
	setTimeout(() => {
		showNotification.value = false;
	}, 2000);
};

onMounted(async () => {
	if(userStore.userProfile && userStore.userProfile.id) {
		await fetchCompanyInformation();
	}
})

watch(companyId, async () => {
	await fetchCompanyInformation();
});
</script>
