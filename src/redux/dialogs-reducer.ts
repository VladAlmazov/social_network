import {DialogType, MessageType} from '../components/Dialogs/Dialogs';

export type DialogsActions = sendMessageAT

export type DialogsDataType = {
    users: Array<DialogType> // Одно и то же
}
export type MessageDataType = {
    messages: MessageType[] // Одно и то же
}
export type DialogsPageType = {
    dialogsData: DialogsDataType
    messagesData: MessageDataType
}

export type sendMessageAT = ReturnType<typeof sendMessageCreator>

let initialState: DialogsPageType = {
    dialogsData: {
        users: [
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Vlad'},
            {id: 3, name: 'Andrei'},
            {id: 4, name: 'Denis'},
            {id: 5, name: 'Stas'}
        ]
    },
    messagesData: {
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'How is your IT-kamasutra'},
            {id: 3, message: 'Yo'},
            {id: 4, message: 'Yo'},
            {id: 5, message: 'Yo'}
        ]
    },
}

export const dialogsReducer = (state: DialogsPageType = initialState, action: DialogsActions): DialogsPageType => {
    switch (action.type) {
        case 'social-network/dialogs/SEND-MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messagesData: {
                    ...state.messagesData,
                    messages: [
                        ...state.messagesData.messages, {
                            id: state.messagesData.messages.length + 1, message: body
                        }
                    ]
                }
            };
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody: string) => (
    {type: 'social-network/dialogs/SEND-MESSAGE', newMessageBody} as const
)