import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {ReduxStoreType} from '../../redux/redux-store';
import {getAuthMe} from '../../redux/auth-reducer';

type HeaderContainerPropsType = {
    isAuth: boolean
    login: string
    getAuthMe: () => void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        this.props.getAuthMe()
    }

    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login}/>
    }
}

const mapStateToProps = (state: ReduxStoreType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}

export default connect (mapStateToProps, {getAuthMe}) (HeaderContainer);