import React, { Component } from 'react';
import { Table, Input, Button, Typography, Divider, Icon, Modal, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { 
    ChangeCustomerSearchText,
    ChangeCustomerTableData,
    ChangeCustomerModalState,
    ChangeCompanyTableData,
    ChangeSelectedCompany,
    ChangeDivisionTableData,
    ChangeSelectedDivisions
} from '../../../actions/adminAction';
import './allcustomer.css'
import Alert from '../../../components/common/alert';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import NewCustomerForm from './newcustomer';

import  LocalizedStrings  from  'react-localization' ;
let strings = new LocalizedStrings({
  ru:{
    Reg:"Регистрация",
    Succes:"Успешно",
    Warning:"Предупреждение!",
    Error:"Ошибка!",
    ErrorServer:"Ошибка сервера",
    Search:"Поиск",
    FullName:"ФИО",
    Name:"name",
    SearchName:"по имени",
    Avatar:"Аватар",
    Email:"Эл. почта",
    SearchEmail:"эл.почты",
    Chapter:"Отдел",
    Company:"Компания",
    Action:"Действие",
    Save:"Сохранить",
    YouReallyWantThis:"Вы уверены?",
    No:"Нет",
    Yes:"Да",
    CostomerList:"Список пользователей",
    Cancel:"Отмена",
    Add: "Добавить"
  },
  kz: {
    Reg :"Тіркеу",
    Succes :"Сәтті",
    Warning :"Ескерту!",
    Error :"Қате!",
    ErrorServer :"Сервер қатесі",
    Search :"іздеу",
    FullName :"Аты-жөні",
    Name :"Аты",
    SearchName:"Атын",
    Avatar :"Аватар",
    Email :"Электрондық пошта",
    SearchEmail :"Эл. поштаны",
    Chapter :"Бөлім",
    Company :"Компания",
    Action :"Әрекет",
    Save :"Сақтау",
    YouReallyWantThis :"Сіз сенімдісіз бе?",
    No :"Жоқ",
    Yes :"Иә",
    CostomerList :"Пайдаланушылар тізімі",
    Cancel:"Болдырмау",
    Add: "Қосу"
  }
 });
class AllCustomer extends Component {

  constructor(props){
    super(props);
    this.state={
      CustomertableLoading : false
    }
  }

  openModal = (id,mode)=>{
    this.props.ChangeCustomerModalState(true, id, mode);
  }

  closeModal = ()=>{
    this.props.ChangeCustomerModalState(false,null,strings.Reg);
  }

  componentDidMount(){
    this.props.ChangeDivisionTableData();
    this.props.ChangeCompanyTableData(this.props.admin.selectedDivisions);
    this.props.ChangeCustomerTableData(this.props.admin.selectedCompany);
  }

  deleteCustomer = (id)=>{
    SecurePost({
      url : `${apis.DELETE_CUSTOMER}`,
      data : {
          _id : id
      }
    }).then((response)=>{
      if(response.data.success){
        Alert('success',strings.Succes,response.data.message);
        //this.props.ChangeCompanyTableData(this.props.admin.selectedDivisions);
        this.props.ChangeCustomerTableData(this.props.admin.selectedCompany);
      }
      else{
        return Alert('warning','strings.Warning',response.data.message);
      }
    }).catch((error)=>{
      return Alert('error',strings.Error,strings.ErrorServer);
    })
  }

  getColumnSearchProps = (dataIndex, searchText, split) => ({
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
    record[dataIndex]===null ? '' : (split==='' ? record[dataIndex] : record[dataIndex].name)
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
        searchWords={[this.props.admin.CustomersearchText]}
        autoEscape
        textToHighlight={text===null ? '' :text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.props.ChangeCustomerSearchText(selectedKeys[0])
  };

  handleReset = clearFilters => {
    clearFilters();
    this.props.ChangeCustomerSearchText('')
  };
      // handleDivisionChange =(s)=>{
      //   this.props.ChangeSelectedDivisions(s);
      //   this.props.ChangeCustomerTableData(s);
      // }

    render() {
      strings.setLanguage(this.props.lang)
      const { Title } = Typography;
      const columns = [
        
        {
          title: strings.FullName,
          dataIndex: 'name',
          key: 'name',
          width: '25%',
          ...this.getColumnSearchProps('name', strings.SearchName, ''),
        },
        {
          title: 'Аватар',
          dataIndex: 'avatar',
          key: 'avatar',
          width: '5%',
          render: (key) => (

            <div>
            <img src={key} style={{width: "60px",height: "60px",}} alt=""/>
                         
            </div>
          )
        },
        {
          title: strings.Email,
          dataIndex: 'emailid',
          key: 'emailid',
          width: '25%',
          ...this.getColumnSearchProps('emailid', strings.SearchEmail, ''),
        },  
        
        {
          title: strings.Chapter,
          dataIndex: 'division.name',
          key: 'division.name',
          width: '15%',
          ...this.getColumnSearchProps('division', strings.SearchEmail, 'name'),
        },
        
        {
          title: strings.Company,
          dataIndex: 'company.name',
          key: 'company.name',
          width: '15%',
          ...this.getColumnSearchProps('company', strings.SearchEmail, 'name'),
        },
        // {
        //   title: 'Права модератора',
        //   dataIndex: 'company.name',
        //   key: 'company.name',
        //   width: '15%',
        // },
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
                  onConfirm={()=>{this.deleteCustomer(key)}}
                  icon={<Icon type="delete" style={{ color: 'red' }} />}
                >
                  <Button type="danger" shape="circle" icon="delete" />
                </Popconfirm>
              
            </span>
          ),
        },
      ];
      var df = this.props.admin.trainerTableData.filter(d=>d._id==this.props.userDetails._id);
      
      var IDD = df.length!==0 ? df[0].company._id : null;
        return (
            <div className="admin-table-container">
              <Button type="primary" icon="user-add" style={{marginBottom:'10px'}} onClick={()=>this.openModal(null,'Регистрация')}>
              {strings.Add}
              </Button> 
              {console.log("CUSTOMERD:", IDD)}
              <div className="xx-form-header">
                <Title level={4} style={{color:'#000000',textAlign:'left',fontFamily:'Montserrat',fontSize:'14pt',fontWeight:'bold'}}>{strings.CostomerList}</Title>
              </div>
              <Table 
                bordered={true} 
                columns={columns} 
                dataSource={this.props.userDetails.type==='TRAINER' ? this.props.admin.customerTableData.filter(d => d.company._id===IDD) : this.props.admin.customerTableData} 
                size="medium" 
                pagination={{ pageSize: 5 }}
                loading={this.props.admin.customerTableLoadingStatus}
                rowKey="_id" 
              >
                
            </Table>;
              <Modal
                visible={this.props.admin.CustomermodalOpened}
                title={false}
                onOk={this.handleOk}
                onCancel={this.closeModal}
                style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                width="40%"
                destroyOnClose={true}
                footer={[
                  strings.setLanguage(this.props.lang)
                ]}
              >
                <NewCustomerForm />
              </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    admin : state.admin
});

export default connect(mapStateToProps,{
    ChangeCustomerSearchText,
    ChangeCustomerTableData,
    ChangeCustomerModalState,
    ChangeSelectedDivisions,
    ChangeDivisionTableData,
    ChangeCompanyTableData,
    ChangeSelectedCompany
})(AllCustomer);