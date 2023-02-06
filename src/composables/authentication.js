import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { http } from './http_service';

export const loginUser = (user) => {
	const data = ref(null);
	const errorData = ref(null);
	const message = ref(null);
	const hasError = ref(false);

	const login = async () => {
		await http()
			.post('/auth/login', user)
			.then((res) => {
				data.value = res.data;
				errorData.value = null;
				message.value = null;
			})
			.catch((error) => {
				hasError.value = true;
				switch (error.response.status) {
					case 422:
						errorData.value = error.response.data;
						break;

					case 401:
						message.value = error.response.data.message;
						break;

					default:
						alert(error);
						break;
				}
			});
	};

	return {
		login,
		data,
		errorData,
		message,
		hasError,
	};
};

export const logoutUser = async () => {
	const router = useRouter();
	await http()
		.get('/auth/logout')
		.then(() => {
			localStorage.removeItem('auth_token_default');
		});
};

export const getUserProfile = () => {
	const data = ref(null);
	const loadUser = async () => {
		await http()
			.get('/auth/user')
			.then((res) => {
				data.value = res.data;
			})
			.catch((error) => {
				localStorage.removeItem('auth_token_default');
				localStorage.removeItem('auth_remember');
			});
	};

	return {
		data,
		loadUser,
	};
};

export const forgotPassword = (params) => {
	const errorData = ref(null);
	const message = ref(null);
	const data = ref(null);
	const post = async () => {
		await http()
			.post('auth/send-email-verification-code', params)
			.then((res) => {
				errorData.value = null;
				data.value = res.data;
				message.value = null;
			})
			.catch((error) => {
				switch (error.response.status) {
					case 422:
						errorData.value = error.response.data;
						break;

					case 404:
						message.value =
							'These credentials do not match our records.';

					default:
						break;
				}
			});
	};

	return {
		data,
		post,
		errorData,
		message,
	};
};

export const resetPassword = (params) => {
	const data = ref(null);
	const errorData = ref(null);
	const message = ref(null);

	const post = async () => {
		await http()
			.post('auth/change-password', params)
			.then((res) => {
				data.value = res.data;
				errorData.value = null;
				message.value = null;
			})
			.catch((error) => {
				switch (error.response.status) {
					case 422:
						errorData.value = error.response.data;
						break;

					case 404:
						message.value =
							'These credentials do not match our records.';

					default:
						break;
				}
			});
	};
	return {
		data,
		errorData,
		message,
		post,
	};
};
