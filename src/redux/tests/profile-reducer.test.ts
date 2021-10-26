import {addPostAC, deletePostAC, PostDataType, profileReducer} from '../profile-reducer';

let state: PostDataType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: 'It is my first post', likesCount: 20}
    ],
    profile: null,
    status: '',
}

it('length of posts should be incremented', () => {
    let action = addPostAC('it-kamasutra')

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
})
it('new post message should be correct', () => {
    let action = addPostAC('it-kamasutra')

    let newState = profileReducer(state, action)

    expect(newState.posts[2].message).toBe('it-kamasutra')
})
it('after deleting length of messages should be decrement', () => {
    let action = deletePostAC(1)

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(1)
})
it(`after deleting length of messages shouldn't be decrement if id incorrect`, () => {
    let action = deletePostAC(1000)

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(2)
})