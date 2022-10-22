import React, { Component } from 'react';
import { Table, Input, Button, Typography, Divider,Icon, Modal, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { 
    ChangeCompanySearchText,
    ChangeCompanyTableData,
    ChangeCompanyModalState
} from '../../../actions/adminAction';
import './allcompany.css'
import Alert from '../../../components/common/alert';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import moment from 'moment';
import NewCompanyForm from './newcompany';

import  LocalizedStrings  from  'react-localization' ;
let strings = new LocalizedStrings({
  ru:{
    Reg:"Регистрация",
    Succes:"Успешно",
    Warning:"Предупреждение",
    Error:"Ошибка!",
    ErrorServer:"Ошибка сервера",
    Search:"Поиск",
    Name:"Наименование",
    NameSearch:"наименования",
    Logo:"Логотип",
    Description:"Описание",
    DescriptionSearch:"описания",
    Date1:"Дата начала действия лицензии",
    Date2:"Дата окончания действия лицензии",
    Licensed:"Количество лицензированных пользователей",
    Users:"кол-во пользователей",
    UsedAccounts:"Количество использованных учетных записей в рамках лицензии",
    Accounts:"кол-во уч-записей",
    Contact:"Контактное лицо",
    SearchContact:"контактов",
    Action:"Действие",
    Save:"Сохранить",
    YouReallyWantThis:"Вы уверены？",
    No:"Нет",
    Yes:"Да",
    Add:"Добавить",
    ListCompany:"Список компании",
    Cancel:"Отмена"
  },
  kz: {
    Reg :"Тіркеу",
    Succes :"Сәтті",
    Warning :"Ескерту",
    Error :"Қате!",
    ErrorServer :"Сервер қатесі",
    Search :"Іздеу",
    Name :"Аты",
    NameSearch :"аттар",
    Logo :"Логотип",
    Description :"Сипаттама",
    DescriptionSearch :"Сипаттама іздеу",
    Date1 :"Лицензияның басталу күні",
    Date2 :"Лицензияның жарамдылық мерзімі",
    Licensed :"Лицензияланған пайдаланушылар саны",
    Users :"пайдаланушылардың саны",
    UsedAccounts :"Лицензиядағы пайдаланылған тіркелгілердің саны",
    Accounts :"аккаунттардың саны",
    Contact :"Байланыстағы тұлға",
    SearchContact :"контактілер",
    Action :"Әрекет",
    Save :"Сақтау",
    YouReallyWantThis :"Сіз сенімдісіз бе?",
    No :"Жоқ",
    Yes :"Иә",
    Add :"Қосу",
    ListCompany :"Компаниялар тізімі",
    Cancel:"Болдырмау"
  }
 });
class AllCompany extends Component {

  constructor(props){
    super(props);
    this.state={
      CompanytableLoading : false
    }
  }

  openModal = (id,mode)=>{
    this.props.ChangeCompanyModalState(true, id, mode);
  }

  closeModal = ()=>{
    this.props.ChangeCompanyModalState(false,null,strings.Reg);
  }

  componentDidMount(){
    this.props.ChangeCompanyTableData();
  }

  deleteCompany = (id)=>{
    SecurePost({
      url : `${apis.DELETE_COMPANY}`,
      data : {
          _id : id
      }
    }).then((response)=>{
      if(response.data.success){
        Alert('success',strings.Succes,response.data.message);
        this.props.ChangeCompanyTableData();
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
              placeholder={`${strings.Search}${dataIndex}`}
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
            searchWords={[this.props.admin.CompanysearchText]}
            autoEscape
            textToHighlight={text===null ? '' :text.toString()}
          />
        ),
      });
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.props.ChangeCompanySearchText(selectedKeys[0])
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.props.ChangeCompanySearchText('')
      };
      handleDivisionChange =(s)=>{
        this.props.ChangeSelectedDivisions(s);
        this.props.ChangeCompanyTableData(s);
      }

    render() {

      strings.setLanguage(this.props.lang)
      const { Title } = Typography;
      const columns = [
      
        {
          title: strings.Name,
          dataIndex: 'name',
          key: 'name',
          width: '5%',
          ...this.getColumnSearchProps('name'),
        },
        
        {
            title: strings.Logo,
            dataIndex: 'logo',
            key: 'logo',
            width: '5%',
            render: (key) => (
  
              <div>
              <center><img className="display" src={key} style={{height: "60px",}} alt=""/></center>
                      
              </div>
            )
          },

        {
          title: strings.Description,
          dataIndex: 'descr',
          key: 'descr',
          width: '20%',
          ...this.getColumnSearchProps('descr'),
        },  
        
        {
          title: strings.Date1,
          dataIndex: 'licFromDate',
          key: 'licFromDate',
          width: '10%',
          render: (key) => (
            <span>
              {moment(new Date(key)).format("DD.MM.YYYY")}
            </span>
          ),
          // filterComponent: (props) => <CustomDatePicker {...props} />
        },

        {
          title: strings.Date2,
          dataIndex: 'licToDate',
          key: 'licToDate',
          width: '10%',
          render: (key) => (
            <span>
              {moment(new Date(key)).format("DD.MM.YYYY")}
            </span>
          ),
        }, 
        {
          title: strings.Licensed,
          dataIndex: 'numOfLic',
          key: 'numOfLic',
          width: '10%',
          ...this.getColumnSearchProps('numOfLic'),
        },
          
        {
          title: strings.UsedAccounts,
          dataIndex: 'numOfLicAcc',
          key: 'numOfLicAcc',
          width: '10%',
          ...this.getColumnSearchProps('numOfLicAcc'),
        }, 
          
        {
          title: strings.Contact,
          dataIndex: 'contact',
          key: 'contact',
          width: '10%',
          ...this.getColumnSearchProps('contact'),
        }, 
        {
          title: strings.Action,
          key: '_id',
          dataIndex: '_id',
          width: '20%',
          render: (key) => (
            <span>
              <Button type="primary" shape="circle" icon="edit" onClick={()=>this.openModal(key,strings.Save)}/>
                <Divider type="vertical" />
                <Popconfirm
                  title={strings.YouReallyWantThis}
                  cancelText={strings.No}
                  okText={strings.Yes}
                  onConfirm={()=>{this.deleteCompany(key)}}
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
              <Button type="primary" icon="user-add" style={{marginBottom:'10px'}} onClick={()=>this.openModal(null,strings.Reg)}>
              {strings.Add }
              </Button> 
              
              <div className="xx-form-header">
                <Title level={4} style={{color:'#000000',textAlign:'left',fontFamily:'Montserrat',fontSize:'14pt',fontWeight:'bold'}}>{strings.ListCompany}</Title>
              </div>
              <Table 
                bordered={true} 
                columns={columns} 
                dataSource={this.props.admin.companyTableData} 
                size="medium" 
                pagination={{ pageSize: 5 }}
                loading={this.props.admin.companyTableLoadingStatus}
                rowKey="_id" 
              >

            </Table>;
              <Modal
                visible={this.props.admin.CompanymodalOpened}
                title={false}
                onOk={this.handleOk}
                onCancel={this.closeModal}
                style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                width="40%"
                destroyOnClose={true}
                footer={[
                  
                ]}
              >
                <NewCompanyForm lang={this.props.lang}/>
              </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    admin : state.admin
});

export default connect(mapStateToProps,{
    ChangeCompanySearchText,
    ChangeCompanyTableData,
    ChangeCompanyModalState,
    
})(AllCompany);