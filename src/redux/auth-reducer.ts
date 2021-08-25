import {Dispatch} from 'redux';
import {authAPI} from '../api/api';

export type UsersAT = SetUserDataAT

export type SetUserDataType = {
    id: number
    email: string
    login: string
}

export type SetUserDataAT = {
    type: 'SET-USER-DATA'
    data: SetUserDataType
}
export type UnfollowAT = {
    type: 'UNFOLLOW'
    userId: number
}
export type setCurrentPageAT = {
    type: 'SET-CURRENT-PAGE'
    currentPage: number
}


export type AuthPageType = {
    id: number
    email: string
    login: string
    isAuth: boolean
}


let initialState: AuthPageType = {
    id: 1,
    email: '',
    login: '',
    isAuth: false,
}

export const authReducer = (state: AuthPageType = initialState, action: UsersAT): AuthPageType => {
    switch (action.type) {
        case 'SET-USER-DATA': {
            return {
                ...state,
                ...action.data,
                isAuth: true,
            }
        }
        default:
            return state;
    }
}
export const setAuthUserData = (data: SetUserDataType): SetUserDataAT => ({
    type: 'SET-USER-DATA',
    data: data,
})

export const getAuthUserData = () => {
    return (dispatch: Dispatch) => {
        authAPI.getMe().then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(data.data.login))
            }
        });
    }
}
