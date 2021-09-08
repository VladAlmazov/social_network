import {usersAPI} from '../api/api';
import {Dispatch} from 'redux';

export type UsersAT =
    followAT
    | unfollowAT
    | setUsersAT
    | setCurrentPageAT
    | setTotalUsersCountAT
    | toggleIfFetchingAT
    | toggleFollowingProgressAT

type followAT = ReturnType<typeof followAC>
type unfollowAT = ReturnType<typeof unfollowAC>
type setCurrentPageAT = ReturnType<typeof setCurrentPageAC>
type setTotalUsersCountAT = ReturnType<typeof setTotalUsersCountAC>
type setUsersAT = ReturnType<typeof setUsersAC>
type toggleIfFetchingAT = ReturnType<typeof toggleIsFetchingAC>
type toggleFollowingProgressAT = ReturnType<typeof toggleFollowingProgressAC>


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
export const followAC = (userId: number) => ({type: 'FOLLOW', userId: userId} as const)
export const unfollowAC = (userId: number) => ({type: 'UNFOLLOW', userId: userId} as const)
export const setUsersAC = (users: Array<UserType>) => ({type: 'SET-USERS', users: users} as const)
export const setCurrentPageAC = (currentPage: number) => (
    {type: 'SET-CURRENT-PAGE', currentPage: currentPage} as const
)
export const setTotalUsersCountAC = (totalUsersCount: number) => (
    {type: 'SET-TOTAL-USERS-COUNT', count: totalUsersCount} as const
)
export const toggleIsFetchingAC = (isFetching: boolean) => (
    {type: 'TOGGLE-IS-FETCHING', isFetching} as const
)
export const toggleFollowingProgressAC = (isFetching: boolean, userId: number) => (
    {type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const
)

export const getUsersTC = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFetchingAC(true));

        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetchingAC(false));
            dispatch(setUsersAC(data.items));
            dispatch(setTotalUsersCountAC(data.totalCount));
        });
    }
}
export const followUserTC = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgressAC(true, userId))
        usersAPI.followUser(userId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(followAC(userId))
            }
            dispatch(toggleFollowingProgressAC(false, userId))
        });
    }
}
export const unfollowUserTC = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgressAC(true, userId))
        usersAPI.unfollowUser(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowAC(userId))
            }
            dispatch(toggleFollowingProgressAC(false, userId))
        });
    }
}



