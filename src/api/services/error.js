import api from "../api"

export const errorApi = {
    postErr : (data, token)  => api.post('/error', data , {
        headers: { 
            "Authorization": token ,
        }
    }),
}