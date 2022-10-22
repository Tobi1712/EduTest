import React, { Component } from 'react'
import './newcompany.css';
import {
    Form,
    Input,
    Button,
    //Select,
    Icon,
    Upload
} from 'antd';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import { connect } from 'react-redux';
import { 
    ChangeCompanyConfirmDirty,
    ChangeCompanyModalState,
    ChangeCompanyTableData
} from '../../../actions/adminAction';
import Alert from '../../../components/common/alert';
import auth from '../../../services/AuthServices';
// const { Option } = Select;
import  LocalizedStrings  from  'react-localization' ;
let strings = new LocalizedStrings({
    ru:{
      InputForm:"Полученные значения формы: ",
      Reg:"Регистрация",
      Succes:"Успешно",
      Warning:"Предупреждение!",
      Error:"Ошибка!",
      ErrorServer:"Ошибка сервера",
      Name:"Название",
      InputNameCompany:"Пожалуйста, введите название вашей компании!",
      Logo:"Логотип",
      Inputlogo:"Пожалуйста, загрузите логотип вашей компании!",
      Download:"Загрузить",
      Delete:"Удалить",
      Description:"Описание",
      Description2:"Описание!",
      Date1:"Дата начала действия лицензии",
      InputDate:"Пожалуйста, выберите дату!",
      Date2:"Срок действия лицензии",
      License:"Количество лицензированных пользователей",
      Amount:"Пожалуйста, введите количество!",
      UsedUsers:"Количество использованных учетных записей в рамках лицензии",
      Contact:"Контактное лицо",
      ContactInput:"Пожалуйста, введите контактное лицо!",
      
    },
    kz: {
      InputForm :"Алынған пішін мәндері:",
      Reg :"Тіркеу",
      Succes :"Сәтті",
      Warning :"Ескерту",
      Error :"Қате",
      ErrorServer :"Сервер қатесі",
      Name :"Аты",
      InputNameCompany :"Компанияның атын енгізіңіз!",
      Logo :"Логотип",
      Inputlogo :"Компания логотипін жүктеп салыңыз!",
      Download :"Жүктеп алу",
      Delete :"Жою",
      Description :"Сипаттамасы",
      Description2 :"Сипаттамасы!",
      Date1 :"Лицензияның басталу күні",
      InputDate :"Күнді таңдаңыз!",
      Date2 :"Лицензияның жарамдылық мерзімі",
      License :"Лицензияланған пайдаланушылар саны",
      Amount :"Санын енгізіңіз!",
      UsedUsers :"Лицензиядағы пайдаланылған тіркелгілердің саны",
      Contact :"Байланыстағы тұлға",
      ContactInput :"Байланыстағы адамды енгізіңіз!",
  
  
    }
   });
class NewCompany extends Component {

    constructor(props){
        super(props);
        this.state={
            companyDetails : {
                companyimage: this.props.admin.companydetails.logo,
            },
            submitDisabled:false,
        }
    }

    // CompanyImageonChange = (f)=>{
    //     var newCompimg = this.state.companyDetails.companyimage
    //     if(!f){
    //         newCompimg=null
    //     }
    //     else{
    //         newCompimg=`${apis.BASE}/${f.link}`
    //     }
    //     this.setState({
    //         submitDisabled:false
    //     })
    //     if(newCompimg==='undefined' || newCompimg===undefined || newCompimg===null || newCompimg==='null') {
    //         //(newOptions[i].body==='undefined' || newOptions[i].body===undefined || newOptions[i].body==='null' || newOptions[i].body==='' || newOptions[i].body===null)){
    //             newCompimg=this.state.companyDetails.companyimage;    
    //     }
    //     this.setState((ps,pp)=>{
    //         return({
    //             companyDetails:{
    //                 ...ps.companyDetails,
    //                 companyimage:newCompimg
    //             }
    //         })
    //     })
    // }


    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(strings.InputForm, values);
                console.log("Company ID:", this.props.admin.companyId)
                    SecurePost({
                        url : `${apis.CREATE_COMPANY}`,
                        data : {
                            _id : this.props.admin.companyId,
                            name :values.name,
                            logo : !this.state.deleteImage ? this.state.companyDetails.companyimage : null,
                            descr : values.descr,
                            licFromDate: values.licFromDate,
                            licToDate :values.licToDate,
                            numOfLic : values.numOfLic,
                            numOfLicAcc : values.numOfLicAcc,
                            contact : values.contact,
                        }
                    }).then((response)=>{
                        if(response.data.success){
                            this.props.ChangeCompanyModalState(false,null,strings.Reg);
                            Alert('success',strings.Succes,response.data.message);
                            this.props.ChangeCompanyTableData();
                        }
                        else{
                            console.log(response.data);
                            this.props.ChangeCompanyModalState(false,null,strings.Reg);
                            return Alert('warning',strings.Warning,response.data.message);
                        }
                    }).catch((error)=>{
                        this.props.ChangeCompanyModalState(false,null,strings.Reg);
                        return Alert('error',strings.Error,strings.ErrorServer);
                    })
                
            }
        });
    };

    changeqImage = (f)=>{
        this.setState((ps,pp)=>{
            console.log('BHNGJKK',f.link)
            return({
                companyDetails:{
                    ...ps.companyDetails,
                    companyimage:(f.link ?`${apis.BASE}/${f.link}`:null)
                },
            })
        })
    }
    changeqImage1 = (f)=>{
        this.setState((ps,pp)=>{
            console.log('BHNGJKK',f.link)
            return({
                companyDetails:{
                    ...ps.companyDetails,
                    companyimage:(f.link ?`${apis.BASE}/${f.link}`:null)
                },
            })
        })
    }


    render() {
        strings.setLanguage(this.props.lang)
        const { getFieldDecorator } = this.props.form;
        var CompanyImageprops={
            name: 'file',
            action: `${apis.BASE}${apis.FILE_UPLOAD}?Token=${auth.retriveToken()}`,
            listType: 'picture',
        }
        console.log('VVVVVGHJ',CompanyImageprops)
        return (    
            <div className="register-company-form">
                <div className="register-company-form-body">
                    <Form  onSubmit={this.handleSubmit}>
                        <Form.Item label={strings.Name} hasFeedback className="input-admin-company">
                            {getFieldDecorator('name', {
                                initialValue : this.props.admin.companydetails.name,
                                rules: [{ required: false, message: strings.InputNameCompany, whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                        
                        <Form.Item label={strings.Logo} className="input-admin-company">
                            <img src={this.props.admin.companydetails.logo} style={{height: "60px",width:'60px'}} alt=""/> 
                            <Upload {...CompanyImageprops} beforeUpload={this.upl} onSuccess={this.changeqImage}>
                                {getFieldDecorator('logo', {
                                    initialValue : this.props.admin.companydetails.logo,
                                    rules: [{ required: false, message: strings.Inputlogo, whitespace: true }],
                                })
                                } 
                                <Button style={{marginLeft: '100px'}}>
                                    <Icon type="upload" /> {strings.Download}
                                </Button>
                            </Upload>

                        </Form.Item>

                    
                        <Form.Item label={strings.Description} hasFeedback className="input-admin-company">
                            {getFieldDecorator('descr', {
                                initialValue : this.props.admin.companydetails.descr,
                                rules: [{ required: false, message: strings.Description2, whitespace: true }],
                            })(<Input />)}
                        </Form.Item> 

                        <Form.Item label={strings.Date1} hasFeedback className="input-admin-company">
                            {getFieldDecorator('licFromDate', {
                                initialValue : this.props.admin.companydetails.licFromDate,
                                rules: [{ required: false, message: strings.InputDate, whitespace: true }],
                            })(<Input type='Date'/>)}
                        </Form.Item> 
                        <Form.Item label={strings.Date2} hasFeedback className="input-admin-company">
                            {getFieldDecorator('licToDate', {
                                initialValue : this.props.admin.companydetails.licToDate,
                                rules: [{ required: false, message: strings.InputDate, whitespace: true }],
                            })(<Input type='Date'/>)}
                        </Form.Item> 
                        <Form.Item label={strings.License} className="input-admin-company">
                            {getFieldDecorator('numOfLic', {
                                initialValue : this.props.admin.companydetails.numOfLic,
                                 rules: [{ required: false, message: strings.Amount}],
                            })(<Input type='number'/>)}
                        </Form.Item> 
                        <Form.Item label={strings.UsedUsers} className="input-admin-company">
                            {getFieldDecorator('numOfLicAcc', {
                                initialValue : this.props.admin.companydetails.numOfLicAcc,
                                 rules: [{ required: false, message: strings.Amount}],
                            })(<Input type='number' />)}
                        </Form.Item> 
                        <Form.Item label={strings.Contact} hasFeedback className="input-admin-company">
                            {getFieldDecorator('contact', {
                                initialValue : this.props.admin.companydetails.contact,
                                rules: [{ required: false, message: strings.ContactInput, whitespace: true }],
                            })(<Input />)}
                        </Form.Item> 
                        
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {this.props.admin.Companymode}
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



const NewCompanyForm = Form.create({ name: 'register' })(NewCompany);

export default connect(mapStateToProps,{
    ChangeCompanyConfirmDirty,
    ChangeCompanyModalState,
    ChangeCompanyTableData
})(NewCompanyForm);

