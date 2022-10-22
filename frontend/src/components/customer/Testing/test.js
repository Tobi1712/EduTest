import React, { Component, useState,useEffect } from 'react'
import { connect } from 'react-redux';
import { Button } from 'antd';
import  { css } from 'styled-components/macro'
import { 
  ChangeTestSearchText,
  ChangeTestTableData,
  ChangeAnswersSearchText,
  ChangeAnswersTableData,
} from '../../../actions/chapterAction';
import Alert from '../../../components/common/alert';
import { SecurePost } from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import TestPage from './testpage';
import styled from "styled-components";
import "react-multi-carousel/lib/styles.css";
//import Counter from './Counter';

import  LocalizedStrings  from  'react-localization' ;
let strings = new LocalizedStrings({
  ru:{
    Succes:"Успешно",
    Warning:"Предупреждение!",
    Err:"Ошибка!",
    ErrorServer:"Ошибка сервера",
    Testing:"Тестирование",
    GoTest:"Начать тест",
    ContTest:"Продолжить тест",
  },
  kz: {
    Succes:"Сәтті",
    Warning:"Ескерту!",
    Err:"Қате!",
    ErrorServer:"Сервердің қатесі",
    Testing:"Тестілеу",
    GoTest:"Тесттi бастау",
    ContTest:"Тесттi жалғастыру",
  }
 });
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  width: 100%;
  /*background: #7159c1;*/
`;

const ScreenQuiz = styled.div`
  display: flex;
  justify-content: ${props => (props.screen ? "space-between" : "center")};
  align-items: center;
  flex-direction: column;
  max-width: 1200px;
  padding: ${props => (props.screen ? "5rem" : ".5rem")};
  width: 100%;
  height: 80vh;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 5px 40px -20px #000;

`;

const Title = styled.h1`
  font-size: 2.5rem;
  // color: #7159c1;
  margin-bottom: 0.5rem;
  text-align: center;
  max-width: 90%;
`;

// const Paragraph = styled.p`
//   font-size: 1.5rem;
// `;

// const Button = styled.button`
//   font-size: 1.2rem;
//   font-weight: bold;
//   width: 40%;
//   height: 3rem;
//   // color: #fff;
//   border: none;
//   // background: #7159c1;
//   border-radius: 5px;
//   box-shadow: 0px 3px 3px 0px #666;

//   @-webkit-keyframes pulsate {
//     0% {transform: scale(0.1, 0.1); opacity: 0.0;}
//     50% {opacity: 1.0;}
//     100% {transform: scale(7, 7); opacity: 0.0;}
// }
// `;

const ButtonScr = styled.button`
  font-size: 1.4rem;
  z-index: 10;
  position: fixed;
  top: 15%;
  ${(props) =>
    props.right
      ? css`
          right: 25rem;
        `
      : css`
          left: 25rem;
        `}
`

const ContainerLabel = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin: 0 auto 0.5rem auto;
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Radio = styled.input.attrs({ type: 'checkbox' })`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 7.5px solid black;
  margin: 0 0.5rem 0 0;
  background: ${props => (props.clickedLabel ? "#7159c1" : "#fff")};
`;

// const IntoRadio = styled.div`
//   width: 5px;
//   height: 5px;
//   border-radius: 3px;
//   background: #fff;
// `;

// const Error = styled.div`
//   top: 22rem;
//   color: red;
//   position: absolute;
//   font-weight: bold;
// `;


function Test(props){
  const [loading, setLoading] = useState(false)
  const [screen, setScreen] = useState(true);
  const [count, setCount] = useState(0)
  const [answer, setAnswer] = useState(0);
  const [matId, setMatId] = useState(props.id);
  const [disableButton, setDisableButton] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [testDidNotStart, setTestDidNotStart] = useState(true);
  const [testCreated, setTestCreated] = useState(false);
  const [startDate, setStartDate] = useState(Date());

  useEffect(()=>{
    props.ChangeTestTableData(matId);
    props.ChangeAnswersTableData(matId);
    // if(props.chapter.testTableData!==undefined){
    //   console.log("INIF",props.chapter.testTableData)
    //   if(props.chapter.testTableData.startTest==='true'){
    //     setTestStarted(true);
    //   }
    // }
  }, [])

  const renderInitial = () => {
    console.log("ANSWERTABLE",props.chapter.AnswerTableData)
    if(props.chapter.AnswerTableData.length===0){ 
      Alert("warning", 'Для этого теста еще не создано ни одного вопроса')
      setScreen(true);

      SecurePost({
        url : `${apis.UPDATE_TEST}`,
        data : {
          _id: props.chapter.testTableData._id,
          startTest: false,
          endTest: false,
          result: 15
        }
      })
    }

    if(props.chapter.testTableData!==null && props.chapter.testTableData!==undefined) {
      console.log(props.chapter.testTableData)

      if (new Date(props.chapter.testTableData.complationDate).getTime() < new Date().getTime() || props.chapter.testTableData.endTest===true){
        setScreen(true);
        Alert('warning', 'Время вышло. Тест завершен')

        SecurePost({
          url : `${apis.UPDATE_TEST}`,
          data : {
            _id: props.chapter.testTableData._id,
            startTest: false,
            endTest: true,
            result: 15
          }
        })
      } 
      else{
        setScreen(false)
        SecurePost({
          url : `${apis.UPDATE_TEST}`,
          data : {
            _id: props.chapter.testTableData._id,
            startTest: true,
            endTest: false,
            result: 15
          }
        })
      };
      setCount(1);
      // SecurePost({
      //   url : `${apis.UPDATE_TEST}`,
      //   data : {
      //     _id: props.chapter.testTableData._id,
      //     startTest: true,
      //     endTest: false,
      //     result: 15
      //   }
      // })
      console.log(props.chapter.testTableData)
    };
    console.log(props.chapter.testTableData)
  };

  const createTestData = () => {
    console.log("createTestData", matId)
    if((props.chapter.testTableData === undefined) /*|| (props.chapter.testTableData.materialid!==matId )*/){
      console.log("SDFDFGH")
      SecurePost({
        url : `${apis.CREATE_TEST}`,
        data : {
          _id: props.chapter.testId,
          chapterid : props.chid,
          materialid : props.id,
          startDate : startDate,
          complationDate : startDate,
          startTest: testStarted,
          endTest: testEnded,
          result: 0
        }
      })
    }
    console.log("SDF", props.chapter.testTableData)
    SecurePost({
      url : `${apis.CREATE_ANSWERS}`,
      data : {
        materialId : props.id,
        testid : (props.chapter.testTableData!==null || props.chapter.testTableData!==undefined) ? null : props.chapter.testTableData._id,
      }
    });

    return renderScreenInitial();
  }

  const renderScreenInitial = ()=>{
    if (testStarted==false){
      
      return (
        <Container>
          <ScreenQuiz screen={screen}>
            <Title>Тестирование</Title>
            <Button 
              onClick={
                renderInitial
              } 
              style={{
                fontSize: "1.2rem", 
                fontWeight: "bold",
                width: "40%",
                height: "3rem",
                border: "none",
                borderRadius: "5px",
                boxShadow: "0px 3px 3px 0px #666"
              }}
              >
                Начать тест
            </Button>
            
          </ScreenQuiz>
        </Container>
      );
    } 
    else if (testStarted==true){
      return (
        <Container>
          <ScreenQuiz screen={screen}>
            <Title>Тестирование</Title>
            <Button 
              onClick={renderInitial} 
              style={{
                fontSize: "1.2rem", 
                fontWeight: "bold",
                width: "40%",
                height: "3rem",
                border: "none",
                borderRadius: "5px",
                boxShadow: "0px 3px 3px 0px #666"
              }}
              >
                Продолжить тест
            </Button>
          </ScreenQuiz>
        </Container>
      );
    }
  }

  console.log("Screen",screen);
  return screen ? createTestData() : 
    <TestPage t={props.chapter.testTableData} q={props.chapter.AnswerTableData} id={props.id} count={count} screen={screen} answer={answer} chid={props.chid} tend={testEnded}/>
  }

const mapStateToProps = state => ({
    chapter : state.chapter
});

export default connect(mapStateToProps,{
    ChangeTestSearchText,
    ChangeTestTableData,
    ChangeAnswersSearchText,
    ChangeAnswersTableData
})(Test);
