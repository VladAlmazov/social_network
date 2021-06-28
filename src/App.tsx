import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Profile from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {Route} from 'react-router-dom';
import {AppPropsType} from './redux/state';


const App = (props: AppPropsType) => {
    return (
            <div className="app-wrapper">
                <Header/>
                <Nav/>
                <div className="app-wrapper-content">
                    <Route path="/dialogs"
                           render={() => <Dialogs dialogsPage={props.dialogsPage.dialogsPage}/>}/>
                    <Route path="/profile"
                           render={() => <Profile profilePage={props.profilePage.profilePage} addPost={props.addPost} updateNewPostText={props.updateNewPostText}/>}/>
                </div>
            </div>
    );
}


export default App;
