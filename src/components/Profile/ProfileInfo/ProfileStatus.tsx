import React, {ChangeEvent, useEffect, useState} from 'react';

export type ProfileStatusPropsType = {
    status: string
    updateStatus?: (status: string) => void
}

export const ProfileStatus = (props: ProfileStatusPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        if (props.updateStatus) {
            props.updateStatus(status)
        }
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{props.status || 'No status'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input autoFocus onBlur={deactivateEditMode} onChange={onStatusChange} value={status}/>
            </div>
            }
        </>
    )
}