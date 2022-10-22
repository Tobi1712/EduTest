import apis from '../services/Apis';
import Alert from '../components/common/alert';
import { SecurePost } from '../services/axiosCall';
export const changeStep = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_ACTIVE_STEP',
       payload : d
    })
}

export const changeBasicNewTestDetails = (d)=> dispatch =>{
    dispatch({
        type: 'CHANGE_BASIC_NEW_TEST_DETAILS',
        payload:d
    })
}

export const pushQuestionToQueue = (d)=> dispatch =>{
    dispatch({
        type: 'ADD_QUESTION_TO_QUESTION_QUEUSE',
        payload:d
    })
}

export const removeQuestionFromMainQueue = (d)=> dispatch =>{
    dispatch({
        type: 'REMOVE_QUESTION_FROM_MAIN_QUEUE',
        payload:d
    })
}

export const changeMode = (d)=> dispatch =>{
    dispatch({
        type : 'CHANGE_MODE_QUESTION_SELECT',
        payload:d
    })
}



export const fetchChapterWiseQuestion = (d) => dispatch =>{
    SecurePost({
        url : `${apis.GET_ALL_QUESTIONS}`,
        data:{
            chapter : d
        }
    }).then((response)=>{
        console.log(response);
        if(response.data.success){
            dispatch({
                type : 'FETCH_QUESTIONS_BASED_ON_CHAPTER',
                payload : response.data.data
            })
        }
        else{
            Alert('error','Ошибка!',response.data.message);
            dispatch({
                type : 'FETCH_QUESTIONS_BASED_ON_CHAPTER',
                payload:[]
            })
        }
    }).catch((error)=>{
        Alert('error','Ошибка!','Ошибка Сервера');
        dispatch({
            type : 'FETCH_QUESTIONS_BASED_ON_CHAPTER',
            payload:[]
        })
    })
}

export const fetchMaterialWiseQuestion = (d) => dispatch =>{
    SecurePost({
        url : `${apis.GET_ALL_QUESTIONS}`,
        data:{
            materials : d
        }
    }).then((response)=>{
        console.log(response);
        if(response.data.success){
            dispatch({
                type : 'FETCH_QUESTIONS_BASED_ON_MATERIAL',
                payload : response.data.data
            })
        }
        else{
            Alert('error','Ошибка!',response.data.message);
            dispatch({
                type : 'FETCH_QUESTIONS_BASED_ON_MATERIAL',
                payload:[]
            })
        }
    }).catch((error)=>{
        Alert('error','Ошибка!','Ошибка Сервера');
        dispatch({
            type : 'FETCH_QUESTIONS_BASED_ON_MATERIAL',
            payload:[]
        })
    })
}