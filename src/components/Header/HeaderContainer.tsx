import React from 'react';
import Header from './Header';
import axios from 'axios';
import {connect} from 'react-redux';
import {SetAuthUserData, SetUserDataType} from '../../redux/auth-reducer';
import {ReduxStoreType} from '../../redux/redux-store';

type HeaderContainerPropsType = {
    SetAuthUserData: (data: SetUserDataType) => void
    isAuth: boolean
    login: string
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
            withCredentials: true
        }).then(response => {
            if (response.data.resultCode === 0) {
                this.props.SetAuthUserData(response.data.data.login)
            }
        });
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

export default connect (mapStateToProps, {SetAuthUserData} ) (HeaderContainer);