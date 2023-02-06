<template>
    <global-sidebar> </global-sidebar>
    <main class="flex-1 md:pl-64">
        <router-view />
    </main>
</template>
<script setup>
import GlobalSidebar from '@/components/GlobalSidebar.vue';

</script>
