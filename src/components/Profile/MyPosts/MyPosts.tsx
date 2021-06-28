import React from 'react';

import s from './MyPosts.module.css';
import Post from './Post/Post';
import {MyPostsPropsType, PostType} from '../../../redux/state';

const MyPosts = (props: MyPostsPropsType) => {

    const postsElement =
        props.posts.map((p: PostType) => <Post message={p.message} likesCount={p.likesCount}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        if (newPostElement.current) {
            props.addPost();
            props.updateNewPostText('')
        }
    }

    const onPostChange = () => {
        if (newPostElement.current) {
            props.updateNewPostText(newPostElement.current.value);
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement} value={props.newPostText} onChange={onPostChange}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                { postsElement }
            </div>
        </div>)
}

export default MyPosts;