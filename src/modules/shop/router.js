const Module = () => import('./ShopModule.vue')

const moduleRoute = {
    path: '/shop',
    component: Module,
    children: [
        {
            path: '',
            name: 'Shop Home Page',
            component: () => import('./views/HomePage.vue'),
			meta: {
				title: 'Shops',
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