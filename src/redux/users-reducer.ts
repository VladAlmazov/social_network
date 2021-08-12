export type UsersAT =
    FollowAT
    | UnfollowAT
    | SetUsersAT
    | setCurrentPageAT
    | setTotalUsersCountAT
    | ToggleIfFetchingAT
    | ToggleFollowingProgressAT
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
export type ToggleIfFetchingAT = {
    type: 'TOGGLE-IS-FETCHING'
    isFetching: boolean
}
export type ToggleFollowingProgressAT = {
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS'
    isFetching: boolean
    userId: number
}

export type LocationType = {
    city: string
    country: string
}
export type UserType = {
    id: number
    photos: { small: undefined, large: undefined }
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
    isFetching: boolean
    followingInProgress: Array<number>
}


let initialState: UsersPageType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
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
        case 'TOGGLE-IS-FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}
export const follow = (userId: number): FollowAT => ({type: 'FOLLOW', userId: userId})
export const unfollow = (userId: number): UnfollowAT => ({type: 'UNFOLLOW', userId: userId})
export const setUsers = (users: Array<UserType>): SetUsersAT => ({type: 'SET-USERS', users: users})
export const setCurrentPage = (currentPage: number): setCurrentPageAT => (
    {
        type: 'SET-CURRENT-PAGE',
        currentPage: currentPage
    }
)
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountAT => (
    {
        type: 'SET-TOTAL-USERS-COUNT',
        count: totalUsersCount
    }
)
export const toggleIsFetching = (isFetching: boolean): ToggleIfFetchingAT => (
    {type: 'TOGGLE-IS-FETCHING', isFetching}
)
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressAT => (
    {type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId}
)


