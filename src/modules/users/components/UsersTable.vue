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
			<div class="md:grid md:grid-cols-4 md:gap-6">
				<div class="mr-2 md:col-span-1">
					<SelectStatus v-model="status" :show-label="false" />
				</div>
				<div class="mr-2 md:col-span-1">
					<SelectRoles v-model="roles" :show-label="false" />
				</div>
				<div
					class="mr-2 md:col-span-1">
					<SelectStore
						v-model="store"
						:show-label="false" />
				</div>
				<div class="md:col-span-1">
					<button
						type="button"
						@click="handleClickClearFilter"
						class="flex mt-1 w-32 justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-untitled-gray-500 shadow-lg mr-2 hover:bg-untitled-gray-100 focus:outline-none focus:ring-2 focus:ring-untitled-gray-400 focus:ring-offset-2">
						Clear Filter
					</button>
				</div>
			</div>
		</div>
		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<button
				type="button"
				@click="handleClickAddItem"
				class="flex w-full justify-center rounded-md border border-transparent bg-untitled-gray-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-untitled-gray-500 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2">
				<PlusIcon class="w-5 mr-2" /> Add User
			</button>
		</div>
	</div>

	<div class="bg-white shadow-md border border-untitled-gray-100">
		<data-table
			:items="users"
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
			<template #role="{ scope }">
				<div class="flex-wrap w-full">
					<span
						class="mr-2 bg-untitled-gray-400 text-xs text-white p-2 rounded-full"
						v-for="(role, index) in scope.roles"
						:key="index"
						>{{ role.friendly_name }}
					</span>
				</div>
			</template>
			<template #options="{ scope }">
				<UsersOptionDropdown
					:scope="scope"
					@delete-user="handleDeleteUser" />
			</template>
		</data-table>
	</div>
</template>
<script setup>
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/vue/24/outline';
import { defineProps, computed, ref, onMounted, toRefs, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getUsers } from '../composables/get_users';
import UsersOptionDropdown from './UsersOptionDropdown.vue';
import { debounce as _debounce } from 'lodash-es';
import SelectStatus from '@/components/forms/SelectStatus.vue';
import SelectRoles from '@/modules/roles/utilities/SelectRoles.vue';
import SelectStore from '@/modules/store/utilities/SelectStore.vue';

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
		prop: 'email',
		label: 'Email',
		sortable: true,
		clickable: false,
		class: '',
	},
	{
		prop: 'roles',
		label: 'Role',
		sortable: false,
		clickable: false,
		class: '',
	},
	{
		prop: 'status',
		label: 'Status',
		sortable: true,
		clickable: false,
		class: '',
	},
	{
		prop: 'store.name',
		label: 'Store',
		sortable: false,
		clickable: false,
		class: '',
	},
	{
		prop: '',
		label: 'User Tag',
		sortable: false,
		clickable: false,
		class: '',
	},
];

const users = ref([]);
const loading = ref(false);
const errorApi = ref(false);
const roles = ref([])
const status = ref('')
const store = ref({})
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

const fetchUsers = async () => {
	loading.value = true;
	const params = {
		search: search.value,
		page: paginationOptions.value.currentPage,
		size: paginationOptions.value.perPage,
		sort_label: sortListBy.value.name,
		sort_by: sortListBy.value.type,
		is_nested_sort: sortListBy.value.is_nested_sort,
		status: status.value,
		roles: roles.value.map((role) => role.id),
		store_id: store.value.id,
	};

	const { load, data, hasError, hasLastPage, totalUsers, totalPages } =
		getUsers(params);
	await load();
	loading.value = false;
	if (hasError.value) {
		errorApi.value = true;
		return;
	}
	users.value = data.value;
	paginationOptions.value.total = totalUsers.value;
	paginationOptions.value.totalPages = totalPages.value;
	paginationOptions.value.hasMorePages = hasLastPage.value;
};

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
		router.push({ name: 'View User Page', params: { id: item.id } });
	}
};

const handleClickAddItem = () => {
	router.push({ name: 'Create User Page' });
};

const handleDeleteUser = () => {
	fetchUsers();
};
const handleSortList = ({ label, sortBy, is_nested }) => {
	const { name, type, is_nested_sort } = toRefs(sortListBy.value);
	name.value = label;
	type.value = sortBy;
	is_nested_sort.value = is_nested ? 1 : 0;
	fetchUsers();
};

const handleClickClearFilter = () => {
	roles.value = []
	status.value = ''
	store.value = {}
};

const onChangeSearchText = _debounce((value) => {
	fetchUsers();
}, 500);

onMounted(async () => {
	await fetchUsers();
});

watch(search, () => {
	onChangeSearchText();
});

watch(roles, () => {
	fetchUsers();
});

watch(store, () => {
	fetchUsers();
});

watch(status, (val) => {
	if (val) {
		fetchUsers();
	}
});
</script>
