import React from 'react';
import {UserType} from '../../redux/users-reducer';
import styles from './users.module.css';

export type UsersPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    users: Array<UserType>
}

export const Users = (props: UsersPropsType) => {
    if (props.users.length === 0) {
        props.setUsers([{
            id: 1, photoUrl: 'http://archilab.online/images/1/123.jpg',
            followed: false,
            fullName: 'Vlad',
            status: 'I am a boss',
            location: {
                city: 'Kyiv', country: 'Ukraine'
            }
        },
            {
                id: 2, photoUrl: 'http://archilab.online/images/1/123.jpg',
                followed: true,
                fullName: 'Stas',
                status: 'I am a boss too',
                location: {
                    city: 'Moscow', country: 'Russia'
                }
            },
            {
                id: 3, photoUrl: 'http://archilab.online/images/1/123.jpg',
                followed: false,
                fullName: 'Andrei',
                status: 'I am a boss too',
                location: {
                    city: 'Berlin', country: 'Germany'
                }
            },
            {
                id: 4, photoUrl: 'http://archilab.online/images/1/123.jpg',
                followed: true,
                fullName: 'Denis',
                status: 'I am a boss too',
                location: {
                    city: 'Madrid', country: 'Spain'
                }
            }])
    }

    return <div>
        {props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <img alt={'avatar'} src={u.photoUrl} className={styles.userPhoto}/>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={() => {
                            props.unfollow(u.id)
                        }}>Unfollow</button>
                        : <button onClick={() => {
                            props.follow(u.id)
                        }}>Follow</button>}

                </div>
            </span>
            <span>
                <span>
                    <div>{u.fullName}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{u.location.country}</div>
                    <div>{u.location.city}</div>
                </span>
            </span>
        </div>)}
    </div>
}