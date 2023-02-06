<template>
	<PageLoader v-if="loadingStore" />
	<div class="py-6" v-else>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
			<div class="mt-10 sm:mt-0">
				<div class="md:grid md:grid-cols-3 md:gap-6">
					<div class="md:col-span-1">
						<div class="px-4 sm:px-0">
							<h3
								class="text-lg font-medium leading-6 text-gray-900">
								Store Information
							</h3>
							<p class="mt-1 text-sm text-gray-600">
								Use a permanent address where you can receive
								mail.
							</p>
						</div>
					</div>
					<div class="mt-5 md:col-span-2 md:mt-0">
						<form>
							<div class="shadow sm:rounded-md">
								<div
									class="bg-white px-4 py-5 sm:p-6"
									v-if="!loadingStore">
									<div class="grid grid-cols-6 gap-6">
										<div class="col-span-6 sm:col-span-3">
											<label
												for="first-name"
												class="block text-sm font-medium text-gray-700"
												>Name <RequiredSpan
											/></label>
											<input
												type="text"
												name="first-name"
												v-model="store.name"
												id="first-name"
												autocomplete="given-name"
												placeholder="Enter store full name"
												class="mt-1 block w-full rounded-md border-untitled-gray-300 shadow-sm focus:border-untitled-gray-500 focus:ring-untitled-gray-500 sm:text-sm" />
											<ErrorSpanMessage
												v-if="
													errorValue &&
													errorValue.name
												">
												{{ errorValue.name[0] }}
											</ErrorSpanMessage>
										</div>

										<div class="col-span-6 sm:col-span-3">
											<label
												for="last-name"
												class="block text-sm font-medium text-gray-700">
												Phone</label
											>
											<SelectPhoneNumber
												v-model="phoneNumber"
												:phone="
													store.phone_number
														? `+${store.phone_code}${store.phone_number}`
														: ''
												" />
											<ErrorSpanMessage
												v-if="
													errorValue &&
													errorValue.phone_number
												">
												{{ errorValue.phone_number[0] }}
											</ErrorSpanMessage>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div class="hidden sm:block" aria-hidden="true">
				<div class="py-5">
					<div class="border-t border-untitled-gray-200" />
				</div>
			</div>
			<div class="mt-10 sm:mt-0">
				<div class="md:grid md:grid-cols-3 md:gap-6">
					<div class="md:col-span-1">
						<div class="px-4 sm:px-0">
							<h3
								class="text-lg font-medium leading-6 text-gray-900">
								Address Information
							</h3>
							<p class="mt-1 text-sm text-gray-600">
								Decide which communications you'd like to
								receive and how.
							</p>
						</div>
					</div>
					<div class="mt-5 md:col-span-2 md:mt-0">
						<form>
							<div class="shadow sm:rounded-md">
								<div
									class="space-y-6 bg-white px-4 py-5 sm:p-6"
									v-if="!loadingStore">
									<div class="grid grid-cols-6 gap-6">
										<div class="col-span-6 sm:col-span-6">
											<label
												for="first-name"
												class="block text-sm font-medium text-gray-700"
												>Address</label
											>
											<textarea
												type="text"
												v-model="store.address"
												placeholder="Enter full address"
												class="mt-1 block w-full rounded-md border-untitled-gray-300 shadow-sm focus:border-untitled-gray-500 focus:ring-untitled-gray-500 sm:text-sm" />
											<ErrorSpanMessage
												v-if="
													errorValue &&
													errorValue.address
												">
												{{ errorValue.address[0] }}
											</ErrorSpanMessage>
										</div>

										<div class="col-span-6 sm:col-span-3">
											<label
												for="last-name"
												class="block text-sm font-medium text-gray-700">
												City</label
											>
											<input
												type="text"
												name="city"
												v-model="store.city"
												id="city"
												autocomplete="given-name"
												class="mt-1 block w-full rounded-md border-untitled-gray-300 shadow-sm focus:border-untitled-gray-500 focus:ring-untitled-gray-500 sm:text-sm" />
											<ErrorSpanMessage
												v-if="
													errorValue &&
													errorValue.city
												">
												{{ errorValue.city[0] }}
											</ErrorSpanMessage>
										</div>

										<div class="col-span-6 sm:col-span-3">
											<label
												for="last-name"
												class="block text-sm font-medium text-gray-700">
												State</label
											>
											<input
												type="text"
												name="state"
												v-model="store.state"
												id="state"
												autocomplete="given-name"
												class="mt-1 block w-full rounded-md border-untitled-gray-300 shadow-sm focus:border-untitled-gray-500 focus:ring-untitled-gray-500 sm:text-sm" />
											<ErrorSpanMessage
												v-if="
													errorValue &&
													errorValue.state
												">
												{{ errorValue.state[0] }}
											</ErrorSpanMessage>
										</div>
										<div class="col-span-6 sm:col-span-3">
											<label
												for="last-name"
												class="block text-sm font-medium text-gray-700">
												Country</label
											>
											<input
												type="text"
												name="country"
												v-model="store.country"
												id="country"
												autocomplete="given-name"
												class="mt-1 block w-full rounded-md border-untitled-gray-300 shadow-sm focus:border-untitled-gray-500 focus:ring-untitled-gray-500 sm:text-sm" />
											<ErrorSpanMessage
												v-if="
													errorValue &&
													errorValue.country
												">
												{{ errorValue.country[0] }}
											</ErrorSpanMessage>
										</div>

										<div class="col-span-6 sm:col-span-3">
											<label
												for="last-name"
												class="block text-sm font-medium text-gray-700">
												Zip
											</label>
											<input
												type="number"
												name="zip"
												v-model="store.zip"
												id="zip"
												autocomplete="given-name"
												class="mt-1 block w-full rounded-md border-untitled-gray-300 shadow-sm focus:border-untitled-gray-500 focus:ring-untitled-gray-500 sm:text-sm" />
											<ErrorSpanMessage
												v-if="
													errorValue && errorValue.zip
												">
												{{ errorValue.zip[0] }}
											</ErrorSpanMessage>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div class="py-3 text-right">
				<button
					type="button"
					:disabled="loadingSave"
					@click="handleClickSave"
					class="inline-flex justify-center rounded-md border border-transparent bg-untitled-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-untitled-gray-700 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2">
					{{ loadingSave ? 'Saving..' : 'Save' }}
				</button>
			</div>

			<div class="hidden sm:block" aria-hidden="true">
				<div class="py-5">
					<div class="border-t border-untitled-gray-200" />
				</div>
			</div>
		</div>
	</div>

	<global-popup-notification
		v-if="showNotification"
		:show-notification="showNotification"
		:message="messageNotification" />
</template>
<script setup>
import { defineProps, ref, computed, onMounted, inject, watch } from 'vue';
import PageLoader from '@/components/loader/PageLoader.vue';
import RequiredSpan from '@/components/RequiredSpan.vue';
import ErrorSpanMessage from '@/components/ErrorSpanMessage.vue';
import SelectPhoneNumber from '@/components/forms/SelectPhoneNumber.vue';
import { useUserStore } from '@/store/useUserStore';
import { updateStore } from '@/modules/store/composables/update_store';
import { getStoreById } from '@/modules/store/composables/get_store';
import { useCompanyStore } from '@/store/useCompanyStore';


const NotificationMessage = inject('NOTIFICATION_MESSAGE');

const userStore = useUserStore();
const companyStore = useCompanyStore();
const storeId = ref(null);
const loadingStore = ref(false);
const phoneNumber = ref(null);
const store = ref({
	name: '',
	phone_number: '',
	company_id: '',
	address: '',
	city: '',
	state: '',
	zip: '',
	country: '',
	phone_country: '',
	phone_code: '',
});

const errorValue = ref(null);
const errorMessage = ref(null);
const loadingSave = ref(false);
const messageNotification = ref(null);
const showNotification = ref(false);
const companyProfile = computed(() => companyStore.companyProfile)


const handleClickCancel = () => {};

const handleClickSave = () => {
	if (store.value.id) {
		editStore();
		return;
	}
};

const editStore = async () => {
	loadingSave.value = true;
	initializeForm()
	const { update, data, errorData, message } = updateStore(store.value);
	await update();
	loadingSave.value = false;
	errorValue.value = errorData.value;
	errorMessage.value = message.value;
	if (!data.value) {
		return;
	}

	store.value = data.value;
	notification(NotificationMessage.UPDATED);
};

const initializeForm = () => {
	store.value.phone_number = phoneNumber.value.nationalNumber;
	store.value.phone_code = phoneNumber.value.countryCallingCode;
	store.value.phone_country = phoneNumber.value.countryCode;

	if (Object.keys(phoneNumber.value).length == 0) {
		store.value.phone_number = '';
		store.value.phone_code = '';
		store.value.phone_country = '';
	}

	store.value.company_id = userStore.userProfile.company_id;
};

const fetchStore = async () => {
	loadingStore.value = true;
	const { load, data } = getStoreById(storeId.value);
	await load();
	store.value = data.value
	loadingStore.value = false;
};

const notification = (message) => {
	messageNotification.value = message;
	showNotification.value = true;
	setTimeout(() => {
		showNotification.value = false;
	}, 2000);
};

onMounted(async() => {
	if(storeId.value) {
		await fetchStore();
	}
	if(companyProfile.value && companyProfile.value.id && companyProfile.value.stores && companyProfile.value.stores.length > 0) {
		store.value = companyProfile.value.stores[0];
	}
});

</script>
