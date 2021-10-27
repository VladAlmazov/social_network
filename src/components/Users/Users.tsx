import React from 'react';
import {UserType} from '../../redux/users-reducer';
import {Paginator} from '../common/Paginator/Paginator';
import {User} from './User';

export type UsersPropsType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollowUser: (userId: number) => void
    followUser: (userId: number) => void
}

export const Users: React.FC<UsersPropsType> = (
    {currentPage, onPageChanged, totalUsersCount, pageSize, ...props}
) => {

    return <div>
        {<Paginator currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    pageSize={pageSize}
                    totalUsersCount={totalUsersCount}/>}

        {
            props.users.map(u => <User key={u.id}
                                       user={u}
                                       followingInProgress={props.followingInProgress}
                                       unfollowUser={props.unfollowUser}
                                       followUser={props.followUser}/>)
        }
    </div>
}