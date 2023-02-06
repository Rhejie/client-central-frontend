import { http } from "@/composables/http_service"
import { ref } from "vue"

export const updateCompany = (company, id) => {
    const data = ref(null)
    const errorData = ref(null)
    const message = ref(null)

    const update = async () => {
        await http().put(`/company/${id}`,company)
            .then(res => {
                data.value = res.data
                errorData.value = null;
                message.value = null
            }).catch(error => {
                switch (error.response.status) {
                    case 401:
                        message.value = error.response.data.message
                        break;

                    case 422:
                        errorData.value = error.response.data
                        break;
                
                    default:
                        alert(error)
                        break;
                }
            })
    }

    return {
        data,
        errorData,
        message,
        update
    }
}