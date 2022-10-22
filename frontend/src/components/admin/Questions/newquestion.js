import React, { Component } from 'react'
import './newquestion.css';
import auth from '../../../services/AuthServices';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    Checkbox,
    Modal,
    Upload,
    Icon
} from 'antd';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import { connect } from 'react-redux';
import { 
    ChangeQuestionConfirmDirty,
    ChangeQuestionTableData,
    ChangeQuestionModalState
} from '../../../actions/trainerAction';
import Alert from '../../../components/common/alert';
//const { Option } = Select;
import  LocalizedStrings  from  'react-localization' ;
let strings = new LocalizedStrings({
  ru:{
    Confirm: "Подтверждать",
    EmptyParameter: "пустой параметр не может быть установлен в качестве ответа",
    DontAnswer: "Вы не можете создать вопрос без ответа!",
    Ok: "Ok",
    AddForm: "Полученные значения формы: ",
    Reg: "Регистрация",
    Succes: "Успешно",
    Warning: "Предупреждение",
    Errorr: "Ошибка",
    ErrorServer: "Ошибка сервера",
    OneRight: "Должен быть хотя бы один правильный ответ",
    Ques: "Вопрос",
    EnterQues: "Пожалуйста, введите вопрос!",
    IMGQues: "Изображение вопроса",
    AddSlide: "Пожалуйста, загрузите слайд!",
    DeleteIMG: "Удалить изображение",
    Delete: "Удалить",
    Option1: "Вариант 1",
    UserOption1: "Пожалуйста, введите вариант 1!",
    Option2: "Вариант 2",
    UserOption2: "Пожалуйста, введите вариант 2!",
    Option3: "Вариант 3",
    UserOption3: "Пожалуйста, введите вариант 3!",
    Option4: "Вариант 4",
    UserOption4: "Пожалуйста, введите вариант 4!",
    Option5: "Вариант 5",
    UserOption5: "Пожалуйста, введите вариант 5!",
    Add : "Загрузить"
  },
  kz: {
    Confirm: "Растау",
    EmptyParameter: "бос параметрді жауап ретінде орнату мүмкін емес",
    DontAnswer: "Сіз жауапсыз сұрақ құра алмайсыз!",
    Ok: "Ok",
    AddForm: "Алынған пішін мәндері:",
    Reg: "Тіркеу",
    Succes: "Сәтті",
    Warning: "Ескерту",
    Errorr: "Қате",
    ErrorServer: "Сервер қатесі",
    OneRight: "Кемінде бір дұрыс жауап болуы керек",
    Ques: "Сұрақ",
    EnterQues: "Сұрақ енгізіңіз!",
    IMGQues: "Сұрақ суреті",
    AddSlide: "Слайдты жүктеп салыңыз!",
    DeleteIMG: "суретті жою",
    Delete: "Жою",
    Option1: "1-жауап",
    UserOption1: "1 жауапты енгізіңіз!",
    Option2: "2-жауап",
    UserOption2: "2 жауапты енгізіңіз!",
    Option3: "3-жауап",
    UserOption3: "3 жауапты енгізіңіз!",
    Option4: "4-жауап",
    UserOption4: "4 жауапты енгізіңіз!",
    Option5: "5-жауап",
    UserOption5: "5 жауапты енгізіңіз!",
Add : "Жүктеу"
  }
 });

class NewQuestion extends Component {
    constructor(props){
        super(props);
        this.state={
            questionDetails:{
                questionimage: this.props.trainer.questioneditdetails.quesimg, 
                answer1: this.props.trainer.questioneditdetails.answer1,
                trueans1: this.props.trainer.questioneditdetails.trueans1,
                answer2: this.props.trainer.questioneditdetails.answer2,
                trueans2: this.props.trainer.questioneditdetails.trueans2,
                answer3: this.props.trainer.questioneditdetails.answer3,
                trueans3: this.props.trainer.questioneditdetails.trueans3,
                answer4: this.props.trainer.questioneditdetails.answer4,
                trueans4: this.props.trainer.questioneditdetails.trueans4,
                answer5: this.props.trainer.questioneditdetails.answer5,
                trueans5: this.props.trainer.questioneditdetails.trueans5,
            },
            adding:false,
            removeImage:false,
        }
    }

    componentDidMount(){
        this.setState({
            materialId:this.props.qnid
        });
    }

    Customalert = ()=>{
        Modal.confirm({
            title: strings.Confirm,
            content: strings.EmptyParameter,
            okText: strings.Ok,
            cancelText: null,
        });
    }
    Customalertoption = ()=>{
        Modal.confirm({
            title: strings.Confirm,
            content: strings.DontAnswer,
            okText: strings.Ok,
            cancelText: null,
        });
    }

    // QuestionImageonChange = (f)=>{
    //     var newQuestion = this.state.questionDetails.questionimage
    //     if(!f){
    //         newQuestion=null
    //     }
    //     else{
    //         newQuestion=`${apis.BASE}/${f.link}`
            
    //     }
    //     this.setState({
    //         submitDisabled:false
    //     })
    //     if(newQuestion==='undefined' || newQuestion===undefined || newQuestion===null || newQuestion==='null') {
    //         //(newOptions[i].body==='undefined' || newOptions[i].body===undefined || newOptions[i].body==='null' || newOptions[i].body==='' || newOptions[i].body===null)){
    //             newQuestion=this.state.questionDetails.questionimage;    
    //     }
    //     this.setState((ps,pp)=>{
    //         return({
    //             questionDetails:{
    //                 ...ps.questionDetails,
    //                 questionimage:newQuestion
    //             }
    //         })
    //     })
    // }

    OptionTextChange1 =(e)=>{
        var newAnswer1 = this.state.questionDetails.answer1
        var newTrueAns1 = this.state.questionDetails.trueans1
        newAnswer1 = e.target.value
        if((newAnswer1==='undefined' || newAnswer1===undefined || newAnswer1==='null' || newAnswer1==='' || newAnswer1===null)){
                newTrueAns1 = false
                this.setState((ps,pp)=>{
                    return({
                        questionDetails:{
                            ...ps.questionDetails,
                            answer1:newAnswer1,
                            trueans1:newTrueAns1
                        }
                    })
                })
        }
        this.setState((ps,pp)=>{
            return({
                questionDetails:{
                    ...ps.questionDetails,
                    answer1:newAnswer1,
                    trueans1:newTrueAns1
                }
            })
        })     
    }

    AnswerOptionSwitch1 = (e)=>{
        if((this.state.questionDetails.answer1!=='' && this.state.questionDetails.answer1!==null)){
            // var newOption1 = this.props.trainer.questioneditdetails.answer1
            var newTrueAns1 = this.state.questionDetails.trueans1
            newTrueAns1 = e.target.checked
            this.setState((ps,pp)=>{
                return({
                    questionDetails:{
                        ...ps.questionDetails,
                        trueans1:newTrueAns1
                    }
                })
            })
        }
        else{   
            this.Customalert()
            return;
        }
    }

    // AnswerOptionSwitchoption = (e)=>{
    //     var newAnswer1 = this.state.questionDetails.answer1
    //     var newTrueAns1 = this.state.questionDetails.trueans1
    //     var newAnswer2 = this.state.questionDetails.answer2
    //     var newTrueAns2 = this.state.questionDetails.trueans2
    //     var newAnswer3 = this.state.questionDetails.answer3
    //     var newTrueAns3 = this.state.questionDetails.trueans3
    //     var newAnswer4 = this.state.questionDetails.answer4
    //     var newTrueAns4 = this.state.questionDetails.trueans4
    //     var newAnswer5 = this.state.questionDetails.answer5
    //     var newTrueAns5 = this.state.questionDetails.trueans5
    //     newAnswer2 = e.target.value
        
    //     if(((newAnswer1==='undefined' || newAnswer1===undefined || newAnswer1==='null' || newAnswer1==='' || newAnswer1===null) &&
    //     (newAnswer2==='undefined' || newAnswer2===undefined || newAnswer2==='null' || newAnswer2==='' || newAnswer2===null) &&
    //     (newAnswer3==='undefined' || newAnswer3===undefined || newAnswer3==='null' || newAnswer3==='' || newAnswer3===null) &&
    //     (newAnswer4==='undefined' || newAnswer4===undefined || newAnswer4==='null' || newAnswer4==='' || newAnswer4===null) &&
    //     (newAnswer5==='undefined' || newAnswer5===undefined || newAnswer5==='null' || newAnswer5==='' || newAnswer5===null)
        
    //     )){
                
    //             this.setState((ps,pp)=>{
    //                 return({
    //                     questionDetails:{
    //                         ...ps.questionDetails,
    //                         answer2:newAnswer2,
    //                         trueans2:newTrueAns2
    //                     }
    //                 })
    //             })
    //     }
    //     this.setState((ps,pp)=>{
    //         return({
    //             questionDetails:{
    //                 ...ps.questionDetails,
    //                 answer2:newAnswer2,
    //                 trueans2:newTrueAns2
    //             }
    //         })
    //     })  
    // }

    OptionTextChange2 =(e)=>{
        var newAnswer2 = this.state.questionDetails.answer2
        var newTrueAns2 = this.state.questionDetails.trueans2
        newAnswer2 = e.target.value
        if((newAnswer2==='undefined' || newAnswer2===undefined || newAnswer2==='null' || newAnswer2==='' || newAnswer2===null)){
                newTrueAns2 = false
                this.setState((ps,pp)=>{
                    return({
                        questionDetails:{
                            ...ps.questionDetails,
                            answer2:newAnswer2,
                            trueans2:newTrueAns2
                        }
                    })
                })
        }
        this.setState((ps,pp)=>{
            return({
                questionDetails:{
                    ...ps.questionDetails,
                    answer2:newAnswer2,
                    trueans2:newTrueAns2
                }
            })
        })     
    }

    AnswerOptionSwitch2 = (e)=>{
        if((this.state.questionDetails.answer2!=='' && this.state.questionDetails.answer2!==null)){
            var newOption2 = this.state.questionDetails.trueans2
            newOption2 = e.target.checked
            this.setState((ps,pp)=>{
                return({
                    questionDetails:{
                        ...ps.questionDetails,
                        trueans2:newOption2
                    }
                })
            })
        }
        else{   
            this.Customalert()
            return;
        }
    }



    OptionTextChange3 =(e)=>{
        var newAnswer3 = this.state.questionDetails.answer3
        var newTrueAns3 = this.state.questionDetails.trueans3
        newAnswer3 = e.target.value
        if((newAnswer3==='undefined' || newAnswer3===undefined || newAnswer3==='null' || newAnswer3==='' || newAnswer3===null)){
                newTrueAns3 = false
                this.setState((ps,pp)=>{
                    return({
                        questionDetails:{
                            ...ps.questionDetails,
                            answer3:newAnswer3,
                            trueans3:newTrueAns3
                        }
                    })
                })
        }
        this.setState((ps,pp)=>{
            return({
                questionDetails:{
                    ...ps.questionDetails,
                    answer3:newAnswer3,
                    trueans3:newTrueAns3
                }
            })
        })     
    }

    AnswerOptionSwitch3 = (e)=>{
        if((this.state.questionDetails.answer3!=='' && this.state.questionDetails.answer3!==null)){
            var newOption3 = this.state.questionDetails.trueans3
            newOption3 = e.target.checked
            this.setState((ps,pp)=>{
                return({
                    questionDetails:{
                        ...ps.questionDetails,
                        trueans3:newOption3
                    }
                })
            })
        }
        else{   
            this.Customalert()
            return;
        }
    }

    OptionTextChange4 =(e)=>{
        var newAnswer4 = this.state.questionDetails.answer4
        var newTrueAns4 = this.state.questionDetails.trueans4
        newAnswer4 = e.target.value
        if((newAnswer4==='undefined' || newAnswer4===undefined || newAnswer4==='null' || newAnswer4==='' || newAnswer4===null)){
                newTrueAns4 = false
                this.setState((ps,pp)=>{
                    return({
                        questionDetails:{
                            ...ps.questionDetails,
                            answer4:newAnswer4,
                            trueans4:newTrueAns4
                        }
                    })
                })
        }
        this.setState((ps,pp)=>{
            return({
                questionDetails:{
                    ...ps.questionDetails,
                    answer4:newAnswer4,
                    trueans4:newTrueAns4
                }
            })
        })     
    }

    AnswerOptionSwitch4 = (e)=>{
        if((this.state.questionDetails.answer4!=='' && this.state.questionDetails.answer5!==null)){
            var newOption4 = this.state.questionDetails.trueans4
            newOption4 = e.target.checked
            this.setState((ps,pp)=>{
                return({
                    questionDetails:{
                        ...ps.questionDetails,
                        trueans4:newOption4
                    }
                })
            })
        }
        else{   
            this.Customalert()
            return;
        }
    }

    OptionTextChange5 =(e)=>{
        var newAnswer5 = this.state.questionDetails.answer5
        var newTrueAns5 = this.state.questionDetails.trueans5
        newAnswer5 = e.target.value
        if((newAnswer5==='undefined' || newAnswer5===undefined || newAnswer5==='null' || newAnswer5==='' || newAnswer5===null)){
                newTrueAns5 = false
                this.setState((ps,pp)=>{
                    return({
                        questionDetails:{
                            ...ps.questionDetails,
                            answer5:newAnswer5,
                            trueans5:newTrueAns5
                        }
                    })
                })
        }
        this.setState((ps,pp)=>{
            return({
                questionDetails:{
                    ...ps.questionDetails,
                    answer5:newAnswer5,
                    trueans5:newTrueAns5
                }
            })
        })     
    }

    AnswerOptionSwitch5 = (e)=>{
        if((this.state.questionDetails.answer5!=='' && this.state.questionDetails.answer5!==null)){
            var newTrueAns5 = this.state.questionDetails.trueans5
            newTrueAns5 = e.target.checked
            this.setState((ps,pp)=>{
                return({
                    questionDetails:{
                        ...ps.questionDetails,
                        trueans5:newTrueAns5
                    }
                })
            })
        }
        else{   
            this.Customalert()
            return;
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(strings.AddForm, values);
                // console.log('DDDDDDDDDDDDDDDDDDDDDDDDDD:',this.state.questionDetails);
                if(this.state.questionDetails.trueans1===false && this.state.questionDetails.trueans2===false && this.state.questionDetails.trueans3===false &&
                    this.state.questionDetails.trueans4===false && this.state.questionDetails.trueans5===false){
                    Alert('warning',strings.Warning,strings.OneRight);
                }
                else{
                    SecurePost({
                        url : `${apis.CREATE_QUESTIONS}`,
                        data : {
                            _id : this.props.trainer.questionId,
                            body : values.questionbody,                            
                            quesimg : !this.state.removeImage ? this.state.questionDetails.questionimage : null,
                            material : this.state.materialId,
                            answer1 : values.answer1,
                            trueans1 : this.state.questionDetails.trueans1,
                            answer2 : values.answer2,
                            trueans2 : this.state.questionDetails.trueans2,
                            answer3 : values.answer3,
                            trueans3 : this.state.questionDetails.trueans3,
                            answer4 : values.answer4,
                            trueans4 : this.state.questionDetails.trueans4,
                            answer5 : values.answer5,
                            trueans5 : this.state.questionDetails.trueans5,
                        }
                    }).then((response)=>{
                        if(response.data.success){
                            this.props.ChangeQuestionModalState(false,null,strings.Reg);
                            Alert('success',strings.Succes,response.data.message);
                            this.props.ChangeQuestionTableData(this.props.qnid);
                        }
                        else{
                            console.log(response.data);
                            this.props.ChangeQuestionModalState(false,null,strings.Reg);
                            return Alert('warning',strings.Warning,response.data.message);
                        }
                    }).catch((error)=>{
                        this.props.ChangeQuestionModalState(false,null,strings.Reg);
                        return Alert('error',strings.Errorr,strings.ErrorServer);
                    })
                }
            }
        });
    };

    changeqImage = (f)=>{
        this.setState((ps,pp)=>{
            return({
                questionDetails:{
                    ...ps.questionDetails,
                    questionimage:(f.link ?`${apis.BASE}/${f.link}`:null)
                },
                submitDisabled:false
            })
        })
    }

    upl=()=>{
        this.setState({
            submitDisabled: true
        })
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        var QuestionImageprops={
            name: 'file',
            action: `${apis.BASE}${apis.FILE_UPLOAD}?Token=${auth.retriveToken()}`,
            listType: 'picture',
        }
        console.log('fd',this.state.questionDetails)
        return (
            <div className="register-subject-form" >
                <div className="register-trainer-form-body">
                    <Form onSubmit={this.handleSubmit}>
                        <div>
                            <Row>
                                <Col offset={1} span={18}>
                                    <Form.Item label={strings.Ques} hasFeedback>
                                        {getFieldDecorator('questionbody', {
                                            initialValue : this.props.trainer.questioneditdetails.body,
                                            rules: [{ required: true, message: strings.EnterQues }],
                                        })(
                                            <TextArea rows={5} />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col offset={1} span={6} style={{padding : '0px 20px'}}>
                                    <Form.Item label={strings.IMGQues}>
                                        <img src={!this.state.removeImage ? this.props.trainer.questioneditdetails.quesimg : null} style={{width: "80px",height: "80px",}} alt=""/>
                                        <Upload {...QuestionImageprops} beforeUpload={this.upl} onRemove={this.changeqImage} onSuccess={this.changeqImage}>
                                            {getFieldDecorator('quesimg', {
                                                initialValue : this.props.trainer.questioneditdetails.quesimg,
                                                rules: [{ required: false, message: strings.AddSlide}],
                                                })
                                            }
                                            <Button style={{marginLeft: '100px'}}>
                                                <Icon type="upload" /> {strings.Add}
                                            </Button>
                                        </Upload>
                                        <Button style={{marginLeft: '315px', display:'block', marginTop: '-55px'}} onClick={()=>{
                                                this.setState({
                                                    removeImage:true
                                                })
                                            }}>
                                            <Icon type="delete" /> {strings.Delete}
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={1} /*span={16}*/span={18}>
                                    <Form.Item label={strings.Option1} hasFeedback>
                                        {getFieldDecorator('answer1', {
                                            initialValue : this.props.trainer.questioneditdetails.answer1,
                                            rules: [{ required: true, message: strings.UserOption1 }],
                                        })(
                                            <TextArea rows={2} onChange={ (e)=>this.OptionTextChange1(e)}/>
                                        )}
                                    </Form.Item>
                                </Col>
                                
                                <Col span={2} style={{paddingTop: '45px', paddingLeft: '20px'}}>
                                    <Form.Item>
                                        <Checkbox checked={this.state.questionDetails.trueans1} onChange={(e)=>this.AnswerOptionSwitch1(e)}></Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={1} /*span={16}*/span={18}>
                                    <Form.Item label={strings.Option2} hasFeedback>
                                        {getFieldDecorator('answer2', {
                                            initialValue : this.props.trainer.questioneditdetails.answer2,                                            
                                            rules: [{ required: true, message: strings.UserOption2}],
                                        })(
                                            <TextArea rows={2} onChange={ (e)=>this.OptionTextChange2(e)}/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={2} style={{paddingTop: '45px', paddingLeft: '20px'}}>
                                    <Form.Item>
                                        <Checkbox checked={this.state.questionDetails.trueans2} onChange={(e)=>this.AnswerOptionSwitch2(e)}></Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={1} /*span={16}*/span={18}>
                                    <Form.Item label={strings.Option3} hasFeedback>
                                        {getFieldDecorator('answer3', {
                                            initialValue : this.props.trainer.questioneditdetails.answer3,
                                            rules: [{ required: true, message: strings.UserOption3 }],
                                        })(
                                            <TextArea rows={2} onChange={ (e)=>this.OptionTextChange3(e)}/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={2} style={{paddingTop: '45px', paddingLeft: '20px'}}>
                                    <Form.Item>
                                    <Checkbox checked={this.state.questionDetails.trueans3} onChange={(e)=>this.AnswerOptionSwitch3(e)}></Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={1} /*span={16}*/span={18}>
                                    <Form.Item label={strings.Option4} hasFeedback>
                                        {getFieldDecorator('answer4', {
                                            initialValue : this.props.trainer.questioneditdetails.answer4,
                                            rules: [{ required: true, message: strings.UserOption4 }],
                                        })(
                                            <TextArea rows={2} onChange={ (e)=>this.OptionTextChange4(e)}/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={2} style={{paddingTop: '45px', paddingLeft: '20px'}}>
                                    <Form.Item>
                                    <Checkbox checked={this.state.questionDetails.trueans4} onChange={(e)=>this.AnswerOptionSwitch4(e)}></Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={1} /*span={16}*/span={18}>
                                    <Form.Item label={strings.Option5} hasFeedback>
                                        {getFieldDecorator('answer5', {
                                            initialValue : this.props.trainer.questioneditdetails.answer5,
                                            rules: [{ required: true, message: strings.UserOption5 }],
                                        })(
                                            <TextArea rows={2} onChange={ (e)=>this.OptionTextChange5(e)}/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={2} style={{paddingTop: '45px', paddingLeft: '20px'}}>
                                    <Form.Item>
                                    <Checkbox checked={this.state.questionDetails.trueans5} onChange={(e)=>this.AnswerOptionSwitch5(e)}></Checkbox>
                                    </Form.Item>
                                    
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={20}  span={4}>
                                    <Form.Item>
                                        {/* {console.log('dfffffffffffffffffffff',this.state.questionDetails)} */}
                                            <Button type="primary" htmlType="submit" block /*onClick={(e) => this.props.(e)}*/>
                                                {this.props.trainer.Questionmode}
                                            </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                                    
                                
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    admin : state.admin,
    trainer : state.trainer,
    chapter : state.chapter
});



const NewQuestionForm = Form.create({ name: 'newQuestion' })(NewQuestion);

export default connect(mapStateToProps,{
    ChangeQuestionConfirmDirty,
    ChangeQuestionModalState,
    ChangeQuestionTableData
})(NewQuestionForm);

