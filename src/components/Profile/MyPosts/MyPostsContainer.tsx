import {
    addPostAC,
    AddPostAT,
} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {ReduxStoreType} from '../../../redux/redux-store';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (state: ReduxStoreType) => {
    return {
        posts: state.profileReducer.posts,
    }
}
const mapDispatchToProps = (dispatch: Dispatch<AddPostAT>) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostAC(newPostText));
        }
    }
}

export const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)