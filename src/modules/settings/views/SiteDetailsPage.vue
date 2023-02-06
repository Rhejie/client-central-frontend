<template>
	<GlobalBreadCrumbs :pages="pages" />
	<div class="py-6">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
			<h1 class="text-2xl font-semibold text-untitled-gray-700">
				Site Details
				<span class="text-lg font-thin">
					{{ routeName }}
				</span>
			</h1>
			<div class="relative mt-1 py-4 rounded-md">
				<router-link
					class="absolute text-untitled-gray-500 inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
					:to="{ name: 'Settings Home Page' }">
					<ArrowLeftIcon
						class="-ml-1 mr-2 h-5 w-5"
						aria-hidden="true" />
				</router-link>
				<label class="p-10 text-sm text-untitled-gray-500">Back</label>
			</div>
		</div>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
			<div>
				<div class="sm:hidden">
					<label for="tabs" class="sr-only">Select a tab</label>
					<!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
					<select
						id="tabs"
						name="tabs"
						class="block w-full rounded-md border-gray-300 focus:border-untitled-gray-500 focus:ring-untitled-gray-500">
						<option
							v-for="tab in tabs"
							:key="tab.name"
							:selected="tab.current">
							{{ tab.name }}
						</option>
					</select>
				</div>
				<div class="hidden sm:block">
					<div class="border-b border-gray-200">
						<nav class="-mb-px flex space-x-8" aria-label="Tabs">
							<router-link
								v-for="tab in tabs"
								:key="tab.name"
								:to="{ name: tab.to }"
                                exact-active-class="border-untitled-gray-500 text-untitled-gray-600"
								:class="[
									tab.current
										? 'border-untitled-gray-500 text-untitled-gray-600'
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
									'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
								]"
								:aria-current="
									tab.current ? 'page' : undefined
								">
								<component
									:is="tab.icon"
									:class="[
										tab.current
											? 'text-untitled-gray-500'
											: 'text-gray-400 group-hover:text-gray-500',
										'-ml-0.5 mr-2 h-5 w-5',
									]"
									aria-hidden="true" />
								<span>{{ tab.name }}</span>
							</router-link>
						</nav>
					</div>
				</div>
			</div>
			<router-view />
		</div>
	</div>
</template>
<script setup>
import GlobalBreadCrumbs from '@/components/GlobalBreadCrumbs.vue';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ComputerDesktopIcon, InformationCircleIcon, IdentificationIcon, CursorArrowRaysIcon } from '@heroicons/vue/20/solid'

const route = useRoute();

const routeName = ref('');

const pages = computed({
	get() {
		return [
			{
				name: 'Settings',
				to: {
					name: 'Settings Home Page',
				},
				current: false,
			},
			{
				name: routeName.value,
				to: {
					name: routeName.value,
				},
				current: false,
			},
		];
	},
	set(newValue) {
		newValue;
	},
});

const tabs = [
  { name: 'Site Details', href: '#', to: 'Site Details', icon: IdentificationIcon, current: false },
  { name: 'Domain Settings', href: '#', to: 'Domain Settings', icon: ComputerDesktopIcon, current: false },
]

onMounted(() => {
	routeName.value = route.name;
});

watch(route, () => {
    routeName.value = route.name;
})
</script>
