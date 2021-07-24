import React from 'react';
import s from './Post.module.css';

export type PostType = {
    message: string
    likesCount: number
    id?: number
}

const Post = (props: PostType) => {
    return (
        <div className={s.item}>
            <img
                src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg" alt='avatar'/>
            {props.message}
            <div>
                <span> {props.likesCount} Likes</span>
            </div>
        </div>
    )
}

export default Post;