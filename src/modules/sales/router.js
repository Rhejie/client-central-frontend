const Module = () => import('./SalesModule.vue')

const moduleRoute = {
    path: '/sales',
    component: Module,
    children: [
        {
            path: '',
            name: 'Sales Home Page',
            component: () => import('./views/HomePage.vue'),
			meta: {
				title: 'Sales',
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