import {Dispatch} from 'redux';
import {getAuthUserDataTC} from './auth-reducer';

export type UsersAT = SetUserAT

type SetUserAT = ReturnType<typeof initializedSuccessAC>

export type AuthPageType = {
    initialized: boolean
}

let initialState: AuthPageType = {
    initialized: false,
}

export const appReducer = (state: AuthPageType = initialState, action: UsersAT): AuthPageType => {
    switch (action.type) {
        case 'social-network/app/INITIALIZED-SUCCESS': {
            return {
                ...state,
                initialized: true,
            }
        }
        default:
            return state;
    }
}
export const initializedSuccessAC = () => (
    {type: 'social-network/app/INITIALIZED-SUCCESS'} as const
)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    // @ts-ignore
    let promise = dispatch(getAuthUserDataTC());
    promise.then(() => {
        dispatch(initializedSuccessAC())
    })
}

