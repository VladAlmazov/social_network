import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {ReduxStoreType} from '../../redux/redux-store';
import {getUserProfile} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';
import {compose} from 'redux';

export type ProfileContainerPropsType = {
    profile: any
    match: { params: { userId: number } }
    getUserProfile: (userId: number) => void
}

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType;

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        this.props.getUserProfile(userId)
    }

    render() {
        return (
            <Profile profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: ReduxStoreType) => {
    return {
        profile: state.profileReducer.profile,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    withAuthRedirect,
)(ProfileContainer)
