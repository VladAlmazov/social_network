import styles from './users.module.css';
import userPhoto from '../../assets/images/avatar.jpg';
import React from 'react';
import {UserType} from '../../redux/users-reducer';
import {NavLink} from 'react-router-dom';

export type UserPropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollowUser: (userId: number) => void
    followUser: (userId: number) => void
}

export const User: React.FC<UserPropsType> = (
    {user, followingInProgress, unfollowUser, followUser, ...props}
) => {

    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                    <img alt={'avatar'} src={user.photos.small ? user.photos.small : userPhoto}
                         className={styles.userPhoto}/>
                        </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unfollowUser(user.id)
                            }}>
                            Unfollow
                        </button>
                        : <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                followUser(user.id)
                            }}>
                            Follow
                        </button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                {/*<span>*/}
                {/*    <div>{'user.location.country'}</div>*/}
                {/*    <div>{'user.location.city'}</div>*/}
                {/*</span>*/}
            </span>
        </div>)
}