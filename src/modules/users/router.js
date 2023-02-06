const Module = () => import('./UserModule.vue');

const moduleRoute = {
	path: '/users',
	component: Module,
	children: [
		{
			path: '',
			name: 'User Home Page',
			component: () => import('./views/HomePage.vue'),
			meta: {
				title: 'Users',
			},
		},
		{
			path: '/users/create',
			name: 'Create User Page',
			component: () => import('./views/UserForm.vue'),
			meta: {
				title: 'Create User',
			},
		},
		{
			path: '/users/edit/:id',
			name: 'Edit User Page',
			component: () => import('./views/UserForm.vue'),
			props: true,
			meta: {
				title: 'Edit User',
			},
		},
		{
			path: '/users/:id',
			name: 'View User Page',
			component: () => import('./views/UserViewPage.vue'),
			props: true,
			meta: {
				title: 'View User',
			},
		},
	],
	meta: {
		auth: true,
	},
};

export default (router) => {
	router.addRoute('layout', moduleRoute);
};
