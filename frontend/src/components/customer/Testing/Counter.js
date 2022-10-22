import React, { Component, useState, useEffect, useRef } from "react";
import { 
  ChangeTestSearchText,
  ChangeTestTableData,
  // ChangeTestModalState,
  ChangeMaterialSearchText,
  ChangeMaterialTableData,
  ChangeMaterialModalState,
} from '../../../actions/chapterAction';
import { connect } from 'react-redux';
// import classes from "./Quiz.module.css";

function Counter(props) {
  const Clean = useRef(null);

  const [timer, setTimer] = useState("00:00:00");

  const getTimer = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(((total / 1000) / 60 / 60));
    return {
      total,
      seconds,
      minutes,
      hours
    };
  };

  const initialTimer = (e) => {
    const { total, hours, minutes, seconds } = getTimer(e);
    if (total >= 0) {
      setTimer(
        `0${hours}` + ':' + `${minutes}` + ':' + `${seconds}`
        // (hours > 9 ? hours : `0${hours}`).concat(":") +
        //   (minutes > 9 ? minutes : `0${minutes}`).concat(":") +
        //   (seconds > 9 ? seconds : `0${seconds}`)
      );
    }
  };

  const limparTimer = (e) => {
    setTimer("00:00:00");

    if (Clean.current) clearInterval(Clean.current);
    const id = setInterval(() => {
      initialTimer(e);
    }, 1000);
    Clean.current = id;
  };

  const getLimite = () => {
    console.log('materialTableData',props.chapter.materialTableData);
    var dur = props.chapter.materialTableData.filter(a => a._id===props.mid)
    var duration = dur[0].duration * 60;
    if(props.chapter.testTableData===null || props.chapter.testTableData===undefined){
      const Limite = new Date();
      Limite.setSeconds(Limite.getSeconds() + duration);
      console.log('IF:',Limite);
      return Limite;
    }
    else{
      const Limite = new Date(props.chapter.testTableData.complationDate);
      return Limite;
    }

  };

  useEffect(() => {
    // props.ChangeMaterialTableData("62b42baec5ed6684387229d6");
    // props.ChangeAnswersTableData("62b459718278d60bb54cae1d");
    console.log(props.chapter.materialTableData);
    limparTimer(getLimite());
    
  }, []);

  // const Reset = () => {
  //   limparTimer(getLimite());
  // };

  return (
    
    <div>
      <h2>{timer}</h2>
    </div>
  );
}

const mapStateToProps = state => ({
  chapter : state.chapter
});

export default connect(mapStateToProps,{
  ChangeTestSearchText,
  ChangeTestTableData,
  // ChangeTestModalState,
  ChangeMaterialSearchText,
  ChangeMaterialTableData,
  ChangeMaterialModalState,
})(Counter);






// import React, { Component } from "react";
// import { 
//   ChangeTestSearchText,
//   ChangeTestTableData,
//   ChangeTestModalState,
//   ChangeMaterialSearchText,
//   ChangeMaterialTableData,
//   ChangeMaterialModalState,
// } from '../../../actions/chapterAction';
// import { connect } from 'react-redux';
// // import classes from "./Quiz.module.css";
// class Counter extends Component {
//   constructor() {
//     super();
//     this.state = { 
//       time: {}, 
//       seconds: 0,
//       startDate : null,
//       endDate: null,
//     };
//     this.timer = 0;
//   }

//   secondsToTime = secs => {
//     let hours = Math.floor(secs / (60 * 60));

//     let divisor_for_minutes = secs % (60 * 60);
//     let minutes = Math.floor(divisor_for_minutes / 60);

//     let divisor_for_seconds = divisor_for_minutes % 60;
//     let seconds = Math.ceil(divisor_for_seconds);

//     let obj = {
//       h: hours,
//       m: minutes,
//       s: seconds
//     };
//     return obj;
//   };

//   componentDidMount = () => {
//     this.props.ChangeTestTableData(this.props.id);
//     this.props.ChangeMaterialTableData(this.props.id);
//     let timeLeftVar = this.secondsToTime(this.state.seconds);
//     this.setState({ time: timeLeftVar });

//     console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII:",this.props.chapter.materialTableData)

//     this.props.chapter.materialTableData.map((d, i) =>{
//       if(this.props.id === d._id){
//         var minutesToAdd=d.duration;
//         var currentDate = new Date();
//         console.log('currentDate', currentDate);
//         var futureDate = new Date(this.props.chapter.testTableData.complationDate);
//         console.log("futureDate", futureDate);
//         this.state.seconds = (futureDate.getTime() - currentDate.getTime())/1000;
//         console.log("Seconds:",this.state.seconds)
//       }
//     })
//   };

//   startTimer = () => {
//     if (this.timer == 0 && this.state.seconds > 0) {
//       this.timer = setInterval(this.countDown, 1000);
//     }
//   };

//   countDown = () => {
//     let seconds = this.state.seconds - 1;
//     this.setState({
//       time: this.secondsToTime(seconds),
//       seconds: seconds
//     });
//     if (seconds == 0) {
//       clearInterval(this.timer);
//       console.log("Time Up");
//     }
//   };
//   render() {

//     return (
//       <div>
//         {this.startTimer()}
//         <h3>
//           {this.state.time.h} : {this.state.time.m} :{" "}
//           {this.state.time.s}
//         </h3>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   chapter : state.chapter,
//   trainer : state.trainer
// });

// export default connect(mapStateToProps,{
//   ChangeTestSearchText,
//   ChangeTestTableData,
//   ChangeTestModalState,
//   ChangeMaterialSearchText,
//   ChangeMaterialTableData,
//   ChangeMaterialModalState,
// })(Counter);
