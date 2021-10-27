import {usersAPI} from '../api/api';
import {Dispatch} from 'redux';
import {updateObjectInArray} from '../components/common/object-helpers';

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
        case 'social-network/users/FOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, {followed: true})
            }
        }
        case 'social-network/users/UNFOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, {followed: false})
            }
        }
        case 'social-network/users/SET-USERS': {
            return {...state, users: action.users}
        }
        case 'social-network/users/SET-CURRENT-PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'social-network/users/SET-TOTAL-USERS-COUNT': {
            return {...state, totalUsersCount: action.count}
        }
        case 'social-network/users/TOGGLE-IS-FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS': {
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
export const followAC = (userId: number) => ({type: 'social-network/users/FOLLOW', userId: userId} as const)
export const unfollowAC = (userId: number) => ({type: 'social-network/users/UNFOLLOW', userId: userId} as const)
export const setUsersAC = (users: Array<UserType>) => ({type: 'social-network/users/SET-USERS', users: users} as const)
export const setCurrentPageAC = (currentPage: number) => (
    {type: 'social-network/users/SET-CURRENT-PAGE', currentPage: currentPage} as const
)
export const setTotalUsersCountAC = (totalUsersCount: number) => (
    {type: 'social-network/users/SET-TOTAL-USERS-COUNT', count: totalUsersCount} as const
)
export const toggleIsFetchingAC = (isFetching: boolean) => (
    {type: 'social-network/users/TOGGLE-IS-FETCHING', isFetching} as const
)
export const toggleFollowingProgressAC = (isFetching: boolean, userId: number) => (
    {type: 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const
)

export const getUsersTC = (currentPage: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    dispatch(setCurrentPageAC(currentPage));

    let data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(toggleIsFetchingAC(false));
    dispatch(setUsersAC(data.data.items));
    dispatch(setTotalUsersCountAC(data.data.totalCount));
}

const followUnfollowFlow = async (dispatch: Dispatch, userId: number,
                                  apiMethod: (userId: number) => any,
                                  actionCreator: (userId: number) => UsersAT) => {

    dispatch(toggleFollowingProgressAC(true, userId));

    let response = await apiMethod(userId);

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgressAC(false, userId));
}

export const followUserTC = (userId: number) => async (dispatch: Dispatch) => {
    let apiMethod = usersAPI.followUser.bind(usersAPI);
    await followUnfollowFlow(dispatch, userId, apiMethod, followAC)
}

export const unfollowUserTC = (userId: number) => async (dispatch: Dispatch) => {
    let apiMethod = usersAPI.unfollowUser.bind(usersAPI);
    await followUnfollowFlow(dispatch, userId, apiMethod, unfollowAC)
}



