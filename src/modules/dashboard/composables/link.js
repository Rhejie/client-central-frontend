import { http } from "@/composables/http_service"
import { ref } from "vue"

export const getLink = () => {
    const data = ref(null)

    const load = async () => {
        await http().get('/users/demo/lms/link')
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