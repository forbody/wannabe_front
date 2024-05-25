import api from "../api"

const option = 
    {
        headers: {
            "Authorization": localStorage.getItem("token"),
        }
    }


export const todoApi = {
    getList : (date, loginUser) => api.get(`/todo_list/${date}`, {
        headers: {
            "Authorization": loginUser,
        }
    }),
    getEle : (id, loginUser) => api.get(`/todo_element/${id}`, {
        headers: {
            "Authorization": loginUser,
        }
    }),
    updateEleAchieve : (id, loginUser) => api.patch(`/todo_element/achieve/${id}`,{} ,{
        headers: {
            "Authorization": loginUser,
        }
    }),
    getCategory : (id) => api.get(`/category/${id}`),
    createTodoList : (data, loginUser) => api.post(`/todo_list`, data ,{
        headers: {
            "Authorization": loginUser,
        }
    }),
    createTodoEle : (data, loginUser) => api.post(`/todo_element`,data, {
        headers: {
            "Authorization": loginUser,
        }
    }),
    deleteTodoEle : (id, loginUser) => api.delete(`/todo_element/${id}`,{
        headers: {
            "Authorization": loginUser,
        }
    }),
    uploadShareComment : (data, loginUser) => api.post(`/todo_list/share/`, data, {
        headers: {
            "Authorization": loginUser,
        }
    }),
    modifyShareComment : (id, data, loginUser) => api.patch(`/todo_list/share/${id}`, data, {
        headers: {
            "Authorization": loginUser,
        }
    }),

    modifyListShare : (id, loginUser) => api.patch(`/todo_list/${id}`, {}, {
        headers: {
            "Authorization": loginUser,
        }
    }),
    getShareList : (loginUser) => api.get(`/todo_list/all`, {
        headers: {
            "Authorization": loginUser,
        }
    }),
    getMyShareList : (loginUser) => api.get(`/todo_list/my`, {
        headers: {
            "Authorization": loginUser,
        }
    }),
    shareTodoEle: (data, loginUser) => api.post(`/todo_element/share`,data,{
        headers: {
            "Authorization": loginUser,
        }
    }),
    deleteShareComment : (id, loginUser) =>api.delete(`/todo_list/share/${id}`,{
        headers: {
            "Authorization": loginUser,
        }
    })
}