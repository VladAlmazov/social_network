import React from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from '../../common/Preloader/Preloader';
import { ProfileStatus } from './ProfileStatus';
import userPhoto from '../../../assets/images/avatar.jpg';
import {ResponseProfileType} from '../../../redux/profile-reducer';

export type ProfileInfoPropsType = {
    profile: null | ResponseProfileType
    status: string
    updateStatus: (status: string) => void
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div className={s.profile}>
            <div className={s.descriptionBlock}>
                <img alt={'avatar'}
                     src={props.profile.photos.large ? props.profile.photos.large : userPhoto}/>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}