const Module = () => import('./RoleModule.vue')

const moduleRoute = {
    path: '/products',
    component: Module,
    children: [
        {
            path: '',
            name: 'Role Home Page',
            component: () => import('./views/HomePage.vue'),
			meta: {
				title: 'Roles',
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