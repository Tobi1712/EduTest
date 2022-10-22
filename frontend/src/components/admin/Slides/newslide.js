import React, { Component } from 'react'
import './newslide.css';
import auth from '../../../services/AuthServices';
import {
    Form,
    Input,
    Button,
    Upload,
    Icon,

    //Select
} from 'antd';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import { connect } from 'react-redux';
import { 
    ChangeSlideConfirmDirty,
    ChangeSlideModalState,
    ChangeSlideTableData
} from '../../../actions/chapterAction';
import Alert from '../../../components/common/alert';
//const { Option } = Select;
import  LocalizedStrings  from  'react-localization' ;
let strings = new LocalizedStrings({
    ru:{
      AddForm: "Полученные значения формы: ",
      Reg: "Регистрация",
      Succes: "Успешно",
      Warning: "Предупреждение",
      Error: "Ошибка",
      ErrorServer: "Ошибка сервера",
      AddName: "Пожалуйста, введите название подразделения!",
      Text: "Текст",
      Slide: "Слайд",
      AddSlide: "Пожалуйста, загрузите слайд!",
      Add: "Загрузить",
    },
    kz: {
      AddForm: "Алынған пішін мәндері:",
      Reg: "Тіркеу",
      Succes: "Сәтті",
      Warning: "Ескерту",
      Error: "Қате",
      ErrorServer: "Сервер қатесі",
      AddName: "Бөлім атауын енгізіңіз!",
      Text: "Мәтін",
      Slide: "Слайд",
      AddSlide: "Слайдты жүктеп салыңыз!",
      Add: "Жүктеу",
    }
   });


class NewSlide extends Component {
    constructor(props){
        super(props);
        this.state={
            counter:0,
            materialId:null,
            slideDetails:{
                slideimage: this.props.chapter.slidedetails.slimage,
            },
            submitDisabled:false,
        }
    }

    componentDidMount(){
        this.setState({
            materialId:this.props.mid
        });
    }


    SlideImageonChange = (f)=>{
        var newSlide = this.state.slideDetails.slideimage
        if(!f){
            newSlide=null
        }
        else{
            newSlide=`${apis.BASE}/${f.link}`
            
        }
        this.setState({
            submitDisabled:false
        })
        if(newSlide==='undefined' || newSlide===undefined || newSlide===null || newSlide==='null') {
            //(newOptions[i].body==='undefined' || newOptions[i].body===undefined || newOptions[i].body==='null' || newOptions[i].body==='' || newOptions[i].body===null)){
                newSlide=this.state.slideDetails.slideimage;  
                 
        }
        this.setState((ps,pp)=>{
            return({
                slideDetails:{
                    ...ps.slideDetails,
                    slideimage:newSlide
                }
            })
        })
    }



    

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(this.state.materialId);
                console.log(strings.AddForm, values);
                
                    SecurePost({
                        url : `${apis.CREATE_SLIDES}`,
                        data : {
                            _id : this.props.chapter.slideId,
                            slbody : values.slbody,                            
                            slimage : this.state.slideDetails.slideimage,
                            materialId : this.state.materialId,
                            chapterId : this.props.cid
                        }
                    }).then((response)=>{
                        if(response.data.success){
                            this.props.ChangeSlideModalState(false,null,strings.Add);
                            Alert('success',strings.Succes,response.data.message);
                            this.props.ChangeSlideTableData(this.props.mid);
                            //this.state={counter: 1} 
                        }
                        else{
                            console.log(response.data);
                            this.props.ChangeSlideModalState(false,null,strings.Add);
                            return Alert('warning',strings.Warning,response.data.message);
                        }
                    }).catch((error)=>{
                        this.props.ChangeSlideModalState(false,null,strings.Add);
                        return Alert('error',strings.Error,strings.ErrorServer);
                    })
                
            }
        });
    };

    // changeqImage = (f)=>{
    //     this.setState((ps,pp)=>{
    //         return({
    //             slideDetails:{
    //                 ...ps.slideDetails,
    //                 slideimage:(f.link ?`${apis.BASE}/${f.link}`:null)
    //             },
    //             submitDisabled:false
    //         })
    //     })
    // }

    // upl=()=>{
    //     this.setState({
    //         submitDisabled: false
    //     })
    // }

    render() {
        const { getFieldDecorator } = this.props.form;
        // const { TextArea } = Input;
        var SlideImageprops={
            name: 'file',
            action: `${apis.BASE}${apis.FILE_UPLOAD}?Token=${auth.retriveToken()}`,
            listType: 'picture',
        }
        return (
            <div className="register-slide-form">
                <div className="register-slide-form-body">
                    <Form  onSubmit={this.handleSubmit}>
                        <Form.Item label={strings.Text} hasFeedback className="input-admin-slide">
                            {getFieldDecorator('slbody', {
                                initialValue : this.props.chapter.slidedetails.slbody,
                                rules: [{ required: true, message: strings.AddName, whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                    
                        <Form.Item label={strings.Slide} className="input-admin-slide">
                            <Upload {...SlideImageprops} beforeUpload={this.upl} onRemove={(f)=>this.SlideImageonChange(null)} onSuccess={(f)=>this.SlideImageonChange(f)}>
                                {getFieldDecorator('slimage', {
                                    initialValue : this.props.chapter.slidedetails.slimage,
                                    rules: [{ required: false, message: strings.AddSlide}],
                                })(<img src={this.props.chapter.slidedetails.slimage} style={{width: "80px",height: "60px",}} alt=""/>)
                                }
                                
                                <Button style={{marginLeft: '100px'}}>
                                    <Icon type="upload" /> {strings.Add}
                                    
                                </Button>
                                
                            </Upload>
                        </Form.Item>

                        
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {this.props.chapter.Slidemode}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    admin : state.admin,
    chapter : state.chapter
});



const NewSlideForm = Form.create({ name: 'register' })(NewSlide);

export default connect(mapStateToProps,{
    ChangeSlideConfirmDirty,
    ChangeSlideModalState,
    ChangeSlideTableData
})(NewSlideForm);

