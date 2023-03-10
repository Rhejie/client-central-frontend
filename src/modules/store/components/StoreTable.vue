<template>
	<div class="mb-2">
		<div class="relative mt-1 rounded-md shadow-sm">
			<div
				class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
				<MagnifyingGlassIcon
					class="h-5 w-5 text-gray-400"
					aria-hidden="true" />
			</div>
			<input
				id="search"
				name="search"
				v-model="search"
				type="text"
				placeholder="Type to search"
				autocomplete="search"
				class="block w-full p-5 appearance-none rounded-md border border-untitled-gray-300 pl-10 px-3 py-2 placeholder-untitled-gray-400 shadow-sm focus:border-untitled-gray-500 focus:outline-none focus:ring-untitled-gray-500 sm:text-sm" />
		</div>
	</div>
	<div class="sm:flex sm:items-center mb-10">
		<div class="sm:flex-auto">
			<!-- <div class="md:flex">
				<div>
					<button
						type="button"
						@click="handleClickClearFilter"
						class="flex w-32 mt-1 justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-untitled-gray-500 shadow-lg mr-2 hover:bg-untitled-gray-100 focus:outline-none focus:ring-2 focus:ring-untitled-gray-400 focus:ring-offset-2">
						Clear Filter
					</button>
				</div>
			</div> -->
		</div>
		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<button
				type="button"
				@click="handleClickAddItem"
				class="flex w-full justify-center rounded-md border border-transparent bg-untitled-gray-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-untitled-gray-500 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2">
				<PlusIcon class="w-5 mr-2" /> Add Store
			</button>
		</div>
	</div>

	<div class="bg-white shadow-md border border-untitled-gray-100">
		<data-table
			:items="stores"
			:columns="columns"
			:action="true"
			:actions="['Options']"
			:loading="loading"
			:error="errorApi"
			:is-paginate="true"
			:table-type="'stripe'"
			:is-sort-by-live="true"
			:pagination-options="paginationOptions"
			@showMorePage="handleClickShowMore"
			@clickValue="handelClickColumnValue"
			@pageChanged="handleChangePage"
			@sort="handleSortList">
			<template #phone="{ scope }">
				<span class="text-sm" v-if="scope.phone_number">
					+{{ scope.phone_code }}{{ scope.phone_number }}</span
				>
			</template>
			<template #main="{ scope }">
				<div v-if="scope.is_main" class="w-full">
					<CheckCircleIcon class="w-6 mx-auto text-green-400" />
				</div>
				<div v-else>
					<span class="w-full">
						<XCircleIcon class="w-6 mx-auto text-red-400" />
					</span>
				</div>
			</template>
			<template #options="{ scope }">
				<StoreOptionDropdown
					:scope="scope"
					@deleteStore="handleDeleteStore" />
			</template>
		</data-table>
	</div>
</template>
<script setup>
import {
	CheckCircleIcon,
	MagnifyingGlassIcon,
	PlusIcon,
	XCircleIcon,
} from '@heroicons/vue/24/outline';
import { defineProps, computed, ref, onMounted, toRefs, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getStore } from '../composables/get_stores';
import StoreOptionDropdown from './StoreOptionDropdown.vue';
import { debounce as _debounce } from 'lodash-es';

const router = useRouter();
const columns = [
	{
		prop: 'name',
		label: 'Name',
		sortable: true,
		clickable: true,
		class: '',
	},
	{
		prop: 'phone_number',
		label: 'Phone',
		sortable: true,
		clickable: false,
		class: '',
	},
	{
		prop: 'city',
		label: 'City',
		sortable: false,
		clickable: false,
		class: '',
	},
	{
		prop: 'state',
		label: 'State',
		sortable: true,
		clickable: false,
		class: '',
	},
	{ prop: 'zip', label: 'Zip', sortable: false, clickable: false, class: '' },
	{
		prop: 'country',
		label: 'Country',
		sortable: false,
		clickable: false,
		class: '',
	},
];

const stores = ref([]);
const loading = ref(false);
const errorApi = ref(false);
const paginationOptions = ref({
	totalPages: 0,
	total: 0,
	hasMorePages: false,
	currentPage: 1,
	perPage: 10,
});

const sortListBy = ref({
	name: '',
	type: '',
	is_nested_sort: 0,
});
const search = ref('');

const handleClickShowMore = (page) => {
	paginationOptions.value.currentPage = page;
	fetchItems();
};

const handleChangePage = (value) => {
	paginationOptions.value.perPage = parseInt(value);
	fetchItems();
};

const handelClickColumnValue = ({ item, column }) => {
	if (column == 'Name') {
		router.push({ name: 'View Store Page', params: { id: item.id } });
	}
};

const fetchStores = async () => {
	loading.value = true;
	const params = {
		search: search.value,
		page: paginationOptions.value.currentPage,
		size: paginationOptions.value.perPage,
		sort_label: sortListBy.value.name,
		sort_by: sortListBy.value.type,
		is_nested_sort: sortListBy.value.is_nested_sort,
	};

	const { load, data, hasError, hasMorePages, totalStore, totalPages } =
		getStore(params);
	await load();
	loading.value = false;
	if (hasError.value) {
		errorApi.value = true;
		return;
	}
	stores.value = data.value;
	paginationOptions.value.total = totalStore.value;
	paginationOptions.value.totalPages = totalPages.value;
	paginationOptions.value.hasMorePages = hasMorePages.value;
};

const handleClickAddItem = () => {
	router.push({ name: 'Create Store Page' });
};

const handleClickClearFilter = () => {};

const handleSortList = ({ label, sortBy, is_nested }) => {
	const { name, type, is_nested_sort } = toRefs(sortListBy.value);
	name.value = label;
	type.value = sortBy;
	is_nested_sort.value = is_nested ? 1 : 0;
	fetchStores();
};

const handleDeleteStore = () => {
	fetchStores();
};

const onChangeSearchText = _debounce((value) => {
	fetchStores();
}, 500);

onMounted(async () => {
	await fetchStores();
});

watch(search, () => {
	onChangeSearchText();
});
</script>
