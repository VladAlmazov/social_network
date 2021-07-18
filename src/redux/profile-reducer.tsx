import {ActionsType, AddPostActionType, PostDataType, UpdateNewPostActionType} from './redux-store';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState: PostDataType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: 'It is my first post', likesCount: 20}
    ],
    newPostText: 'it-kamasutra.com'
}


export const profileReducer = (state: PostDataType = initialState, action: ActionsType): PostDataType => {
    switch (action.type) {
        case ADD_POST:
            return {...state, posts: [...state.posts, {
                    id: state.posts.length + 1,
                    message: state.newPostText,
                    likesCount: 0
                }], newPostText: ''
            };
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.newText}
        default:
            return state;
    }
}
export const addPostActionCreator = (): AddPostActionType => ({type: ADD_POST})
export const updateNewPostTextActionCreator = (newText: string): UpdateNewPostActionType => (
    {type: UPDATE_NEW_POST_TEXT, newText: newText}
)
