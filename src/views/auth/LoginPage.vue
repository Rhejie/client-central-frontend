<template>
	<div class="flex h-screen">
		<div class="relative hidden w-0 flex-1 lg:block lg:w-3/5 items-center">
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
			<div class="mx-auto lg:w-96 xs:w-20">
				<div>
					<img
						class="pull-left h-12 w-auto"
						:src="
							domainProfile && domainProfile.logo_photo
								? domainProfile.logo_photo
								: domainProfile.default_logo_photo
						"
						alt="RevDojo" />

					<h2
						class="text-xl font-bold tracking-tight text-untitled-gray-500">
						Login
					</h2>

					<p class="mt-2 text-sm text-gray-600">
						Welcome Back! Please enter your details.
					</p>
				</div>

				<div class="mt-8">
					<div
						class="my-5 border-red-500 border px-3 py-2 bg-red-500 text-white"
						v-if="errorShow">
						{{ errorMessage }}
					</div>
					<div class="mt-6">
						<form class="space-y-6">
							<div>
								<label
									for="email"
									class="block text-sm font-medium text-untitled-gray-700"
									>Email address</label
								>
								<div class="mt-1">
									<input
										id="email"
										name="email"
										v-model="user.email"
										type="email"
										placeholder="Enter you email address"
										autocomplete="email"
										class="block w-full appearance-none rounded-md border border-untitled-gray-300 px-3 py-2 placeholder-untitled-gray-400 shadow-sm focus:border-untitled-gray-500 focus:outline-none focus:ring-untitled-gray-500 sm:text-sm" />
								</div>
								<ErrorSpanMessage
									v-if="errorValue && errorValue.email">
									{{ errorValue.email[0] }}
								</ErrorSpanMessage>
							</div>

							<div>
								<label
									for="password"
									class="block text-sm font-medium text-untitled-gray-700">
									Password</label
								>
								<div class="mt-1 relative">
									<input
										id="password"
										name="password"
										:type="
											!isShowPassword
												? 'password'
												: 'text'
										"
										autocomplete="current-password"
										v-model="user.password"
										placeholder="Enter your password"
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
								<ErrorSpanMessage
									v-if="errorValue && errorValue.password">
									{{ errorValue.password[0] }}
								</ErrorSpanMessage>
							</div>

							<div class="flex items-center justify-between">
								<div class="flex items-center">
									<input
										id="remember-me"
										name="remember-me"
										type="checkbox"
										class="h-4 w-4 rounded border-untitled-gray-300 text-untitled-gray-600 focus:ring-untitled-gray-500" />
									<label
										for="remember-me"
										class="ml-2 block text-sm text-untitled-gray-900"
										>Remember me</label
									>
								</div>

								<div class="text-sm">
									<router-link
										to="/forgot-password"
										class="font-medium text-untitled-gray-600 hover:text-untitled-gray-500">
										Forgot your password?
									</router-link>
								</div>
							</div>

							<div>
								<button
									@click="handleClickLogin"
									type="button"
									class="flex w-full justify-center rounded-md border border-transparent bg-untitled-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-untitled-gray-500 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2">
									Sign in
								</button>
							</div>
						</form>
						<div class="text-center mt-4">
							<span class="mt-2 text-sm text-gray-600">
								Don't have an account?
								<router-link
									to="/sign-up"
									class="font-bold text-md text-indigo-300"
									>Sign up</router-link
								>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { loginUser } from '@/composables/authentication';
import ErrorSpanMessage from '@/components/ErrorSpanMessage.vue';
import { ref, inject, computed } from 'vue';
import { useAuth } from '@websanova/vue-auth';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useUserStore } from '@/store/useUserStore';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';
import { useCompanyStore } from '@/store/useCompanyStore';
import { setCompanyProfileLocalStorage } from '@/composables/company-local-storage';

const router = useRouter();
const store = useStore();
const userStore = useUserStore();
const companyStore = useCompanyStore();

const user = ref({
	email: null,
	password: null,
});

const auth = useAuth();
const errorShow = ref(false);
const errorMessage = ref(null);
const errorValue = ref(null);
const isShowPassword = ref(false);
const viewPasswordIcon = ref(EyeIcon);
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

const handleClickLogin = async () => {
	const { login, data, message, errorData, hasError } = loginUser(user.value);
	await login();
	errorMessage.value = message.value;
	errorValue.value = errorData.value;
	errorShow.value = !errorData.value && hasError.value ? true : false;

	if (!hasError.value) {
		auth.user(data.value.user);
		auth.token(null, data.value.access_token, false);
		auth.remember(JSON.stringify(auth.user()));
		router.push('/');
		store.commit('setUserProfile', JSON.parse(auth.remember()));
		userStore.setUserProfile(JSON.parse(auth.remember()));
		companyStore.getCompany(data.value.user.company_id);
		setCompanyProfileLocalStorage(JSON.stringify(data.value.user.company));
	}
};

const handleCLickViewPassword = () => {
	isShowPassword.value = !isShowPassword.value;

	if (isShowPassword.value) {
		viewPasswordIcon.value = EyeSlashIcon;
		return;
	}

	viewPasswordIcon.value = EyeIcon;
};
</script>
