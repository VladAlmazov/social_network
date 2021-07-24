export type UsersAT = FollowAT | UnfollowAT | SetUsersAT
export type FollowAT = {
    type: 'FOLLOW'
    userId: number
}
export type UnfollowAT = {
    type: 'UNFOLLOW'
    userId: number
}
export type LocationType = {
    city: string
    country: string
}
export type UserType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: LocationType
}

export type UsersPageType = {
    users: Array<UserType>
}
export type SetUsersAT = {
    type: 'SET-USERS'
    users: Array<UserType>
}

let initialState: UsersPageType = {
    users: [{
        id: 1, photoUrl: 'http://archilab.online/images/1/123.jpg',
        followed: false,
        fullName: 'Vlad',
        status: 'I am a boss',
        location: {
            city: 'Kyiv', country: 'Ukraine'
        }
    },
        {
            id: 2, photoUrl: 'http://archilab.online/images/1/123.jpg',
            followed: true,
            fullName: 'Stas',
            status: 'I am a boss too',
            location: {
                city: 'Moscow', country: 'Russia'
            }
        },
        {
            id: 3, photoUrl: 'http://archilab.online/images/1/123.jpg',
            followed: false,
            fullName: 'Andrei',
            status: 'I am a boss too',
            location: {
                city: 'Berlin', country: 'Germany'
            }
        },
        {
            id: 4, photoUrl: 'http://archilab.online/images/1/123.jpg',
            followed: true,
            fullName: 'Denis',
            status: 'I am a boss too',
            location: {
                city: 'Madrid', country: 'Spain'
            }
        }]
}


export const usersReducer = (state: UsersPageType = initialState, action: UsersAT): UsersPageType => {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state, users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        }
        case 'SET-USERS': {
            return {...state, users: action.users}
        }
        default:
            return state;
    }
}
export const followAC = (userId: number): FollowAT => ({type: 'FOLLOW', userId: userId})
export const unfollowAC = (userId: number): UnfollowAT => ({type: 'UNFOLLOW', userId: userId})
export const setUsersAC = (users: Array<UserType>): SetUsersAT => ({type: 'SET-USERS', users: users})