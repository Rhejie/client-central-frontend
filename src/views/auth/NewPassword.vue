<template>
	<div class="flex h-screen">
		<div class="relative hidden w-0 flex-1 lg:block lg:w-3/5">
			<img
				class="absolute inset-0 h-full w-full object-cover"
				src="../../assets/bkgd.jpg"
				alt="" />
			<div class="absolute w-full h-full">
				<div
					class="flex h-full flex-nowrap items-center justify-center">
					<div>
						<h2
							v-if="domainProfile && domainProfile.company_name"
							class="text-5xl mb-10 font-semibold text-white">
							{{ domainProfile.company_name }}
						</h2>
						<img
							class="mx-auto"
							src="../../assets/login_image1.png" />
					</div>
				</div>
			</div>
		</div>
		<div
			class="flex flex-1 flex-col justify-center lg:w-2/5 items-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
			<div class="mx-auto w-96">
				<div>
					<KeyIcon
						class="mx-auto bg-indigo-200 p-2 text-gray-700 rounded-full h-16 w-16" />
					<h2
						class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
						Set new password
					</h2>
					<p class="mt-2 text-center text-sm text-gray-600">
						Your new password must be different to previous used
						password.
					</p>
				</div>

				<div class="mt-8">
					<div
						class="my-5 border-red-500 border px-3 py-2 bg-red-500 text-white"
						v-if="errorMessage">
						{{ errorMessage }}
					</div>

					<div
						class="my-5 border-red-500 border px-3 py-2 bg-red-500 text-white"
						v-if="errorValue && errorValue.email">
						{{ errorValue.email[0] }}
					</div>
					<div class="mt-6">
						<form class="space-y-6">
							<div>
								<label
									for="email"
									class="block text-sm font-medium text-untitled-gray-700">
									Password
								</label>
								<div class="mt-1 relative">
									<input
										id="password"
										name="password"
										placeholder="Enter your password"
										v-model="user.password"
										:type="
											!isViewPassword
												? 'password'
												: 'text'
										"
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

								<SubLabelSpan>
									Must be at least 8 characters
								</SubLabelSpan>
								<ErrorSpanMessage
									v-if="errorValue && errorValue.password">
									{{ errorValue.password[0] }}
								</ErrorSpanMessage>
							</div>

							<div>
								<label
									for="email"
									class="block text-sm font-medium text-untitled-gray-700">
									Password Confirmation
								</label>
								<div class="mt-1 relative">
									<input
										id="confirm_password"
										name="confirm_password"
										placeholder="Confirm your password"
										v-model="user.confirm_password"
										:type="
											!isViewConfirmPassword
												? 'password'
												: 'text'
										"
										autocomplete="confirm_password"
										class="block w-full appearance-none rounded-md border border-untitled-gray-300 px-3 py-2 placeholder-untitled-gray-400 shadow-sm focus:border-untitled-gray-500 focus:outline-none focus:ring-untitled-gray-500 sm:text-sm" />
									<div
										class="absolute inset-y-0 right-0 flex items-center pr-3">
										<component
											:is="viewConfirmPassword"
											@click="
												handleCLickViewConfirmPassword
											"
											class="h-5 w-5 text-untitled-gray-500 cursor-pointer"
											aria-hidden="true" />
									</div>
								</div>
								<ErrorSpanMessage
									v-if="
										errorValue &&
										errorValue.confirm_password
									">
									{{ errorValue.confirm_password[0] }}
								</ErrorSpanMessage>
							</div>

							<div>
								<button
									@click="handleClickResetPassword"
									type="button"
									class="flex w-full justify-center rounded-md border border-transparent bg-untitled-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-untitled-gray-500 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2">
									{{
										loading
											? 'loading...'
											: 'Reset Password'
									}}
								</button>
							</div>
						</form>
						<div class="flex w-full mt-4">
							<router-link
								to="/login"
								class="mt-2 mx-auto text-sm flex text-gray-600">
								<ArrowLeftIcon
									class="mr-3 flex-shrink-0 h-6 w-6" />
								Back to login
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { loginUser, resetPassword } from '@/composables/authentication';
import ErrorSpanMessage from '@/components/ErrorSpanMessage.vue';
import { ref, inject, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useUserStore } from '@/store/useUserStore';
import {
	ArrowDownLeftIcon,
	ArrowLeftIcon,
	EyeIcon,
	EyeSlashIcon,
	KeyIcon,
} from '@heroicons/vue/24/outline';
import SubLabelSpan from '@/components/SubLabelSpan.vue';
import { useAuth } from '@websanova/vue-auth';
import { useCompanyStore } from '@/store/useCompanyStore';
import { setCompanyProfileLocalStorage } from '@/composables/company-local-storage';

const router = useRouter();
const route = useRoute();
const store = useStore();
const userStore = useUserStore();
const companyStore = useCompanyStore();

const domainProfile = computed({
	get() {
		if (companyStore && companyStore.domain) {
			return companyStore.domain;
		}

		return {};
	},
	set(newValue) {
		newValue;
	},
});

const auth = useAuth();
const user = ref({
	email: null,
	id: null,
	forgot_token: null,
	password: null,
	confirm_token: null,
});
const errorShow = ref(false);
const errorMessage = ref(null);
const errorValue = ref(null);
const isShowPassword = ref(false);
const viewPasswordIcon = ref(EyeIcon);
const viewConfirmPassword = ref(EyeIcon);
const isViewPassword = ref(false);
const isViewConfirmPassword = ref(false);
const loading = ref(false);

const handleCLickViewPassword = () => {
	isViewPassword.value = !isViewPassword.value;

	if (isViewPassword.value) {
		viewPasswordIcon.value = EyeSlashIcon;
		return;
	}

	viewPasswordIcon.value = EyeIcon;
};

const handleCLickViewConfirmPassword = () => {
	isViewConfirmPassword.value = !isViewConfirmPassword.value;

	if (isViewConfirmPassword.value) {
		viewConfirmPassword.value = EyeSlashIcon;
		return;
	}

	viewConfirmPassword.value = EyeIcon;
};

const handleClickResetPassword = async () => {
	loading.value = true;
	const { post, data, errorData, message } = resetPassword(user.value);
	await post();
	errorValue.value = errorData.value;
	errorMessage.value = message.value;
	loading.value = false;

	if (!data.value) {
		return;
	}
	auth.user(data.value.user);
	auth.token(null, data.value.access_token, false);
	auth.remember(JSON.stringify(auth.user()));
	userStore.setUserProfile(JSON.parse(auth.remember()));
	companyStore.getCompany(data.value.user.company_id);
	setCompanyProfileLocalStorage(JSON.stringify(data.value.user.company));
	router.push({
		name: 'Password Reset',
		query: {
			forgot_token: user.value.forgot_token,
			email: user.value.email,
			id: user.value.id,
		},
	});
};

onMounted(() => {
	if (route.query.forgot_token) {
		user.value.forgot_token = route.query.forgot_token;
	}

	if (route.query.email) {
		user.value.email = route.query.email;
	}

	if (route.query.id) {
		user.value.id = route.query.id;
	}
});
</script>
