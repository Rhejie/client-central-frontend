import { ref } from "vue"
import { http } from "./http_service"

export const getCompanyProfileByDomain = () => {
    const data = ref(null) 

    const load = async () => {
        await http().get('/preferences/domain/login')
            .then(res => {
                data.value = res.data
            }).catch(error => {
                alert(error)
            })
    }

    return {
        data,
        load
    }
}