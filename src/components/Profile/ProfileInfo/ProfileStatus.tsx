import React, {ChangeEvent} from 'react';

export type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}
type LocalStateType = {
    editMode: boolean
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {
    state: LocalStateType = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
       this.setState({
               status: e.currentTarget.value
           })
    }
    componentDidUpdate(prevProps: ProfileStatusPropsType, prevState: LocalStateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    render() {
        return (
            <>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || 'No status'}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input autoFocus
                           onChange={this.onStatusChange}
                           value={this.state.status}
                           onBlur={this.deactivateEditMode}/>
                </div>
                }
            </>
        )
    }

}