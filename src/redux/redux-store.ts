import {createStore, Store} from 'redux';
import { combineReducers } from 'redux';
import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';

export type PostDataType = {
    posts: PostType[]
    newPostText: string
}
export type DialogsDataType = {
    users: Array<DialogType> // Одно и то же
}
export type MessageDataType = {
    messages: MessageType[] // Одно и то же
}

export type DialogsPageType = {
    dialogsData: DialogsDataType
    messagesData: MessageDataType
    newMessageBody: string
}
export type DialogsStateType = {
    dialogsPage: DialogsPageType
}
export type ProfileStateType = {
    postData: PostDataType
}
export type RootStateType = {
    postData: PostDataType
    dialogsPage: DialogsPageType
}
export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: (state: RootStateType) => void
    _addPost: () => void
    _updateNewPostText: (newText: string) => void
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionsType) => void
}

export type DialogsContainerPropsType = {
    // store: Store
}
export type MyPostsContainerPropsType = {
    // store: Store
}
export type MyPostsPropsType = {
    posts: PostType[]
    newPostText: string
    updateNewPostText: (text: string) => void
    addPost: () => void
}
export type ProfilePropsType = {
    // store: Store
}
export type DialogsPropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
    dialogsPage: DialogsPageType
}
export type PostType = {
    message: string
    likesCount: number
    id?: number
}
export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    message: string
    id?: number
}
export type AppPropsType = {
    // store: Store
}

export type AddPostActionType = {
    type: 'ADD-POST'
}
export type UpdateNewPostActionType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}
export type UpdateNewMessageActionType = {
    type: 'UPDATE_NEW_MESSAGE_BODY'
    body: string
}
export type SendMessageActionType = {
    type: 'SEND_MESSAGE'
}
export type ActionsType =
    AddPostActionType
    | UpdateNewPostActionType
    | UpdateNewMessageActionType
    | SendMessageActionType

let reducers = combineReducers({
    profileReducer: profileReducer,
    dialogsReducer: dialogsReducer
});

export type ReduxStoreType = ReturnType<typeof reducers>

export let store = createStore(reducers)