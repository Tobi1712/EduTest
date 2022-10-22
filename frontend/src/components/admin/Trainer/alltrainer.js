import React, { Component } from 'react';
import { Table, Input, Button, Icon, Typography, Divider, Modal, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { 
    ChangeTrainerSearchText,
    ChangeTrainerTableData,
    ChangeTrainerModalState,
    ChangeCompanyTableData,
    ChangeSelectedCompany,
} from '../../../actions/adminAction';
import './alltrainer.css'
import Alert from '../../../components/common/alert';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import NewTrainerForm from './newtrainer';

import  LocalizedStrings  from  'react-localization' ;
let strings = new LocalizedStrings({
  ru:{
    ListModerators:"Список модераторов",
    warning:"Предупреждение!",
    Reg:"Регистрация",
    Succes:"Успешно",
    Err:"Ошибка!",
    ErrServer:"Ошибка Сервера",
    Search:"Поиск",
    Name:"Имя",
    SearchName:"по имени",
    Email:"Эл. почта",
    SearchEmail:"эл.почты",
    Contacts:"Контакт",
    SearchContacts:"контактов",
    Company:"Компания",
    Actions:"Действия",
    Save:"Сохранить",
    YouReallyWantThis:"Вы уверены？",
    No:"Нет",
    Yes:"Да",
    Cancel:"Отмена",
    Add:"Добавить"
  },
  kz: {
    ListModerators:"Модераторлар тізімі",
    warning:"Ескерту!",
    Reg :"Тіркеу",
    Succes :"Сәтті",
    Err :"Қате!",
    ErrServer :"Сервер қатесі",
    Search :"іздеу",
    Name :"Аты",
    SearchName :"Атын",
    Email :"Электрондық пошта",
    SearchEmail :"Эл. поштаны",
    Contacts :"Байланыс",
    SearchContacts :"Контактiні",
    Company :"Компания",
    Actions :"Әрекеттер",
    Save :"Сактау",
    YouReallyWantThis :"Сақтау",
    No :"Жоқ",
    Yes :"Иә",
    Cancel:"Болдырмау",
    Add:"Қосу"
  }
 });
class AllTrainer extends Component {

  constructor(props){
    super(props);
    this.state={
      TrainertableLoading : false
    }
  }

  openModal = (id,mode)=>{
    this.props.ChangeTrainerModalState(true,id,mode);
  }

  closeModal = ()=>{
    this.props.ChangeTrainerModalState(false,null,strings.Reg);
  }

  componentDidMount(){
    this.props.ChangeCompanyTableData();
    this.props.ChangeTrainerTableData(this.props.admin.selectedCompany);
  }

  deleteTrainer = (id)=>{
    SecurePost({
      url : `${apis.DELETE_TRAINER}`,
      data : {
          _id : id
      }
    }).then((response)=>{
      if(response.data.success){
        Alert('success',strings.Succes,response.data.message);
        this.props.ChangeTrainerTableData();
      }
      else{
        return Alert('warning',strings.warning,response.data.message);
      }
    }).catch((error)=>{
      return Alert('error',strings.Err,strings.ErrServer);
    })
  }

    getColumnSearchProps = (dataIndex, searchText) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={this.props.lang=='ru' ? `${strings.Search} ${searchText}` : `${searchText} ${strings.Search}`}
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
            searchWords={[this.props.admin.TrainersearchText]}
            autoEscape
            textToHighlight={text===null ? '' :text.toString()}
          />
        ),
      });
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.props.ChangeTrainerSearchText(selectedKeys[0])
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.props.ChangeTrainerSearchText('')
      };

    render() {
      strings.setLanguage(this.props.lang)
      const { Title } = Typography;
      const columns = [
        {
          title: strings.Name,
          dataIndex: 'name',
          key: 'name',
          width: '25%',
          ...this.getColumnSearchProps('name', strings.SearchName),
        },
        {
          title: strings.Email,
          dataIndex: 'emailid',
          key: 'emailid',
          width: '25%',
          ...this.getColumnSearchProps('emailid',strings.SearchEmail),
        },
        {
          title: strings.Contacts,
          dataIndex: 'contact',
          key: 'contact',
          ...this.getColumnSearchProps('contact', strings.SearchContacts),
        },
        {
          title: strings.Company,
          dataIndex: 'company.name',
          key: 'company.name',
          width: '15%',
        },
        {
          title: strings.Actions,
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
                  onConfirm={()=>{this.deleteTrainer(key)}}
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

              {console.log(this.props.lang)}
              <Button type="primary" icon="user-add" style={{marginBottom:'10px'}} onClick={()=>this.openModal(null,'Регистрация')}>
              {strings.Add}
              </Button> 
              <div className="xx-form-header">
                <Title level={4} style={{color:'#000000',textAlign:'left',fontFamily:'Montserrat',fontSize:'14pt',fontWeight:'bold'}}>{strings.ListModerators} </Title>
              </div>
              <Table 
                bordered={true} 
                columns={columns} 
                dataSource={this.props.admin.trainerTableData} 
                size="medium" 
                pagination={{ pageSize: 5 }}
                loading={this.props.admin.trainerTableLoadingStatus}
                rowKey="_id" 
              />;
              <Modal
                visible={this.props.admin.TrainermodalOpened}
                title={false}
                onOk={this.handleOk}
                onCancel={this.closeModal}
                style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                width="40%"
                destroyOnClose={true}
                footer={[
                  
                ]}
              >
                <NewTrainerForm />
              </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    admin : state.admin
});

export default connect(mapStateToProps,{
    ChangeTrainerSearchText,
    ChangeTrainerTableData,
    ChangeTrainerModalState,
    ChangeCompanyTableData,
    ChangeSelectedCompany
})(AllTrainer);