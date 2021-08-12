import styles from './users.module.css';
import userPhoto from '../../assets/images/avatar.jpg';
import React from 'react';
import {UserType} from '../../redux/users-reducer';
import {NavLink} from 'react-router-dom';
import {usersAPI} from '../../api/api';

export type UsersPropsType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgress: Array<number>
}

export const Users = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span
                    className={props.currentPage === p && styles.selectedPage || ''}
                    onClick={() => props.onPageChanged(p)
                    }
                >
                    {p + ','} 
                </span>
            })}
        </div>
        {props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <NavLink to={'/profile/' + u.id}>
                    <img alt={'avatar'} src={userPhoto}
                         className={styles.userPhoto}/>
                        </NavLink>
                </div>
                <div>
                    {u.followed
                        ? <button
                            disabled={props.followingInProgress.some(id => id === u.id)}
                            onClick={() => {
                            props.toggleFollowingProgress(true, u.id)
                            usersAPI.unfollowUser(u.id).then(data => {
                                if (data.resultCode === 0) {
                                    props.unfollow(u.id)
                                }
                                props.toggleFollowingProgress(false, u.id)
                            });
                        }}>Unfollow</button>
                        : <button
                            disabled={props.followingInProgress.some(id => id === u.id)}
                            onClick={() => {
                            props.toggleFollowingProgress(true, u.id)
                            usersAPI.followUser(u.id).then(response => {
                                if (response.data.resultCode === 0) {
                                    props.follow(u.id)
                                }
                                props.toggleFollowingProgress(false, u.id)
                            });
                        }}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.city'}</div>
                </span>
            </span>
        </div>)}
    </div>
}