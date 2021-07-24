import {connect} from 'react-redux';
import {Users} from './Users';
import {ReduxStoreType} from '../../redux/redux-store';
import { Dispatch } from 'redux';
import {followAC, setUsersAC, unfollowAC, UsersAT, UserType} from '../../redux/users-reducer';

let mapStateToProps = (state: ReduxStoreType) => {
    return {
        users: state.usersPage.users
    }
}
let mapDispatchToProps = (dispatch: Dispatch<UsersAT>) => {
    return {
        follow: (userId: number) => {
            dispatch((followAC(userId)))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
