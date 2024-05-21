import api from "../api"

const option = 
    {
        headers: {
            "Authorization": localStorage.getItem("token"),
        }
    }


export const todoApi = {
    getList : (date) => api.get(`/todo_list/${date}`, option),
    getEle : (id) => api.get(`/todo_element/${id}`, option),
    updateEleAchieve : (id) => api.patch(`/todo_element/achieve/${id}`,{} ,option),
    getCategory : (id) => api.get(`/category/${id}`),
    createTodoList : (data) => api.post(`/todo_list`, data ,option),
    createTodoEle : (data) => api.post(`/todo_element`,data, option),
    deleteTodoEle : (id) => api.delete(`/todo_element/${id}`,{
        headers: {
            "Authorization": localStorage.getItem("token"),
        }
    }),
    uploadShareComment : (data) => api.post(`/todo_list/share/`, data, {
        headers: {
            "Authorization": localStorage.getItem("token"),
        }
    }),
    modifyShareComment : (id, data) => api.patch(`/todo_list/share/${id}`, data, {
        headers: {
            "Authorization": localStorage.getItem("token"),
        }
    }),

    modifyListShare : (id) => api.patch(`/todo_list/${id}`, {}, {
        headers: {
            "Authorization": localStorage.getItem("token"),
        }
    })
}
