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
            "Authorization": loginUser.token,
        }
    }),
    getEle : (id, loginUser) => api.get(`/todo_element/${id}`, {
        headers: {
            "Authorization": loginUser.token,
        }
    }),
    updateEleAchieve : (id) => api.patch(`/todo_element/achieve/${id}`,{} ,option),
    getCategory : (id) => api.get(`/category/${id}`),
    createTodoList : (data) => api.post(`/todo_list`, data ,option),
    createTodoEle : (data) => api.post(`/todo_element`,data, option)
}
