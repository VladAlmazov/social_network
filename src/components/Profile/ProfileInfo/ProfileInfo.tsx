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

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader />
    }
    return (
        <div className={s.profile}>
            <div className={s.descriptionBlock}>
                <img alt={'avatar'}
                     src={profile.photos.large ? profile.photos.large : userPhoto}/>
                <ProfileStatus status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}