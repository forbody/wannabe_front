import api from "../api"

const option = 
    {
        headers: {
            "Authorization": localStorage.getItem("token"),
        }
    }


export const userApi = {
    getUsers: () => api.get('users'),
    getUser: (id) => api.get(`users/${id}`),
    modifyUser: (data) => api.patch('users', data, option),
    deleteUser: () => api.delete('users', option),
}
