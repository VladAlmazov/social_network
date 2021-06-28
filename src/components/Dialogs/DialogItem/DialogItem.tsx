import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './../Dialogs.module.css';

type DialogItemType = {
    name: string
    id: string | number
}

export const DialogItem = (props: DialogItemType) => {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}


