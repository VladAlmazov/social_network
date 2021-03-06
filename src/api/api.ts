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
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    unfollowUser (id: number) {
        return instance.delete(`follow/${id}`)
    },
    followUser (id: number) {
        return instance.post(`follow/${id}`)

    },
    getUserProfile (userId: number) {
        console.warn('Outdated method. Please use profileAPI object')
        return profileAPI.getUserProfile(userId)
    },
}

export const profileAPI = {
    getUserProfile (userId: number) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
    }
}

export const authAPI = {
    getMe () {
        return (
            instance.get(`auth/me`)
        )
    },
    login (email: string, password: string, rememberMe: boolean = false) {
        return (
            instance.post(`auth/login`, {email, password, rememberMe})
        )
    },
    logout () {
        return (
            instance.delete(`auth/login`)
        )
    },

}