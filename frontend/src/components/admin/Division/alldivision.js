import React, { Component } from 'react';
import { Table, Input, Button, Typography, Divider, Icon, Modal, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { 
    ChangeDivisionSearchText,
    ChangeDivisionTableData,
    ChangeDivisionModalState,
    ChangeCompanyTableData,
    ChangeSelectedCompany,
    ChangeTrainerTableData
} from '../../../actions/adminAction';
import './alldivision.css'
import Alert from '../../../components/common/alert';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import NewDivisionForm from './newdivision';
import  LocalizedStrings  from  'react-localization' ;
let strings = new LocalizedStrings({
  ru:{
    Reg: "Регистрация",
    Succes: "Успешно",
    Warning: "Предупреждение",
    Error: "Ошибка",
    ErrorServer: "Ошибка сервера",
    Search: "Поиск",
    Cancel: "Отмена",
    Name: "Название",
    SearchName: "по названию",
    Description: "Описание",
    SearchDescr: "по описанию",
    Company: "Компания",
    Action: "Действие",
    Save: "Сохранить",
    YouReallyWantThis: "Вы уверены？",
    No: "Нет",
    Yes: "Да",
    Add: "Добавить",
    ListDepartament: "Список отделов"
  },
  kz: {
    Reg :"Тіркеу",
    Succes :"Сәтті",
    Warning :"Ескерту",
    Error :"Қате",
    ErrorServer :"Сервер қатесі",
    Search :"іздеу",
    Cancel :"Болдырмау",
    Name :"Аты",
    SearchName :"Атын",
    Description :"Сипаттамасы",
    SearchDescr :"сипаттамалар",
    Company :"Компания",
    Action :"Әрекет",
    Save :"Сақтау",
    YouReallyWantThis :"Сенімдісің бе?",
    No :"Жоқ",
    Yes :"Иә",
    Add :"Қосу",
    ListDepartament :"Бөлімдердің тізімі",
    
  }
 });

class AllDivision extends Component {
  constructor(props){
    super(props);
    this.state={
      DivisiontableLoading : false
    }
  }
 
  openModal = (id,mode)=>{
    this.props.ChangeDivisionModalState(true,id,mode);
  }

  closeModal = ()=>{
    this.props.ChangeDivisionModalState(false,null,strings.Reg);
  }

  componentDidMount(){
    this.props.ChangeCompanyTableData();
    this.props.ChangeDivisionTableData(this.props.admin.selectedCompany);
    this.props.ChangeTrainerTableData(this.props.userDetails._id);
  }

  
  deleteDivision = (id)=>{
    SecurePost({
      url : `${apis.DELETE_DIVISION}`,
      data : {
          _id : id
      }
    }).then((response)=>{
      if(response.data.success){
        Alert('success',strings.Succes,response.data.message);
        this.props.ChangeDivisionTableData();
      }
      else{
        return Alert('warning',strings.Warning,response.data.message);
      }
    }).catch((error)=>{
      return Alert('error',strings.Error,strings.ErrorServer);
    })
  }

  getColumnSearchProps = (dataIndex, searchText , split) => ({
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
        searchWords={[this.props.admin.DivisionsearchText]}
        autoEscape
        textToHighlight={text===null ? '' : text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.props.ChangeDivisionSearchText(selectedKeys[0])
  };

  handleReset = clearFilters => {
    clearFilters();
    this.props.ChangeDivisionSearchText('')
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
        ...this.getColumnSearchProps('name', strings.SearchName, ''),
      },
      {
        title: strings.Description,
        dataIndex: 'description',
        key: 'description',
        width: '25%',
        ...this.getColumnSearchProps('description', strings.searchDescr, ''),
      },   
      {
        title: strings.Company,
        dataIndex: 'company.name',
        key: 'company.name',
        width: '25%',
        ...this.getColumnSearchProps('company', strings.searchDescr, 'name'),
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
                onConfirm={()=>{this.deleteDivision(key)}}
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
          <div className="xx-form-header">
            <Title level={4} style={{color:'#000000',textAlign:'left',fontFamily:'Montserrat',fontSize:'14pt',fontWeight:'bold'}}>{strings.ListDepartament}</Title>
          </div>
          <Table 
            bordered={true} 
            columns={columns} 
            dataSource={this.props.admin.divisionTableData} 
            size="medium" 
            pagination={{ pageSize: 5 }}
            loading={this.props.admin.divisionTableLoadingStatus}
            rowKey="_id" 
          />;
          <Modal
            visible={this.props.admin.DivisionmodalOpened}
            title={false}
            onOk={this.handleOk}
            onCancel={this.closeModal}
            style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
            width="40%"
            destroyOnClose={true}
            footer={[
            
            ]}
          >
            <NewDivisionForm />
          </Modal>
        </div>
      )
    }
}

const mapStateToProps = state => ({
    admin : state.admin
});

export default connect(mapStateToProps,{
    ChangeDivisionSearchText,
    ChangeDivisionTableData,
    ChangeDivisionModalState,
    ChangeCompanyTableData,
    ChangeSelectedCompany,
    ChangeTrainerTableData
})(AllDivision);