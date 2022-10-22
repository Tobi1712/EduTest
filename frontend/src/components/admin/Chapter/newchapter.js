import React, { Component } from 'react'
import './newchapter.css';
import {
    Form,
    Input,
    Button,
    //Select,
    Upload,
    Icon
} from 'antd';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import { connect } from 'react-redux';
import { 
    ChangeChapterConfirmDirty,
    ChangeChapterModalState,
    ChangeChapterTableData
} from '../../../actions/chapterAction';
import Alert from '../../../components/common/alert';
import auth from '../../../services/AuthServices';
//const { Option } = Select;
import  LocalizedStrings  from  'react-localization' ;
let strings = new LocalizedStrings({
  ru:{
    InputForm:"Полученные значения формы: ",
    Reg:"Регистрация",
    Succes:"Успешно",
    Warning:"Предупреждение",
    Error:"Ошибка",
    ErrorServer:"Ошибка сервера",
    Name:"Наименование",
    SameInput:"Пожалуйста, введите наименование!",
    Description:"Описание",
    Description2:"Описание!",
    Grey:"Серый",
    Achievements:"Достижения",
    AvatarInput:"Пожалуйста, загрузите ваш аватар!",
    ADDDOS:"Пожалуйста, загрузите достижения!",
    Download:"Загрузить",
    Bronze:"Бронза",
    Silver:"Серебро",
    Gold:"Золото",
  },
  kz: {
    InputForm :"Алынған пішін мәндері:",
    Reg :"Тіркеу",
    Succes :"Сәтті",
    Warning :"Ескерту",
    Error :"Қате",
    ErrorServer :"Сервер қатесі",
    Name :"Аты",
    SameInput :"Атын енгізіңіз!",
    Description :"Сипаттама",
    Description2 :"Сипаттама!",
    Grey :"Сұр",
    Achievements :"Жетістіктер",
    AvatarInput :"Аватарыңызды жүктеп салыңыз!",
    ADDDOS:"Жетістіктерді жүктеп салыңыз!",
    Download :"Жүктеп алу",
    Bronze :"Қола",
    Silver :"Күміс",
    Gold :"Алтын",

  }
 });
class NewChapter extends Component {

    constructor(props){
        super(props);
        this.state={
            chapterDetails:{
                chapterimage1: this.props.chapter.chapterdetails.icon1,
                chapterimage2: this.props.chapter.chapterdetails.icon2,
                chapterimage3: this.props.chapter.chapterdetails.icon3,
                chapterimage4: this.props.chapter.chapterdetails.icon4,
            },
            submitDisabled:false,
        }
    }

    ChapterImageonChange1 = (f)=>{
        var newchapimg1 = this.state.chapterDetails.chapterimage1
        if(!f){
            newchapimg1=null
        }
        else{
            newchapimg1=`${apis.BASE}/${f.link}`
        }
        this.setState({
            submitDisabled:false
        })
        if(newchapimg1==='undefined' || newchapimg1===undefined || newchapimg1===null || newchapimg1==='null') {
                newchapimg1=this.state.chapterDetails.chapterimage1; 
        }
        this.setState((ps,pp)=>{
            return({
                chapterDetails:{
                    ...ps.chapterDetails,
                    chapterimage1:newchapimg1,
                }
            })
        })
    }


    ChapterImageonChange2 = (f)=>{
        var newchapimg2 = this.state.chapterDetails.chapterimage2
        if(!f){
            newchapimg2=null
        }
        else{
            newchapimg2=`${apis.BASE}/${f.link}`
        }
        this.setState({
            submitDisabled:false
        })
        if(newchapimg2==='undefined' || newchapimg2===undefined || newchapimg2===null || newchapimg2==='null') {
            newchapimg2=this.state.chapterDetails.chapterimage1;    
        }
        this.setState((ps,pp)=>{
            return({
                chapterDetails:{
                    ...ps.chapterDetails,
                    chapterimage2:newchapimg2,
                }
            })
        })
    }

    ChapterImageonChange3 = (f)=>{
        var newchapimg3 = this.state.chapterDetails.chapterimage3
        if(!f){
            newchapimg3=null
        }
        else{
            newchapimg3=`${apis.BASE}/${f.link}`
        }
        this.setState({
            submitDisabled:false
        })
        if(newchapimg3==='undefined' || newchapimg3===undefined || newchapimg3===null || newchapimg3==='null') {
            newchapimg3=this.state.chapterDetails.chapterimage1;    
        }
        this.setState((ps,pp)=>{
            return({
                chapterDetails:{
                    ...ps.chapterDetails,
                    chapterimage3:newchapimg3,
                }
            })
        })
    }

    ChapterImageonChange4 = (f)=>{
        var newchapimg4 = this.state.chapterDetails.chapterimage4
        if(!f){
            newchapimg4=null
        }
        else{
            newchapimg4=`${apis.BASE}/${f.link}`
        }
        this.setState({
            submitDisabled:false
        })
        if(newchapimg4==='undefined' || newchapimg4===undefined || newchapimg4===null || newchapimg4==='null') {
            newchapimg4=this.state.chapterDetails.chapterimage1;    
        }
        this.setState((ps,pp)=>{
            return({
                chapterDetails:{
                    ...ps.chapterDetails,
                    chapterimage4:newchapimg4,
                }
            })
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(strings.InputForm, values);
                
                    SecurePost({
                        url : `${apis.CREATE_CHAPTER}`,
                        data : {
                            _id : this.props.chapter.chapterId,
                            name :values.name,                            
                            descr : values.descr,
                            icon1: this.state.chapterDetails.chapterimage1,
                            icon2: this.state.chapterDetails.chapterimage2,
                            icon3: this.state.chapterDetails.chapterimage3,
                            icon4: this.state.chapterDetails.chapterimage4,
                            materials : this.state.materialId
                        }
                    }).then((response)=>{
                        if(response.data.success){
                            this.props.ChangeChapterModalState(false,null,strings.Reg);
                            Alert('success',strings.Succes,response.data.message);
                            this.props.ChangeChapterTableData();
                        }
                        else{
                            console.log(response.data);
                            this.props.ChangeChapterModalState(false,null,strings.Reg);
                            return Alert('warning',strings.Warning,response.data.message);
                        }
                    }).catch((error)=>{
                        console.log(error);
                        this.setState({
                            chapterDetails: {
                                chapterimage1: null,
                                chapterimage2: null,
                                chapterimage3: null,
                                chapterimage4: null,
                            }
                        })
                        this.props.ChangeChapterModalState(false,null,strings.Reg);
                        return Alert('error',strings.Error,strings.ErrorServer);
                    })
                
            }
        });
    };


    changeqImage = (f)=>{
        this.setState((ps,pp)=>{
            return({
                chapterDetails:{
                    ...ps.chapterDetails,
                    chapterimage1:(f.link ?`${apis.BASE}/${f.link}`:null),
                    chapterimage2:(f.link ?`${apis.BASE}/${f.link}`:null),
                    chapterimage3:(f.link ?`${apis.BASE}/${f.link}`:null),
                    chapterimage4:(f.link ?`${apis.BASE}/${f.link}`:null)
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
        strings.setLanguage(this.props.lang)
        const { getFieldDecorator } = this.props.form;
        
        var ChapterImageprops={
            name: 'file',
            action: `${apis.BASE}${apis.FILE_UPLOAD}?Token=${auth.retriveToken()}`,
            listType: 'picture',
        }
        return (
            <div className="register-chapter-form">
                <div className="register-chapter-form-body">
                    <Form  onSubmit={this.handleSubmit}>
                        <Form.Item label={strings.Name} hasFeedback className="input-admin-chapter">
                            {getFieldDecorator('name', {
                                initialValue : this.props.chapter.chapterdetails.name,
                                rules: [{ required: true, message: strings.SameInput, whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                    
                        <Form.Item label={strings.Description} hasFeedback className="input-admin-chapter">
                            {getFieldDecorator('descr', {
                                initialValue : this.props.chapter.chapterdetails.descr,
                                rules: [{ required: true, message: strings.Description2, whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                        
                        <div>
                            <h3 className="input-admin-chapter">{strings.Achievements}:</h3>
                        <Form.Item label={strings.Grey} className="input-admin-chapter">
                            <Upload {...ChapterImageprops} beforeUpload={this.upl} onRemove={(f)=>this.ChapterImageonChange1(null)} onSuccess={(f)=>this.ChapterImageonChange1(f)}>
                                {getFieldDecorator('icon1', {
                                    initialValue : this.props.chapter.chapterdetails.icon1,
                                    rules: [{ required: false, message: strings.AvatarInput}],
                                })(<img src={this.props.chapter.chapterdetails.icon1} style={{width: "60px",height: "60px",}} alt=""/>)
                                }
                                <Button style={{marginLeft: '100px'}}>
                                    <Icon type="upload" /> {strings.Download}
                                </Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item label={strings.Bronze} className="input-admin-chapter">
                            <Upload {...ChapterImageprops} beforeUpload={this.upl} onRemove={(f)=>this.ChapterImageonChange2(null)} onSuccess={(f)=>this.ChapterImageonChange2(f)}>
                                {getFieldDecorator('icon2', {
                                    initialValue : this.props.chapter.chapterdetails.icon2,
                                    rules: [{ required: false, message: strings.AvatarInput}],
                                })(<img src={this.props.chapter.chapterdetails.icon2} style={{width: "60px",height: "60px",}} alt=""/>)
                                }
                                <Button style={{marginLeft: '100px'}}>
                                    <Icon type="upload" value="df"/> <span>{strings.Download}</span>
                                </Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item label={strings.Silver} className="input-admin-chapter">
                            <Upload {...ChapterImageprops} beforeUpload={this.upl} onRemove={(f)=>this.ChapterImageonChange3(null)} onSuccess={(f)=>this.ChapterImageonChange3(f)}>
                                {getFieldDecorator('icon3', {
                                    initialValue : this.props.chapter.chapterdetails.icon3,
                                    rules: [{ required: false, message: strings.ADDDOS}],
                                })(<img src={this.props.chapter.chapterdetails.icon3} style={{width: "60px",height: "60px",}} alt=""/>)
                                }
                                <Button style={{marginLeft: '100px'}}>
                                    <Icon type="upload" /> {strings.Download}
                                </Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item label={strings.Gold} className="input-admin-chapter">
                            <Upload {...ChapterImageprops} beforeUpload={this.upl} onRemove={(f)=>this.ChapterImageonChange4(null)} onSuccess={(f)=>this.ChapterImageonChange4(f)}>
                                {getFieldDecorator('icon4', {
                                    initialValue : this.props.chapter.chapterdetails.icon4,
                                    rules: [{ required: false, message: strings.AvatarInput}],
                                })(<img src={this.props.chapter.chapterdetails.icon4} style={{width: "60px",height: "60px",}} alt=""/>)
                                }
                                <Button style={{marginLeft: '100px'}}>
                                    <Icon type="upload" /> {strings.Download}
                                </Button>
                            </Upload>
                        </Form.Item>
                        </div>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {this.props.chapter.Chaptermode}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    chapter : state.chapter,
    trainer : state.trainer,
    admin : state.admin
});



const NewChapterForm = Form.create({ name: 'register' })(NewChapter);

export default connect(mapStateToProps,{
    ChangeChapterConfirmDirty,
    ChangeChapterModalState,
    ChangeChapterTableData
})(NewChapterForm);

