import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {getAuthMe} from '../../redux/auth-reducer';
import {ReduxStoreType} from '../../redux/redux-store';

type HeaderContainerPropsType = {
    isAuth: boolean
    login: string
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        getAuthMe()
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

export default connect (mapStateToProps) (HeaderContainer);