export type UsersAT = FollowAT | UnfollowAT | SetUsersAT | setCurrentPageAT | setTotalUsersCountAT
export type FollowAT = {
    type: 'FOLLOW'
    userId: number
}
export type UnfollowAT = {
    type: 'UNFOLLOW'
    userId: number
}
export type setCurrentPageAT = {
    type: 'SET-CURRENT-PAGE'
    currentPage: number
}
export type setTotalUsersCountAT = {
    type: 'SET-TOTAL-USERS-COUNT'
    count: number
}
export type SetUsersAT = {
    type: 'SET-USERS'
    users: Array<UserType>
}

export type LocationType = {
    city: string
    country: string
}
export type UserType = {
    id: number
    photos: {small: undefined, large: undefined}
    followed: boolean
    name: string
    status: string
    location: LocationType
}

export type UsersPageType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
}


let initialState: UsersPageType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
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
        case 'SET-CURRENT-PAGE': {
                return {...state, currentPage: action.currentPage}
        }
        case 'SET-TOTAL-USERS-COUNT': {
                return {...state, totalUsersCount: action.count}
        }
        default:
            return state;
    }
}
export const followAC = (userId: number): FollowAT => ({type: 'FOLLOW', userId: userId})
export const unfollowAC = (userId: number): UnfollowAT => ({type: 'UNFOLLOW', userId: userId})
export const setUsersAC = (users: Array<UserType>): SetUsersAT => ({type: 'SET-USERS', users: users})
export const setCurrentPageAC = (currentPage: number): setCurrentPageAT => (
    {type: 'SET-CURRENT-PAGE',
    currentPage: currentPage}
)
export const setUsersTotalCountAC = (totalUsersCount: number): setTotalUsersCountAT => (
    {type: 'SET-TOTAL-USERS-COUNT',
    count: totalUsersCount}
)