import React, { Component } from 'react'
import './newcustomer.css';
import { Form, Input, Button, Select, Icon, Upload } from 'antd';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import { connect } from 'react-redux';
import { 
    ChangeCustomerConfirmDirty,
    ChangeCustomerModalState,
    ChangeCustomerTableData
} from '../../../actions/adminAction';
import Alert from '../../../components/common/alert';
import auth from '../../../services/AuthServices';

import  LocalizedStrings  from  'react-localization';

let strings = new LocalizedStrings({
  ru:{
    PassDontMatch:"пароли не совпадают !",
    InputForm:"Полученные значения формы: ",
    Succes:"Успешно",
    Warning:"Предупреждение",
    Error:"Ошибка!",
    Errorserver:"Ошибка сервера",
    Name:"Имя",
    NameInput:"Пожалуйста, введите свое имя!",
    ErrorEmail:"Введен неверный адрес эл. почты!",
    EmailInput:"Пожалуйста, введите свой адрес эл. почты!",
    PasswordInput:"Пожалуйста, введите свой пароль!",
    PasswirdConfirm:"Подтвердите пароль",
    PasswordInput2:"Пожалуйста, введите свой пароль!",
    Avatar:"Аватар",
    AvaratInput:"Пожалуйста, загрузите ваш аватар!",
    AvaratInputIMG:"Загрузить",
    CompanyName:"Пожалуйста, введите название компании!",
    Company:"Выберите компанию",
    SelectCompany:"Отдел",
    NameDivision:"Пожалуйста, введите название подразделения!",
    NameChapter:"Выберите отдел",
    Pass:"Пароль",
    Comp:"Компания"
  },
  kz: {
    PassDontMatch :"Парольдер сәйкес емес!",
    InputForm :"Алынған пішін мәндері:",
    Succes :"Сәтті",
    Warning :"Ескерту",
    Error :"Қате!",
    Errorserver :"Сервер қатесі",
    Name :"Аты",
    NameInput :"Өз атыңызды енгізіңіз!",
    ErrorEmail :"Жарамсыз электрондық пошта мекенжайы енгізілді!",
    EmailInput :"Электрондық пошта мекенжайыңызды енгізіңіз!",
    PasswordInput :"Құпия сөзіңізді енгізіңіз!",
    PasswirdConfirm :"Құпия сөзді растау",
    PasswordInput2 :"Құпия сөзіңізді енгізіңіз!",
    Avatar :"Аватар",
    AvaratInput :"Аватарыңызды жүктеп салыңыз!",
    AvaratInputIMG :"Жүктеу",
    CompanyName :"Компанияның атын енгізіңіз!",
    Company :"Компанияны таңдаңыз",
    SelectConmpany :"Бөлім",
    NameDivision :"Бөлім атауын енгізіңіз!",
    NameChapter :"Бөлімді таңдау",
    Pass:"Пароль",
    Comp:"Компания"
  }
 });
const { Option } = Select;

class NewCustomer extends Component {
    constructor(props){
        super(props);
        this.state={
            customerDetails:{
                customerimage: this.props.admin.customerdetails.avatar,
            },
            selectedCompany: this.props.admin.customerdetails.company,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log("Fruit Selected!!", e);
        this.setState({ selectedCompany: e });
      }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback(strings.PassDontMatch);
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.props.admin.CustomerconfirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    // CustomerImageonChange = (f)=>{
    //     var newCusimg = this.state.customerDetails.customerimage
    //     if(!f){
    //         newCusimg=null
    //     }
    //     else{
    //         newCusimg=`${apis.BASE}/${f.link}`
    //     }
    //     this.setState({
    //         submitDisabled:false
    //     })
    //     if(newCusimg==='undefined' || newCusimg===undefined || newCusimg===null || newCusimg==='null') {
    //             newCusimg=this.state.customerDetails.customerimage;    
    //     }
    //     this.setState((ps,pp)=>{
    //         return({
    //             customerDetails:{
    //                 ...ps.customerDetails,
    //                 customerimage:newCusimg
    //             }
    //         })
    //     })
    // }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(strings.InputForm, values);
                
                    SecurePost({
                        url : `${apis.CREATE_CUSTOMER}`,
                        data : {
                            _id : this.props.admin.customerId,
                            name : values.name, 
                            password : values.password,                           
                            emailid : values.emailid,
                            avatar: this.state.customerDetails.customerimage,
                            company : values.company,
                            division : values.division,
                            
                        }
                    }).then((response)=>{
                        if(response.data.success){
                            this.props.ChangeCustomerModalState(false,null,'Регистрация');
                            Alert('success',strings.Succes,response.data.message);
                            this.props.ChangeCustomerTableData(this.props.admin.selectedCompany);
                        }
                        else{
                            console.log(response.data);
                            this.props.ChangeCustomerModalState(false,null,'Регистрация');
                            return Alert('warning',strings.Warning,response.data.message);
                        }
                    }).catch((error)=>{
                        console.log(error);
                        this.setState({
                            customerDetails: {
                                customerimage: null,
                            }
                        })
                        // this.props.ChangeCustomerModalState(false,null,'Регистрация');
                        return Alert('error',strings.Error , strings.Errorserver);
                    })
                
            }
        });
    };

    changeqImage = (f)=>{
        this.setState((ps,pp)=>{
            return({
                customerDetails:{
                    ...ps.customerDetails,
                    customerimage:(f.link ?`${apis.BASE}/${f.link}`:null)
                },
                submitDisabled:false
            })
        })
    }

    upl=()=>{
        this.setState({
            submitDisabled: false
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        // console.log('Company', this.props.admin.companyTableData);
        // console.log('Division', this.props.admin.divisionTableData);
        const com = this.props.admin.divisionTableData;
        console.log(com);
        var CustomerImageprops={
            name: 'file',
            action: `${apis.BASE}${apis.FILE_UPLOAD}?Token=${auth.retriveToken()}`,
            listType: 'picture',
        }
        var a;
        return (
            <div className="register-division-form">
                <div className="register-customer-form-body">
                    <Form  onSubmit={this.handleSubmit}>
                        <Form.Item label={strings.Name} hasFeedback className="input-admin-customer">
                            {getFieldDecorator('name', {
                                initialValue : this.props.admin.customerdetails.name,
                                rules: [{ required: true, message: strings.NameInput, whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                    
                        <Form.Item label="E-mail" hasFeedback className="input-admin-customer">
                            {getFieldDecorator('emailid', {
                                initialValue : this.props.admin.customerdetails.emailid,
                                rules: [
                                    {
                                        type: 'email',
                                        message: strings.ErrorEmail,
                                    },
                                    {
                                        required: true,
                                        message: strings.EmailInput,
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item> 

                        { !this.props.admin.customerId ? 
                            <div>
                                <Form.Item label={strings.Pass} hasFeedback className="input-admin-customer">
                                    {getFieldDecorator('password', {
                                        initialValue : this.props.admin.customerdetails.password,
                                        rules: [
                                            {
                                                required: true,
                                                message: strings.PasswordInput,
                                            },
                                            {
                                                validator: this.validateToNextPassword,
                                            },
                                        ],
                                    })(<Input.Password />)}
                                </Form.Item>
                        
                                <Form.Item label={strings.PasswirdConfirm} hasFeedback className="input-admin-customer">
                                    {getFieldDecorator('confirm', {
                                        initialValue : this.props.admin.customerdetails.confirmpassword,
                                        rules: [
                                        {
                                            required: true,
                                            message: strings.PasswordInput2,
                                        },
                                        {
                                            validator: this.compareToFirstPassword,
                                        },
                                        ],
                                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                                </Form.Item>
                            </div> 
                        : 
                        null}
                        
                        <Form.Item label={strings.Avatar}>
                            <Upload {...CustomerImageprops} beforeUpload={this.upl} onRemove={this.changeqImage} onSuccess={this.changeqImage}>
                                {getFieldDecorator('avatar', {
                                    initialValue : this.props.admin.customerdetails.avatar,
                                    rules: [{ required: false, message: strings.AvaratInput}],
                                })(<img src={this.props.admin.customerdetails.avatar} style={{width: "60px",height: "60px",}} alt=""/>)
                                }
                                
                                <Button style={{marginLeft: '100px'}}>
                                    <Icon type="upload" /> {strings.AvaratInputIMG}
                                </Button>
                                
                            </Upload>
                        </Form.Item>

                        <Form.Item label={strings.Comp} hasFeedback>
                            {getFieldDecorator('company', {
                                initialValue : this.props.admin.customerdetails.company,
                                rules: [{ required: false, message: strings.CompanyName, whitespace: true }],
                            })(
                            <Select 
                                showSearch
                                style = {{width:'100%'}}
                                placeholder={strings.Company}
                                optionFilterProp= "s"
                                
                                onChange={this.handleChange}
                            >
                                {
                                    this.props.admin.companyTableData.map((c,i)=><Option key={c._id} s={c.name} value={c._id}>
                                        {c.name}
                                        
                                    </Option>)
                                }
                            </Select>
                            )}
                        </Form.Item>

                        {console.log('AAAAAAAAAAAAAAA:',this.state)}
                        <Form.Item label={strings.SelectCompany}>
                            {getFieldDecorator('division', {
                                initialValue : this.props.admin.customerdetails.division,
                                rules: [{ required: false, message: strings.NameDivision, whitespace: true }],
                            })(
                            <Select 
                                showSearch
                                style = {{width:'100%'}}
                                placeholder={strings.NameChapter}
                                optionFilterProp= "s"
                            >
                                {
                                        this.props.admin.divisionTableData.filter(company => company.company._id==this.state.selectedCompany).map((d,i)=><Option key={d._id} s={d.name} value={d._id}>
                                            {
                                                d.name
                                            }
                                        </Option>)
                                }
                            </Select>
                            )}
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {this.props.admin.Customermode}
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

const NewCustomerForm = Form.create({ name: 'register' })(NewCustomer);
 
export default connect(mapStateToProps,{
    ChangeCustomerConfirmDirty,
    ChangeCustomerModalState,
    ChangeCustomerTableData
})(NewCustomerForm);

