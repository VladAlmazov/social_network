import React from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from '../../common/Preloader/Preloader';
import { ProfileStatus } from './ProfileStatus';
import userPhoto from '../../../assets/images/avatar.jpg';

export type ProfileInfoPropsType = {
    profile: any
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {
    // if (!props.profile) {
    //     return <Preloader />
    // }
    return (
        <div className={s.profile}>
            {/*<div className={s.img}>*/}
            {/*    <img*/}
            {/*        src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"*/}
            {/*        alt="avatar" className={s.img}/>*/}
            {/*</div>*/}
            <div className={s.descriptionBlock}>
                <img alt={'avatar'} src={userPhoto}/>
                <ProfileStatus status={'Hello my friend'}/>
            </div>
        </div>
    )
}