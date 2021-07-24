export const jashfihh = 1

// export let store: StoreType = {
//     _state: {
//         postData: {
//             posts: [
//                 {id: 1, message: 'Hi, how are you?', likesCount: 15},
//                 {id: 2, message: 'It is my first post', likesCount: 20}
//             ],
//             newPostText: 'it-kamasutra.com'
//         },
//         dialogsPage: {
//             dialogsData: {
//                 users: [
//                     {id: 1, name: 'Dimych'},
//                     {id: 2, name: 'Vlad'},
//                     {id: 3, name: 'Andrei'},
//                     {id: 4, name: 'Denis'},
//                     {id: 5, name: 'Stas'}
//                 ]
//             },
//             messagesData: {
//                 messages: [
//                     {id: 1, message: 'Hi'},
//                     {id: 2, message: 'How is your IT-kamasutra'},
//                     {id: 3, message: 'Yo'},
//                     {id: 4, message: 'Yo'},
//                     {id: 5, message: 'Yo'}
//                 ]
//             },
//             newMessageBody: ''
//         }
//     },
//     _callSubscriber(state) {
//         console.log('State changed')
//     },
//
//     getState() {
//         return this._state
//     },
//     subscribe(observer) {
//         this._callSubscriber = observer     // наблюдатель, паттерн
//     },
//
//     _addPost() {
//         const newPost: PostType = {
//             id: 5,
//             message: this._state.postData.newPostText,
//             likesCount: 0
//         };
//         this._state.postData.posts.push(newPost);
//         this._state.postData.newPostText = '';
//         this._callSubscriber(this._state);
//     },
//     _updateNewPostText(newText: string) {
//         this._state.postData.newPostText = newText;
//         this._callSubscriber(this._state);
//     },
//
//     dispatch(action) {
//         this._state.postData = profileReducer(this._state.postData, action);
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
//
//         this._callSubscriber(this._state)
//     }
// }






