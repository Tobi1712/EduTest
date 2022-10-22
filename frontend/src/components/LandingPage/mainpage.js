import React, {Component, useState} from 'react';
import './mainpage.css';
//import './jquery.min.js';
import LocalizedStrings from 'react-localization';
import Homepage from '../basic/homepage/homepage';
import { Button, Modal} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';
import Login from '../basic/login/login';
// import { useLocation, useNavigate } from 'react-router';
import main from './images/logo.png';
import internet from './images/internet.png';
import group from './images/group.png';
import monitor from './images/monitor.png';
import spam from './images/spam.png';
//import styled from 'styled-components';
import graduate from './images/graduation-hat.png';
import rocket from './images/Rocket.png';
import passwd from './images/password.png';
import cloud from './images/cloud-computing.png';
import monitor2 from './images/monitor2.png';
import group2 from './images/group2.png';
//import uk from './uk.png';
//import ru from './ru.svg.png';

let strings = new LocalizedStrings({
   ru: {
      home: "Главная",
      Project: "О проекте",
      Benefits: "Преимущества",
      Platform: "Платформа",
      automated: "автоматизированного",
      cybersecurity: "обучения кибербезопасности",
      onlinetool: "Простой онлайн-инструмент, который поможет вашим сотрудникам",
      skills: "овладеть навыками кибербезопасности",
      StartTraning: "Начать обучение",
      Youwilllearn: "Вы научитесь",
      dangers: "Замечать опасности",
      internet: "в интернете",
      own: "Защищать свои",
      personal: "персональные",
      corporate: "и корпаративные",
      data: "данные",
      Phishing: "Избегать фишинга",
      traps: "и других ловушек",
      fraudsters: "мошенников",
      Somethinguseful: "Еще что-то полезное,",
      platformwillteach: "чему научит платформа",
      Flexible: "Гибкий подход",
      courseoranexpress: "Вы можете выбрать основной или экспресс-курс",
      needs: "в зависимости от ваших потребностей",
      BASICCOURSE: "ОСНОВНОЙ КУРС",
      Comprehensive: "Всестороннее обучение",
      breakingdown: "разбивкой тем по уровням",
      difficulty: "сложности",
      Search: "Поиск",
      EXPRESSCOURSE: "ЭКСПРЕСС-КУРС",
      Shortfascinating: "Краткие, увлекательные",
      trainingsvideo: "тренинги в аудио-видео",
      format: "формате",
      Try: "Попробовать",
      Easyconvenient: "Легко и удобно",
      Trackyourprogress: "Отслеживайте свои успехи и достижения",
      realtime: "в реальном времени",
      Simpleanunderstandable: "Простые и понятные уроки и задания",
      Anotherexampleofpros: "Еще какой-нибудь пример плюсов",
      platforms: "платформы",
      Learningeffectively: "Обучение эффективно",
      Createbythehosts: "Создана ведущими",
      specialistsinthefield: "специалистами в области",
      cybersecurity11: "кибербезопасности",
      Automated: "Автоматизированное",
      trainingmanageme: "управление учебным",
      Designedtothebest: "Разработано по лучшим",
      principlesand: "принципам и",
      learningmethodologies: "методологиям обучения",
      Insteadofongandboring: "Вместо долгих и скучных",
      lessonsmicromodulesand: "уроков — микромодули и",
      masteringonly: "освоение только",
      requiredskills: "необходимых навыков",
      Starttrainingg: "Начать обучение",
      Cybermind2022: "Cybermind 2022",
      thebasementanbeplaced: "В подвале можно разместить",
      contactinformation: "контакткую информацию или",
      duplicatemenu: "продублировать меню"
   },
   kz: {
      home: "Басты бет",
      Project: "Проект туралы",
      Benefits: "Артыкшылыктар",
      Platform: "Киберқауіпсіздік бойынша",
      automated: "автоматтандырылған",
      cybersecurity: "оқу платформасы",
      onlinetool: "Простой онлайн-инструмент, который поможет вашим сотрудникам",
      skills: "овладеть навыками кибербезопасности",
      StartTraning: "Yйренудi бастау",
      Youwilllearn: "Вы научитесь",
      dangers: "Замечать опасности",
      internet: "в интернете",
      own: "Защищать свои",
      personal: "персональные",
      corporate: "и корпаративные",
      data: "данные",
      Phishing: "Избегать фишинга",
      traps: "и других ловушек",
      fraudsters: "мошенников",
      Somethinguseful: "Еще что-то полезное,",
      platformwillteach: "чему научит платформа",
      Flexible: "Гибкий подход",
      courseoranexpress: "Вы можете выбрать основной или экспресс-курс",
      needs: "в зависимости от ваших потребностей",
      BASICCOURSE: "ОСНОВНОЙ КУРС",
      Comprehensive: "Всестороннее обучение",
      breakingdown: "разбивкой тем по уровням",
      difficulty: "сложности",
      Search: "Поиск",
      EXPRESSCOURSE: "ЭКСПРЕСС-КУРС",
      Shortfascinating: "Краткие, увлекательные",
      trainingsvideo: "тренинги в аудио-видео",
      format: "формате",
      Try: "Попробовать",
      Easyconvenient: "Легко и удобно",
      Trackyourprogress: "Отслеживайте свои успехи и достижения",
      realtime: "в реальном времени",
      Simpleanunderstandable: "Простые и понятные уроки и задания",
      Anotherexampleofpros: "Еще какой-нибудь пример плюсов",
      platforms: "платформы",
      Learningeffectively: "Обучение эффективно",
      Createbythehosts: "Создана ведущими",
      specialistsinthefield: "специалистами в области",
      cybersecurity11: "кибербезопасности",
      Automated: "Автоматизированное",
      trainingmanageme: "управление учебным",
      Designedtothebest: "Разработано по лучшим",
      principlesand: "принципам и",
      learningmethodologies: "методологиям обучения",
      Insteadofongandboring: "Вместо долгих и скучных",
      lessonsmicromodulesand: "уроков — микромодули и",
      masteringonly: "освоение только",
      requiredskills: "необходимых навыков",
      Starttrainingg: "Начать обучение",
      Cybermind2022: "Cybermind 2022",
      thebasementanbeplaced: "В подвале можно разместить",
      contactinformation: "контакткую информацию или",
      duplicatemenu: "продублировать меню"
   }
});

class MainPage extends Component {
   constructor(props){
      super(props);
      this.state={
         lang:'ru',
         PageModelVisible:false
      }
   }

   openHomepage = ()=>{
      this.setState((previousState,previousProps)=>{
        return{
          PageModelVisible:true
        }
      })
    }
    closeHomepage = ()=>{
      this.setState((previousState,previousProps)=>{
        return{
          chapterModelVisible:false
        }
      })
    }
    
   render(){
      strings.setLanguage(this.state.lang);
      // console.log(this.props)
      return (
      <>
         <header>
            <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
               <Navbar.Brand href="#home">
                  <img src={main} alt="Company logo" className="ms-4" style={{ maxHeight: '4em' }} />
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="responsive-navbar-nav" />
               <Button onClick={()=>this.setState({lang:'ru'})}>RUS</Button>
               <Button onClick={()=>this.setState({lang:'kz'})}>KAZ</Button>
               <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="ms-auto mb-20">
                     <Nav.Link variant="primary" href="#home" className='fs-5 text-dark ms-5'>{strings.home}</Nav.Link>
                     <Nav.Link variant="primary" href="#project" className='fs-5 text-dark ms-5'>{strings.Project}</Nav.Link>
                     <Nav.Link variant="primary" href="#benefits" className='fs-5 text-dark mx-5'>{strings.Benefits}</Nav.Link>
                  </Nav>
               </Navbar.Collapse>
            </Navbar>
            <div className='jumbo'>
               <div className="ms-5 py-5">
                  <h1 className="display-5 fw-bold col-md-7 my-4">{strings.Platform} {strings.automated} {strings.cybersecurity}</h1>
                  <p className="col-md-7 col-sm-5 fs-4 my-4">{strings.onlinetool} {strings.skills}</p>

                  <a className="btn btn-lg button" type="primary" href={'/login' + '/' + this.state.lang}>
                           {strings.StartTraning}
                           {/* <Modal
                              visible={this.state.PageModelVisible}
                              title="Материалы"
                              onCancel={this.closeHomepage}
                              style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                              width="70%"
                              destroyOnClose={true}
                              footer={[]}
                           >
                           <Homepage lang={this.state.lang}/>
                           </Modal> */}
                  </a>
               </div>
            </div>

         </header>

         <main>
            <section className='study-section'>
               <div className="mx-5">
                  <h2 className='fw-bold my-5'>{strings.Youwilllearn}</h2>
                  <div className='row row-cols-1 mb-5'>
                     <div className='col-md-3 block'>
                        <img src={internet} className="mx-auto d-block my-5 img-fluid icons" alt=""/>
                        <p className='fs-5 text-center'>{strings.dangers} {strings.internet}</p>
                     </div>
                     <div className='col-md-3'>
                        <img src={monitor} className="mx-auto d-block my-5 img-fluid icons" alt=""/>
                        <p className='fs-5 text-center'>{strings.own} {strings.personal} {strings.corporate} {strings.data}</p>
                     </div>
                     <div className='col-md-3'>
                        <img src={spam} className="mx-auto d-block my-5 img-fluid icons" alt=""/>
                        <p className='fs-5 text-center'>{strings.Phishing} {strings.traps} {strings.fraudsters}</p>
                     </div>
                     <div className='col-md-3'>
                        <img src={group} className="mx-auto d-block my-5 img-fluid icons" alt=""/>
                        <p className='fs-5 text-center'>{strings.Somethinguseful} {strings.platformwillteach}</p>
                     </div>
                  </div>
               </div>
            </section>

            <section className='courses-section'>
               <div className="py-5 px-5">
                  <h2 className='fw-bold'>{strings.Flexible}</h2>
                  <p className='fs-4 text-left'>{strings.courseoranexpress} {strings.needs}</p>
                  <div className='row g-4 py-5 row-cols-1 row-cols-lg-2 '>
                     <div className='col d-flex align-items-start'>
                        <div>
                           <img src={graduate} className="img-fluid big-icons" alt=""/>
                        </div>
                        <div>
                           <h4 className="fw-bold">{strings.BASICCOURSE}</h4>
                           <p className='fs-5'>{strings.Comprehensive} {strings.breakingdown} {strings.difficulty}</p>
                           <a className="btn btn-lg button" type="primary" href='/login'>
                              {strings.Try}
                           </a>
                        </div>
                     </div>
                     <div className='col d-flex align-items-start'>
                        <div>
                           <img src={rocket} className="img-fluid big-icons" alt=""/>
                        </div>
                        <div>
                           <h4 className="fw-bold">{strings.EXPRESSCOURSE}</h4>
                           <p className='fs-5'>{strings.Shortfascinating} {strings.trainingsvideo} {strings.format}</p>
                           <a className="btn btn-lg button" type="primary" href='/login'>
                              {strings.Try}
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            <section className='pluses-section'>
               <div className='col mx-5'>
                  <h2 className='fw-bold my-5'>{strings.Easyconvenient}</h2>
                  <div className='align-items-start my-5'>
                     <div className='d-flex py-4 '>
                        <img src={internet} className="icons img-fluid" alt=""/>
                        <p className='fs-5 py-4 ms-3 col-6'>{strings.Trackyourprogress} {strings.realtime}</p>
                     </div>
                     <div className='d-flex py-4 '>
                        <img src={monitor} className="icons img-fluid" alt=""/>
                        <p className='fs-5 py-4 ms-3 col-6'>{strings.Simpleanunderstandable}</p>
                     </div>
                     <div className='d-flex py-4 '>
                        <img src={spam} className="icons img-fluid" alt=""/>
                        <p className='fs-5 py-4 ms-3 col-6'>{strings.Anotherexampleofpros} {strings.platforms}</p>
                     </div>
                  </div>
               </div>
            </section>

            <section className='effective-section'>
               <div className="mx-5 py-5">
                  <h2 className='fw-bold text-white'>{strings.Learningeffectively}</h2>
                  <div className='row row-cols-1 mb-5'>
                     <div className='col-md-3 block'>
                        <img src={passwd} className="mx-auto d-block my-5 icons img-fluid" alt=""/>
                        <p className='fs-5 text-center text-white'>{strings.Createbythehosts} {strings.specialistsinthefield} {strings.cybersecurity11}</p>
                     </div>
                     <div className='col-md-3'>
                        <img src={cloud} className="mx-auto d-block my-5 icons img-fluid" alt=""/>
                        <p className='fs-5 text-center text-white'>{strings.Automated} {strings.trainingmanageme}  {strings.processingeasy} {strings.controlandlearn} {strings.Amongus}</p>
                     </div>
                     <div className='col-md-3'>
                        <img src={monitor2} className="mx-auto d-block my-5 icons img-fluid" alt=""/>
                        <p className='fs-5 text-center text-white'>{strings.trainingmanageme} {strings.principlesand} {strings.learningmethodologies}</p>
                     </div>
                     <div className='col-md-3'>
                        <img src={group2} className="mx-auto d-block my-5 icons img-fluid" alt=""/>
                        <p className='fs-5 text-center text-white'>{strings.Insteadofongandboring} {strings.lessonsmicromodulesand} {strings.masteringonly} {strings.requiredskills}</p>
                     </div>
                  </div>
                  <div className="container d-flex justify-content-center py-5 text-white">
                     <a className="btn btn-lg button" type="primary" href='/login'>
                        {strings.StartTraning}
                     </a>
                  </div>

               </div>
            </section>

         </main>

         <footer className='bg-black'>
            <div className="container d-flex justify-content-center py-5 text-white">
               <p>
                  В подвале можно разместить контакткую информацию или продублировать меню
               </p>
            </div>

            <div className="text-center text-white p-3">
               © CyberMind 2022
            </div>
         </footer>
      </>

   )
}
}
export default MainPage;