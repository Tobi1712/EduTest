import React, { Component } from 'react';
import { Skeleton, Row, Col, Button } from 'antd';
import './questiondetails.css';
import apis from '../../../services/Apis';
import { SecureGet } from '../../../services/axiosCall';
// import moment from 'moment';
// const { TabPane } = Tabs;

export default class QuestionDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            loading : true,
            details:null
        }
    }

    tabChange = (key)=>{
        console.log(key)
    }

    componentDidMount(){
        var ID = this.props.id;
        SecureGet({
            url: `${apis.FETCH_SINGLE_QUESTION}/${ID}`,
        }).then((response)=>{
            console.log(response.data.data[0]);
            this.setState({
                details : response.data.data[0],
                loading:false
            })
        }).catch((error)=>{
            console.log(error);
        })
    }

    render() {
        return (
            <div>
             <Skeleton loading={this.state.loading} active avatar>
                    {/* <Tabs defaultActiveKey="1" onChange={ (e)=>this.tabChange(e)}> */}
                        {/* <TabPane tab={ <span><Icon type="home" />Basic Info</span> } key="1">
                            <Tab1 id={this.props.id} details={this.state.details}/>
                        </TabPane> */}
                        {/* <TabPane tab={ <span><Icon type="question-circle" />Question</span> } key="2"> */}
                            <Tab2 details={this.state.details} />
                        {/* </TabPane>
                    </Tabs>    */}
                </Skeleton>                 
            </div>
        )
    }
}







// function Tab1(props) {
//     return (
//         <div>
//             <Descriptions bordered title="" border size="small" column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
//                 <Descriptions.Item label="Question Id">{props.id}</Descriptions.Item>
//                 <Descriptions.Item label="Chapter">{props.details.chapter.name}</Descriptions.Item>
//                 <Descriptions.Item label="Material">{props.details.materials.topic}</Descriptions.Item>
//                 <Descriptions.Item label="Difficulty">{props.details.difficulty}</Descriptions.Item>
//                 <Descriptions.Item label="No of Right Answers">{props.details.anscount}</Descriptions.Item>
//                 <Descriptions.Item label="Weightage">{props.details.weightage}</Descriptions.Item>
//                 <Descriptions.Item label="Created By">{props.details.createdBy.name}</Descriptions.Item>
//                 <Descriptions.Item label="Created on">{moment(props.details.createdAt).format("DD/ MM/YYYY , hh:mm:ss")}</Descriptions.Item>
//             </Descriptions>
//         </div>
//     )
// }


function Tab2(props){
    const optn =['A','B','C','D','E']
    const Optiondata = props.details;
    // const Answers = [Optiondata.answer1, Optiondata.answer2,Optiondata.answer3,Optiondata.answer4,Optiondata.answer5];
    // const isAnswer = [Optiondata.trueans1, Optiondata.trueans2,Optiondata.trueans3,Optiondata.trueans4,Optiondata.trueans5];
    console.log(`details : ${Optiondata}`);
    return(
        <div className="mainQuestionDetailsContaine">
            <div className="questionDetailsBody">
                {Optiondata.body}
            </div>
            {Optiondata.quesimg?
                <div className="questionDetailsImageContainer">
                    <img alt="unable to load" className="questionDetailsImage" src={Optiondata.quesimg} style={{width:'50%'}} />  
                </div>
                : null
            }
            <div>
                <Row type="flex" justify="center" className="QuestionDetailsOptions">
                    <Col span={2}>
                    {
                        Optiondata.trueans1?<Button className="green" shape="circle">{optn[0]}</Button>:<Button type="primary" shape="circle">{optn[0]}</Button>
                    }
                    </Col>
                    <Col span={14}>{Optiondata.answer1}</Col>
                </Row>
                <Row type="flex" justify="center" className="QuestionDetailsOptions">
                    <Col span={2}>
                    {
                        Optiondata.trueans2?<Button className="green" shape="circle">{optn[1]}</Button>:<Button type="primary" shape="circle">{optn[1]}</Button>
                    }
                    </Col>
                    <Col span={14}>{Optiondata.answer2}</Col>
                </Row>
                <Row type="flex" justify="center" className="QuestionDetailsOptions">
                    <Col span={2}>
                    {
                        Optiondata.trueans3?<Button className="green" shape="circle">{optn[2]}</Button>:<Button type="primary" shape="circle">{optn[2]}</Button>
                    }
                    </Col>
                    <Col span={14}>{Optiondata.answer3}</Col>
                </Row>
                <Row type="flex" justify="center" className="QuestionDetailsOptions">
                    <Col span={2}>
                    {
                        Optiondata.trueans4?<Button className="green" shape="circle">{optn[3]}</Button>:<Button type="primary" shape="circle">{optn[3]}</Button>
                    }
                    </Col>
                    <Col span={14}>{Optiondata.answer4}</Col>
                </Row>
                <Row type="flex" justify="center" className="QuestionDetailsOptions">
                    <Col span={2}>
                    {
                        Optiondata.trueans5?<Button className="green" shape="circle">{optn[4]}</Button>:<Button type="primary" shape="circle">{optn[4]}</Button>
                    }
                    </Col>
                    <Col span={14}>{Optiondata.answer5}</Col>
                </Row>
            </div>
        </div>
        )
}

