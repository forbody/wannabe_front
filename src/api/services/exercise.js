import api from "../api"

export const exerciseApi = {
    getExercise: (token) => api.get('exercise', {
        headers: {
            "Authorization": token,
        }
    }),
    getSortExercise: (token,data) => api.get('exercise/sort', {
        params: {
            sort: data
        },
        headers: {
            "Authorization": token,
        }
    }),
    getRandomTip: (token) => api.get('health_tip', {
        headers: {
            "Authorization": token,
        }
    }),
    getFavExercises: (token) => api.get('exercise/favorite', {
        headers: {
            "Authorization": token,
        } 
    }),


    postFavExercise : (id , token) => api.post('exercise/favorite', { id }, {
        headers: { 
            "Authorization": token ,
        }
    }),
    deleteFavExercise: (token, {id}) => api.delete('exercise/favorite', { 
        headers: { 
            "Authorization": token },
            "data" : {id} , 
        } 
    )
}