import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {ReduxStoreType} from '../../redux/redux-store';
import {getStatus, getUserProfile, ResponseProfileType, updateStatus} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';
import {compose} from 'redux';

export type ProfileContainerPropsType = {
    profile: null | ResponseProfileType
    match: { params: { userId: number } }
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    status: string
    updateStatus: (status: string) => void
    authorizedUserId: number
    isAuth: boolean
}

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType;

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
            />
        )
    }
}

let mapStateToProps = (state: ReduxStoreType) => ({
    profile: state.profileReducer.profile,
    status: state.profileReducer.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    withRouter,
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
)(ProfileContainer)
