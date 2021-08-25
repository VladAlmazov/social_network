import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {ReduxStoreType} from '../../redux/redux-store';
import {getUserProfile} from '../../redux/profile-reducer';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';

export type ProfileContainerPropsType = {
    profile: any
    match: { params: {userId: number} }
    getUserProfile: (userId: number) => void
    isAuth: boolean
}

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

class ProfileContainer extends React.Component<PropsType>{
    componentDidMount() {
        let userId = this.props.match.params.userId;
        this.props.getUserProfile(userId)
    }

    render() {
        if (!this.props.isAuth) return <Redirect to={'/login'}/>
        return (
            <Profile profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: ReduxStoreType) => {
    return {
        profile: state.profileReducer.profile,
        isAuth: state.auth.isAuth,
    }
}

const withUrlDataContainerComponent = withRouter(ProfileContainer)

export default  connect(mapStateToProps, {getUserProfile})(withUrlDataContainerComponent)