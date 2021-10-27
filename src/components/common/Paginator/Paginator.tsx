import style from './Paginator.module.css';
import React from 'react';

type PaginatorPropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    totalUsersCount: number
}

export const Paginator = (props: PaginatorPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        if (i <= 50) {
            pages.push(i)
        }
    }

    return (
        <div>
            {pages.map(p => {
                return <span
                    className={props.currentPage === p && style.selectedPage || ''}
                    onClick={() => props.onPageChanged(p)
                    }>
                    {p + ','} 
                </span>
            })}
        </div>
    )
}