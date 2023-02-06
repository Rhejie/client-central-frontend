
import AppsList from '../components/AppsList.vue';

<template>
    <div class="py-6">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 class="text-2xl font-semibold text-untitled-gray-600">Welcome {{ userProfile && userProfile.id ? userProfile.name : '' }}</h1>
        </div>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
    
            <div class="py-4">
                <div class=""> 
                    <AppsList/>
                </div>
            </div>
    
        </div>
    </div>
   
</template>
<script setup>
import { useUserStore } from '@/store/useUserStore';
import { computed } from 'vue';
import AppsList from '../components/AppsList.vue';

const userStore = useUserStore();

const userProfile = computed(() => userStore.userProfile)

</script>