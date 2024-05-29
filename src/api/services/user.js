import api from "../api"

export const userApi = {
    getUsers: (token) => api.get('users', {                        // 모든 유저 정보 조회
        headers: {
            "Authorization": token,
        }
    }),
    getUser: (id, token) => api.get(`users/${id}`, {               // 특정 유저 정보 조회
        headers: {
            "Authorization": token,
        }
    }),
    modifyUser: (data, token) => api.patch('users', data, {        // 유저 정보 수정
        headers: {
            "Authorization": token,
        }
    }),
    deleteUser: (token) => api.delete('users', {                   // 유저 삭제
        headers: {
            "Authorization": token,
        }
    }),
    addUserDetail: (data, token) => api.post('users', data, {      // 유저 세부 정보 추가
        headers: {
            "Authorization": token,
        }
    }),
    uploadUserImg: (data) => api.post('users/image', data, {           // 유저 세부 정보 이미지 업로드
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }),
    like: (id, token) => api.post('users/like', { id }, {           // 유저 좋아요
        headers: {
            "Authorization": token,
        }
    }),
    unlike: (id, token) => api.delete('users/like', {               // 유저 좋아요 취소
        headers: {
            "Authorization": token,
        }, data: {id}}),
    getLikers: (id, token) => api.get(`users/${id}/likers`, {       // 나를 좋아요 한 유저 조회
        headers: {
            "Authorization": token,
        }
    }),
    getLikings: (id, token) => api.get(`users/${id}/likings`, {     // 내가 좋아요 한 유저 조회
        headers: {
            "Authorization": token,
        }
    }),
    getRandomRoleModels: (token) => api.get(`users/random-rolemodel`, {   // 랜덤 셀러브리티 3명 가져오기
        headers: {
            "Authorization": token,
        }
    }),
    modifyRoleModel: (data, token) => api.patch('users/rolemodel', data, { // 유저 롤모델 수정
        headers: {
            "Authorization": token,
        }
    }),
    modifyRefreshToken: (data, token) => api.patch('users/modifyRefreshToken', data, { // 리프레쉬 토큰 수정
        headers: {
            "Authorization": token,
        }
    }),
}







