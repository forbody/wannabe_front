import api from "../api"

export const userApi = {
    getUsers: (loginUser) => api.get('users', {                        // 모든 유저 정보 조회
        headers: {
            "Authorization": loginUser,
        }
    }),
    getUser: (id, loginUser) => api.get(`users/${id}`, {               // 특정 유저 정보 조회
        headers: {
            "Authorization": loginUser,
        }
    }),
    modifyUser: (data, loginUser) => api.patch('users', data, {        // 유저 정보 수정
        headers: {
            "Authorization": loginUser,
        }
    }),
    deleteUser: (loginUser) => api.delete('users', {                   // 유저 삭제
        headers: {
            "Authorization": loginUser,
        }
    }),
    addUserDetail: (data, loginUser) => api.post('users', data, {      // 유저 세부 정보 추가
        headers: {
            "Authorization": loginUser,
        }
    }),
    uploadUserImg: (data) => api.post('users/image', data, {           // 유저 세부 정보 이미지 업로드
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }),
    like: (id, loginUser) => api.post('users/like', {id}, {            // 유저 좋아요
        headers: {
            "Authorization": loginUser,
        }
    }),
    unlike: (id, loginUser) => api.delete('users/like',{               // 유저 좋아요 취소
        headers: {
            "Authorization": loginUser,
        }, data: {id}}),
    getLikers: (id, loginUser) => api.get(`users/${id}/likers`, {      // 나를 좋아요 한 유저 조회
        headers: {
            "Authorization": loginUser,
        }
    }),
    getLikings: (id, loginUser) => api.get(`users/${id}/likings`, {    // 내가 좋아요 한 유저 조회
        headers: {
            "Authorization": loginUser,
        }
    }),
}







