import React, {Dispatch} from 'react';

import {sendMessageCreator, updateNewMessageBodyCreator} from '../../redux/dialogs-reducer';
import {ReduxStoreType, SendMessageActionType, UpdateNewMessageActionType} from '../../redux/redux-store';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';

let mapStateToProps = (state: ReduxStoreType) => {
    return {
        dialogsPage: state.dialogsReducer
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

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
