import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { 
    ChangeAnswersSearchText,
    ChangeAnswersTableData,
  } from '../../../actions/chapterAction';
  const axios = require('axios');

function Result(props) {
    const [result, setResult] = useState(0);
    const [isLoading, setLoading] = useState(true);
    
    useEffect(()=>{
        props.ChangeAnswersTableData(props.mid);

        if(props.chapter.AnswerTableData.length!==0){
            console.log(props.chapter.AnswerTableData)
            var questions1 = [];
            var nota = [];
            var noua = [];
            var s = props.chapter.AnswerTableData[0].chosenOption.length;
            props.chapter.AnswerTableData[0].chosenOption.map((d,i)=>{
                nota[i] = (d.options[0].isAnswer + d.options[1].isAnswer + d.options[2].isAnswer + d.options[3].isAnswer + d.options[4].isAnswer)
                noua[i] = ((d.options[0].userAnswer && d.options[0].isAnswer) + 
                          (d.options[1].userAnswer && d.options[1].isAnswer) + 
                          (d.options[2].userAnswer && d.options[2].isAnswer) + 
                          (d.options[3].userAnswer && d.options[3].isAnswer) + 
                          (d.options[4].userAnswer && d.options[4].isAnswer));
                })
            console.log("Number of the true answer", nota)
            console.log("Number of the user answer", noua)
            var a=0;
            props.chapter.AnswerTableData[0].chosenOption.map((d,i)=>{
                a+=(noua[i] / nota[i]) * 100;
            })
            setResult(a/s);
        }


        // console.log("1 - props",props.answerDetails[0]);
        // //var questions1=[];
        // var nota = [];
        // var noua = [];
        // var s = props.answerDetails[0].chosenOption.length;
        // props.answerDetails[0].chosenOption.map((d,i)=>{
        //     nota[i] = (d.options[0].isAnswer + d.options[1].isAnswer + d.options[2].isAnswer + d.options[3].isAnswer + d.options[4].isAnswer)
        //     noua[i] = ((d.options[0].userAnswer && d.options[0].isAnswer) + 
        //                (d.options[1].userAnswer && d.options[1].isAnswer) + 
        //                (d.options[2].userAnswer && d.options[2].isAnswer) + 
        //                (d.options[3].userAnswer && d.options[3].isAnswer) + 
        //                (d.options[4].userAnswer && d.options[4].isAnswer));
        //     })
        // console.log("Number of the true answer", nota)
        // console.log("Number of the user answer", noua)
        // var a=0;
        // props.answerDetails[0].chosenOption.map((d,i)=>{
        //     a+=(noua[i] / nota[i]) * 100;
        // })
        // setResult(a/s);
    }, [props.mid])


    return(
        props.chapter.AnswerTableData.length!==0 ? 
            <div>
                <h3>Результаты тестирование</h3>
                <h3>Количество вопросов: {props.chapter.AnswerTableData[0].chosenOption.length}</h3>
                <h3>Процент правильных ответов: {Math.round(result)}</h3>
                {/* <h3>Количество вопросов: {props.answerDetails[0].chosenOption.length}</h3>
                <h3>Процент правильных ответов: {Math.round(result)}</h3> */}
            </div>
        :
            <div>
                <h3>Loading...</h3>
            </div>
        
    )
}

const mapStateToProps = state => ({
    chapter : state.chapter
});

export default connect(mapStateToProps,{
    ChangeAnswersSearchText,
    ChangeAnswersTableData
})(Result);