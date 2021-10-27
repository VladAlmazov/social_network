import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input} from '../common/FormsControls/FormsControls';
import {required} from '../common/validators/validators';
import {connect} from 'react-redux';
import {loginTC} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import {ReduxStoreType} from '../../redux/redux-store';
import style from '../common/FormsControls/FormControl.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

type LoginPropsType = {
    loginTC: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}

const Login: React.FC<LoginPropsType> = ({loginTC, isAuth}) => {
    const onSubmit = (formData: FormDataType) => {
        loginTC(formData.email, formData.password, formData.rememberMe)
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}
export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required], Input)}
            {createField('Password', 'password', [required], Input, {type: 'password'})}
            {createField(null, 'rememberMe', [required], Input, {type: 'checkbox'}, 'remember me')}

            {error && <div className={style.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const mapStateToProps = (state: ReduxStoreType) => {
    return {
        isAuth: state.auth.isAuth,
    }
}
export default connect(mapStateToProps, {loginTC})(Login)