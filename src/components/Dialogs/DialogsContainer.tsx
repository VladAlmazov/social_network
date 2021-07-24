import {
    SendMessageActionType,
    sendMessageCreator,
    UpdateNewMessageActionType,
    updateNewMessageBodyCreator
} from '../../redux/dialogs-reducer';
import {ReduxStoreType} from '../../redux/redux-store';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';

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
