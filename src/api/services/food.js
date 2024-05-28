import api from "../api"

export const foodApi = {
    getDishes: (sort, token) => api.get(`food/sort/${sort}`, {        // 종류별 음식 정보 조회
        headers: {
            "Authorization": token,
        }
    }),
    getDish: (id, token) => api.get(`food/${id}`, {        // 개별 음식 정보 조회
        headers: {
            "Authorization": token,
        }
    }),
    getRandomDishes: (token) => api.get(`food/random-dish`, {
        headers: {
            "Authorization": token,
        }
    }),
    getTodayDishes: (data, token) => api.post(`food/today-dish`, data, {
        headers: {
            "Authorization": token,
        }
    })
}
