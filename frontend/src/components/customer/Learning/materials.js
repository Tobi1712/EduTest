import React, { Component, useState, useEffect } from 'react';
import { Table, Button, Divider, Modal } from 'antd';
import { connect } from 'react-redux';
import { 
    ChangeMaterialSearchText,
    ChangeMaterialTableData,
    ChangeMaterialModalState,
    ChangeAnswersSearchText,
    ChangeAnswersTableData,
    // ChangeSlideTableData
} from '../../../actions/chapterAction';
import './chapters.css';
import { SecureGet } from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import SliderShow from './slider';
import Test from '../Testing/test';
import Result from '../Testing/result';
//import Alert from '../../../components/common/alert';
import  LocalizedStrings  from  'react-localization' ;
import Mat from './mat.js';

let strings = new LocalizedStrings({
  ru:{
    Names:"Наименование",
    Actions:"Действие",
    Learning:"Уроки",
    Tests:"Тест",
    Results:"Результаты"
  },
  kz: {
    Names:"Аты",
    Actions:"Әрекет",
    Learning:"Сабақтар",
    Tests:"Тест",
    Results:"Нәтижелер"
  }
 });


 function Materials(props){
// class Materials extends Component {
  // constructor(props){
  //   super(props);
  //   this.state={
  //     materialId : null,
  //     slideModelVisible : false,
  //     testModelVisible : false,
  //     resultModelVisible : false,
  //     details: null,
  //     loading:true,
  //     disabled:false,
  //   }
  // }
  const [materialId, setMaterialId] = useState(null);
  const [slideModelVisible, setSlideModelVisible] = useState(false);
  const [testModelVisible, setTestModelVisible] = useState(false);
  const [resultModelVisible, setResultModelVisible] = useState(false);
  const [details, setDetails] = useState(null);
  const [disabled, setDisabled] = useState(props.chapter.slideTableData.flag);
  // console.log("Disable:", disabled);


  // const OpendetailsModal = (id)=>{
  //   setMaterialId(id);
  //   setSlideModelVisible(true);
  // }
  
  // const ClosedetailsModal = ()=>{
  //   setMaterialId(null);
  //   setSlideModelVisible(false);
  // }

  // const OpentestModal = (id)=>{
  //   setMaterialId(id);
  //   setTestModelVisible(true);
  // }

  // const ClosetestModal = ()=>{
  //   setMaterialId(null);
  //   setTestModelVisible(false);
  // }

  
  // const OpenresultModal = (id)=>{
  //   setMaterialId(id);
  //   setResultModelVisible(true);
  // }
  
  // const CloseresultModal = ()=>{
  //   setMaterialId(null);
  //   setResultModelVisible(false);
  // }


  useEffect(()=>{
    var ID = props.id;
    props.ChangeMaterialTableData(ID);

    // console.log("SSSSSSSSS:",props.chapter.materialTableData._id)
    // props.ChangeAnswersTableData("62b459718278d60bb54cae1d");
    SecureGet({
       url: `${apis.GET_SINGLE_CHAPTER_DETAILS}/${ID}`,
    }).then((response)=>{
      console.log(response.data.data[0]);
      setDetails(response.data.data[0]);

    }).catch((error)=>{
      console.log(error);
    });
    console.log("ID:", props.chapter.materialTableData)
  }, [])

    const columns = [
      {
        title: '№',
        dataIndex: 'num',
        key: 'num',
        width: '5%',
      },   
      {
        title: strings.Names,
        dataIndex: 'topic',
        key: 'topic',
        width: '5%',
      },   
      {
        title: strings.Actions,
        key: '_id',
        dataIndex: '_id',
        width: '25%',
        render: (key) => (
          <Mat matd={props.chapter.materialTableData} key1={key} slidet={props.chapter.slideTableData} cid={props.id}/>
          // <span>
          //   <Button disabled={disabled} type="primary" icon="" onClick={()=>OpendetailsModal(key)}>{strings.Learning}</Button>
          //   <Divider type="vertical" />
          //   <Button disabled={disabled} type="primary" icon="" onClick={()=>OpentestModal(key)}>{strings.Tests}</Button>
          //   <Divider type="vertical" />
          //   <Button disabled={disabled} type="primary" icon="" onClick={()=>OpenresultModal(key)}>{strings.Results}</Button>
          // </span>
        ),
      },
    ];

    return(
      // <Mat matd={props.chapter.materialTableData}/>
      <div className="admin-table-container">
        <Table 
          bordered={true} 
          columns={columns} 
          dataSource={props.chapter.materialTableData} 
          size="medium" 
          pagination={{ pageSize: 5 }}
          loading={props.chapter.materialTableLoadingStatus}
          rowKey="_id" 
        />

        {/* <Modal
          visible={slideModelVisible}
          title="Урок"
          onCancel={ClosedetailsModal}
          style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
          width="85%"
          destroyOnClose={true}
          footer={[]}
        >
          <SliderShow id={materialId}/>
        </Modal>

        <Modal
          visible={testModelVisible}
          title="Тест"
          onCancel={ClosetestModal}
          style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
          width="80%"
          destroyOnClose={true}
          footer={[]}
        >
          {/* {console.log("Aktilek:", this.props)} */}
          {/* <Test materialDetails={props.chapter.materialTableData} id={materialId} chid={props.id}
          // asn={this.props.chapter.AnswerTableData}
          /> */}
        {/* </Modal>

        <Modal
          visible={resultModelVisible}
          title="Результат"
          onCancel={CloseresultModal}
          style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
          width="80%"
          destroyOnClose={true}
          footer={[]}
        >
          <Result answerDetails={props.chapter.AnswerTableData}/>
        </Modal> */} 
      </div>
    )
  
}

const mapStateToProps = state => ({
  chapter : state.chapter
});

export default connect(mapStateToProps,{
    ChangeMaterialSearchText,
    ChangeMaterialTableData,
    ChangeMaterialModalState,
    ChangeAnswersSearchText,
    ChangeAnswersTableData,
    // ChangeSlideTableData
})(Materials);


