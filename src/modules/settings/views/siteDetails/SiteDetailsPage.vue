<template>
    <PageLoader v-if="loadingPreference"/>
	<div class="flex-1 mt-8 xs:mt-2" v-else>
		<div class="md:grid md:grid-cols-5 md:gap-6">
			<div class="lg:col-span-2 md:col-span-5">
				<PreferenceForm
					:preference="preference"
					:company-id="companyId"
                    :companyProfile="companyProfile"
					@reset-preference="handleResetPReference" 
                    @createdForm="handleCreatedPreference"
					@updatedForm="handleUpdatedPreference"/>
			</div>

			<div class="mt-5 lg:col-span-3 md:col-span-5 md:mt-0">
				<div class="mx-auto">
					<div>
						<div class="sm:hidden">
							<label for="tabs" class="sr-only"
								>Select a tab</label
							>
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
								<nav
									class="-mb-px flex space-x-8"
									aria-label="Tabs">
									<span
										v-for="tab in tabs"
										@click="handleClickTag(tab.name)"
										:key="tab.name"
										:class="[
											tab.current
												? 'border-untitled-gray-500 text-untitled-gray-600'
												: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
											'group cursor-pointer inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
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
									</span>
								</nav>
							</div>
						</div>
					</div>
				</div>

				<keep-alive>
					<component
						:is="
							componentList[
								tabs.find((tab) => tab.current == true)
									.componentName
							]
						"
						:preference="preference" />
				</keep-alive>
			</div>
		</div>
		<!-- <PreferenceForm/> -->
	</div>
</template>
<script setup>
import PageLoader from '@/components/loader/PageLoader.vue';
import { useCompanyStore } from '@/store/useCompanyStore';
import { EnvelopeIcon, ComputerDesktopIcon } from '@heroicons/vue/20/solid';
import {
	defineProps,
	ref,
	computed,
	defineAsyncComponent,
	defineComponent,
	onMounted,
    watch
} from 'vue';
import PreferenceForm from '../../components/siteDetails/PreferenceForm.vue';
import { getPreferenceById } from '../../composables/siteDetails/siteDetails/get_preference';

const componentList = {
	WebPreview: defineAsyncComponent(() =>
		import('../../components/siteDetails/PreferenceWebPreview.vue')
	),
	EmailPreview: defineAsyncComponent(() =>
		import('../../components/siteDetails/PreferenceEmailPreview.vue')
	),
};

const companyStore = useCompanyStore();

const companyProfile = computed({
    get() {
        if(companyStore.companyProfile && companyStore.companyProfile.id) {
            return companyStore.companyProfile
        }

        return {}
    },
    set(newValue) {
        newValue
    }
});
const loadingPreference = ref(false)
const preference = ref({
	logo_photo: null,
	favicon_photo: null,
	signature_name: '',
	address: '',
	city: '',
	state: '',
	zip: '',
	country: '',
	facebook: '',
	youtube: '',
	linkedin: '',
	technical_email: '',
	sales_email: '',
	footer: '',
	phone_number: '',
	phone_code: '',
	phone_country: '',
	overwrite: false,
});

const companyId = ref(0);

const tabs = ref([
	{
		name: 'Email Preview',
		href: '#',
		icon: EnvelopeIcon,
		current: true,
		componentName: 'EmailPreview',
	},
	{
		name: 'Web Preview',
		href: '#',
		icon: ComputerDesktopIcon,
		current: false,
		componentName: 'WebPreview',
	},
]);

const phone_number = ref(null);

const handleClickTag = (name) => {
	tabs.value = tabs.value.map((tab) => {
		if (tab.name === name) {
			tab.current = true;
		} else {
			tab.current = false;
		}
		return tab;
	});
};

const handleCreatedPreference = (data) => {
    preference.value = data
	preference.value.overwrite = preference.value.overwrite ? true : false;
}

const handleUpdatedPreference = (data) => {
	preference.value = data
	preference.value.overwrite = preference.value.overwrite ? true : false;
	preference.value.logo_photo = data.logo_photo ? data.logo_photo : companyProfile.company_preference.default_logo_photo
	preference.value.favicon_photo = data.favicon_photo ? data.favicon_photo : companyProfile.company_preference.default_favicon_photo
}

const fetchPreference = async () => {
    loadingPreference.value = true
    const {data, load } = getPreferenceById(companyId.value)
    await load();
    loadingPreference.value = false
    if(!data.value) {
        return;
    }
    preference.value = data.value
    preference.value.overwrite = data.value.overwrite ? true : false
}

const handleResetPReference = () => {
	preference.value = {
		logo_photo: null,
		favicon_photo: null,
		signature_name: '',
		address: '',
		city: '',
		state: '',
		zip: '',
		country: '',
		facebook: '',
		youtube: '',
		linkedin: '',
		technical_email: '',
		sales_email: '',
		footer: '',
		phone_number: '',
		phone_code: '',
		phone_country: '',
		overwrite: false,
	};
};

onMounted(() => {
    if(companyProfile.value && companyProfile.value.id) {
        companyId.value = companyProfile.value.id;
        if(companyProfile.value.preference == null) {
            preference.value = companyProfile.value.company_preference
            preference.value.overwrite = preference.value.overwrite ? true : false
        }

        if(companyProfile.value.preference && companyProfile.value.preference.id) {
            preference.value = companyProfile.value.preference
            preference.value.overwrite = preference.value.overwrite ? true : false
            if(!preference.value.logo_photo) {
                preference.value.logo_photo = preference.value.default_logo_photo
            }

            if(!preference.value.favicon_photo) {
                preference.value.favicon_photo = preference.value.default_favicon_photo
            }
        }
        // fetchPreference();
    }
});

watch(companyProfile, (val) => {
    companyId.value = val.id
    if(val.preference == null) {
        preference.value = val.company_preference
        preference.value.overwrite = preference.value.overwrite ? true : false
    }
    if(val.preference && val.preference.id) {
            preference.value = val.preference
            preference.value.overwrite = preference.value.overwrite ? true : false
            if(!preference.value.logo_photo) {
                preference.value.logo_photo = preference.value.default_logo_photo
            }

            if(!preference.value.favicon_photo) {
                preference.value.favicon_photo = preference.value.default_favicon_photo
            }
        }
    // fetchPreference();
})
</script>
