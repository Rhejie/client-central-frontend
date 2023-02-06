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
                    <EnvelopeIcon class="mx-auto bg-indigo-200 p-2 text-gray-700 rounded-full h-16 w-16"/>
                    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Check your email
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600">
                        We sent a password reset code to
                    </p>

                    <p class="mt-2 text-center text-sm text-gray-600">
                        {{ email }}
                    </p>
                </div>

				<div class="mt-8">
                    <div class="mt-6">
                        <div class="text-center mt-4">
                            <span class="mt-2 text-sm text-gray-600">
                                Don't receive the email?
                                <span @click="handleClickResend" class="font-bold text-xs cursor-pointer text-indigo-300">{{ loading ? 'Sending....' : 'Click to resend'}} {{ count == 0 ? '' : `after (${count} sec)`}}</span>
                            </span>
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
import { forgotPassword, loginUser } from '@/composables/authentication';
import ErrorSpanMessage from '@/components/ErrorSpanMessage.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useUserStore } from '@/store/useUserStore';
import {
	ArrowDownLeftIcon,
	ArrowLeftIcon,
	EnvelopeIcon,
	EyeIcon,
	EyeSlashIcon,
KeyIcon,
} from '@heroicons/vue/24/outline';
import { useCompanyStore } from '@/store/useCompanyStore';

const router = useRouter();
const store = useStore();
const userStore = useUserStore();
const route = useRoute();
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
const email = ref('yourname@example.com');
const loading = ref(false)
const count = ref(60);

const handleClickResend = async () => {
    loading.value = true
    const { post, data, errorData } = forgotPassword(user.value);
	await post();
	errorValue.value = errorData.value
	if(!data.value) {
		return
	}
    loading.value = false
    setCountDown();
};


const setCountDown = () => {
    const timer = setTimeout(() => {
        count.value -= 1
        setCountDown()
    }, 1000)

    if (count.value == 0) {
        clearTimeout(timer)
    }
}

onMounted(() => {
    setCountDown();

    if(route.query.email) {
        email.value = route.query.email
        user.value.email = email.value
    }
})
</script>
