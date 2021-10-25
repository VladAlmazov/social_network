import React from 'react';
import s from './MyPosts.module.css';
import Post, {PostType} from './Post/Post';
import {Field, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../common/validators/validators';
import {Textarea} from '../../common/FormsControls/FormsControls';

export type MyPostsPropsType = {
    posts: PostType[]
    addPost: (values: any) => void
}

let maxLength10 = maxLengthCreator(10)

const MyPosts = React.memo((props: MyPostsPropsType) => {

    const postsElement =
        props.posts.map((p: PostType) => <Post message={p.message} likesCount={p.likesCount}/>)

    const onAddPost = (values: any) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostReduxForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>)
})

const addNewPostForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newPostText" component={Textarea} placeholder={'Post text'}
                       validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostReduxForm = reduxForm({form: 'addNewPost'})(addNewPostForm)

export default MyPosts;