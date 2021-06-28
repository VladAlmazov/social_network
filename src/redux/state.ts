let rerenderEntireTree = (state: RootStateType) => {
    console.log('State changed')
}

export type PostDataType = {
    posts: PostType[]
    newPostText: string
}
export type DialogsDataType = {
    users: Array<DialogType> // Одно и то же
}
export type MessageDataType = {
    messages: MessageType[] // Одно и то же
}

export type ProfileStateType = {
    postData: PostDataType
}
export type DialogsStateType = {
    messagesData: MessageDataType
    dialogsData: DialogsDataType
}

export type MyPostsPropsType = {
    posts: PostType[]
    newPostText: string
    updateNewPostText: (newText: string) => void
    addPost: () => void
}
export type ProfilePropsType = {
    profilePage: ProfileStateType
    updateNewPostText: (newText: string) => void
    addPost: () => void
}
export type DialogsPropsType = {
    dialogsPage: DialogsStateType
}
export type PostType = {
    message: string
    likesCount: string | number
    id?: number
}
export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    message: string
    id?: number
}
export type AppPropsType = {
    dialogsPage: RootStateType
    profilePage: RootStateType
    updateNewPostText: (newText: string) => void
    addPost: () => void
}
export type RootStateType = {
    profilePage: ProfileStateType
    dialogsPage: DialogsStateType
}

export const state: RootStateType = {
    profilePage: {
        postData: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 15},
                {id: 2, message: 'It is my first post', likesCount: 20}
            ],
            newPostText: 'it-kamasutra.com'
        }
    },
    dialogsPage: {
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
        }
    }
}

export const addPost = () => {
    const newPost: PostType = {
        id: 5,
        message: state.profilePage.postData.newPostText,
        likesCount: 0
    };

    state.profilePage.postData.posts.push(newPost);
    state.profilePage.postData.newPostText = '';
    rerenderEntireTree(state);
}
export const updateNewPostText = (newText: string) => {

    state.profilePage.postData.newPostText = newText;
    rerenderEntireTree(state);
}

export const subscribe = (observer: (state: RootStateType) => void) => {
    rerenderEntireTree = observer;      // наблюдатель, паттерн
}

