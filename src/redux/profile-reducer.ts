import {PostType} from '../components/Profile/MyPosts/Post/Post';
import {Dispatch} from 'redux';
import {usersAPI} from '../api/api';

export type ProfileAT = AddPostAT | UpdateNewPostAT | SetUserProfileAT

export type PostDataType = {
    posts: PostType[]
    newPostText: string
    profile: null
}

export type AddPostAT = {
    type: 'ADD-POST'
}

export type UpdateNewPostAT = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}

export type SetUserProfileAT = {
    type: 'SET-USER-PROFILE'
    profile: null
}


let initialState: PostDataType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: 'It is my first post', likesCount: 20}
    ],
    newPostText: 'it-kamasutra.com',
    profile: null
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
        default:
            return state;
    }
}
export const addPostActionCreator = (): AddPostAT => ({type: 'ADD-POST'})
export const setUserProfile = (profile: null): SetUserProfileAT => ({type: 'SET-USER-PROFILE', profile})
export const updateNewPostTextActionCreator = (newText: string): UpdateNewPostAT => (
    {type: 'UPDATE-NEW-POST-TEXT', newText: newText}
)

export const getUserProfile = (userId: number) => {
    return (dispatch: Dispatch) => {
        usersAPI.getUserProfile(userId).then(data => {
            dispatch(setUserProfile(data.items));
        })
    }
}
