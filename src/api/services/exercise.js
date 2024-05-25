import api from "../api"

export const exerciseApi = {
    getExercises: (loginUser) => api.get(`exercise/`, {
        headers: {
            "Authorization": loginUser,
        }
    })
}