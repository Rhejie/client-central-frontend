<template>
    <GlobalBreadCrumbs :pages="pages"/>
    <PageLoader v-if="loadingCompany"/>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mt-2" v-else>
        <div class="relative z-0 flex flex-1 overflow-hidden">
            <main class="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
                <!-- Breadcrumb -->
                <nav class="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden" aria-label="Breadcrumb">
                    <router-link :to="{ name: 'User Home Page'}" class="inline-flex items-center space-x-3 text-sm font-medium text-gray-900">
                        <ChevronLeftIcon class="-ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Users</span>
                    </router-link>
                </nav>

                <UserProfile
                    :user="userProfile" 
                    :user-id="parseInt(userId)" />
            </main>
            <UsersList
                :user-id="parseInt(userId)"
                @click-user="handleClickUser"
                :company-profile="companyProfile"/>
        </div>
    </div>
</template>
<script setup>
import { 
    ref,
    defineProps,
    computed,
    onMounted,
} from 'vue'
import { 
    ChevronLeftIcon, 
    EnvelopeIcon, 
    FunnelIcon, 
    HomeIcon, 
    MagnifyingGlassIcon, 
    PencilSquareIcon 
} from '@heroicons/vue/20/solid'
import GlobalBreadCrumbs from '@/components/GlobalBreadCrumbs.vue';
import { useRouter } from 'vue-router';
import PageLoader from '@/components/loader/PageLoader.vue';
import UsersList from '../components/UsersList.vue';
import UserProfile from '../components/UserProfile.vue';
import { useCompanyStore } from '@/store/useCompanyStore';

const props = defineProps({
    id: null,
})

const router = useRouter()
const companyStore = useCompanyStore()
const getUserId = computed(() => props.id)
const userId = ref(getUserId.value)
const loadingCompany = ref(false)
const companyProfile = ref({})

const user = {
    name: 'Tom Cook',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const pages = [
    {
        name: 'Users',
        to: {
            name: 'User Home Page',
        },
        current: true
    },
    {
        name: 'Details',
        to: {
            name: 'View User Page',
            params: {
                id: userId.value,
            }
        },
        current: true
    },
]

const users = ref([])
const userProfile = ref({})

const handleClickUser = (user) => {
    userId.value = user.id
}

onMounted(() => {
    companyProfile.value = companyStore.companyProfile
})
</script>