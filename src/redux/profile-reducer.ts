import {PostType} from '../components/Profile/MyPosts/Post/Post';
import {Dispatch} from 'redux';
import {profileAPI, usersAPI} from '../api/api';

export type ProfileAT = AddPostAT | UpdateNewPostAT | SetUserProfileAT | SetStatusAT

export type PostDataType = {
    posts: PostType[]
    newPostText: string
    profile: null | ResponseProfileType
    status: string
}

export type ResponseProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    }
}
export type AddPostAT = ReturnType<typeof addPostActionCreator>
export type UpdateNewPostAT = ReturnType<typeof updateNewPostTextActionCreator>
export type SetUserProfileAT = ReturnType<typeof setUserProfile>
export type SetStatusAT = ReturnType<typeof setStatus>


let initialState: PostDataType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: 'It is my first post', likesCount: 20}
    ],
    newPostText: 'it-kamasutra.com',
    profile: null,
    status: '',
}


export const profileReducer = (state: PostDataType = initialState, action: ProfileAT): PostDataType => {
    switch (action.type) {
        case 'ADD-POST': {
            return {
                ...state, posts: [...state.posts, {
                    id: state.posts.length + 1,
                    message: state.newPostText,
                    likesCount: 0
                }], newPostText: ''
            };
        }
        case 'UPDATE-NEW-POST-TEXT': {
            return {...state, newPostText: action.newText}
        }
        case 'SET-USER-PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SET-STATUS': {
            return {...state, status: action.status}
        }
        default:
            return state;
    }
}
export const addPostActionCreator = () => ({type: 'ADD-POST'} as const)
export const setUserProfile = (profile: ResponseProfileType) => ({type: 'SET-USER-PROFILE', profile} as const)
export const updateNewPostTextActionCreator = (newText: string) => (
    {type: 'UPDATE-NEW-POST-TEXT', newText: newText} as const
)
export const setStatus = (status: string) => (
    {type: 'SET-STATUS', status} as const
)

export const getUserProfile = (userId: number) => (dispatch: Dispatch) => {
    usersAPI.getUserProfile(userId).then(res => {
        dispatch(setUserProfile(res.data));
    })
}
export const getStatus = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId).then(res => {
        dispatch(setStatus(res.data));
    })
}
export const updateStatus = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    })
}
