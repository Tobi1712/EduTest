import React, { Component } from 'react';
import { Table, Input, Button, Typography, Modal, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { 
    ChangeTestSearchText,
    ChangeTestTableData,
    // ChangeTestModalState,
    ChangeMaterialTableData,
} from '../../../actions/chapterAction';
import '../Learning/chapters.css';
// import {SecurePost, SecureGet} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import Materials from '../Learning/materials';
import  LocalizedStrings  from  'react-localization' ;
let strings = new LocalizedStrings({
  ru:{
    Add:"Добавить",
    Search:"Поиск",
    Cancel:"Отмена",
    SearchTest:"теста",
    Discr:"Описание",
    SearchDiscr:"описания",
    Action:"Действие",
    Materials:"Материалы",
    MyTests:"Мои тесты",
  },
  kz: {
    
  }
 });
class History extends Component {
  constructor(props){
    super(props);
    this.state={
      chapterId : null,
      historyModelVisible:false
      // CompanytableLoading : false,
    }
  }

  OpendetailsModal = (id)=>{
    this.setState((previousState,previousProps)=>{
       console.log(id)
      return{
        chapterId:id,
        historyModelVisible:true
      }
    })
  }

  ClosedetailsModal = ()=>{
    this.setState((previousState,previousProps)=>{
      return{
        chapterId:null,
        historyModelVisible:false
      }
    })
  }

  componentDidMount(){
    this.props.ChangeTestTableData();
  }


  // openModal = (id,mode)=>{
  //   this.props.ChangeTestModalState(true, id, mode);
  // }

  // closeModal = ()=>{
  //   this.props.ChangeTestModalState(false, null, strings.Add);
  // }



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
        // render: text => (
        //   <Highlighter
        //     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //     searchWords={[this.props.chapter.HistorysearchText]}
        //     autoEscape
        //     textToHighlight={text===null ? '' :text.toString()}
        //   />
        // ),
      });
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.props.ChangeTestSearchText(selectedKeys[0])
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.props.ChangeTestSearchText('')
      };
      // handleChapterChange =(s)=>{
      //   this.props.ChangeChapterTableData(s);
      // }

    render() {
      const { Title } = Typography;
      const columns = [
      
        {
          title: 'Start Test',
          dataIndex: 'startTest',
          key: 'startTest',
          width: '20%',
          ...this.getColumnSearchProps('startTest'),
        },
        {
          title: strings.Discr,
          dataIndex: 'material',
          key: 'material',
          width: '30%',
          ...this.getColumnSearchProps('material'),
        },    
        
        {
          title: strings.Action,
          key: '_id',
          dataIndex: '_id',
          width: '30%',
          render: (key) => (
            <span>
                <Button type="primary" icon="" onClick={()=>this.OpendetailsModal(key)}>{strings.Materials}</Button>
            </span>
          ),
        },
      ];
        return (
            <div className="admin-table-container">
              <div className="register-chapter-form-header">
                <Title level={4} style={{color:'#000000',textAlign:'left',fontFamily:'Montserrat',fontSize:'14pt',fontWeight:'bold'}}>{strings.MyTests}</Title>
              </div>
              <Table 
                bordered={true} 
                columns={columns} 
                dataSource={this.props.chapter.testTableData} 
                size="medium" 
                pagination={{ pageSize: 5 }}
                loading={this.props.chapter.testTableLoadingStatus}
                rowKey="_id" 
              ></Table>
              
              <Modal
                visible={this.state.historyModelVisible}
                title="Материалы"
                onCancel={this.ClosedetailsModal}
                style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                width="70%"
                destroyOnClose={true}
                footer={[]}
              >
              <Materials id={this.state.chapterId} />
              </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  chapter : state.chapter
});

export default connect(mapStateToProps,{
    ChangeTestSearchText,
    ChangeTestTableData,
    // ChangeTestModalState,
    ChangeMaterialTableData,
})(History);