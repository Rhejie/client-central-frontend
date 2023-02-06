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
                    <CheckCircleIcon class="mx-auto bg-green-200 p-2 text-gray-700 rounded-full h-16 w-16" />
                    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Account Under Review
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-500">
                        We will send you an email of confirmation or you may contact our <span class="text-gray-900 cursor-pointer">Support Team</span>
                    </p>
                </div>

                <div class="mt-8">
                    <div class="mt-6">
                        <div class="text-center mt-4">
                            <div>
                                <button @click="handleClickLogin" type="button"
                                    class="flex w-full justify-center rounded-md border border-transparent bg-untitled-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-untitled-gray-500 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2">
                                    Complete
                                </button>
                            </div>
                        </div>
                        <div class="flex w-full mt-4">
                            <router-link to="/login" class="mt-2 mx-auto text-sm flex text-gray-600">
                                <ArrowLeftIcon class="mr-3 flex-shrink-0 h-6 w-6" />
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
import { loginUser } from '@/composables/authentication';
import ErrorSpanMessage from '@/components/ErrorSpanMessage.vue';
import { ref, inject, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useUserStore } from '@/store/useUserStore';
import {
ArrowLeftIcon,
	CheckCircleIcon,
	EyeIcon,
	EyeSlashIcon,
} from '@heroicons/vue/24/outline';
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
	password: null,
});
const errorShow = ref(false);
const errorMessage = ref(null);
const errorValue = ref(null);
const isShowPassword = ref(false);
const viewPasswordIcon = ref(EyeIcon);

const handleClickLogin = async () => {
    router.push({ name: 'Check Your Email'})
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
