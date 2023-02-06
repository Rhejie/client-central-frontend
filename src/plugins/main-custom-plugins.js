import DataTable from '@/components/dataTable/DataTable.vue';
import GlobalPopupNotification from '@/components/GlobalPopupNotification.vue';
import GlobalDeleteConfirmation from '@/components/GlobalDeleteConfirmation.vue';
export default {
	install: (app, options) => {
		app.component('data-table', DataTable);

		app.component('global-popup-notification', GlobalPopupNotification);

		app.component('global-delete-confirmation', GlobalDeleteConfirmation);
	},
};
