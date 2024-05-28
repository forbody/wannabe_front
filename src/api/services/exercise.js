import api from "../api"

export const exerciseApi = {
    getExercise: (loginUser) => api.get('exercise', {
        headers: {
            "Authorization": loginUser,
        }
    }),
    getSortExercise: (loginUser,data) => api.get('exercise/sort', {
        params: {
            sort: data
        },
        headers: {
            "Authorization": loginUser,
        }
    }),
    getRandomTip: (loginUser) => api.get('health_tip/', {
        headers: {
            "Authorization": loginUser,
        }
    }),
    getFavExercises: (loginUser) => api.get('exercise/favorite/', {
        headers: {
            "Authorization": loginUser,
        } 
    }),
}