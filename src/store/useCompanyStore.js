import { setCompanyProfileLocalStorage } from '@/composables/company-local-storage';
import { http } from '@/composables/http_service';
import { defineStore } from 'pinia';
export const useCompanyStore = defineStore('companyStore', {
	state: () => ({
		companyProfile: null,
		domain: null
	}),
	actions: {
		setCompanyProfile(profile) {
			this.companyProfile = profile;
		},
		setCompanyDomain(domain) {
			this.domain = domain;
		},
		async getCompany(id) {
			await http()
				.get(`/company/${id}`)
				.then((res) => {
					this.setCompanyProfile(res.data)
                    setCompanyProfileLocalStorage(JSON.stringify(res.data))
				})
				.catch((error) => {
					switch (error.response.status) {
						case 401:
							alert(error);
							break;

						default:
							break;
					}
				});
		},
		changeLogoPhoto(photo) {
			if(this.domain && this.domain.company_name) {
				this.domain.logo_photo = photo;
			}
		},
		changeFaviconPhoto(photo) {
			if(this.domain && this.domain.company_name) {
				this.domain.favicon_photo = photo;
			}
		}
	},
});
