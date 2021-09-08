import {connect} from 'react-redux';
import {ReduxStoreType} from '../../redux/redux-store';
import {
    followAC,
    setCurrentPageAC,
    unfollowAC,
    UserType, toggleFollowingProgressAC, getUsersTC, unfollowUserTC, followUserTC
} from '../../redux/users-reducer';
import React from 'react';
import {Users} from './Users';
import { Preloader } from '../common/Preloader/Preloader';
import {compose} from 'redux';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';

export type UsersAPIPropsType = {
    followAC: (userId: number) => void
    unfollowAC: (userId: number) => void
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPageAC: (pageNumber: number) => void
    isFetching: boolean
    followingInProgress: Array<number>
    getUsersTC: (currentPage: number, pageSize: number) => void
    unfollowUserTC: (userId: number) => void
    followUserTC: (userId: number) => void
}

class UsersContainer extends React.Component<UsersAPIPropsType> {

    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersTC(pageNumber, this.props.pageSize)
        this.props.setCurrentPageAC(pageNumber);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.followAC}
                unfollow={this.props.unfollowAC}
                followingInProgress={this.props.followingInProgress}
                unfollowUser={this.props.unfollowUserTC}
                followUser={this.props.followUserTC}
            />
        </>
    }
}

let mapStateToProps = (state: ReduxStoreType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

// let mapDispatchToProps = (dispatch: Dispatch<UsersAT>) => {
//     return {
//         follow: (userId: number) => {
//             dispatch((followAC(userId)))
//         },
//         unfollow: (userId: number) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users: Array<UserType>) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber: number) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount: number) => {
//             dispatch(setUsersTotalCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching: boolean) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {
        followAC,
        unfollowAC,
        setCurrentPageAC,
        toggleFollowingProgressAC,
        getUsersTC,
        unfollowUserTC,
        followUserTC,
    }),
) (UsersContainer)
