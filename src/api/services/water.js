import api from "../api"

export const waterApi = {
    getWater: (token) => api.get(`water/`, {      // 나의 수분 섭취량 조회
        headers: {
            "Authorization": token,
        }
    }),
    createWater: (token) => api.post(`water/`, null,  {        // 수분 섭취 시작
        headers: {
            "Authorization": token,
        }
    }),
    updateWater: (data, token) => api.patch(`water/`, {water : data}, {        // 수분 섭취 업데이트
        headers: {
            "Authorization": token,
        }
    })
}