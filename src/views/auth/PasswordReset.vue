<template>
	<div class="flex h-screen">
		<div class="relative hidden w-0 flex-1 lg:block lg:w-2/5">
			<img
				class="absolute inset-0 h-full w-full object-cover"
				src="../../assets/Background.png"
				alt="" />
		</div>
		<div
			class="flex flex-1 flex-col justify-center lg:w-3/5 items-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
			<div class="mx-auto w-96">
				<div>
                    <CheckCircleIcon class="mx-auto bg-indigo-200 p-2 text-gray-700 rounded-full h-16 w-16" />
                    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Password Reset
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600">
                        Your new password has been successfully reset.
                    </p>
                </div>

                <div class="mt-8">
                    <div class="mt-6">
                        <form class="space-y-6">
                            <div>
                                <router-link to="/" type="button"
                                    class="flex w-full justify-center rounded-md border border-transparent bg-untitled-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-untitled-gray-500 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2">
                                    Continue
                                </router-link>
                            </div>
                        </form>
                    </div>
                </div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { loginUser } from '@/composables/authentication';
import ErrorSpanMessage from '@/components/ErrorSpanMessage.vue';
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useUserStore } from '@/store/useUserStore';
import {
	CheckCircleIcon,
	EyeIcon,
	EyeSlashIcon,
} from '@heroicons/vue/24/outline';

const router = useRouter();
const store = useStore();
const userStore = useUserStore();

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
