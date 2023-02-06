const Module = () => import('./CustomersModule.vue')

const moduleRoute = {
    path: '/customers',
    component: Module,
    children: [
        {
            path: '',
            name: 'Customers Home Page',
            component: () => import('./views/HomePage.vue'),
			meta: {
				title: 'Customers',
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