import api from "../api"

const option = 
    {
        headers: {
            "Authorization": localStorage.getItem("token"),
        }
    }


export const todoApi = {
    getList : (date, token) => api.get(`/todo_list/${date}`, {
        headers: {
            "Authorization": token,
        }
    }),
    getEle : (id, token) => api.get(`/todo_element/${id}`, {
        headers: {
            "Authorization": token,
        }
    }),
    updateEleAchieve : (id, token) => api.patch(`/todo_element/${id}/achieve/`,{} ,{
        headers: {
            "Authorization": token,
        }
    }),
    getCategory : (id) => api.get(`/category/${id}`),
    createTodoList : (data, token) => api.post(`/todo_list`, data ,{
        headers: {
            "Authorization": token,
        }
    }),
    createTodoEle : (data, token) => api.post(`/todo_element`,data, {
        headers: {
            "Authorization": token,
        }
    }),
    deleteTodoEle : (id, token) => api.delete(`/todo_element/${id}`,{
        headers: {
            "Authorization": token,
        }
    }),
    uploadShareComment : (data, token) => api.post(`/todo_list/share/`, data, {
        headers: {
            "Authorization": token,
        }
    }),
    modifyShareComment : (id, data, token) => api.patch(`/todo_list/share/${id}`, data, {
        headers: {
            "Authorization": token,
        }
    }),

    modifyListShare : (id, token) => api.patch(`/todo_list/${id}`, {}, {
        headers: {
            "Authorization": token,
        }
    }),
    getShareList : (token) => api.get(`/todo_list/all`, {
        headers: {
            "Authorization": token,
        }
    }),
    getMyShareList : (token) => api.get(`/todo_list/my`, {
        headers: {
            "Authorization": token,
        }
    }),
    shareTodoEle: (data, token) => api.post(`/todo_element/share`,data,{
        headers: {
            "Authorization": token,
        }
    }),
    deleteShareComment : (id, token) =>api.delete(`/todo_list/share/${id}`,{
        headers: {
            "Authorization": token,
        }
    })
}