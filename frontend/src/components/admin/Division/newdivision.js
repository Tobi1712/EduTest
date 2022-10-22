import React, { Component } from 'react'
import './newdivision.css';
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
    ChangeDivisionConfirmDirty,
    ChangeDivisionModalState,
    ChangeDivisionTableData
} from '../../../actions/adminAction';
import Alert from '../../../components/common/alert';
import  LocalizedStrings  from  'react-localization' ;
let strings = new LocalizedStrings({
  ru:{
    AddForm: "Полученные значения формы: ",
    Reg: "Регистрация",
    Succes: "Успешно",
    Warning: "Предупреждение",
    Error: "Ошибка",
    ErrorServer: "Ошибка сервера",
    Name: "Название",
    AddName: "Пожалуйста, введите название подразделения!",
    Description: "Описание",
    Company: "Компания",
    AddCompany: "Пожалуйста, введите название компании!",
    SelectCompany: "Выберите компанию"
  },
  kz: {
    AddForm: "Алынған пішін мәндері:",
    Reg: "Тіркеу",
    Succes: "Сәтті",
    Warning: "Ескерту",
    Error: "Қате",
    ErrorServer: "Сервер қатесі",
    Name: "Аты",
    AddName: "Бөлім атауын енгізіңіз!",
    Description: "Сипаттамасы",
    Company: "Компания",
    AddCompany: "Компанияның атын енгізіңіз!",
    SelectCompany: "Компанияны таңдау"
  }
 });


const { Option } = Select;
class NewDivision extends Component {


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(strings.AddForm, values);
                
                    SecurePost({
                        url : `${apis.CREATE_DIVISION}`,
                        data : {
                            _id : this.props.admin.divisionId,
                            name : values.name,                            
                            description : values.description,
                            company : values.company
                        }
                    }).then((response)=>{
                        if(response.data.success){
                            this.props.ChangeDivisionModalState(false,null,strings.Reg);
                            Alert('success',strings.Succes,response.data.message);
                            this.props.ChangeDivisionTableData();
                        }
                        else{
                            console.log(response.data);
                            this.props.ChangeDivisionModalState(false,null,strings.Reg);
                            return Alert('warning',strings.Warning,response.data.message);
                        }
                    }).catch((error)=>{
                        this.props.ChangeDivisionModalState(false,null,strings.Reg);
                        return Alert('error',strings.Error,strings.ErrorServer);
                    })
                
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="register-division-form">
                <div className="register-division-form-body">
                    <Form  onSubmit={this.handleSubmit}>
                        <Form.Item label={strings.Name} hasFeedback className="input-admin-division">
                            {getFieldDecorator('name', {
                                initialValue : this.props.admin.divisiondetails.name,
                                rules: [{ required: true, message: strings.AddName, whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                    
                        <Form.Item label={strings.Description} hasFeedback className="input-admin-division">
                            {getFieldDecorator('description', {
                                initialValue : this.props.admin.divisiondetails.description,
                                rules: [
                                    {
                                        required: false,
                                        message: strings.Description,
                                        whitespace: true
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item> 

                        <Form.Item label={strings.Company} hasFeedback className="input-admin-division">
                            {getFieldDecorator('company', {
                                initialValue : this.props.admin.divisiondetails.company,
                                rules: [{ required: false, message: strings.AddCompany}],
                            })(
                            <Select 
                                showSearch
                                style = {{width:'100%'}}
                                placeholder={strings.SelectCompany}
                                optionFilterProp= "s"
                            >
                                {
                                    this.props.admin.companyTableData.map((d,i)=><Option key={d._id} s={d.name} value={d._id}>{d.name}</Option>)
                                }

                            </Select>
                            )}
                        </Form.Item>
                        
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {this.props.admin.Divisionmode}
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

const NewDivisionForm = Form.create({ name: 'register' })(NewDivision);

export default connect(mapStateToProps,{
    ChangeDivisionConfirmDirty,
    ChangeDivisionModalState,
    ChangeDivisionTableData
})(NewDivisionForm);

