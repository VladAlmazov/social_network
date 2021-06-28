import {
    ActionsType,
    DialogsPageType,
    SendMessageActionType,
    UpdateNewMessageActionType
} from './redux-store';


const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'

let initialState = {
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

export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsType): DialogsPageType => {
    debugger
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state;
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = ''
            state.messagesData.messages.push({id: 6, message: body})
            return state;
        default:
            return state;
    }
}

export const sendMessageCreator = (): SendMessageActionType => ({type: SEND_MESSAGE})

export const updateNewMessageBodyCreator = (body: string): UpdateNewMessageActionType => (
    {type: UPDATE_NEW_MESSAGE_BODY, body: body}
)