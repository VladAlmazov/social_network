import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import {HashRouter, Route, withRouter} from 'react-router-dom';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import {compose} from 'redux';
import {connect, Provider} from 'react-redux';
import {initializeAppTC} from './redux/app-reducer';
import {ReduxStoreType, store} from './redux/redux-store';
import {Preloader} from './components/common/Preloader/Preloader';

type AppPropsType = {
    initializeAppTC: () => void
    initialized: boolean
}

class App extends React.Component<AppPropsType> {
    componentDidMount() {
        this.props.initializeAppTC()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Nav/>
                <div className="app-wrapper-content">
                    <Route path="/dialogs"
                           render={() => <DialogsContainer/>}/>
                    <Route path="/profile/:userId?"
                           render={() => <ProfileContainer/>}/>
                    <Route path="/users"
                           render={() => <UsersContainer/>}/>
                    <Route path="/login"
                           render={() => <Login/>}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: ReduxStoreType) => {
    return {
        initialized: state.app.initialized
    }
}

let AppContainer = compose<React.ComponentType>(
    withRouter, connect(mapStateToProps, {initializeAppTC})
)(App);

export let MainApp = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}