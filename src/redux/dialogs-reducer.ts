import {DialogType, MessageType} from '../components/Dialogs/Dialogs';

export type DialogsAT = UpdateNewMessageActionType | SendMessageActionType

export type DialogsDataType = {
    users: Array<DialogType> // Одно и то же
}
export type MessageDataType = {
    messages: MessageType[] // Одно и то же
}
export type DialogsPageType = {
    dialogsData: DialogsDataType
    messagesData: MessageDataType
    newMessageBody: string
}

export type UpdateNewMessageActionType = {
    type: 'UPDATE_NEW_MESSAGE_BODY'
    body: string
}
export type SendMessageActionType = {
    type: 'SEND_MESSAGE'
}

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'

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
    newMessageBody: ''
}

export const dialogsReducer = (state: DialogsPageType = initialState, action: DialogsAT): DialogsPageType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {...state, newMessageBody: action.body};
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
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

export const sendMessageCreator = (): SendMessageActionType => ({type: SEND_MESSAGE})

export const updateNewMessageBodyCreator = (body: string): UpdateNewMessageActionType => (
    {type: UPDATE_NEW_MESSAGE_BODY, body: body}
)