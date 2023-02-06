import { COMPANY_ADMIN } from "@/composables/roles";
import { defineStore } from "pinia";
export const useUserStore = defineStore('userStore', {
    state: () => ({
        userProfile: {}
    }),
    getters: {
        isAdministrator(state) {

            if(!state.loggedInUser) {
                return false
            }

            if(!state.loggedInUser.roles) {
                return false
            }

            let role = state.loggedInUser.roles.find(role => role.name === COMPANY_ADMIN)

            if(!role) {
                return false
            }

            return true
        }
    },
    actions: {
        setUserProfile(profile) {
            this.userProfile = profile;
        }
    }
})