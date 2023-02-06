<template>
	<ComingSoon v-if="true"/>
	<div class="mt-5 xs:mt-1" v-else>
		<div class="md:grid md:grid-cols-3 md:gap-6">
			<div class="md:col-span-1">
				<div class="px-4 sm:px-0">
					<h3
						class="text-lg font-medium leading-6 text-untitled-gray-500">
						Billing Address
					</h3>
					<p class="mt-1 text-sm text-gray-600">
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Cum perferendis cumque quos voluptas adipisci ad
						pariatur.
					</p>
				</div>
			</div>
			<div class="mt-5 md:col-span-2 md:mt-0">
				<form action="#" method="POST">
					<div class="shadow sm:overflow-hidden sm:rounded-md">
						<div class="space-y-6 bg-white px-4 py-5 sm:p-6">
							<div
								class="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
								<div class="sm:flex sm:items-start">
									<MapPinIcon
										class="h-8 w-auto text-untitled-gray-500 sm:h-6 sm:flex-shrink-0"
										aria-hidden="true" />
									<div class="mt-3 sm:mt-0 sm:ml-4">
										<div
											class="text-sm font-medium text-untitled-gray-500">
											Olivia Rhye
										</div> 
										<div
											class="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
											<div>
												4039 48th Ave 5 St. Petersburg
												FL 33711
											</div>
										</div>
									</div>
								</div>
								<div
									class="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
									<button
                                        @click="handleClickChangeAddress"
										type="button"
										class="inline-flex items-center rounded-md  bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2 sm:text-sm">
										Change Address
									</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="hidden sm:block" aria-hidden="true">
		<div class="py-5">
			<div class="border-t border-untitled-gray-200" />
		</div>
	</div>

	<div class="mt-10 sm:mt-0">
		<div class="md:grid md:grid-cols-3 md:gap-6">
			<div class="md:col-span-1">
				<div class="px-4 sm:px-0">
					<h3
						class="text-lg font-medium leading-6 text-untitled-gray-500">
						Subscription
					</h3>
					<p class="mt-1 text-sm text-gray-600">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Numquam, omnis officiis ea nisi amet reprehenderit
						adipisci
					</p>
				</div>
			</div>
			<div class="mt-5 md:col-span-2 md:mt-0">
				<form action="#" method="POST">
					<div class="overflow-hidden shadow sm:rounded-md">
						<div class="bg-white px-4 py-5 sm:p-6">
							<div
								class="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
								<div class="sm:flex sm:items-start">
									<div class="mt-3 sm:mt-0 sm:ml-4">
										<div
											class="text-sm font-medium text-untitled-gray-500">
											Basic / Monthly
										</div>
										<div
											class="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
											<div>
												$50 for 350 active users and $10
												for each 50 users on top of 350
											</div>
										</div>
									</div>
								</div>
								<div
									class="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
									<button
										type="button"
										class="inline-flex items-center rounded-md bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2 sm:text-sm">
										View/Edit Your Plan
									</button>
								</div>
							</div>

							<div
								class="rounded-md mt-5 bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
								<div class="sm:flex sm:items-start">
									<div class="mt-3 sm:mt-0 sm:ml-4">
										<div
											class="text-sm font-medium text-untitled-gray-500">
											Next Billing Date
										</div>
										<div
											class="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
											<div>
												Jan 4, 2023 23 days left in
												current billing cycle
											</div>
										</div>
									</div>
								</div>
							</div>

							<div
								class="rounded-md mt-5 bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
								<div class="sm:flex sm:items-start">
									<div class="mt-3 sm:mt-0 sm:ml-4">
										<div
											class="text-sm font-medium text-untitled-gray-500">
											Payment Method
										</div>
										<div
											class="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
											<div>Amex ending in 4035</div>
										</div>
									</div>
								</div>
								<div
									class="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
									<button
										type="button"
										class="inline-flex items-center rounded-md bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2 sm:text-sm">
										Edit Payment Method
									</button>
								</div>
							</div>
						</div>
						<div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
							<button
								type="button"
								class="inline-flex mr-5 justify-center rounded-md text-red border-transparent border text-red-600 border-red-500 py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2">
								Cancel Subscription
							</button>

							<button
								type="button"
								class="inline-flex justify-center rounded-md border border-transparent bg-untitled-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-untitled-gray-700 focus:outline-none focus:ring-2 focus:ring-untitled-gray-500 focus:ring-offset-2">
								Upgrade Plan
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="hidden sm:block" aria-hidden="true">
		<div class="py-5">
			<div class="border-t border-untitled-gray-200" />
		</div>
	</div>
	<BillingAddressModal
		:open-modal="openBillingAddressModal"
		@close-modal="handleCloseModal" />
</template>
<script>
export default {
    inheritAttrs: false,
};
</script>
<script setup>
import { MapPinIcon } from '@heroicons/vue/24/outline';
import BillingAddressModal from '../../components/billingManagement/BillingAddressModal.vue';
import { ref } from 'vue';
import ComingSoon from '@/views/error/ComingSoon.vue';

const openBillingAddressModal = ref(false);

const handleClickChangeAddress = () => {
    openBillingAddressModal.value = true
}

const handleCloseModal = () => {
	openBillingAddressModal.value = false;
};

</script>
