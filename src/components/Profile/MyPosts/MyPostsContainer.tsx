import React, {Dispatch} from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {
    AddPostActionType, ReduxStoreType, UpdateNewPostActionType
} from '../../../redux/redux-store';
import {connect} from 'react-redux';

const mapStateToProps = (state: ReduxStoreType) => {
    return {
        posts: state.profileReducer.posts,
        newPostText: state.profileReducer.newPostText
    }
}
const mapDispatchToProps = (dispatch: Dispatch<AddPostActionType | UpdateNewPostActionType>) => {
    return {
        updateNewPostText: (text: string) => {
            let action = updateNewPostTextActionCreator(text);
            dispatch(action)
        },
        addPost: () => {
            dispatch(addPostActionCreator());
        }
    }
}

export const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)