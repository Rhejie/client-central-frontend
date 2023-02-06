import { http } from "@/composables/http_service"
import { ref } from "vue"

export const getPreferenceById = (id) => {
    const data = ref(null)
    const load = async () => {
        await http().get(`/preferences/${id}`)
            .then(res => {
                data.value = res.data
            }).catch(error => {
                alert(error)
            })
    }

    return {
        load, 
        data
    }
}