import api from "../api"

export const errorApi = {
    postErr : (data)  => api.post('/error', data ),
}