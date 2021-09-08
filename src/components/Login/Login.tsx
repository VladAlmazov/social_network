import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from '../common/FormsControls/FormsControls';
import {required} from '../common/validators/validators';
import {connect} from 'react-redux';
import {loginTC} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import {ReduxStoreType} from '../../redux/redux-store';

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

type LoginPropsType = {
    loginTC: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.loginTC(formData.email, formData.password, formData.rememberMe)
    }
    
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}
export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'email'}
                       placeholder={'Email'}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field name={'password'}
                       placeholder={'Password'}
                       type={'password'}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field name={'rememberMe'} component={Input} type={'checkbox'}/> remember me
            </div>
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