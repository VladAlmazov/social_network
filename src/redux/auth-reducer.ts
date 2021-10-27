import {Dispatch} from 'redux';
import {stopSubmit} from 'redux-form';
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
    id: 18289,
    email: '',
    login: '',
    isAuth: false,
}

export const authReducer = (state: AuthPageType = initialState, action: UsersAT): AuthPageType => {
    switch (action.type) {
        case 'social-network/auth/SET-USER-DATA': {
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
    {type: 'social-network/auth/SET-USER-DATA', payload: {id, login, email, isAuth}} as const
)

export const getAuthUserDataTC = () => async (dispatch: Dispatch) => {
    let response = await authAPI.getMe();

    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserDataAC(id, login, email, true))
    }
}
export const loginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch) => {
    let response = await authAPI.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        // @ts-ignore
        dispatch(getAuthUserDataTC())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}
export const logoutTC = () => async (dispatch: Dispatch) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(0, '', '', false))
    }
}
