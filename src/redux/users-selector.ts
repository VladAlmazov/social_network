import {ReduxStoreType} from './redux-store';
import {createSelector} from 'reselect';

export const getUsersSelector = (state: ReduxStoreType) => {
    return state.usersPage.users;
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true);
})

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