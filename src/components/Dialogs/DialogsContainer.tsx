import {
    SendMessageActionType,
    sendMessageCreator,
    UpdateNewMessageActionType,
    updateNewMessageBodyCreator
} from '../../redux/dialogs-reducer';
import {ReduxStoreType} from '../../redux/redux-store';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {compose, Dispatch} from 'redux';
import React from 'react';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';

let mapStateToProps = (state: ReduxStoreType) => {
    return {
        dialogsPage: state.dialogsReducer,
    }
}
let mapDispatchToProps = (dispatch: Dispatch<UpdateNewMessageActionType | SendMessageActionType>) => {
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageCreator());
        }
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs)
