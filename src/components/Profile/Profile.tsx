import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {ProfilePropsType} from '../../redux/redux-store';
import { MyPostContainer } from './MyPosts/MyPostsContainer';



const Profile = (props: ProfilePropsType) => {
return (
    <div>
        <ProfileInfo/>
        <MyPostContainer />
    </div>
)
}

export default Profile;