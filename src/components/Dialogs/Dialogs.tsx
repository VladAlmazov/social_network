import React from 'react';
import {DialogsPropsType, DialogType, MessageType} from '../../redux/state';

import { DialogItem } from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import {Message} from './Message/Message';

export const Dialogs = (props: DialogsPropsType) => {

    const dialogsElements = props.dialogsPage.dialogsData.users.map((d: DialogType) => <DialogItem name={d.name} id={d.id}/>)

    const messagesElements = props.dialogsPage.messagesData.messages.map((m: MessageType) => <Message message={m.message}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}
