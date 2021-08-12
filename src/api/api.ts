import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': '9061c7f3-391b-4aa0-973a-d6b93f3aa39c'
    },
})

export const usersAPI = {
    getUsers (currentPage: number, pageSize: number) {
        return(
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => response.data)
        )
    },
    unfollowUser (id: number) {
        return (
            instance.delete(`follow/${id}`)
                .then(response => response.data)
        )
    },
    followUser (id: number) {
        return (
            instance.post(`follow/${id}`)
        )
    },
    getUserProfile (userId: number) {
        return (
            instance.get(`profile/` + userId)
        )
    }
}