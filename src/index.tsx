import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {state, subscribe} from './redux/state';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost, RootStateType, updateNewPostText} from './redux/state'
import {HashRouter} from 'react-router-dom';

export const rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <HashRouter>
            <App dialogsPage={state} profilePage={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
        </HashRouter>, document.getElementById('root')
    );
}

rerenderEntireTree(state);

subscribe(rerenderEntireTree);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
