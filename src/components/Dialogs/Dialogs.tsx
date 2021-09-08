import React from 'react';
import {DialogItem} from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import {Message} from './Message/Message';
import {DialogsPageType} from '../../redux/dialogs-reducer';
import {Field, reduxForm} from 'redux-form';

export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    message: string
    id?: number
}

export type DialogsPropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: (newMessageBody: string) => void
    dialogsPage: DialogsPageType
}

export const Dialogs = (props: DialogsPropsType) => {
    let state = props.dialogsPage

    const dialogsElements = state.dialogsData.users.map(
        (d: DialogType) => <DialogItem key={d.id} name={d.name} id={d.id}/>)

    const messagesElements = state.messagesData.messages.map(
        (m: MessageType) => <Message key={m.id} message={m.message}/>)

    let addNewMessage = (values: any) => {
        debugger
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

const AddMessageForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea' name='newMessageBody' placeholder='Enter your message'/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'}) (AddMessageForm)
