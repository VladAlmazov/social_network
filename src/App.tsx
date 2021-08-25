import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import {Route} from 'react-router-dom';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import {Login} from './components/Login/Login';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';


export const App = () => {
    return (
        <div className="app-wrapper">
            <HeaderContainer/>
            <Nav/>
            <div className="app-wrapper-content">
                <Route path="/dialogs"
                       render={() => <DialogsContainer />}/>
                <Route path="/profile/:userId?"
                       render={() => <ProfileContainer />}/>
                <Route path="/users"
                       render={() => <UsersContainer />}/>
                <Route path="/login"
                       render={() => <Login />}/>
            </div>
        </div>
    );
}
