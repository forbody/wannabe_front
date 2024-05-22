import api from "../api"

export const foodApi = {
    getDishes: (sort, loginUser) => api.get(`food/sort/${sort}`, {        // 종류별 음식 정보 조회
        headers: {
            "Authorization": loginUser,
        }
    }),
    getDish: (id, loginUser) => api.get(`food/${id}`, {        // 개별 음식 정보 조회
        headers: {
            "Authorization": loginUser,
        }
    }),
}
