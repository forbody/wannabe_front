import api from "../api"

export const waterApi = {
    getWater: (loginUser) => api.get(`water/`, {      // 나의 수분 섭취량 조회
        headers: {
            "Authorization": loginUser,
        }
    }),
    createWater: (loginUser) => api.post(`water/`, null,  {        // 수분 섭취 시작
        headers: {
            "Authorization": loginUser,
        }
    }),
    updateWater: (data, loginUser) => api.patch(`water/`, {water : data}, {        // 수분 섭취 업데이트
        headers: {
            "Authorization": loginUser,
        }
    })
}