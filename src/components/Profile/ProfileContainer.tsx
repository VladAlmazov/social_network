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
}

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType;

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = +this.props.match.params.userId;
        if (!userId) {
            userId = 2
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return (
            <Profile profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}/>
        )
    }
}

let mapStateToProps = (state: ReduxStoreType) => ({
    profile: state.profileReducer.profile,
    status: state.profileReducer.status,
})

export default compose<React.ComponentType>(
    withRouter,
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
)(ProfileContainer)
