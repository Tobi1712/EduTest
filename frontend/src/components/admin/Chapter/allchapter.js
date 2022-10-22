import React, { Component } from 'react';
import { Table, Input, Button, Typography, Divider, Modal,Icon, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { 
    ChangeChapterSearchText,
    ChangeChapterTableData,
    ChangeChapterModalState,
    ChangeMaterialTableData,
} from '../../../actions/chapterAction';
import './allchapter.css';
import Alert from '../../../components/common/alert';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import NewChapterForm from './newchapter';
import AllMaterial from '../Materials/allmaterials';
//import App from '../chapterwindow/materials';
import  LocalizedStrings  from  'react-localization' ;
let strings = new LocalizedStrings({
  ru:{
    Add:"Добавить",
    Succes:"Успешно",
    Warning:"Предупреждение",
    Error:"Ошибка",
    ErrorServer:"Ошибка сервера",
    Search:"Поиск ",
    Cancel:"Отмена",
    Name:"Наименование",
    SearchName:"наименования",
    Description:"Описание",
    SearchDescription:"описания",
    Achievements:"Достижения",
    Action:"Действие",
    Save:"Сохранить",
    YouReallyWantThis:"Вы уверены？",
    No:"Нет",
    Yes:"Да",
    Chapters:"Разделы",
    Materials:"Материалы"
  },
  kz: {
    Add :"Қосу",
    Succes :"Сәтті",
    Warning :"Ескерту",
    Error :"Қате",
    ErrorServer :"Сервер қатесі",
    Search :"Іздеу",
    Cancel :"Болдырмау",
    Name :"Аты",
    SearchName :"аттар",
    Description :"Сипаттама",
    SearchDescription :"сипаттамалар",
    Achievements :"Жетістіктер",
    Action :"Әрекет",
    Save :"Сақтау",
    YouReallyWantThis :"Сіз сенімдісіз бе?",
    No :"Жоқ",
    Yes :"Иә",
    Chapters :"Тараулар",
    Materials:"Материалдар"
  }
 });
class AllChapter extends Component {

  constructor(props){
    super(props);
    this.state={
      chapterId : null,
      chapterModelVisible:false,
      CompanytableLoading : false,
    }
  }

  OpendetailsModal = (id)=>{
    this.setState((previousState,previousProps)=>{
       console.log(id)
      return{
        chapterId:id,
        chapterModelVisible:true
      }
    })
  }
  ClosedetailsModal = ()=>{
    this.setState((previousState,previousProps)=>{
      return{
        chapterId:null,
        chapterModelVisible:false
      }
    })
  }
  componentDidMount(){
    this.props.ChangeChapterTableData();
  }


  openModal = (id,mode)=>{
    this.props.ChangeChapterModalState(true, id, mode);
  }

  closeModal = ()=>{
    this.props.ChangeChapterModalState(false, null, strings.Add);
  }


  deleteChapter = (id)=>{
    SecurePost({
      url : `${apis.DELETE_CHAPTER}`,
      data : {
          _id : id
      }
    }).then((response)=>{
      if(response.data.success){
        Alert('success',strings.Succes,response.data.message);
        this.props.ChangeChapterTableData();
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
            searchWords={[this.props.chapter.ChaptersearchText]}
            autoEscape
            textToHighlight={text===null ? '' :text.toString()}
          />
        ),
      });
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.props.ChangeChapterSearchText(selectedKeys[0])
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.props.ChangeChapterSearchText('')
      };
      // handleChapterChange =(s)=>{
      //   this.props.ChangeChapterTableData(s);
      // }

    render() {
      strings.setLanguage(this.props.lang)
      const { Title } = Typography;
      // var icons = this.props.chapter.chapterTableData;
      const columns = [
      
        {
          title: strings.Name,
          dataIndex: 'name',
          key: 'name',
          width: '20%',
          ...this.getColumnSearchProps('name'),
        },
        {
          title: strings.Description,
          dataIndex: 'descr',
          key: 'descr',
          width: '30%',
          ...this.getColumnSearchProps('descr'),
        },    
        { 
          title: strings.Achievements,          
          colSpan : 4,
          dataIndex: 'icon1',
          key: 'icon1',
          width: '3%',
          render: (key) => (
            <img src={key} style={{width: "60px",height: "60px"}} alt=""/>
          ),
          
          // key2: 'icon2',
          // key3: 'icon3',
          // key4: 'icon4',
          // render: (key1, key2, key3, key4) => (
  
          //   <div>
          //     <img src={key1} style={{width: "60px",height: "60px"}}/>
          //     <img src={key2} style={{width: "60px",height: "60px"}}/>
          //     <img src={key3} style={{width: "60px",height: "60px"}}/>
          //     <img src={key4} style={{width: "60px",height: "60px"}}/>
          //       {/* <img class="icon-gray"/> 
          //       <img class="icon-bronze"/> 
          //       <img class="icon-silver"/>  
          //   <img class="icon-gold"/> */}
          //   </div>
          // )
          
        },
        {
          colSpan : 0,
          dataIndex: 'icon2',
          key: 'icon2',
          width: '3%',
          render: (key) => (
            
            <img src={key} style={{width: "60px",height: "60px"}} alt=""/>
            
          )
        },
        {
          colSpan : 0,
          dataIndex: 'icon3',
          key: 'icon3',
          width: '3%',
          render: (key) => (
            
            <img src={key} style={{width: "60px",height: "60px"}} alt=""/>
            
          )
        },
        {
          colSpan : 0,
          dataIndex: 'icon4',
          key: 'icon4',
          width: '3%',
          render: (key) => (
            
            <img src={key} style={{width: "60px",height: "60px"}} alt=""/>
            
          )
        },
        
        
        {
          title: strings.Action,
          key: '_id',
          dataIndex: '_id',
          width: '30%',
          render: (key) => (
            <span>
              <Button type="primary" shape="circle" icon="edit" onClick={()=>this.openModal(key,strings.Save)}/>
                <Divider type="vertical" />
                <Popconfirm
                  title={strings.YouReallyWantThis}
                  cancelText={strings.No}
                  okText={strings.Yes}
                  onConfirm={()=>{this.deleteChapter(key)}}
                  icon={<Icon type="delete" style={{ color: 'red' }} />}
                >
                  <Button type="danger" shape="circle" icon="delete" />
                </Popconfirm>
                <Divider type="vertical" />
                <Button type="primary" icon="" onClick={()=>this.OpendetailsModal(key)}>Материалы</Button>
            </span>
          ),
        },
      ];
        return (
            <div className="admin-table-container">
              <div>
                    <Button type="primary" icon="user-add" style={{marginBottom:'10px'}} onClick={()=>this.openModal(null,strings.Add)}>
                    {strings.Add}
                    </Button> 
              </div>

             
              <div className="xx-form-header">
                <Title level={4} style={{color:'#000000',textAlign:'left',fontFamily:'Montserrat',fontSize:'14pt',fontWeight:'bold'}}>{strings.Chapters}</Title>
              </div>
              <Table 
                bordered={true} 
                columns={columns} 
                dataSource={this.props.chapter.chapterTableData} 
                size="medium" 
                pagination={{ pageSize: 5 }}
                loading={this.props.chapter.chapterTableLoadingStatus}
                rowKey="_id" 
              ></Table>

              <Modal
                visible={this.props.chapter.ChaptermodalOpened}
                title={false}
                onOk={this.handleOk}
                onCancel={this.closeModal}
                style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                width="40%"
                destroyOnClose={true}
                footer={[
                  
                ]}
              >
                <NewChapterForm lang={this.props.lang}/>
              </Modal>
              
              <Modal
                visible={this.state.chapterModelVisible}
                title={strings.Materials}
                onCancel={this.ClosedetailsModal}
                style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                width="70%"
                destroyOnClose={true}
                footer={[]}
              >
              <AllMaterial id={this.state.chapterId} />
              </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  chapter : state.chapter
});

export default connect(mapStateToProps,{
    ChangeChapterSearchText,
    ChangeChapterTableData,
    ChangeChapterModalState,
    ChangeMaterialTableData,
})(AllChapter);