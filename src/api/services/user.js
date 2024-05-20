import api from "../api"

// userApi 만드는 중임

export const userApi = {
    getUsers: (loginUser) => api.get('users', {                        // 모든 유저 정보 조회
        headers: {
            "Authorization": loginUser.token // || localStorage.getItem('token'),
        }
    }),
    getUser: (id, loginUser) => api.get(`users/${id}`, {               // 특정 유저 정보 조회
        headers: {
            "Authorization": loginUser.token,
        }
    }),
    modifyUser: (data, loginUser) => api.patch('users', data, {        // 유저 정보 수정
        headers: {
            "Authorization": loginUser.token,
        }
    }),
    deleteUser: (loginUser) => api.delete('users', {                   // 유저 삭제
        headers: {
            "Authorization": loginUser.token,
        }
    }),
    addUserDetail: (data, loginUser) => api.post('users', data, {      // 유저 세부 정보 추가
        headers: {
            "Authorization": loginUser.token,
        }
    }),
    uploadUserImg: (data) => api.post('users/image', data, {           // 유저 세부 정보 이미지 업로드
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }),
    like: (id, loginUser) => api.post('users/like', {id}, {            // 유저 좋아요
        headers: {
            "Authorization": loginUser.token,
        }
    }),
    unlike: (id, loginUser) => api.delete('users/like',{               // 유저 좋아요 취소
        headers: {
            "Authorization": loginUser.token,
        }, data: {id}}),
    getLikers: (id, loginUser) => api.get(`users/${id}/likers`, {      // 나를 좋아요 한 유저 조회
        headers: {
            "Authorization": loginUser.token,
        }
    }),
    getLikings: (id, loginUser) => api.get(`users/${id}/likings`, {    // 내가 좋아요 한 유저 조회
        headers: {
            "Authorization": loginUser.token,
        }
    }),
}







