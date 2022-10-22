import React, { Component } from 'react'
import './newmaterials.css';
import {
    Form,
    Input,
    Button,
    InputNumber
} from 'antd';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import { connect } from 'react-redux';
import { 
    ChangeMaterialConfirmDirty,
    ChangeMaterialModalState,
    ChangeMaterialTableData,
    ChangeChapterModalState,
    ChangeChapterTableData
} from '../../../actions/chapterAction';
import Alert from '../../../components/common/alert';
// import auth from '../../../services/AuthServices';
// const { Option } = Select;


import  LocalizedStrings  from  'react-localization' ;
let strings = new LocalizedStrings({
  ru:{
    AddForm: "Полученные значения формы: ",
    Save: "Создать",
    Succes: "Успешно",
    Warning: "Предупреждение",
    Error: "Ошибка",
    ErrorServer: "Ошибка сервера",
    AddName: "Пожалуйста, введите название!",
    TestDuration: "Продолжительность теста, минут",
    TestDurationInput: "Пожалуйста, укажите продолжительность теста'",
    TestDurationMin: "Продолжительность теста",
    NumberAttempts: "Количество попыток",
    NumberAttemptsInput: "Пожалуйста, укажите количество попыток",
    ExpectationsDay: "Период ожидания, дней",
    ExpectationsInput: "Пожалуйста, укажите период ожидания",
    Expectations: "Период ожидания",
    QuesUser: "Количество вопросов для отображения пользователю",
    Ques: "Количество вопросов",
    name:"Название"
  },
  kz: {
    AddForm: "Алынған пішін мәндері: ",
    Save: "Жасау",
    Succes: "Сәтті",
    Warning: "Ескерту",
    Error: "Қате",
    ErrorServer: "Сервер қатесі",
    AddName: "Атын енгізіңіз!",
    TestDuration: "Тест ұзақтығы, минуттар",
    TestDurationInput: "Сынақ ұзақтығын енгізіңіз",
    TestDurationMin: "Тест ұзақтығы",
    NumberAttempts: "Әрекеттер саны",
    NumberAttemptsInput: "Әрекеттер санын енгізіңіз",
    ExpectationsDay: "Күтілетін кезең, күндер",
    ExpectationsInput: "Күту кезеңін енгізіңіз",
    Expectations: "Күту кезеңі",
    QuesUser: "Пайдаланушыға көрсетілетін сұрақтар саны",
    Ques: "Сұрақтар саны",
    name:"Аты"
  }
 });


class NewMaterial extends Component {
    constructor(props){
        super(props);
        this.state={
            chapterId : null,
        }
        
    }
    componentDidMount(){
        this.setState({
            chapterId:this.props.cid
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                console.log(strings.AddForm, this.props);
                
                    SecurePost({
                        url : `${apis.CREATE_MATERIAL}`,
                        data : {
                            _id : this.props.chapter.materialId || undefined ,
                            num :values.num,
                            topic :values.topic,
                            chapter: this.state.chapterId || undefined,
                            duration : values.duration,
                            attempts : values.attempts,
                            period : values.period,
                            numQuestions : values.numQuestions
                        }
                    }).then((response)=>{
                        if(response.data.success){
                            this.props.ChangeMaterialModalState(false,null,strings.Save);
                            Alert('success',strings.Succes,response.data.message);
                            this.props.ChangeMaterialTableData(this.props.cid);
                            
                        }

                        
                        else{
                            this.props.ChangeMaterialModalState(false,null,strings.Save);
                            return Alert('warning',strings.Warning,response.data.message);
                        }
                    })
                    
                    .catch((error)=>{
                        this.props.ChangeMaterialModalState(false,null,strings.Save);
                        return Alert('error',strings.Error,strings.ErrorServer);
                    })
                
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        //  var MaterialImageprops={
        //     name: 'file',
        //     action: `${apis.BASE}${apis.FILE_UPLOAD}?Token=${auth.retriveToken()}`,
        //     listType: 'picture',
        //  }
        
        return (
            <div className="register-company-form">
                <div className="register-company-form-body">
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="№" className="input-admin-company">
                            {getFieldDecorator('num', {
                                initialValue : this.props.chapter.materialdetails.num,
                                rules: [{ required: false, message: strings.AddName, whitespace: true }],
                            })(<Input type='number'/>)}
                        </Form.Item>
                        <Form.Item label={strings.name} className="input-admin-company" hasFeedback>
                            {getFieldDecorator('topic', {
                                initialValue : this.props.chapter.materialdetails.topic,
                                rules: [{ required: true, message: strings.AddName, whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label={strings.TestDuration} hasFeedback className="input-admin-company">
                            {getFieldDecorator('duration', {
                                initialValue : this.props.chapter.materialdetails.duration,
                                rules: [{ required: true, message: strings.TestDurationInput }],
                            })(
                                <InputNumber style={{width:'100%'}}  placeholder={strings.TestDurationMin} min={0} max={180}/>
                            )}
                        </Form.Item> 

                        <Form.Item label={strings.NumberAttempts} hasFeedback className="input-admin-company">
                            {getFieldDecorator('attempts', {
                                initialValue : this.props.chapter.materialdetails.attempts,
                                rules: [{ required: true, message: strings.NumberAttemptsInput}],
                            })(
                                <InputNumber style={{width:'100%'}}  placeholder={strings.NumberAttempts}/>
                            )}
                        </Form.Item> 

                        <Form.Item label={strings.ExpectationsDay} hasFeedback className="input-admin-company">
                            {getFieldDecorator('period', {
                                initialValue : this.props.chapter.materialdetails.period,
                                rules: [{ required: true, message: strings.ExpectationsInput }],
                            })(
                                <InputNumber style={{width:'100%'}}  placeholder={strings.Expectations}/>
                            )}
                        </Form.Item> 
                        <Form.Item label={strings.QuesUser} hasFeedback className="input-admin-company">
                            {getFieldDecorator('numQuestions', {
                                initialValue : this.props.chapter.materialdetails.numQuestions,
                                rules: [{ required: true, message: strings.QuesUser }],
                            })(
                                <InputNumber style={{width:'100%'}}  placeholder={strings.Ques}/>
                            )}
                        </Form.Item> 
                        
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {this.props.chapter.Materialmode}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    chapter : state.chapter
});



const NewMaterialForm = Form.create({ name: 'register' })(NewMaterial);

export default connect(mapStateToProps,{
    ChangeMaterialConfirmDirty,
    ChangeMaterialModalState,
    ChangeMaterialTableData,
    ChangeChapterModalState,
    ChangeChapterTableData
})(NewMaterialForm);

