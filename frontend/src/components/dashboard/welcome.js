import React, { useState } from 'react';
import './welcome.css';
import { Button } from 'antd';
//import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//import uk from './uk.png';
//import ru from './ru.svg.png';

//import Plot from 'react-plotly.js';
//import { $CombinedState } from 'redux';


import  LocalizedStrings  from  'react-localization' ;



function Welcome(props) {  
  const [lang, setLang] = useState('')

  return (
    
    <div style={{padding: "20px 20px"}}>
      {strings.setLanguage(props.lang)}
      {console.log(strings.getLanguage())}
         <h2><b key='qwe'>{strings.DashboardAdminInstruction}</b></h2>
        <h3 key={'qwe'}>{strings.DashboardAdminInstructionTrainer1}</h3>
        <h4> {strings.DashboardAdminInstructionTrainer2} </h4>
        <ul>
          <li>{strings.DashboardAdminInstructionTrainer3}</li>
          <li>{strings.DashboardAdminInstructionTrainer4}<br/> <p style={{marginBottom:'2px'}}><Button size = 'small' type="primary" shape="circle" icon="edit" /> {strings.DashboardAdminInstructionTrainer5}</p><Button size = 'small' type="primary" shape="circle" icon="delete" /> {strings.DashboardAdminInstructionTrainer6}</li>
        </ul>
        <h3>{strings.DashboardAdminInstructionTrainerCourses1}</h3>
        <h4>   {strings.DashboardAdminInstructionTrainerCourses2}</h4>
        <ul>
          <li>{strings.DashboardAdminInstructionTrainerCourses3} </li>
          <li>{strings.DashboardAdminInstructionTrainerCourses4} <br/><Button size = 'small' type="primary" shape="circle" icon="edit" /> {strings.DashboardAdminInstructionTrainerCourses5}</li>
        </ul>
        <br/>
        <h2><b>{strings.DashboardTrainerInstruction}</b></h2>
        <h3>{strings.DashboardTrainerInstruction1Ques1}</h3>
        <h4>  {strings.DashboardTrainerInstruction1Ques2}</h4>
        <ul>
          <li>{strings.DashboardTrainerInstruction1Ques3}</li>
          <li>{strings.DashboardTrainerInstruction1Ques4} <br/> <p style={{marginBottom:'2px'}}><Button size = 'small' type="primary" shape="circle" icon="info" />  {strings.DashboardTrainerInstruction1Ques5}</p><Button size = 'small' type="primary" shape="circle" icon="delete" /> {strings.DashboardTrainerInstruction1Ques6}</li>
        </ul>
        <h3>{strings.DashboardTrainerInstruction2AllTests1}</h3>
        <h4>  {strings.DashboardTrainerInstruction2AllTests2}</h4>
        <ul>
          <li>{strings.DashboardTrainerInstruction2AllTests3}<Button size = 'small' type="primary" shape="circle" icon="info" /> <ul>
            <li>{strings.DashboardTrainerInstruction2AllTests4}</li>
            <li>{strings.DashboardTrainerInstruction2AllTests5}</li>
            <li>{strings.DashboardTrainerInstruction2AllTests6}</li>
            <li>{strings.DashboardTrainerInstruction2AllTests7} <ul>
              <li>{strings.DashboardTrainerInstruction2AllTests8}</li>
              <li>{strings.DashboardTrainerInstruction2AllTests9}</li>
              </ul></li>
            </ul></li>
        </ul>
        <h3>{strings.DashboardTrainerInstruction2NewTests1}</h3>
        <ul>
          <li>{strings.DashboardTrainerInstruction2NewTests2}</li>
          <ol>
            <li>{strings.DashboardTrainerInstruction2NewTests3}</li>
            <li>{strings.DashboardTrainerInstruction2NewTests4}</li><ul>
              <li>{strings.DashboardTrainerInstruction2NewTests5}</li>
              <li>{strings.DashboardTrainerInstruction2NewTests6}</li>
            </ul>
          </ol>
          <li>{strings.DashboardTrainerInstruction2NewTests7}</li>
          <ul>
            <li>{strings.DashboardTrainerInstruction2NewTests8}</li>
            <li>{strings.DashboardTrainerInstruction2NewTests9}</li>
            <li>{strings.DashboardTrainerInstruction2NewTests10}</li>
            <li>{strings.DashboardTrainerInstruction2NewTests11}</li>
            <li>{strings.DashboardTrainerInstruction2NewTests12}</li>
          </ul>
          <p><b>{strings.DashboardNote1} </b>{strings.DashboardNote2}</p>
        </ul><br/><br/><br/><br/><br/> 


    </div>
  );  
}


export default Welcome;


let strings = new LocalizedStrings({
  ru:{


    DashboardAdminInstruction:"Инструкции администратора",
    DashboardAdminInstructionTrainer1:"1. Тренеры",
    DashboardAdminInstructionTrainer2:"Список существующих тренеров.",
    DashboardAdminInstructionTrainer3:"Добавить  - Создать новую учетную запись тренера.",
    DashboardAdminInstructionTrainer4:"Действие -",
    DashboardAdminInstructionTrainer5: "Редактировать сведения о тренере.",
    DashboardAdminInstructionTrainer6: "Удалить учетную запись тренера.",
    DashboardAdminInstructionTrainerCourses1: "2. Все курсы",
    DashboardAdminInstructionTrainerCourses2: "Список существующих курсов.",
    DashboardAdminInstructionTrainerCourses3: "Добавить - Создать новый курс",
    DashboardAdminInstructionTrainerCourses4: "Действие -",
    DashboardAdminInstructionTrainerCourses5: "Изменить название курса.",
    DashboardTrainerInstruction: "Инструкции для тренера",
    DashboardTrainerInstruction1Ques1: "1. Все вопросы",
    DashboardTrainerInstruction1Ques2: "Список существующих вопросов.",
    DashboardTrainerInstruction1Ques3: "Добавить - Создать новый вопрос.",
    DashboardTrainerInstruction1Ques4: "Действие -",
    DashboardTrainerInstruction1Ques5: "Детали и содержание вопроса.",
    DashboardTrainerInstruction1Ques6: "Удалить вопрос.",
    DashboardTrainerInstruction2AllTests1: "2. Все Тесты",
    DashboardTrainerInstruction2AllTests2: "Список существующих тестов",
    DashboardTrainerInstruction2AllTests3: "Действие -",
    DashboardTrainerInstruction2AllTests4: "Подробности теста",
    DashboardTrainerInstruction2AllTests5: "Тестовые вопросы",
    DashboardTrainerInstruction2AllTests6: "Стажеры - Список зарегистрированных кандидатов",
    DashboardTrainerInstruction2AllTests7: "Статистика - ",
    DashboardTrainerInstruction2AllTests8: "Скачать таблицу результатов в формате excel",
    DashboardTrainerInstruction2AllTests9: "Графическое представление результатов",
    DashboardTrainerInstruction2NewTests1: "3. Новые тесты",
    DashboardTrainerInstruction2NewTests2: "Создать новый тест",
    DashboardTrainerInstruction2NewTests3: "Введите основные сведения о тестировании",
    DashboardTrainerInstruction2NewTests4: "Выберите вопросы",
    DashboardTrainerInstruction2NewTests5: "Вопросы - Случайные - Введите количество вопросов, которые будут выбраны автоматически, и нажмите Создать тестовую работу. Нажмите кнопку Далее, чтобы продолжить.",
    DashboardTrainerInstruction2NewTests6: "Вопросы - Вручную - Выберите вопросы вручную . Нажмите кнопку Далее, чтобы продолжить.",
    DashboardTrainerInstruction2NewTests7: "Основная информация о тестировании",
    DashboardTrainerInstruction2NewTests8: "Ссылка для регистрации - Ссылка для регистрации стажера для прохождения теста.",
    DashboardTrainerInstruction2NewTests9: "Остановить Регистрацию - Нажмите, чтобы отключить ссылку регистрации.",
    DashboardTrainerInstruction2NewTests10: "Перезагрузка - Нажмите, чтобы получить список зарегистрированных кандидатов.",
    DashboardTrainerInstruction2NewTests11: "Начать тест - Нажмите, чтобы начать тест.",
    DashboardTrainerInstruction2NewTests12: "Завершить тест - Нажмите, чтобы завершить тест.",
    DashboardNote1: "Примечание - ",
    DashboardNote2: "Ссылка на этот тест была отправлена на электронный адрес зарегистрированных слушателей. Нажмите на ссылку, чтобы пройти тест.",
    


  },
  kz: {
    DashboardAdminInstruction :"Администратор нұсқаулары",
    DashboardAdminInstructionTrainer1 :"1. Тренерлер",
    DashboardAdminInstructionTrainer2 :"Бар тренерлер тізімі.",
    DashboardAdminInstructionTrainer3 :"Қосу - Жаңа жаттықтырушы тіркелгісін жасау.",
    DashboardAdminInstructionTrainer4 :"Әрекеттер -",
    DashboardAdminInstructionTrainer5 :"Тренер мәліметтерін өңдеу.",
    DashboardAdminInstructionTrainer6 :"Тренер тіркелгісін жою.",
    DashboardAdminInstructionTrainerCourses1 :"2. Барлық курстар",
    DashboardAdminInstructionTrainerCourses2 :"Бар курстар тізімі.",
    DashboardAdminInstructionTrainerCourses3 :"Қосу - Жаңа курс жасау",
    DashboardAdminInstructionTrainerCourses4 :"Әрекеттер -",
    DashboardAdminInstructionTrainerCourses5 :"Курс атауын өңдеу.",
    DashboardTrainerInstruction :"Жаттықтырушыға арналған нұсқаулық",
    DashboardTrainerInstruction1Ques1 :"1. Барлық сұрақтар",
    DashboardTrainerInstruction1Ques2 :"Бар сұрақтар тізімі.",
    DashboardTrainerInstruction1Ques3 :"Қосу - Жаңа сұрақ жасау.",
    DashboardTrainerInstruction1Ques4 :"Әрекеттер -",
    DashboardTrainerInstruction1Ques5 :"Сұрақ мәліметтері мен мазмұны.",
    DashboardTrainerInstruction1Ques6 :"Сұрақты жою.",
    DashboardTrainerInstruction2AllTests1 :"2. Барлық сынақтар",
    DashboardTrainerInstruction2AllTests2 :"Бар сынақтар тізімі",
    DashboardTrainerInstruction2AllTests3 :"Әрекеттер -",
    DashboardTrainerInstruction2AllTests4 :"Тест мәліметтері",
    DashboardTrainerInstruction2AllTests5 :"Тест сұрақтары",
    DashboardTrainerInstruction2AllTests6 :"Тыңдаушылар - тіркелген үміткерлер тізімі",
    DashboardTrainerInstruction2AllTests7 :"Статистика -",
    DashboardTrainerInstruction2AllTests8 :"Нәтижелер кестесін excel пішімінде жүктеп алу",
    DashboardTrainerInstruction2AllTests9 :"Нәтижелердің графикалық көрінісі",
    DashboardTrainerInstruction2NewTests1 :"3. Жаңа сынақтар",
    DashboardTrainerInstruction2NewTests2 :"Жаңа сынақ жасау",
    DashboardTrainerInstruction2NewTests3 :"Негізгі сынақ ақпаратын енгізіңіз",
    DashboardTrainerInstruction2NewTests4 :"Сұрақтарды таңдау",
    DashboardTrainerInstruction2NewTests5 :"Сұрақтар - Кездейсоқ - автоматты түрде таңдалатын сұрақтар санын енгізіп, Тест жұмысын жасау түймесін басыңыз. Жалғастыру үшін Келесі түймесін басыңыз.",
    DashboardTrainerInstruction2NewTests6 :"Сұрақтар - Қолмен - Сұрақтарды қолмен таңдаңыз. Жалғастыру үшін Келесі түймесін басыңыз.",
    DashboardTrainerInstruction2NewTests7 :"Тестілеу туралы негізгі ақпарат",
    DashboardTrainerInstruction2NewTests8 :"Тіркеу сілтемесі - Тест тапсыру үшін тыңдаушыны тіркеу сілтемесі.",
    DashboardTrainerInstruction2NewTests9 :"Тіркеуді тоқтату - тіркеу сілтемесін өшіру үшін басыңыз.",
    DashboardTrainerInstruction2NewTests10 :"Қайта жүктеу - Тіркелген кандидаттар тізімін алу үшін басыңыз.",
    DashboardTrainerInstruction2NewTests11 :"Сынақты бастау - сынақты бастау үшін басыңыз.",
    DashboardTrainerInstruction2NewTests12 :"Сынақты аяқтау - сынақты аяқтау үшін басыңыз.",
    DashboardNote1 :"Ескерту -",
    DashboardNote2 :"Бұл викторинаға сілтеме тіркелген тыңдаушылардың электрондық пошта мекенжайына жіберілді. Викторинаға қатысу үшін сілтемені басыңыз."

  }
 });