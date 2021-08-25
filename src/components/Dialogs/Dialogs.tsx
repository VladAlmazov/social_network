import React, {ChangeEvent} from 'react';

import { DialogItem } from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import {Message} from './Message/Message';
import {DialogsPageType} from '../../redux/dialogs-reducer';
import { Redirect } from 'react-router-dom';

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
    sendMessage: () => void
    dialogsPage: DialogsPageType
    isAuth: boolean
}

export const Dialogs = (props: DialogsPropsType) => {
    let state = props.dialogsPage

    const dialogsElements = state.dialogsData.users.map((d: DialogType) => <DialogItem key={d.id} name={d.name} id={d.id}/>)

    const messagesElements = state.messagesData.messages.map((m: MessageType) => <Message key={m.id} message={m.message}/>)

    const newMessageBody = state.newMessageBody;

    let onSendMessageClick = () => {
        props.sendMessage();
    }

    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value;
        props.updateNewMessageBody(body);
    }

    if (!props.isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea
                        value={newMessageBody}
                        onChange={onNewMessageChange}
                        placeholder={'Enter your message'}>

                    </textarea></div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>
                </div>
            </div>
        </div>
    )
}
