import api from "../api"

const option = [
    {
        headers: {
            "Authorization": localStorage.getItem("token"),
        }
    },
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": localStorage.getItem("token"),
        }
    }
]

// userApi 만드는 중임

export const userApi = {
    getUsers: () => api.get('users', option[0]),                            // 모든 유저 정보 조회
    getUser: (id) => api.get(`users/${id}`, option[0]),                     // 특정 유저 정보 조회
    modifyUser: (data) => api.patch('users', data, option[0]),              // 유저 정보 수정
    deleteUser: () => api.delete('users', option[0]),                       // 유저 삭제
    addUserDetail: (data) => api.post('users', data, option[0]),            // 유저 세부 정보 추가
    uploadUserImg: (data) => api.post('users/image', data, option[1]),      // 유저 세부 정보 이미지 업로드
    like: (id) => api.post('users/like', {id}, option[0]),                  // 유저 좋아요
    unlike: (id) => api.delete('users/like',{...option[0], data: {id}}),    // 유저 좋아요 취소
    getLikers: (id) => api.get(`users/likers/${id}`, option[0]),            // 나를 좋아요 한 유저 조회
    getLikings: (id) => api.get(`users/likings/${id}`, option[0]),          // 내가 좋아요 한 유저 조회
}







