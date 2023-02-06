<template>
	<div>
		<h2 class="text-sm font-medium text-gray-500">Apps</h2>
		<div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-2">
        <div >
          <div class="relative group cursor-pointer" @click="handleClickLink">
            <div class="relative group h-72 w-full overflow-hidden">
              <img src="https://webinarinc-central.s3.us-west-1.amazonaws.com/public/thumbnail/2af33433-c731-47e9-8368-e52d77b51c89.jpg" alt="apps" class="h-full w-full object-cover object-center" />
            </div>
            <div class="absolute inset-x-0 top-0 flex h-72 items-end overflow-hidden rounded-lg p-4">
				<a :href="link" target="_blank" class="relative text-sm text-white">Learning Management System</a>
				<div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black opacity-50" />
            </div>
          </div>
        </div>
      </div>
	</div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getLink } from '../composables/link';

const link = ref(null);

const fetchLink = async () => {
	const { data, load } = getLink();
	await load();
	link.value = data.value;
};

const handleClickLink = () => {
	window.open(link.value)
}

onMounted(async () => {
	await fetchLink();
});
</script>
