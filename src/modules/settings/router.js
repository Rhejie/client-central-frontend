import { getCompanyType } from '@/composables/company-local-storage';
import { SINGLE_ROOFTOP } from '@/composables/company-type';

const Module = () => import('./SettingModule.vue')

const moduleRoute = {
    path: '/settings',
    component: Module,
    children: [
        {
            path: '',
            name: 'Settings Home Page',
            component: () => import('./views/HomePage.vue'),
			meta: {
				title: 'Settings',
			},
        },
        {
            path: '/settings/company-settings',
            component: () => import('./views/CompanySettingPage.vue'),
            children: [
                {
                    path: '/settings/company-settings/billing-management',
                    name: 'Billing Management',
                    component: () => import('./views/companySetting/BillingManagementPage.vue'),
                    meta: {
                        title: 'Billing Management',
                    },
                },
                {
                    path: '/settings/company-settings/payment-integration',
                    name: 'Payment Integration',
                    component: () => import('./views/companySetting/PaymentIntegrationPage.vue'),
                    meta: {
                        title: 'Payment Integration',
                    },
                },
                {
                    path: '/settings/company-settings/customer-payment',
                    name: 'Customer Payment',
                    component: () => import('./views/companySetting/CustomerPaymentPage.vue'),
                    meta: {
                        title: 'Customer Payment',
                    },
                },
                {
                    path: '/settings/company-settings/company-information',
                    name: 'Company Information',
                    component: () => import('./views/companySetting/CompanyInformationPage.vue'),
                    meta: {
                        title: 'Company Information',
                    },
                },
                {
                    path: '/settings/company-settings/store-information',
                    name: 'Store Information',
                    component: () => import('./views/companySetting/StoreInformationPage.vue'),
                    beforeEnter: (to, from, next) => {
                        if(getCompanyType() === SINGLE_ROOFTOP) {
                            next();
                        }
                        next('/401')
                    },
                    meta: {
                        title: 'Store Information',
                    },
                },
            ]
        },
        {
            path: '/settings/site-details',
            component: () => import('./views/SiteDetailsPage.vue'),
            children: [
                {
                    path: '/settings/site-details/details',
                    name: 'Site Details',
                    component: () => import('./views/siteDetails/SiteDetailsPage.vue'),
                    meta: {
                        title: 'Site Details',
                    },
                },
                {
                    path: '/settings/site-details/domain-settings',
                    name: 'Domain Settings',
                    component: () => import('./views/siteDetails/DomainSettingPage.vue'),
                    meta: {
                        title: 'Domain Settings',
                    },
                },
            ]
        }
    ],
    meta: {
      auth: true,
    },
}

export default router => {
    router.addRoute('layout', moduleRoute);
}