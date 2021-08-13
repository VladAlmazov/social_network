import {applyMiddleware, createStore} from 'redux';
import {combineReducers} from 'redux';
import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';
import {usersReducer} from './users-reducer';
import { authReducer } from './auth-reducer';
import thunkMiddleware from 'redux-thunk'


let reducers = combineReducers({
    profileReducer: profileReducer,
    dialogsReducer: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
});

export type ReduxStoreType = ReturnType<typeof reducers>

export let store = createStore(reducers, applyMiddleware(thunkMiddleware))