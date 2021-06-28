import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {ProfilePropsType} from '../../redux/state';



const Profile = (props: ProfilePropsType) => {

return (
    <div>
        <ProfileInfo/>
        <MyPosts posts={props.profilePage.postData.posts} newPostText={props.profilePage.postData.newPostText} addPost={props.addPost} updateNewPostText={props.updateNewPostText}/>
    </div>
)
}

export default Profile;