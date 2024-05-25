import api from "../api"

export const exerciseApi = {
    getExercise: (loginUser) => api.get('exercise/', {
        headers: {
            "Authorization": loginUser,
        }
    }),
    getRandomTip: (loginUser) => api.get('health_tip/', {
        headers: {
            "Authorization": loginUser,
        }
    }),
}