
import GlobalBreadCrumbs from '@/components/GlobalBreadCrumbs.vue';

<template>
    <GlobalBreadCrumbs :pages="pages"/>
    <div class="py-6">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 class="text-2xl font-semibold text-gray-900">Stores </h1>
        </div>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
    
            <div class="py-4">
                <div class="h-96 ">

                    <StoreTable/>
                </div>
            </div>
    
        </div>
    </div>
</template>
<script setup>
import GlobalBreadCrumbs from '@/components/GlobalBreadCrumbs.vue';
import { ref, computed, onMounted } from 'vue';
import StoreTable from '../components/StoreTable.vue';
const pages = ref([
	{
		name: 'Stores',
		to: {
			name: 'Store Home Page',
		},
		current: false,
	},
]);
</script>