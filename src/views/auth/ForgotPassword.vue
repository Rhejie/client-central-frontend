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
                    <KeyIcon class="mx-auto bg-indigo-200 p-2 text-gray-700 rounded-full h-16 w-16"/>
                    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Forgot Password
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600">
                        No worries, we'll send you reset instruction.
                    </p>
                </div>

				<div class="mt-8">
					<div
						class="my-5 border-red-500 border px-3 py-2 bg-red-500 text-white"
						v-if="errorMessage">
						{{ errorMessage }}
					</div>
					<div class="mt-6">
						<form class="space-y-6">
							<div>
								<label
									for="email"
									class="block text-sm font-medium text-untitled-gray-700"> Email address <RequiredSpan/> </label
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
								<button
									@click="handleClickForgotPassword"
									type="button"
									class="flex w-full justify-center rounded-md border border-transparent bg-untitled-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-untitled-gray-500 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2">
									Reset Password
								</button>
							</div>
						</form>
						<div class="flex w-full mt-4">
							<router-link
								to="/login"
								class="mt-2 mx-auto text-sm flex text-gray-600">
								<ArrowLeftIcon
									class="mr-3 flex-shrink-0 h-6 w-5" />
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
import { forgotPassword, loginUser } from '@/composables/authentication';
import ErrorSpanMessage from '@/components/ErrorSpanMessage.vue';
import { ref, inject, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useUserStore } from '@/store/useUserStore';
import {
	ArrowDownLeftIcon,
	ArrowLeftIcon,
	EyeIcon,
	EyeSlashIcon,
KeyIcon,
} from '@heroicons/vue/24/outline';
import RequiredSpan from '@/components/RequiredSpan.vue';
import { useCompanyStore } from '@/store/useCompanyStore';

const router = useRouter();
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

const user = ref({
	email: null,
});
const errorShow = ref(false);
const errorMessage = ref(null);
const errorValue = ref(null);
const isShowPassword = ref(false);
const viewPasswordIcon = ref(EyeIcon);

const handleClickForgotPassword = async () => {
	const { post, data, errorData, message } = forgotPassword(user.value);
	await post();
	errorValue.value = errorData.value
	errorMessage.value = message.value
	
	if(!data.value) {
		return
	}
    router.push({ name: 'Check Your Email', query: { email: user.value.email }})
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
