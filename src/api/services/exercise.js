import api from "../api"

export const exerciseApi = {
    getExercise: (token) => api.get('exercise/', {
        headers: {
            "Authorization": token,
        }
    }),
    getRandomTip: (token) => api.get('health_tip/', {
        headers: {
            "Authorization": token,
        }
    }),
    getFavExercises: (token) => api.get('exercise/favorite/', {
        headers: {
            "Authorization": token,
        } 
    })
}