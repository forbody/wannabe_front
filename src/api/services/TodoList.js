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
    getCategory : (id) => api.get(`/category/${id}`)
}
