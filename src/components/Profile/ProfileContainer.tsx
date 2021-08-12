import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {ReduxStoreType} from '../../redux/redux-store';
import {setUserProfile} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter } from 'react-router-dom';
import {usersAPI} from '../../api/api';

export type ProfileContainerPropsType = {
    setUserProfile: (profile: any) => void
    profile: any
    match: { params: {userId: number} }
}

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

class ProfileContainer extends React.Component<PropsType>{
    componentDidMount() {
        let userId = this.props.match.params.userId;
        usersAPI.getUserProfile(userId).then(response => {
            this.props.setUserProfile(response.data.items);
        })
    }

    render() {
        return (
            <Profile profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: ReduxStoreType) => {
    return {
        profile: state.profileReducer.profile
    }
}

const withUrlDataContainerComponent = withRouter(ProfileContainer)

export default  connect(mapStateToProps, { setUserProfile })(withUrlDataContainerComponent)