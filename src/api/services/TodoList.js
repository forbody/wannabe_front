import api from "../api"

const option = 
    {
        headers: {
            "Authorization": localStorage.getItem("token"),
        }
    }


export const todoApi = {
    getList : (date) => api.get(`/todo_list/${date}`, option),
    getEle : (id) => api.get(`/todo_element/${id}`, option)
}
