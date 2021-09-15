import {ReduxStoreType} from './redux-store';

export const getUsers = (state: ReduxStoreType) => {
    return state.usersPage.users;
}

export const getPageSize = (state: ReduxStoreType) => {
    return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state: ReduxStoreType) => {
    return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state: ReduxStoreType) => {
    return state.usersPage.currentPage;
}
export const getIsFetching = (state: ReduxStoreType) => {
    return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state: ReduxStoreType) => {
    return state.usersPage.followingInProgress;
}