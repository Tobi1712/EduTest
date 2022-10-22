import React, { Component } from 'react';
import { Table, Input, Button, Icon, Typography,Popconfirm,Divider, Modal, Row, Col  } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { 
  ChangeQuestionModalState,
  ChangeQuestionTableData,
  ChangeQuestionSearchText,
} from '../../../actions/trainerAction';
// import { 
//   ChangeMaterialTableData,
//   ChangeChapterTableData
// } from '../../../actions/chapterAction';
import './allquestion.css'
import Alert from '../../../components/common/alert';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import NewQuestionForm from './newquestion';
import QuestionDetails from '../questionDetails/questiondetails';
import  LocalizedStrings  from  'react-localization' ;
let strings = new LocalizedStrings({
  ru:{
    CreateQues: "Создать вопрос",
    Save: "Сохранить",
    Succes: "Успешно",
    Warning: "Предупреждение",
    Error: "Ошибка",
    ErrorServer: "Ошибка сервера",
    Search: "Поиск",
    Ques: "Вопрос",
    SearchQues: "вопроса",
    Action: "Действие",
    Details: "Детали",
    Edit: "Редактировать",
    YouReallyWantThis: "Вы уверены？",
    No: "Нет",
    Yes: "Да",
    AddQues: "Добавить новый вопрос",
    Quess: "Вопросы",
    NewQuer: "Новый вопрос",
    Search: "Поиск",
    Cancel: "Отмена",
  },
  kz: {
    CreateQues: "Сұрақ құру",
    Save: "Сақтау",
    Succes: "Сәтті",
    Warning: "Ескерту",
    Error: "Қате",
    ErrorServer: "Сервер қатесі",
    Search: "Іздеу",
    Ques: "Сұрақ",
    SearchQues: "сұрақ",
    Action: "Әрекет",
    Details: "Толық мәліметтер",
    Edit: "Өзгерту",
    YouReallyWantThis: "Сенімдісің бе?",
    No: "Жоқ",
    Yes: "Иә",
    AddQues: "Жаңа сұрақ қосу",
    Quess: "Сұрақтар",
    NewQuer: "Жаңа сұрақ",
    Search: "Іздеу",
    Cancel: "Болдырмау",
  }
 });


class AllQuestions extends Component {
  constructor(props){
    super(props);
    console.log("Question123",this.props);
    this.state={
      questiondetailsId : null,
      questiondetailsModelVisible:false,
      QuestionTableLoading : false
    }
  }
  OpendetailsModal = (id)=>{
    this.setState((previousState,previousProps)=>{
      return{
        questiondetailsId:id,
        questiondetailsModelVisible:true
      }
    })
  }
  ClosedetailsModal = ()=>{
    this.setState((previousState,previousProps)=>{
      return{
        questiondetailsId:null,
        questiondetailsModelVisible:false
      }
    })
  }

  componentDidMount(){
    this.props.ChangeQuestionTableData(this.props.id);
  }


  openModal = (id,mode)=>{
    this.props.ChangeQuestionModalState(true, id, mode);
  }

  closeModal = ()=>{
    this.props.ChangeQuestionModalState(false, null, strings.CreateQues);
  }

  openEditModal = (id,mode)=>{
    this.props.ChangeQuestionModalState(true, id, mode);
  }

  closeEditModal = ()=>{
    this.props.ChangeQuestionModalState(false, null, strings.Save);
  }


  deleteQuestion = (id)=>{
    SecurePost({
      url : `${apis.DELETE_QUESTION}`,
      data : {
          _id : id
      }
    }).then((response)=>{
      if(response.data.success){
        Alert('success',strings.Succes,response.data.message);
      }
      else{
        return Alert('warning',strings.Warning,response.data.message);
      }
    }).catch((error)=>{
      return Alert('error',strings.Error,strings.ErrorServer);
    })
  }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`${strings.Search} ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              {strings.Search}
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            {strings.Cancel}
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#97c222' : undefined }} />
        ),
        onFilter: (value, record) =>
        record[dataIndex]===null ? '' : record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: text => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.props.trainer.QuestionsearchText]}
            autoEscape
            textToHighlight={text===null ? '' :text.toString()}
          />
        ),
      });
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.props.ChangeQuestionSearchText(selectedKeys[0])
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.props.ChangeQuestionSearchText('')
      };

    render() {
      const { Title } = Typography;
      const columns = [

        {
          title: strings.Ques,
          dataIndex: 'body',
          key: 'body',
          width: '50%',
          ...this.getColumnSearchProps('body'),
        },
        // {
        //   // title: 'Created By',
        //   // dataIndex: 'createdBy.name',
        //   // key: 'createdBy.name',
        //   // width: '15%'
        // },
        
        {
          title: strings.Action,
          key: '_id',
          dataIndex: '_id',
          width: '50%',
          render: (key) => (
            <span>
              <Button type="primary" onClick={()=>this.OpendetailsModal(key)} icon="info-circle">{strings.Details}</Button>
              <Divider type="vertical" />
              <Button type="primary" icon="info-circle" onClick={()=>this.openEditModal(key, strings.Save)}>{strings.Edit}</Button>
              <Divider type="vertical" />
              <Popconfirm
                  title={strings.YouReallyWantThis}
                  cancelText={strings.No}
                  okText={strings.Yes}
                  onConfirm={()=>{this.deleteQuestion(key)}}
                  icon={<Icon type="delete" style={{ color: 'red' }} />}
                >
                  <Button type="danger" shape="circle" icon="delete" />
                </Popconfirm>
            </span>
          ),
        },
      ];
        return (
            <div className="admin-table-container">
              <div>
                <Row>
                  <Col span={12}>
                    <Button type="primary" icon="question-circle" style={{marginBottom:'10px'}} onClick={()=>this.openModal(null,strings.CreateQues)}>
                    {strings.AddQues}
                    </Button>
                  </Col>
                  
                </Row>
              </div>
              <div className="xx-form-header">
                <Title level={4} style={{color:'#000000',textAlign:'left',fontFamily:'Montserrat',fontSize:'24pt',fontWeight:'bold'}}>{strings.Quess}</Title>
              </div>
              <Table 
                bordered={true} 
                columns={columns} 
                dataSource={this.props.trainer.QuestionTableData} 
                size="medium" 
                pagination={{ pageSize: 5 }}
                loading={this.props.trainer.QuestionTableLoading}
                rowKey="_id" 
              />
              <Modal
                visible={this.props.trainer.QuestionmodalOpened}
                title={strings.NewQuer}
                onCancel={this.closeModal}
                style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                width="90%"
                destroyOnClose={true}
                footer={[]}
              >
                <NewQuestionForm qnid={this.props.id}/>
              </Modal>

              <Modal
                visible={this.state.questiondetailsModelVisible}
                title="Question Details"
                onCancel={this.ClosedetailsModal}
                style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                width="70%"
                destroyOnClose={true}
                footer={[]}
              >
                <QuestionDetails id={this.state.questiondetailsId} />
              </Modal>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    trainer : state.trainer,
    admin : state.admin,
    chapter : state.chapter
});

export default connect(mapStateToProps,{
  ChangeQuestionModalState,
  ChangeQuestionTableData,
  ChangeQuestionSearchText,
 // ChangeSelectedSubjects,
  // ChangeSelectedChapter,
  // ChangeSelectedMaterials,
  // ChangeChapterTableData,
  // ChangeMaterialTableData
})(AllQuestions);