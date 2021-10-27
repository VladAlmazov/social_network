import {connect} from 'react-redux';
import {ReduxStoreType} from '../../redux/redux-store';
import {
    setCurrentPageAC,
    UserType, toggleFollowingProgressAC, getUsersTC, unfollowUserTC, followUserTC
} from '../../redux/users-reducer';
import React from 'react';
import {Users} from './Users';
import { Preloader } from '../common/Preloader/Preloader';
import {compose} from 'redux';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from '../../redux/users-selector';

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
        const {currentPage, pageSize} = this.props;
        this.props.getUsersTC(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props;
        this.props.getUsersTC(pageNumber, pageSize)
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
                followingInProgress={this.props.followingInProgress}
                unfollowUser={this.props.unfollowUserTC}
                followUser={this.props.followUserTC}
            />
        </>
    }
}

// let mapStateToProps = (state: ReduxStoreType) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }

let mapStateToProps = (state: ReduxStoreType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
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
        setCurrentPageAC,
        toggleFollowingProgressAC,
        getUsersTC,
        unfollowUserTC,
        followUserTC,
    }),
) (UsersContainer)
