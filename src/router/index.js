import { accessToken } from '@/composables/local_storage';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/auth/LoginPage.vue'),
		beforeEnter: (to, from, next) => {
			if (accessToken()) {
				next('/');
			}

			next();
		},
		meta: {
			title: 'Login'
		}
	},
	{
		path: '/forgot-password',
		name: 'Forgot Password',
		component: () => import('../views/auth/ForgotPassword.vue'),
		beforeEnter: (to, from, next) => {
			if (accessToken()) {
				next('/');
			}

			next();
		},
		meta: {
			title: 'Forgot Password'
		}
	},
	{
		path: '/check-your-email',
		name: 'Check Your Email',
		component: () => import('../views/auth/CheckYourEmail.vue'),
		beforeEnter: (to, from, next) => {
			if (accessToken()) {
				next('/');
			}

			next();
		},
		meta: {
			title: 'Check Email'
		}
	},
	{
		path: '/new-password',
		name: 'New Password',
		component: () => import('../views/auth/NewPassword.vue'),
		beforeEnter: (to, from, next) => {
			if (accessToken()) {
				next('/');
			}

			next();
		},
		meta: {
			title: 'Change Password'
		}
	},
	{
		path: '/password-reset',
		name: 'Password Reset',
		component: () => import('../views/auth/PasswordReset.vue'),
		beforeEnter: (to, from, next) => {
			if (accessToken()) {
				next('/');
			}

			next();
		},
		meta: {
			title: 'Password Reset'
		}
	},
	{
		path: '/sign-up',
		name: 'Sign Up',
		component: () => import('../views/auth/Signup.vue'),
		beforeEnter: (to, from, next) => {
			if (accessToken()) {
				next('/');
			}

			next();
		},
		meta: {
			title: 'Sign Up'
		}
	},
	{
		path: '/company-sign-up',
		name: 'Company Sign Up',
		component: () => import('../views/auth/CompanySignup.vue'),
		beforeEnter: (to, from, next) => {
			if (accessToken()) {
				next('/');
			}

			next();
		},
		meta: {
			title: 'Company Sign Up'
		}
	},
	{
		path: '/account-under-review',
		name: 'Account Under Review',
		component: () => import('../views/auth/AccountUnderReview.vue'),
		beforeEnter: (to, from, next) => {
			if (accessToken()) {
				next('/');
			}

			next();
		},
		meta: {
			title: 'Account Under Review'
		}
	},
	{
		path: '/',
		name: 'layout',
		component: () => import('../views/LayoutPage.vue'),
		children: [
			{
				path: '/401',
				name: 'Unauthorized',
				component: () => import('../views/error/UnauthorizePage.vue'),
			},
			{
				path: '/404',
				name: 'Not Found',
				component: () => import('../views/error/NotFoundPage.vue'),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
