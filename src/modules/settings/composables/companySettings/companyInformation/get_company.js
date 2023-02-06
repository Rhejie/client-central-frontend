import { http } from "@/composables/http_service"
import { ref } from "vue"

export const getCompany = (companyId) => {

    const data = ref(null)

    const load = async () => {
        await http().get(`/company/${companyId}`)
            .then(res => {
                data.value = res.data
            })
            .catch( error => {
                switch (error.response.status) {
                    case 401:
                        alert(error.response.message)
                        break;
                
                    default:
                        alert(error)
                        break;
                }
            })
    }

    return {
        load, data
    }
}