import React, { Component, useState, useEffect } from 'react';
import { Table, Button, Divider, Modal } from 'antd';
import { connect } from 'react-redux';
import Alert from '../../../components/common/alert';
import { 
    ChangeMaterialSearchText,
    ChangeMaterialTableData,
    ChangeMaterialModalState,
    ChangeAnswersSearchText,
    ChangeAnswersTableData,
    ChangeTestTableData,
    ChangeSlideTableData
} from '../../../actions/chapterAction';
import './chapters.css';
import { SecureGet, SecurePost } from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import SliderShow from './slider';
import Test from '../Testing/test';
import Result from '../Testing/result';
//import Alert from '../../../components/common/alert';
import  LocalizedStrings  from  'react-localization' ;

let strings = new LocalizedStrings({
  ru:{
    Names:"Наименование",
    Actions:"Действие",
    Learning:"Урок",
    Tests:"Тест",
    Results:"Результаты",
  },
  kz: {
    
  }
 });

function Mat(props){
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
  // const [disabled, setDisabled] = useState(props.chapter.slideTableData.flag);
  const [flag, setFlag] = useState(false);
  const [testflag, setTestFlag] = useState(false);

  
  useEffect(()=>{
    props.ChangeTestTableData(props.key1);
    props.ChangeSlideTableData(props.key1);
    props.ChangeAnswersTableData(props.key1);
    SecurePost({
      url : `${apis.UPDATE_MATERIAL}`,
      data : {
          _id : props.key1,
          m : 0

      }
    }) 
    // props.ChangeMaterialTableData(props.cid);
    // props.ChangeMaterialTableData(props.cid);
  }, [])


  const OpenslideModal = (id)=>{
    setMaterialId(id);
    setSlideModelVisible(true);
  }
 
  const CloseslideModal = ()=>{
    setMaterialId(null);
    setSlideModelVisible(false);
    props.ChangeMaterialTableData(props.cid);
  }

  const OpentestModal = (id)=>{
    setMaterialId(id);
    setTestModelVisible(true)
  }

  const ClosetestModal = (id)=>{
    setMaterialId(null);
    setTestModelVisible(false);
        SecurePost({
            url : `${apis.UPDATE_MATERIAL}`,
            data : {
                _id : id,
                m : 1
            }
        }) 
        props.ChangeMaterialTableData(props.cid);
  }

  
  const OpenresultModal = (id)=>{
    setMaterialId(id);
    setResultModelVisible(true);
  }
  
  const CloseresultModal = ()=>{
    setMaterialId(null);
    setResultModelVisible(false);
  }

    return(
      <div className="admin-table-container">
        {console.log('TEST:',props.chapter.AnswerTableData)}
        <Button disabled={props.matd.filter(d=>d._id==props.key1)[0].flag} type="primary" icon="" onClick={()=>OpenslideModal(props.key1)}>{strings.Learning}</Button>
        <Divider type="vertical" />
        <Button disabled={props.matd.filter(d=>d._id==props.key1)[0].testflag} type="primary" icon="" onClick={()=>OpentestModal(props.key1)}>{strings.Tests}</Button>
        <Divider type="vertical" />
        <Button type="primary" icon="" onClick={()=>OpenresultModal(props.key1)}>{strings.Results}</Button>
        <Modal
          visible={slideModelVisible}
          title="Урок"
          onCancel={CloseslideModal}
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
          onCancel={()=>ClosetestModal(materialId)}
          style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
          width="80%"
          destroyOnClose={true}
          footer={[]}
        >
          {/* {console.log("Aktilek:", this.props)} */}
          <Test materialDetails={props.matd} id={materialId} chid={props.id}
          // asn={this.props.chapter.AnswerTableData}
          />
        </Modal>

        <Modal
          visible={resultModelVisible}
          title="Результат"
          onCancel={CloseresultModal}
          style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
          width="80%"
          destroyOnClose={true}
          footer={[]}
        >
          <Result answerDetails={props.chapter.AnswerTableData} mid={materialId}/>
        </Modal>
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
      ChangeTestTableData,
      ChangeSlideTableData
  })(Mat);


