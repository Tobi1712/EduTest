import React, { Component } from 'react';
import { Table, Input, Button, Divider, Icon, Modal, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { 
    ChangeSlideSearchText,
    ChangeSlideTableData,
    ChangeSlideModalState
} from '../../../actions/chapterAction';
import '../Division/alldivision.css'
import Alert from '../../../components/common/alert';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import NewSlidesForm from './newslide';
import  LocalizedStrings  from  'react-localization' ;
let strings = new LocalizedStrings({
  ru:{
    Reg: "Регистрация",
    Succes: "Успешно",
    Warning: "Предупреждение",
    Error: "Ошибка",
    ErrorServer: "Ошибка сервера",
    Search: "Поиск",
    Text: "Текст",
    Name: "названия",
    Slide: "Слайд",
    Action: "Действие",
    Save: "Сохранить",
    YouReallyWantThis: "Вы уверены？",
    No: "Нет",
    Yes: "Да",
    Cancel:"Отмена",
    Add:"Добавить"
  },
  kz: {
    Reg: "Тіркеу",
    Succes: "Сәтті",
    Warning: "Ескерту",
    Error: "Қате",
    ErrorServer: "Сервер қатесі",
    Search: "Іздеу",
    Text: "Мәтін",
    Name: "аты-жөні",
    Slide: "Слайд",
    Action: "Әрекет",
    Save: "Сақтау",
    YouReallyWantThis: "Сенімдісің бе?",
    No: "Жоқ",
    Yes: "Иә",
    Cancel:"Болдырмау",
    Add:"Қосу"
  }
 });

class AllSlides extends Component {

  constructor(props){
    super(props);
    this.state={
      SlidetableLoading : false
    }
  }

  openModal = (id,mode)=>{
    console.log("ASDF",this.props.id);
    this.props.ChangeSlideModalState(true,id,mode);
  }

  closeModal = ()=>{
    this.props.ChangeSlideModalState(false,null,strings.Reg);
  }

  componentDidMount(){
    this.props.ChangeSlideTableData(this.props.id);
  }

  deleteSlide = (id)=>{
    SecurePost({
      url : `${apis.DELETE_SLIDE}`,
      data : {
          _id : id
      }
    }).then((response)=>{
      if(response.data.success){
        Alert('success',strings.Succes,response.data.message);
        this.props.ChangeSlideTableData();
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
            searchWords={[this.props.chapter.SlidesearchText]}
            autoEscape
            textToHighlight={text===null ? '' :text.toString()}
          />
        ),
      });
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.props.ChangeSlideSearchText(selectedKeys[0])
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.props.ChangeSlideSearchText('')
      };

    render() {
      //const { Title } = Typography;
      const columns = [
        {
          title: strings.Text,
          dataIndex: 'slbody',
          key: 'slbody',
          width: '25%',
          ...this.getColumnSearchProps('slbody'),
        },
        {
          title: strings.Slide,
          dataIndex: 'slimage',
          key: 'slimage',
          render: (key) => (
          
            <div>
              <img src={key} style={{width: "60px",height: "60px",}} alt=""/>
            </div>
          )
        },      
        {
          title: strings.Action,
          key: '_id',
          dataIndex: '_id',
          render: (key) => (
            <span>
              <Button type="primary" shape="circle" icon="edit" onClick={()=>this.openModal(key,strings.Save)}/>
                <Divider type="vertical" />
                <Popconfirm
                  title={strings.YouReallyWantThis}
                  cancelText={strings.No}
                  okText={strings.Yes}
                  onConfirm={()=>{this.deleteSlide(key)}}
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
              <Button type="primary" icon="user-add" style={{marginBottom:'10px'}} onClick={()=>this.openModal(null,'Регистрация')}>
              {strings.Add}
              </Button> 
              <Table 
                bordered={true} 
                columns={columns} 
                dataSource={this.props.chapter.slideTableData} 
                size="medium" 
                pagination={{ pageSize: 5 }}
                loading={this.props.chapter.slideTableLoadingStatus}
                rowKey="_id" 
              />;
              
              <Modal 
                visible={this.props.chapter.SlidemodalOpened}
                title={false}
                onOk={this.handleOk}
                onCancel={this.closeModal}
                style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                width="40%"
                destroyOnClose={true}
                footer={[
                  
                ]}
              >
                <NewSlidesForm mid={this.props.id}/>
              </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    admin : state.admin,
    chapter : state.chapter
});

export default connect(mapStateToProps,{
    ChangeSlideSearchText,
    ChangeSlideTableData,
    ChangeSlideModalState
})(AllSlides);