import { combineReducers } from 'redux'; 
import openDrawer from './opendrawer';
import adminAction from './admin';
import chapterAction from './chapter';
//import companyAction from './company';
import userAction from './loggedinuser'
import trainerAction from './trainer';
//import testAction from './test';
//import conductTest from './conductTest';
import trainee from './trainee';
import mainAction from './main';

export default combineReducers({
    drawer : openDrawer,
    admin : adminAction,
    user : userAction,
    trainer : trainerAction,
    main : mainAction,
    //test : testAction,
    //conduct:conductTest,
    trainee:trainee,
    chapter : chapterAction,
    //company : companyAction,
})