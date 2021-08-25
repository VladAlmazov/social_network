import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {ReduxStoreType} from '../../redux/redux-store';
import {getAuthUserData} from '../../redux/auth-reducer';

type HeaderContainerPropsType = {
    isAuth: boolean
    login: string
    getAuthUserData: () => void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
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

export default connect (mapStateToProps, {getAuthUserData}) (HeaderContainer);