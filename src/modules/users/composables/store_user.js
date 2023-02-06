import { httpServer } from "@/composables/http_service";
import { ref } from "vue";

export const storeUser = (user) => {
    const data = ref(null);
    const errorData = ref(null);
    const message = ref(null);

    const post = async () => {
        await httpServer().post('/users', user)
            .then(res => {
                data.value = res.data
                errorData.value = null;
                message.value = null
            }).catch( error => {
                switch (error.response.status) {
                    case 422:
                        errorData.value = error.response.data
                        break;
                    
                    case 401:
                        message.value = error.response.message
                        break;
                
                    default:
                        alert(error)
                        break;
                }
            })
    }

    return {
        post, 
        errorData,
        message,
        data
    }
}