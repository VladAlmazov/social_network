import {
    addPostActionCreator,
    AddPostAT,
    UpdateNewPostAT,
    updateNewPostTextActionCreator
} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {ReduxStoreType} from '../../../redux/redux-store';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (state: ReduxStoreType) => {
    return {
        posts: state.profileReducer.posts,
        newPostText: state.profileReducer.newPostText
    }
}
const mapDispatchToProps = (dispatch: Dispatch<AddPostAT | UpdateNewPostAT>) => {
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