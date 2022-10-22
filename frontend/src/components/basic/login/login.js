import React from "react";
import { Form, Input, Icon, Button } from 'antd';
import './login.css';
import { connect } from 'react-redux';
import { login, logout } from '../../../actions/loginAction';
import auth from '../../../services/AuthServices';
import Alert from '../../common/alert';
import { Redirect } from 'react-router-dom';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    ru:{
      Error:"Ошибка!",
      ErrorLabel:"Ошибка сервера",
      EmailMsg1:"Введен неверный адрес электронной почты!",
      EmailMsg2:"Пожалуйста, введите свой адрес электронной почты!",
      User:"Пользователь",
      Password:"Пароль",
      PassMsg:"Пожалуйста, введите свой пароль!",
    },
    kz: {
        Error:"Қате!",
        ErrorLabel:"Серведегі қателік",
        EmailMsg1:"Электронды адрес дұрыс енгізілмеді!",
        EmailMsg2:"Өтініш, өз электронды почтаңызды енгізіңіз!",
        User:"Қолданушы",
        Password:"Құпиясөз",
        PassMsg:"Өтініш, өз құпиясөзіңізді енгізіңіз!",
    }
   });

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoggedIn :false
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Полученные значения формы: ', values);
                auth.LoginAuth(values.email, values.password).then((response)=>{
                    console.log(response);
                    if(response.data.success){
                        this.props.login(response.data.user)
                        auth.storeToken(response.data.token);
                        this.setState({
                            isLoggedIn : true
                        })
                    }
                    else{
                        return Alert('error',strings.Error,response.data.message);
                    }
                }).catch((error)=>{
                    console.log(error);
                    return Alert('error',strings.Error,strings.ErrorLabel);
                })              
            }
        });
    };

    render(){
        strings.setLanguage(this.props.lang);
        const { getFieldDecorator } = this.props.form;
        if(this.state.isLoggedIn){
            return <Redirect to={this.props.user.userOptions[0].link + '/' + this.props.lang} />
        }
        else{
            return(
                <div className="login-container">
                    <div className="login-inner">
                        <Form  onSubmit={this.handleSubmit}>
                            <Form.Item label="Email" hasFeedback>
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: strings.EmailMsg1,
                                        },
                                        {
                                            required: true,
                                            message: strings.EmailMsg2,
                                        },
                                    ],
                                })(<Input 
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder={strings.User}/>)}
                            </Form.Item>
                            <Form.Item label={strings.Password} hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [
                                        { 
                                            required: true, message: strings.PassMsg
                                        }
                                    ],
                                })(
                                    <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder={strings.Password}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>  
                </div>
            )
        }
    }

}

const LoginForm = Form.create({ name: 'login' })(Login);


const mapStateToProps = state => ({
    user : state.user
});

export default connect(mapStateToProps,{
    login, 
    logout
})(LoginForm);