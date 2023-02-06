import { getCompanyType } from '@/composables/company-local-storage';
import { GROUP_COMPANY } from '@/composables/company-type';

const Module = () => import('./StoreModule.vue')

const moduleRoute = {
    path: '/store',
    component: Module,
    children: [
        {
            path: '',
            name: 'Store Home Page',
            component: () => import('./views/HomePage.vue'),
            beforeEnter: (to, from, next) => {
                if(getCompanyType() === GROUP_COMPANY) {
                    next();
                }
                next('/401')
            },
			meta: {
				title: 'Stores',
			},
        },
        {
            path: '/store/create',
            name: 'Create Store Page',
            component: () => import('./views/StoreForm.vue'),
            beforeEnter: (to, from, next) => {
                if(getCompanyType() === GROUP_COMPANY) {
                    next();
                }
                next('/401')
            },
			meta: {
				title: 'Create Store',
			},
        },
        {
            path: '/store/edit/:id',
            name: 'Edit Store Page',
            component: () => import('./views/StoreForm.vue'),
            props: true,
			meta: {
				title: 'Edit Store',
			},
        },
        {
            path: '/store/:id',
            name: 'View Store Page',
            component: () => import('./views/ViewStorePage.vue'),
            props: true,
			meta: {
				title: 'View Store',
			},
        }
    ],
    meta: {
      auth: true,
    },
}

export default router => {
    router.addRoute('layout', moduleRoute);
}