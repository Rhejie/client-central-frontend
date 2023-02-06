<template>
	<GlobalBreadCrumbs :pages="pages" />
	<PageLoader v-if="loadingUser"/>
	<div class="py-6" v-else>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
			<h1 class="text-2xl font-semibold text-untitled-gray-700">
				Users
				<span class="text-lg font-thin">{{
					userId ? 'Edit' : 'Create'
				}}</span>
			</h1>
			<div class="relative mt-1 py-4 rounded-md">
				<router-link
					class="absolute text-untitled-gray-500 inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
					:to="{
						name: 'User Home Page',
					}">
					<ArrowLeftIcon
						class="-ml-1 mr-2 h-5 w-5"
						aria-hidden="true" />
				</router-link>
				<label class="p-10 text-sm text-untitled-gray-500">Back</label>

				<button
					type="button"
					:disabled="loading"
					@click="handleClickSave"
					class="inline-flex float-right justify-center rounded-md border border-transparent bg-untitled-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-untitled-gray-700 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2">
					{{ loading ? 'Saving...' : 'Save' }}
				</button>
				<router-link
					:to="{
						name: 'User Home Page',
					}"
					class="inline-flex float-right justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-untitled-gray-500 shadow-lg mr-2 hover:bg-untitled-gray-100 focus:outline-none focus:ring-2 focus:ring-untitled-gray-400 focus:ring-offset-2">
					Cancel
				</router-link>
				<button
					type="button"
					v-if="userId"
					:disabled="loading"
					@click="handleClickPreview"
					class="inline-flex mr-2 float-right justify-center rounded-md border border-transparent bg-untitled-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-untitled-gray-700 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2">
					Preview
				</button>
			</div>
		</div>

		<div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
			<div class="py-4">
				<div class="p-4 h-full" v-if="!loadingUser">
					<div class="md:grid md:grid-cols-3 md:gap-6">
						<div class="md:col-span-1">
							<div class="px-4 sm:px-0">
								<h3
									class="text-lg font-medium leading-6 text-gray-900">
									Cover Photo
								</h3>
								<p class="mt-1 text-sm text-gray-600">
									This information will be displayed publicly
									so be careful what you share.
								</p>
							</div>
						</div>
						<div class="mt-5 md:col-span-2 md:mt-0">
							<div class="shadow sm:rounded-md">
								<div
									class="space-y-6 shadow-lg bg-white px-4 py-5 sm:p-6">
									<div>
										<label
											class="block text-sm font-medium text-gray-700"
											>Cover Photo</label
										>
										<div
											v-if="!hasCoverImage"
											class="mt-1 flex w-full mx-auto rounded-md px-6 pt-5 pb-6">
											<ProfileUploader
												@file="handleCoverPhoto"
												:label="'Drop your cover photo or click to browse your computer'"
												@removeFile="
													handleRemoveCoverPhoto
												" />
										</div>
										<div v-else>
											<div
												class="mt-1 flex aspect-w-96 max-h-80 mx-auto rounded-md px-6 pt-5 pb-6">
												<img
													class="object-cover w-full mx-auto"
													:src="user.cover_photo"
													alt="" />
											</div>
											<div
												class="aspect-w-96 mx-auto text-center">
												<button
													@click="
														handleClickChangeCoverPhoto
													"
													class="inline-flex justify-center rounded-md border border-transparent bg-untitled-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-untitled-gray-700 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2">
													Change Cover Photo
												</button>
											</div>
										</div>
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
				<div class="p-4 h-full" v-if="!loadingUser">
					<div class="md:grid md:grid-cols-3 md:gap-6">
						<div class="md:col-span-1">
							<div class="px-4 sm:px-0">
								<h3
									class="text-lg font-medium leading-6 text-gray-900">
									Profile
								</h3>
								<p class="mt-1 text-sm text-gray-600">
									This information will be displayed publicly
									so be careful what you share.
								</p>
							</div>
						</div>
						<div class="mt-5 md:col-span-2 md:mt-0">
							<div class="shadow sm:rounded-md">
								<div
									class="space-y-6 shadow-lg bg-white px-4 py-5 sm:p-6">
									<div>
										<label
											class="block text-sm font-medium text-gray-700"
											>Profile</label
										>
										<div
											v-if="!hasProfileImage"
											class="mt-1 flex w-96 mx-auto rounded-md px-6 pt-5 pb-6">
											<ProfileUploader
												:label="'Drop your profile photo or click to browse your computer'"
												@file="handleProfileFile"
												@removeFile="
													handleRemoveFile
												" />
										</div>
										<div v-else>
											<div
												class="mt-1 flex aspect-w-96 max-h-80 mx-auto rounded-md px-6 pt-5 pb-6">
												<img
													class="object-cover w-96 mx-auto"
													:src="user.profile_photo"
													alt="" />
											</div>
											<div
												class="aspect-w-96 mx-auto text-center">
												<button
													@click="
														handleClickChangeProfile
													"
													class="inline-flex justify-center rounded-md border border-transparent bg-untitled-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-untitled-gray-700 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2">
													Change Profile
												</button>
											</div>
										</div>
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

				<div class="mt-10 sm:mt-0 px-4 py-4" v-if="!loadingUser">
					<div class="md:grid md:grid-cols-3 md:gap-6">
						<div class="md:col-span-1">
							<div class="px-4 sm:px-0">
								<h3
									class="text-lg font-medium leading-6 text-gray-900">
									Personal Information
								</h3>
								<p class="mt-1 text-sm text-gray-600">
									Use a permanent address where you can
									receive mail.
								</p>
							</div>
						</div>
						<div class="mt-5 md:col-span-2 md:mt-0">
							<form action="#" method="POST">
								<div class="shadow sm:rounded-md">
									<div
										class="bg-white shadow-lg px-4 py-5 sm:p-6">
										<div class="grid grid-cols-6 gap-6">
											<div
												class="col-span-6 sm:col-span-6">
												<label
													for="first-name"
													class="block text-sm font-medium text-gray-700"
													>Name <RequiredSpan />
												</label>
												<input
													type="text"
													v-model="user.name"
													name="first-name"
													id="first-name"
													autocomplete="given-name"
													placeholder="Enter your full name"
													class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-untitled-gray-500 focus:ring-untitled-gray-500 sm:text-sm" />
												<ErrorSpanMessage
													v-if="
														errorValue &&
														errorValue.name
													">
													{{ errorValue.name[0] }}
												</ErrorSpanMessage>
											</div>

											<div
												class="col-span-6 sm:col-span-6">
												<label
													for="email-address"
													class="block text-sm font-medium text-gray-700"
													>Email address
													<RequiredSpan />
												</label>
												<div
													class="relative mt-1 rounded-md shadow-sm">
													<div
														class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
														<EnvelopeIcon
															class="h-5 w-5 text-gray-400"
															aria-hidden="true" />
													</div>
													<input
														type="email"
														name="email"
														v-model="user.email"
														id="email"
														class="block w-full rounded-md border-untitled-gray-300 pl-10 focus:border-untitled-gray-500 focus:ring-untitled-gray-500 sm:text-sm"
														placeholder="you@example.com" />
												</div>
												<ErrorSpanMessage
													v-if="
														errorValue &&
														errorValue.email
													">
													{{ errorValue.email[0] }}
												</ErrorSpanMessage>
											</div>

											<div
												class="col-span-6 sm:col-span-3">
												<label
													for="email-address"
													class="block text-sm font-medium text-gray-700">
													Phone Number
												</label>
												<SelectPhoneNumber
													v-model="phoneNumber"
													:phone="
														user.phone_number
															? `+${user.phone_code}${user.phone_number}`
															: ''
													" />
												<ErrorSpanMessage
													v-if="
														errorValue &&
														errorValue.phone_number
													">
													{{
														errorValue
															.phone_number[0]
													}}
												</ErrorSpanMessage>
											</div>

											<div
												class="col-span-6 sm:col-span-3">
												<SelectRoles
													v-model="user.roles"
													@clearRoles="
														handleRemoveSelectedRoles
													"
													:is-required="true" />
												<ErrorSpanMessage
													v-if="
														errorValue &&
														errorValue.roles
													">
													{{ errorValue.roles[0] }}
												</ErrorSpanMessage>
											</div>
											<div
												class="col-span-6 sm:col-span-3">
												<SelectStore
													v-model="user.store"
													@clearStore="
														handleClearStore
													" />
												<ErrorSpanMessage
													v-if="
														errorValue &&
														errorValue.store_id
													">
													{{ errorValue.store_id[0] }}
												</ErrorSpanMessage>
											</div>
											<div
												class="col-span-6 sm:col-span-3"
												v-if="userId">
												<SelectStatus
													v-model="user.status"
													:is-required="true" />
												<ErrorSpanMessage
													v-if="
														errorValue &&
														errorValue.status
													">
													{{ errorValue.status[0] }}
												</ErrorSpanMessage>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>

				<div class="hidden sm:block" aria-hidden="true" v-if="userId">
					<div class="py-5">
						<div class="border-t border-gray-200" />
					</div>
				</div>

				<div class="mt-10 sm:mt-0" v-if="userId && !loadingUser">
					<div class="md:grid md:grid-cols-3 md:gap-6">
						<div class="md:col-span-1">
							<div class="px-4 sm:px-0">
								<h3
									class="text-lg font-medium leading-6 text-gray-900">
									Authentication Information
								</h3>
								<p class="mt-1 text-sm text-gray-600">
									Use a permanent address where you can
									receive mail.
								</p>
							</div>
						</div>
						<div class="mt-5 md:col-span-2 md:mt-0">
							<form>
								<div class="shadow sm:rounded-md">
									<div class="bg-white px-4 py-5 sm:p-6">
										<div class="grid grid-cols-6 gap-6">
											<div
												class="col-span-6 sm:col-span-6">
												<label
													for="first-name"
													class="block text-sm font-medium text-gray-700"
													>New Password
												</label>
												<div
													class="relative mt-1 rounded-md shadow-sm">
													<div
														class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
														<LockClosedIcon
															class="h-5 w-5 text-gray-400"
															aria-hidden="true" />
													</div>
													<input
														:type="
															showNewPassword
																? 'text'
																: 'password'
														"
														v-model="user.password"
														name="password"
														id="password"
														class="block w-full rounded-md border-untitled-gray-300 pl-10 focus:border-untitled-gray-500 focus:ring-untitled-gray-500 sm:text-sm"
														placeholder="Enter your password" />
													<div
														class="absolute inset-y-0 right-0 flex items-center pr-3">
														<component
															:is="passwordIcon"
															@click="
																handleClickViewPassword
															"
															class="h-5 w-5 text-gray-400 cursor-pointer"
															aria-hidden="true" />
													</div>
												</div>
												<ErrorSpanMessage
													v-if="
														errorValue &&
														errorValue.password
													">
													{{ errorValue.password[0] }}
												</ErrorSpanMessage>
											</div>

											<div
												class="col-span-6 sm:col-span-6">
												<label
													for="email-address"
													class="block text-sm font-medium text-gray-700">
													Confirm Password
												</label>
												<div
													class="relative mt-1 rounded-md shadow-sm">
													<div
														class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
														<LockClosedIcon
															class="h-5 w-5 text-gray-400"
															aria-hidden="true" />
													</div>
													<input
														:type="
															showPasswordConfirmation
																? 'text'
																: 'password'
														"
														v-model="
															user.confirm_password
														"
														name="confirm_password"
														id="confirm_password"
														class="block w-full rounded-md border-untitled-gray-300 pl-10 focus:border-untitled-gray-500 focus:ring-untitled-gray-500 sm:text-sm"
														placeholder="Confirm your password" />
													<div
														class="absolute inset-y-0 right-0 flex items-center pr-3">
														<component
															:is="
																passwordConfirmationIcon
															"
															@click="
																handleClickViewPasswordConfirmation
															"
															class="h-5 w-5 text-gray-400 cursor-pointer"
															aria-hidden="true" />
													</div>
												</div>
												<ErrorSpanMessage
													v-if="
														errorValue &&
														errorValue.confirm_password
													">
													{{
														errorValue
															.confirm_password[0]
													}}
												</ErrorSpanMessage>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			<div class="px-4 pb-3 text-right sm:px-6">
				<router-link
					:to="{
						name: 'User Home Page',
					}"
					class="inline-flex justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-untitled-gray-500 shadow-lg mr-2 hover:bg-untitled-gray-100 focus:outline-none focus:ring-2 focus:ring-untitled-gray-400 focus:ring-offset-2">
					Cancel
				</router-link>
				<button
					type="button"
					:disabled="loading"
					@click="handleClickSave"
					class="inline-flex justify-center rounded-md border border-transparent bg-untitled-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-untitled-gray-700 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2">
					{{ loading ? 'Saving...' : 'Save' }}
				</button>
			</div>
		</div>
	</div>
	<global-popup-notification
		v-if="showNotification"
		:show-notification="showNotification"
		:message="messageNotification" />
</template>
<script setup>
import ErrorSpanMessage from '@/components/ErrorSpanMessage.vue';
import SelectPhoneNumber from '@/components/forms/SelectPhoneNumber.vue';
import RequiredSpan from '@/components/RequiredSpan.vue';
import ProfileUploader from '@/components/uploader/ProfileUploader.vue';
import {
	ArrowLeftIcon,
	EnvelopeIcon,
	EyeIcon,
	EyeSlashIcon,
	LockClosedIcon,
} from '@heroicons/vue/24/outline';
import { defineProps, ref, computed, onMounted, inject } from 'vue';
import SelectStatus from '@/components/forms/SelectStatus.vue';
import GlobalBreadCrumbs from '@/components/GlobalBreadCrumbs.vue';
import { storeUser } from '../composables/store_user';
import { useUserStore } from '@/store/useUserStore';
import SelectStore from '@/modules/store/utilities/SelectStore.vue';
import SelectRoles from '@/modules/roles/utilities/SelectRoles.vue';
import { getUser } from '../composables/get_user';
import PageLoader from '@/components/loader/PageLoader.vue';
import { updateUser } from '../composables/update_user';
import { useRouter } from 'vue-router';
import { useEmitter } from '@/composables/useEmitter';

const props = defineProps({
	id: null,
});
const router = useRouter();
const emitter = useEmitter
const NotificationMessage = inject('NOTIFICATION_MESSAGE');
const userStore = useUserStore();
const hasCoverImage = ref(false);
const hasProfileImage = ref(false);
const userId = computed(() => props.id);
const loading = ref(false);
const loadingUser = ref(false);
const user = ref({
	cover_photo: null,
	profile_photo: null,
	password: '',
	confirm_password: '',
	roles: [],
	company: {},
	phoneNumber: '',
	profile_photo: null,
	name: '',
	company_id: null,
	phone_number: '',
	phone_code: '',
	phone_country: '',
	status: 'ACTIVE',
	store: {},
	tags: [],
});
const phoneNumber = ref(null);
const errorValue = ref(null);
const errorMessage = ref(null);
const showNewPassword = ref(false);
const passwordIcon = ref(EyeIcon);
const showPasswordConfirmation = ref(false);
const passwordConfirmationIcon = ref(EyeIcon);
const messageNotification = ref(null);
const showNotification = ref(false);

const pages = ref([
	{
		name: 'Users',
		to: {
			name: 'User Home Page',
		},
		current: true,
	},
	{
		name: userId.value ? 'Edit' : 'Create',
		to: {
			name: userId.value ? 'Edit User Page' : 'Create User Page',
			params: {
				id: userId.value ? userId.value : null,
			},
		},
		current: true,
	},
]);

const handleCoverPhoto = (file) => {
	user.value.cover_photo = file[0];
};

const handleRemoveCoverPhoto = () => {
	user.value.cover_photo = null;
};

const handleClickChangeCoverPhoto = () => {
	hasCoverImage.value = false;
};

const handleProfileFile = (file) => {
	user.value.profile_photo = file[0];
};

const handleRemoveFile = () => {
	user.value.profile_photo = null;
};

const handleClickChangeProfile = () => {
	hasProfileImage.value = false;
};

const handleClickPreview = () => {
	router.push({ name: 'View User Page', params: { id: userId.value }})
};

const handleClickSave = () => {

	if (user.value && user.value.id) {
		editUser();
		return;
	}

	createUser();
};

const createUser = async () => {
	loading.value = true;
	const form = initializeForm();
	const { post, data, errorData, message } = storeUser(form);
	await post();
	errorValue.value = errorData.value;
	errorMessage.value = message.value;
	loading.value = false;
	if (!data.value) {
		return;
	}

	user.value = data.value;
	router.push({ name: 'Edit User Page', params: {id : data.value.id }})
	notification(NotificationMessage.ADDED);
};

const editUser = async () => {
	loading.value = true;
	const form = initializeForm();
	const { update, data, errorData, message } = updateUser(form, user.value.id);
	await update();
	errorValue.value = errorData.value;
	errorMessage.value = message.value;
	loading.value = false;
	if(!data.value) {
		return;
	}
	// emit to global sidebar
	emitter.emit('UPDATED_USER', data.value)
	notification(NotificationMessage.UPDATED);
}

const handleClearStore = () => {
	user.value.store = {};
};

const handleRemoveSelectedRoles = () => {
	user.value.roles = [];
};

const initializeForm = () => {
	
	if (phoneNumber.value.nationalNumber) {
		user.value.phone_number = phoneNumber.value.nationalNumber;
		user.value.phone_code = phoneNumber.value.countryCallingCode;
		user.value.phone_country = phoneNumber.value.countryCode;
	}

	const formData = new FormData();

	formData.append('name', user.value.name);
	formData.append('id', userId.value ? userId.value : '');
	formData.append(
		'roles',
		user.value.roles.length > 0 ? JSON.stringify(user.value.roles) : ''
	);
	formData.append('email', user.value.email ? user.value.email : '');
	formData.append(
		'phone_number',
		user.value.phone_number ? user.value.phone_number : ''
	);
	formData.append(
		'phone_code',
		user.value.phone_code ? user.value.phone_code : ''
	);
	formData.append(
		'phone_country',
		user.value.phone_country ? user.value.phone_country : ''
	);
	formData.append(
		'profile_photo',
		user.value.profile_photo ? user.value.profile_photo : ''
	);
	formData.append(
		'cover_photo',
		user.value.cover_photo ? user.value.cover_photo : ''
	);
	formData.append('status', user.value.status ? user.value.status : '');
	formData.append(
		'tags',
		user.value.tags.length > 0 ? JSON.stringify(user.value.tags) : ''
	);
	formData.append('company_id', userStore.userProfile.company_id);
	formData.append(
		'store_id',
		user.value.store && user.value.store.id ? user.value.store.id : ''
	);

	if (userId.value) {
		formData.append(
			'password',
			user.value.password ? user.value.password : ''
		);
		formData.append(
			'confirm_password',
			user.value.confirm_password ? user.value.confirm_password : ''
		);
		formData.append('_method', 'PUT');
	}

	return formData;
};

const handleClickViewPassword = () => {
	showNewPassword.value = !showNewPassword.value;

	if (showNewPassword.value) {
		passwordIcon.value = EyeSlashIcon;
	} else {
		passwordIcon.value = EyeIcon;
	}
};

const handleClickViewPasswordConfirmation = () => {
	showPasswordConfirmation.value = !showPasswordConfirmation.value;

	if (showPasswordConfirmation.value) {
		passwordConfirmationIcon.value = EyeSlashIcon;
	} else {
		passwordConfirmationIcon.value = EyeIcon;
	}
};

const notification = (message) => {
	messageNotification.value = message;
	showNotification.value = true;
	setTimeout(() => {
		showNotification.value = false;
	}, 2000);
};

const fetchUser = async () => {
	loadingUser.value = true;
	const {load, data} = getUser(userId.value);
	await load();
	user.value = data.value
	loadingUser.value = false;
}

onMounted( async () => {

	if(userId.value) {
		await fetchUser();
	}

	if (typeof user.value.profile_photo === 'string') {
		hasProfileImage.value = true;
	}

	if (typeof user.value.cover_photo === 'string') {
		hasCoverImage.value = true;
	}
})
</script>
