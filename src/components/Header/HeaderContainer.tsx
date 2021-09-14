import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {ReduxStoreType} from '../../redux/redux-store';
import {logoutTC} from '../../redux/auth-reducer';
import { compose } from 'redux';

type HeaderContainerPropsType = {
    isAuth: boolean
    login: string
    logoutTC: () => void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logoutTC}/>
    }
}

const mapStateToProps = (state: ReduxStoreType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}

export default compose<React.ComponentType>(
    connect (mapStateToProps, {logoutTC})
) (HeaderContainer);