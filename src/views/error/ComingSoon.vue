<template>
    <div class="w-full h-screen text-center">
        <img src="../../assets/maintenance.png" class="mx-auto mt-20" alt="">
        <p class="text-untitled-gray-600 text-3xl font-bold mt-10">We are working on this page</p>
        <p class="text-untitled-gray-400 text-lg mt-5">Coming soon</p>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const handleClickBack = () => {
    router.go(-1)
}

const handleClickDashboard = () => {
    router.push('/')
}
</script>