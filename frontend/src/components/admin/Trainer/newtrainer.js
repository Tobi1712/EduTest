import React, { Component } from 'react'
import './newtrainer.css';
import {
    Form,
    Input,
    Button,
    Select
} from 'antd';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import { connect } from 'react-redux';
import { 
    ChangeTrainerConfirmDirty,
    ChangeTrainerModalState,
    ChangeTrainerTableData
} from '../../../actions/adminAction';
import Alert from '../../../components/common/alert';
import  LocalizedStrings  from  'react-localization' ;
let strings = new LocalizedStrings({
  ru:{
    FormInput:"Полученные значения формы: ",
    Reg:"Регистрация",
    Succes:"Успешно",
    Warning:"Предупреждение!",
    Error:"Ошибка!",
    ErrorServer:"Ошибка сервера",
    Name:"Имя",
    NameInput:"Пожалуйста, введите свое имя!",
    Email:"Эл. почта",
    ErrorEmail:"Введенный неверный адрес электронной почты!",
    EmailInput:"Пожалуйста, введите свой адрес электронной почты!",
    PhoneNumber:"Номер телефона",
    PhoneNumberInput:"Пожалуйста, введите свой номер телефона!",
    PhoneNumber10:"Контактный номер должен состоять из 10 цифр",
    Company:"Компания",
    CompanyName:"Пожалуйста, введите название компании!",
    CompanyChoose:"Выберите компанию",
    Password:"Пароль",
    PasswordInput:"Пожалуйста, введите свой пароль!",
    PasswordConfirm:"Подтвердите Пароль",
    PasswordConfirm2:"Пожалуйста, подтвердите свой пароль!"

    
  },
  kz: {
    FormInput:"Алынған пішін мәндері:",
    Reg :"Тіркеу",
    Succes :"Сәтті",
    Warning :"Ескерту!",
    Error :"Қате!",
    ErrorServer :"Сервер қатесі",
    Name :"Аты",
    NameInput :"Өз атыңызды енгізіңіз!",
    Email :"Электрондық пошта",
    ErrorEmail :"Жарамсыз электрондық пошта мекенжайы енгізілді!",
    EmailInput :"Электрондық пошта мекенжайыңызды енгізіңіз!",
    PhoneNumber :"Телефон нөмірі",
    PhoneNumberInput :"Телефон нөміріңізді енгізіңіз!",
    PhoneNumber10 :"Байланыс нөмірі 10 саннан тұруы керек",
    Company :"Компания",
    CompanyName :"Компанияның атын енгізіңіз!",
    CompanyChoose :"Компанияны таңдау",
    Password :"Құпия сөз",
    PasswordInput :"Құпия сөзіңізді енгізіңіз!",
    PasswordConfirm :"Құпия сөзді растау",
    PasswordConfirm2 :"Құпия сөзіңізді растаңыз!"
  }
 });
const { Option } = Select;
class NewTrainer extends Component {

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('passwords are not same !');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.props.admin.TrainerconfirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(strings.FormInput, values);
                
                    SecurePost({
                        url : `${apis.CREATE_TRAINER}`,
                        data : {
                            _id : this.props.admin.trainerId,
                            name :values.name,
                            password : values.password,
                            emailid : values.emailid,
                            company : values.company,
                            contact : values.prefix+values.contact
                        }
                    }).then((response)=>{
                        if(response.data.success){
                            this.props.ChangeTrainerModalState(false,null,strings.Reg);
                            Alert('success',strings.Succes,response.data.message);
                            this.props.ChangeTrainerTableData();
                        }
                        else{
                            console.log(response.data);
                            this.props.ChangeTrainerModalState(false,null,strings.Reg);
                            return Alert('warning',strings.Warning,response.data.message);
                        }
                    }).catch((error)=>{
                        this.props.ChangeTrainerModalState(false,null,strings.Reg);
                        return Alert('error',strings.Error,strings.ErrorServer);
                    })
                
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: this.props.admin.trainerdetails.prefix || '+7',
            rules: [{ required: true, message: 'Please enter contact no prefix' }],
          })(
            <Select style={{ width: 70 }}>
              <Option value="+7">+7</Option>
            </Select>,
          );
          console.log(this.props.admin.companyTableData)
        return (
            <div className="register-trainer-form">
                <div className="register-trainer-form-body">
                    <Form  onSubmit={this.handleSubmit}>
                        <Form.Item label={strings.Name} hasFeedback className="input-admin-trainer">
                            {getFieldDecorator('name', {
                                initialValue : this.props.admin.trainerdetails.name,
                                rules: [{ required: true, message: strings.NameInput, whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                    
                        <Form.Item label={strings.Email} hasFeedback className="input-admin-trainer">
                            {getFieldDecorator('emailid', {
                                initialValue : this.props.admin.trainerdetails.emailid,
                                rules: [
                                    {
                                        type: 'email',
                                        message: strings.ErrorEmail,
                                    },
                                    {
                                        required: false,
                                        message: strings.EmailInput,
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item> 

                        <Form.Item label={strings.PhoneNumber} className="input-admin-trainer">
                            {getFieldDecorator('contact', {
                                initialValue : this.props.admin.trainerdetails.contact,
                                rules: [
                                    { 
                                        required: true, 
                                        message: strings.PhoneNumberInput
                                    },
                                    {
                                        len:10,
                                        message:strings.PhoneNumber10
                                    }],
                            })(<Input addonBefore={prefixSelector} min={10} max={10} />)}
                        </Form.Item>

                        { !this.props.admin.trainerId ? <div><Form.Item label={strings.Password} hasFeedback className="input-admin-trainer">
                                {getFieldDecorator('password', {
                                    initialValue : this.props.admin.trainerdetails.password,
                                    rules: [
                                        {
                                            required: false,
                                            message: strings.PasswordInput,
                                        },
                                        {
                                            validator: this.validateToNextPassword,
                                        },
                                    ],
                                })(<Input.Password />)}
                            </Form.Item>
                        
                            <Form.Item label={strings.PasswordConfirm} hasFeedback className="input-admin-trainer">
                                {getFieldDecorator('confirm', {
                                    initialValue : this.props.admin.trainerdetails.confirmpassword,
                                    rules: [
                                    {
                                        required: false,
                                        message: strings.PasswordConfirm2,
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                    },
                                    ],
                                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                            </Form.Item></div> : null}

                        <Form.Item label={strings.Company} className="input-admin-trainer" hasFeedback>
                            {getFieldDecorator('company', {
                                initialValue : this.props.admin.trainerdetails.company,
                                rules: [{ required: false, message: strings.CompanyName, whitespace: true }],
                            })(
                            <Select 
                                showSearch
                                style = {{width:'100%'}}
                                placeholder={strings.CompanyChoose}
                                optionFilterProp= "s"
                            >
                                {
                                   
                                    this.props.admin.companyTableData.map((c,i)=><Option key={c._id} s={c.name} value={c._id}>{c.name}</Option>)
                                }
                            </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {this.props.admin.Trainermode}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    admin : state.admin
});



const NewTrainerForm = Form.create({ name: 'register' })(NewTrainer);

export default connect(mapStateToProps,{
    ChangeTrainerConfirmDirty,
    ChangeTrainerModalState,
    ChangeTrainerTableData
})(NewTrainerForm);

