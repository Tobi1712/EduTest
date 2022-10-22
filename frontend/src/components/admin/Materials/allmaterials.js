import React, { Component } from 'react';
import { Table, Button, Icon, Divider, Modal, Popconfirm } from 'antd';
// import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { 
    ChangeMaterialSearchText,
    ChangeMaterialTableData,
    ChangeMaterialModalState
} from '../../../actions/chapterAction';
import '../Chapter/allchapter.css';
import Alert from '../../../components/common/alert';
import { SecurePost } from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import NewMaterialForm from '../Materials/newmaterials';
// import {updateQuestiosnActiveTest } from '../../../actions/trainerAction';
//import SingleQuestion from '../../trainee/examPortal/singleQuestion';
import AllQuestions from '../Questions/allquestion';
import AllSlides from '../Slides/allslides';
 //import AllTests from '../../trainer/alltests/alltest';
/// import NewTest from '../../trainer/newtest/newtest';

// const {TabPane} = Tabs;
import  LocalizedStrings  from  'react-localization' ;
let strings = new LocalizedStrings({
  ru:{
    Succes: "Успешно",
    Warning: "Предупреждение",
    Error: "Ошибка",
    ErrorServer: "Ошибка сервера",
    Name: "Наименование",
    Duration: "Продолжительность теста",
    Attempts: "Количество попыток",
    ExpectationsDays: "Период ожидания, дней",
    NumberQues: "Количество вопросов для отображения пользователю",
    Action: "Действие",
    Save: "Сохранить",
    YouReallyWantThis: "Вы уверены？",
    No: "Нет",
    Yes: "Да",
    Create: "Создать",
    CreateMaterial: "Создать новый материал",
    Slides: "Слайды",
    Quess: "Вопросы",
  },
  kz: {
    Succes: "Сәтті",
    Warning: "Ескерту",
    Error: "Қате",
    ErrorServer: "Сервер қатесі",
    Name: "Аты",
    Duration: "Тест ұзақтығы",
    Attempts: "Әрекеттер саны",
    ExpectationsDays: "Күтілетін кезең, күндер",
    NumberQues: "Пайдаланушыға көрсетілетін сұрақтар саны",
    Action: "Әрекет",
    Save: "Сақтау",
    YouReallyWantThis: "Сенімдісің бе?",
    No: "Жоқ",
    Yes: "Иә ",
    Create: "Жасау",
    CreateMaterial: "Жаңа материал жасау",
    Slides: "Слайдтар",
    Quess: "Сұрақтар",
  }
 });

class AllMaterial extends Component {

  constructor(props){
    super(props);
    this.state={
      materialId : null,
      materialModelVisible:false,
     // questionId : null,
      slideModelVisible : false,
      testModelVisible : false,
      MaterialtableLoading : false,
      details: null,
      loading:true,
      chapterId:null
    }
  }
  tabChange = (key)=>{
    console.log(key)
  }

  OpenQuestiondetailsModal = (id)=>{

    this.setState((previousState,previousProps)=>{
      return{
        materialId:id,
        materialModelVisible:true
      }
    })
  }

  CloseQuestiondetailsModal = ()=>{
    this.setState((previousState,previousProps)=>{
      return{
        materialId:null,
        materialModelVisible:false
      }
    })
  }

  OpenSlidedetailsModal = (id)=>{
    this.setState((previousState,previousProps)=>{
      return{
        materialId:id,
        slideModelVisible:true
      }
    })
  }

  CloseSlidedetailsModal = ()=>{
    this.setState((previousState,previousProps)=>{
      return{
        materialId:null,
        slideModelVisible:false
      }
    })
  }

  OpenTestdetailsModal = (id)=>{
    this.setState((previousState,previousProps)=>{
      console.log(id)
      return{
        materialId:id,
        testModelVisible:true
      }
    })
  }

  CloseTestdetailsModal = ()=>{
    this.setState((previousState,previousProps)=>{
      return{
        materialId:null,
        testModelVisible:false
      }
    })
  }


  componentDidMount(){
    var ID = this.props.id;
    this.props.ChangeMaterialTableData(ID);
        // SecureGet({
        //     url: `${apis.GET_SINGLE_CHAPTER_DETAILS}/${ID}`,
        // }).then((response)=>{
        //     console.log(response.data.data[0]);
        //     this.setState({
        //         details : response.data.data[0],
        //         loading : false
        //     })
        // }).catch((error)=>{
        //     console.log(error);
        // })
  }


  openModal = (id,mode)=>{
    this.props.ChangeMaterialModalState(true, id, mode);
  }

  closeModal = ()=>{
    this.props.ChangeMaterialModalState(false, null, strings.Create);
  }


  deleteMaterial = (id)=>{
    SecurePost({
      url : `${apis.DELETE_MATERIAL}`,
      data : {
          _id : id
      }
    }).then((response)=>{
      if(response.data.success){
        Alert('success','',response.data.message);
      }
      else{
        return Alert('warning',strings.Warning,response.data.message);
      }
    }).catch((error)=>{
      return Alert('error',strings.Error,strings.ErrorServer);
    })
  }


    render() {
      // const { Title } = Typography;
      const columns = [
        {
          title: '№',
          dataIndex: 'num',
          key: 'num',
          width: '5%',
        },   
        {
          title: strings.Name,
          dataIndex: 'topic',
          key: 'topic',
          width: '20%',
        }, 
        {
          title: strings.Duration,
          dataIndex: 'duration',
          key: 'duration',
          width: '20%',
        },
        {
          title: strings.Attempts,
          dataIndex: 'attempts',
          key: 'attempts',
          width: '5%',
        },
        
        {
          title:strings.ExpectationsDays,
          dataIndex: 'period',
          key: 'period',
          width: '5%',
        },
        {
          title: strings.NumberQues,
          dataIndex: 'numQuestions',
          key: 'numQuestions',
          width: '5%',
        },  
        
        {
          title: strings.Action,
          key: '_id',
          dataIndex: '_id',
          width: '40%',
          render: (key) => (
            <span>
              <Button type="primary" shape="circle" icon="edit" onClick={()=>this.openModal(key,strings.Save )}/>
                <Divider type="vertical" />
                <Popconfirm
                  title={strings.YouReallyWantThis}
                  cancelText={strings.No}
                  okText={strings.Yes}
                  onConfirm={()=>{this.deleteMaterial(key)}}
                  icon={<Icon type="delete" style={{ color: 'red' }} />}
                >
                  <Button type="danger" shape="circle" icon="delete" />
                </Popconfirm>
               <Divider type="vertical" />
                <Button type="primary" icon="" onClick={()=>this.OpenSlidedetailsModal(key)}>{strings.Slides}</Button>
                <Divider type="vertical" />
                <Button type="primary" icon="" onClick={()=>this.OpenQuestiondetailsModal(key)}>{strings.Quess}</Button>
            </span>
          ),
        },
      ];
      return(
        <div className="admin-table-container">
              
                <Button type="primary" icon="user-add" style={{marginBottom:'10px'}} onClick={()=>this.openModal(null,strings.Create)}>
                  {strings.CreateMaterial}
                </Button>
                <Table 
                bordered={true} 
                columns={columns} 
                dataSource={this.props.chapter.materialTableData} 
                size="medium" 
                pagination={{ pageSize: 10 }}
                loading={this.props.chapter.materialTableLoadingStatus}
                rowKey="_id" 
              ></Table>
                <Modal
                      visible={this.props.chapter.MaterialmodalOpened}
                      title={false}
                      onOk={this.handleOk}
                      onCancel={this.closeModal}
                      style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                      width="40%"
                      destroyOnClose={true}
                      footer={[]}
                  >{console.log('OOOOOOOOOOOOOOOOOOOOOOOOOO:',this.props.id)}
                  <NewMaterialForm cid={this.props.id}/>
                </Modal> 
            <Modal
                visible={this.state.slideModelVisible}
                title={strings.Slides}
                onCancel={this.CloseSlidedetailsModal}
                style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                width="70%"
                destroyOnClose={true}
                footer={[]}
              >
                <AllSlides id={this.state.materialId} cid={this.props.id}/>
            </Modal>

            <Modal
                visible={this.state.materialModelVisible}
                title={strings.Quess}
                onCancel={this.CloseQuestiondetailsModal}
                style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                width="70%"
                destroyOnClose={true}
                footer={[]}
              >
                <AllQuestions id={this.state.materialId} />
            </Modal>
{/* 
            <Modal
                visible={this.state.testModelVisible}
                title="Вопросы"
                onCancel={this.CloseTestdetailsModal}
                style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                width="70%"
                destroyOnClose={true}
                footer={[]}
              >
                <AllTests id={this.state.materialId} />
            </Modal> */}
 

        </div>
      )}
}

const mapStateToProps = state => ({
  chapter : state.chapter,
  trainer : state.trainer
});

export default connect(mapStateToProps,{
    ChangeMaterialSearchText,
    ChangeMaterialTableData,
    ChangeMaterialModalState,
})(AllMaterial);


