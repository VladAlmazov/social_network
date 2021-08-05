import React from 'react';
import { MyPostContainer } from './MyPosts/MyPostsContainer';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';

export type ProfilePropsType = {
    profile: any
}

export const Profile = (props: ProfilePropsType) => {
return (
    <div>
        <ProfileInfo profile={props.profile}/>
        <MyPostContainer />
    </div>
)
}