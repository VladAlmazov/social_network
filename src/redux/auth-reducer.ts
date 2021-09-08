import {Dispatch} from 'redux';
import {authAPI} from '../api/api';

export type UsersAT = SetUserAT

// export type SetUserDataType = {
//     id: number
//     email: string
//     login: string
// }

type SetUserAT = ReturnType<typeof setAuthUserDataAC>

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
                ...action.payload,
            }
        }
        default:
            return state;
    }
}
export const setAuthUserDataAC = (id: number, login: string, email: string, isAuth: boolean) => (
    {type: 'SET-USER-DATA', payload: {id, login, email, isAuth}} as const
)

export const getAuthUserDataTC = () => (dispatch: Dispatch) => {
    authAPI.getMe().then(response => {
        if (response.resultCode === 0) {
            let {id, login, email} = response.data
            dispatch(setAuthUserDataAC(id, login, email, true))
        }
    });
}
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    authAPI.login(email, password, rememberMe).then(data => {
        if (data.resultCode === 0) {
            // @ts-ignore
            dispatch(getAuthUserDataTC())
        }
    });
}
export const logoutTC = () => (dispatch: Dispatch) => {
    authAPI.logout().then(data => {
        if (data.resultCode === 0) {
            dispatch(setAuthUserDataAC(0, '', '', false))
        }
    });
}
