import React from 'react';
import './backbone.css';
import { connect } from 'react-redux';
import AllTrainer from '../admin/Trainer/alltrainer';
import AllCustomer from '../admin/Customer/allcustomer';
import AllDivision from '../admin/Division/alldivision';
import AllCompany from '../admin/Company/allcompany';
import AllChapter from '../admin/Chapter/allchapter';
import Chapters from '../customer/Learning/chapters';
import History from '../customer/Mytest/testHistory';
import CompanyList from '../trainer/CompanyList/companylist';
import MainPage from '../LandingPage/mainpage';
// import AllTopics from '../admin/Topics/alltopics.js';
import AllQuestions from '../admin/Questions/allquestion';
// import AllTests from '../trainer/alltests/alltest';
// import ConductTest from '../trainer/conducttest/conducttest';
// import NewTest from '../trainer/newtest/newtest';
import auth from '../../services/AuthServices';
import Welcome from './welcome';
import ErrorPage from './errorPage';
import { login, logout } from '../../actions/loginAction';
import { changeActiveRoute } from '../../actions/useraction';
import Alert from '../common/alert';
import { Link } from 'react-router-dom';
// import queryString from 'query-string';
import { Layout, Menu, Button,  Tooltip, Icon  } from 'antd';
import main from './main.png';
// import Questions from '../trainer/conducttest/questions';
// import Answer from '../trainee/answersheet/answer';
// import SingleQuestion from '../trainee/examPortal/singleQuestion';
// import Question from '../trainee/examPortal/question';
// import TraineeRegisterForm from '../trainee/register/traineeregister';
// import AllTest from '../trainer/alltests/alltest';
// import uk from './uk.png';
// import ru from './ru.svg.png';


const { Header, Sider, Content } = Layout;

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            LocalIsLoggedIn : this.props.user.isLoggedIn,
            collapsed: true,
            ddd:{},
            Language: (this.props.location.pathname.slice(-2)==='ru' || this.props.location.pathname.slice(-2)==='kz') ? this.props.location.pathname.slice(-2) : 'ru',
        }
    }

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };

    logOut =()=>{
        auth.deleteToken();
        window.location.href='/login' + '/' + (this.state.Language === 'ru' || this.state.Language === 'kz') ? this.state.Language : 'ru';
    }

    // change(var2){
    //     localStorage.setItem('lang', var2.terget.value);
    //     window.location.reload();
    // }

    componentWillMount(){
        console.log(this.state.LocalIsLoggedIn);
        var t = auth.retriveToken();
        if(this.state.LocalIsLoggedIn){
            
        } 
        else if(t && t!=='undefined'){
            auth.FetchAuth(t).then((response)=>{
                console.log(response.data);
                this.props.login(response.data.user);
                this.setState({
                    LocalIsLoggedIn : true,
                    ddd:response.data
                })
                var subUrl = this.props.match.params.options;
                console.log(subUrl);
                var obj = this.props.user.userOptions.find((o,i)=>{
                    if(o.link ===`/user/${subUrl}`){
                        return o
                    }
                });
                var tt=this.props.user.userOptions.indexOf(obj);
                if(tt===-1){
                    window.location.href=`${this.props.user.userOptions[0].link}`;
                }
                else{
                    this.props.changeActiveRoute(String(tt));
                }
            }).catch((error)=>{
                Alert('warning','Предупреждение!','Ошибка.');
                auth.deleteToken();
                window.location.href='/';
                
            })
        }
        else{
            window.location='/';
        }
        
    }



    render(){
        let torender = null;
        // console.log("GLOBAL PROPS:", this.props);
        // const lang = localStorage.getItem('lang') || 'en';
        if(this.props.match.params.options==='listtrainers'){
            torender = <AllTrainer lang={this.state.Language}/>;
        }
        else if(this.props.match.params.options==='listcustomers'){
            torender = <AllCustomer lang={this.state.Language} userDetails={this.props.user.userDetails}/>
        }
        else if(this.props.match.params.options==='listdivisions'){
            torender = <AllDivision lang={this.state.Language} userDetails={this.props.user.userDetails}/>
        }
        else if(this.props.match.params.options==='listcompanies'){
            torender = <AllCompany lang={this.state.Language}/>
        }
        else if(this.props.match.params.options==='listofcompany'){
            torender = <CompanyList lang={this.state.Language} userDetails={this.props.user.userDetails}/>
        }
        else if(this.props.match.params.options==='listchapters'){
            torender = <AllChapter lang={this.state.Language}/>
        }
        else if(this.props.match.params.options==='listchapters2'){
            torender = <Chapters lang={this.state.Language}/>
        }
        else if(this.props.match.params.options==='listprogress'){
            torender = <History lang={this.state.Language}/>
        }
        else if(this.props.match.params.options==='landingpage'){
            torender = <MainPage lang={this.state.Language}/>
        }
        // else if(this.props.match.params.options==='newtest'){
        //     torender = <NewTest/>
        // }
        // else if(this.props.match.params.options==='listtests'){
        //     torender = <AllTests/>
        // }

        else if(this.props.match.params.options==='listquestions'){
            torender = <AllQuestions lang={this.state.Language}/>
        }
        
        else if(this.props.match.params.options==='home'){
            torender=<Welcome lang={this.state.Language}/>
        }
        // else if(this.props.match.params.options==='conducttest'){
        //     let params = queryString.parse(this.props.location.search)
        //     console.log(params)
        //     torender=<ConductTest {...params}/>
        // }
        else{
            torender=<ErrorPage />
        }
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}
                    style={{
                        background: 'rgb(242,242,242)',
                        overflow: 'hidden',
                        height: '150wh',
                        position: 'auto',
                        // left: 0,
                        zIndex:5,
                      }}
                    >
                    <div className="logo">
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}                          
                            onClick={this.toggle}
                            style={{color:'#000',fontSize:'20px', padding:'10px 50px 0 0'}}
                            /> 
                    </div>

                    <Menu 
                        defaultSelectedKeys={[this.props.user.activeRoute]}
                        mode="inline"
                        style={{
                            background: 'rgb(242,242,242)',                            
                          }}                   
                        >
                        {
                            this.props.user.userOptions.map((d,i)=>{
                                return(
                                    <Menu.Item key={i}>
                                        <Icon type={d.icon} />
                                        <span>{d.display}</span>
                                        <Link to={d.link}></Link>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Header  style={{ background: 'rgb(242,242,242)',position:'relative',width:'100vw',paddingLeft: '10px',zIndex:'1000' }}>
                    
                        {/* <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                            style={{color:'#fff',fontSize:'20px'}}
                            /> */}
                        {/* <ul className="triger">    
                            <li>
                                <img src={main} alt="company logo" className="d-logo" />
                            </li>
                        </ul> */}
                        <ul>
                            <li className="company-logo">
                                <img src={main} alt="company logo" className="d-logo" />
                            </li>
                            <li>
                                <Button onClick={
                                    ()=>this.setState({Language: 'ru'})
                                }>RUS</Button>
                                <Button onClick={
                                    ()=>this.setState({Language: 'kz'})
                                }>KAZ</Button>
                            </li>
                            <li className="user-options-list">
                                <Tooltip placement="bottom" title="Выход">
                                    <Button type="primary" size="large" shape="circle" onClick={this.logOut} className="logout-button">
                                        <Icon type="logout" />
                                    </Button>
                                </Tooltip>
                            </li>
                            {/* <li className='header-item-lang-en'><button id='en' className='translate'><img src={uk} alt='ukflag' width='40px' height='30px'/></button></li>
                            <li className='header-item-lang-ru'><button id='ru' className='translate'><img src={ru} alt='ukflag' width='40px' height='30px'/></button></li> */}
                        </ul>
                            
                    </Header>
                    <Content
                        style={{
                        margin: '15px 24px 16px',
                        //padding: 24,
                        //marginTop:'15px',
                        background: 'rgb(255, 255, 255)',
                        minHeight: '100vh',
                        marginLeft:'1px'
                        }}
                    >
                        <div style={{ width:'100%', }}>
                            {torender}
                        </div>
                    </Content>
                </Layout>
            </Layout> 
        );
    }
   
}

const mapStateToProps = state => ({
    user : state.user
});




export default connect(mapStateToProps,{
    changeActiveRoute,
    login, 
    logout
})(Dashboard);
