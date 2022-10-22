import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'antd';
import  { css } from 'styled-components/macro'
import { SecurePost } from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import styled from "styled-components";
import Counter from './Counter';
import Alert from '../../../components/common/alert';

import  LocalizedStrings  from  'react-localization' ;
let strings = new LocalizedStrings({
  ru:{
    Save:"Сохранить",
    EndTest:"Завершить тест",
    Next:"Следующий",
    Prev:"Предыдущий",
    TestEnded:"Тест завершен",
  },
  kz: {
    Save:"Сақтау",
    EndTest:"",
    Next:"",
    Prev:"",
    TestEnded:"",
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

const Paragraph = styled.p`
  font-size: 1.5rem;
`;

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
  background: ${props => (props.clickedLabel ? "#97c222" : "#fff")};
`;

export default function TestPage(props) {
    const [questions, setQuestions] = useState([])
    const [count, setCount] = useState(props.count);
    const [checked, setChecked] = useState(false)
    const [clickedLabel, setClickedLabel] = useState([]);
    const [answer, setAnswer] = useState(props.answer);
    const [isEnd, setIsEnd] = useState(props.tend);
    const [disableButton, setDisableButton] = useState(props.disableButton);
    // const [screenFinish, setScreenFinish] = useState(props.screenFinish);
    const [screen, setScreen] = useState(props.screen);
    const materialId = props.id;

    const handleNextClick=(c)=>{
      setCount(count+1);
      setChecked(false);
    }

    const handlePrevClick=()=>{
      if (questions.length >= count && count>0) {
        setCount(count-1);
        setChecked(false);
      } 
    }

    const handleClick = (c)=> {
      if (questions.length >= count && clickedLabel.answerText) {
        setQuestions(questions);
        setCount(c+1);
        setClickedLabel(clickedLabel.correctAnswer ? answer + 1 : answer);
        var ansArray=[]

        ansArray ={
          _id:questions[c]._id,
          options:[
            {answers: questions[c].answerOptions[0].answerText,isAnswer: questions[c].answerOptions[0].correctAnswer,userAnswer: questions[c].answerOptions[0].UserAnswer},
            {answers: questions[c].answerOptions[1].answerText,isAnswer: questions[c].answerOptions[1].correctAnswer,userAnswer: questions[c].answerOptions[1].UserAnswer},
            {answers: questions[c].answerOptions[2].answerText,isAnswer: questions[c].answerOptions[2].correctAnswer,userAnswer: questions[c].answerOptions[2].UserAnswer},
            {answers: questions[c].answerOptions[3].answerText,isAnswer: questions[c].answerOptions[3].correctAnswer,userAnswer: questions[c].answerOptions[3].UserAnswer},
            {answers: questions[c].answerOptions[4].answerText,isAnswer: questions[c].answerOptions[4].correctAnswer,userAnswer: questions[c].answerOptions[4].UserAnswer},
          ]
        }
        console.log("AAAAAAAAAAAAAAAAAAA",ansArray.options)
        var cnt = 0;
        ansArray.options.map((d, i)=>{
          cnt += d.userAnswer
        })
        if(cnt>0){
          const modal = Modal.success({
            title: 'Ответ сохранен',
          });

          setTimeout(() => {
            modal.destroy();
          }, 1000);
        }
        SecurePost({
          url : `${apis.UPDATE_ANSWER}`,
          data : {
            ansId:props.q[0]._id,
            testid: props.q[0].testid,
            c:c,
            chosenOption:ansArray
          }
        });
      }
    }

    const handleEndClick = (c)=> {
      console.log('t', props.t)
      setIsEnd(true)
      SecurePost({
        url : `${apis.UPDATE_TEST}`,
        data : {
          _id: props.t._id,
          startTest: false,
          endTest: true,
        }
      })
    }

    const handleOptions = (answerOptions,c) => {
    //   const { clickedLabel,questions } = this.state;
      return answerOptions.map((a, i) => {
        return (
          <Label
            key={i}
            onClick={() =>{
              setQuestions(questions);
              setClickedLabel(a);
            }
          }
          >
            { questions[c].isOneTrueAnswer===false ?
            <Radio 
              checked={a.UserAnswer} 
              onChange={e => handleChange(e,answerOptions, c,i)}
            />
            :
            <Radio  
              checked={a.UserAnswer}
              onChange={e => handleChange2(e,answerOptions, c,i)}
            />
            }
            <Paragraph>{a.answerText}</Paragraph>
          </Label>
          
        );
      });
    };

    const handleChange = (e,answerOptions, c, i) => {
      questions[c].answerOptions[i].UserAnswer=true;
      setQuestions(questions)
    };

    const handleChange2 = (e,answerOptions, c, i) => {
      questions[c].answerOptions[i].UserAnswer=true;

      if(questions[c].answerOptions[i].UserAnswer===true){
        answerOptions.map((d,j) =>{
          if(i!==j){
            questions[c].answerOptions[j].UserAnswer=false;
          }
        })
      }
      setQuestions(questions)
    };

    const renderQuestions = () => {
      const NewQuestions = Array.from(questions);
      const removeQuestions = NewQuestions.slice(count-1, count);
      return removeQuestions.map((q, i) => (

        <Container key={i}>
          {!isEnd && (
            <ScreenQuiz>    
              <Counter mid={materialId} chid={props.chid}/>
                <h3>{count}/{questions.length}</h3>
                <Title>{q.question}</Title>         
                <ContainerLabel>
                  {handleOptions(q.answerOptions, count-1)}
                </ContainerLabel>
                <Button onClick={()=>handleClick(count-1)}
                  style={{
                    background: 'green',
                    fontSize: "1.2rem", 
                    fontWeight: "bold",
                    width: "40%",
                    height: "3rem",
                    border: "none",
                    borderRadius: "5px",
                    boxShadow: "0px 3px 3px 0px #666"
                  }}
                >
                  {strings.Save}
                </Button>
                { count===questions.length &&(
                <Button onClick={
                  handleEndClick
                }
                  style={{
                    background: "black",
                    color: "white",
                    font: "Montserrat",
                    marginTop: '30px',
                    fontSize: "1.2rem", 
                    fontWeight: "bold",
                    width: "40%",
                    height: "3rem",
                    border: "none",
                    borderRadius: "5px",
                    boxShadow: "0px 3px 3px 0px #666"
                  }}
                >
                  {strings.EndTest}
                </Button>
                )}
                  <ButtonScr onClick={()=>handleNextClick(count)} right disabled={count === questions.length} style={{align:'right'}}>{strings.Next}</ButtonScr>
                  <ButtonScr onClick={handlePrevClick} left disabled={count===1} style={{align:'left'}}>{strings.Prev}</ButtonScr>
              </ScreenQuiz>
            )}
            {
              isEnd && (
                <Title>{strings.TestEnded}</Title> 
              )
            }
        </Container>

      ));
    };
  


    useEffect(()=>{
      console.log("1 - props",props.q);
      var questions1=[];
      props.q.length!==0 ? props.q[0].chosenOption.map((d,i)=>{
        questions1[i]=(
          {
            _id: d._id,
            question : d.questionText,
            isOneTrueAnswer : (d.options[0].isAnswer + d.options[1].isAnswer + d.options[2].isAnswer + d.options[3].isAnswer 
                              + d.options[4].isAnswer)===1 ? true : false,
            answerOptions: [
                            { answerText: d.options[0].answers, UserAnswer: d.options[0].userAnswer, correctAnswer: d.options[0].isAnswer },
                            { answerText: d.options[1].answers, UserAnswer: d.options[1].userAnswer, correctAnswer: d.options[1].isAnswer },
                            { answerText: d.options[2].answers, UserAnswer: d.options[2].userAnswer, correctAnswer: d.options[2].isAnswer },
                            { answerText: d.options[3].answers, UserAnswer: d.options[3].userAnswer, correctAnswer: d.options[3].isAnswer },
                            { answerText: d.options[4].answers, UserAnswer: d.options[4].userAnswer, correctAnswer: d.options[4].isAnswer }
            ]
          }
        )
      })
      :
      questions1=[]
      console.log("2 - questions",questions1);
      setQuestions(questions1)
    }, [])
    return(
        renderQuestions()
    )
};
  