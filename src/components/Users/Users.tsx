import axios from 'axios';
import React from 'react';
import {UserType} from '../../redux/users-reducer';
import styles from './users.module.css';
import userPhoto from '../../assets/images/avatar.jpg'

export type UsersPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    users: Array<UserType>
}

export const Users = (props: UsersPropsType) => {
    let getUsers = () => {
        if (props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                props.setUsers(response.data.items)
            })
        }
    }

        return <div>
            <button onClick={getUsers}>Get users</button>
            {props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <img alt={'avatar'} src={u.photos.small !== undefined ? u.photos.small : userPhoto}
                         className={styles.userPhoto}/>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                        : <button onClick={() => {props.follow(u.id)}}>Follow</button>}
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