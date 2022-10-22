import apis from '../services/Apis';
import Alert from '../components/common/alert';
import { SecureGet, SecurePost } from '../services/axiosCall';


export const ChangeChapterModalState = (d1,d2,d3)=> dispatch =>{
    if(d3==='Сохранить'){
        SecureGet({
            url : `${apis.GET_SINGLE_CHAPTER_DETAILS}/${d2}`
        }).then((response)=>{
            console.log(response);
            if(response.data.success){
                dispatch({
                    type : 'CHANGE_CHAPTER_MODAL_STATE',
                    payload1 : true,
                    payload2 : d2,
                    payload3 : 'Сохранить',
                    payload4 : response.data.data[0],
                    
                })
            }
            else{
                return Alert('warning','Предупреждение!',response.data.message);
            }
        }).catch((error)=>{
            return Alert('error','Ошибка!','Ошибка сервера');
        })
    }
    else{
        dispatch({
            type : 'CHANGE_CHAPTER_MODAL_STATE',
            payload1 : d1,
            payload2 : d2,
            payload3 : d3,
            payload4: {
                name : null,
                descr : null,
                icon1 : null,
                icon2 : null,
                icon3 : null,
                icon4 : null,
                materials : null,
            }
        })
    }
}

export const ChangeChapterConfirmDirty = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_CHAPTER_FORM_CONFIRMDIRTY',
       payload : d
    })
}

export const ChangeChapterSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_CHAPTER_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeChapterTableData = ()=> dispatch =>{
    dispatch({
        type : 'CHANGE_CHAPTER_TABLE_LOADING_STATUS',
        payload1 : true,
        payload2 : []
    })
    SecureGet({
        url:  `${apis.GET_ALL_CHAPTER}`
    }).then((response)=>{
        console.log(response);
        if(response.data.success){
            dispatch({
                type : 'CHANGE_CHAPTER_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Ошибка!',response.data.message);
            dispatch({
                type : 'CHANGE_CHAPTER_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
      }).catch((error)=>{
        Alert('error','Ошибка!','Ошибка сервера');
        dispatch({
            type : 'CHANGE_CHAPTER_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })
}

export const ChangeMaterialModalState = (d1,d2,d3)=> dispatch =>{
    
    if(d3==='Сохранить'){
        SecureGet({
            url : `${apis.GET_SINGLE_MATERIAL_DETAILS}/${d2}`
        }).then((response)=>{
            console.log(response);
            if(response.data.success){
                dispatch({
                    type : 'CHANGE_MATERIAL_MODAL_STATE',
                    payload1 : true,
                    payload2 : d2,
                    payload3 : 'Сохранить',
                    payload4 : response.data.data[0],
                    
                })
            }
            else{
                return Alert('warning','Предупреждение!',response.data.message);
            }
        }).catch((error)=>{
            return Alert('error','Ошибка!','Ошибка сервера1');
        })
    }
    else{
        dispatch({
            type : 'CHANGE_MATERIAL_MODAL_STATE',
            payload1 : d1,
            payload2 : d2,
            payload3 : d3,
            payload4: {
                num : null,
                topic: null,
                chapter: null,
                duration: null,
                attempts:null,
                period:null,
                numQuestions:null
            }
        })
    }
}


export const ChangeMaterialConfirmDirty = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_MATERIAL_FORM_CONFIRMDIRTY',
       payload : d
    })
}

export const ChangeMaterialSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_MATERIAL_SEARCH_TEXT',
       payload : d
    })
}





export const ChangeMaterialTableData = (chapterId)=> dispatch =>{
    dispatch({
        type : 'CHANGE_MATERIAL_TABLE_LOADING_STATUS',
        payload1 : true,
        payload2 : []
    })
    SecurePost({
        url:  `${apis.GET_ALL_MATERIAL}/${chapterId}`
    }).then((response)=>{
        console.log(response);
        if(response.data.success){
            dispatch({
                type : 'CHANGE_MATERIAL_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','qОшибка!',response.data.message);
            dispatch({
                type : 'CHANGE_MATERIAL_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
      }).catch((error)=>{
        Alert('error','Ошибка!','Ошибка сервера');
        dispatch({
            type : 'CHANGE_MATERIAL_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })
}

export const ChangeSlideModalState = (d1,d2,d3)=> dispatch =>{
    if(d3==='Сохранить'){
        SecureGet({
            url : `${apis.GET_SINGLE_SLIDE_DETAILS}/${d2}`
        }).then((response)=>{
            console.log(response);
            if(response.data.success){
                dispatch({
                    type : 'CHANGE_SLIDE_MODAL_STATE',
                    payload1 : true,
                    payload2 : d2,
                    payload3 : 'Сохранить',
                    payload4 : response.data.data[0],
                    
                })
            }
            else{
                return Alert('warning','Предупреждение!',response.data.message);
            }
        }).catch((error)=>{
            return Alert('error','Ошибка!','Ошибка сервера');
        })
    }
    else{
        dispatch({
            type : 'CHANGE_SLIDE_MODAL_STATE',
            payload1 : d1,
            payload2 : d2,
            payload3 : d3,
            payload4: {
                slbody: null,
                slimage: null,
                material:null
            }
        })
    }
}

export const ChangeSlideConfirmDirty = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_SLIDE_FORM_CONFIRMDIRTY',
       payload : d
    })
}

export const ChangeSlideSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_SLIDE_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeSlideTableData = (materialId)=> dispatch =>{
    dispatch({
        type : 'CHANGE_SLIDE_TABLE_LOADING_STATUS',
        payload1 : true,
        payload2 : []
    })
    SecureGet({
        url:  `${apis.GET_ALL_SLIDE}/${materialId}`
    }).then((response)=>{
        // console.log('RESPONSE',response);
        if(response.data.success){
            dispatch({
                type : 'CHANGE_SLIDE_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data,  
            })
        }
        else{
            Alert('error','Ошибка!',response.data.message);
            dispatch({
                type : 'CHANGE_SLIDE_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
      }).catch((error)=>{
        Alert('error','Ошибка!','Ошибка сервера');
        dispatch({
            type : 'CHANGE_SLIDE_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })
}


// export const ChangeTestModalState = (d1,d2,d3)=> dispatch =>{
//     if(d3==='Завершить тест'){
//         SecureGet({
//             url : `${apis.GET_SINGLE_TEST_DETAILS}/${d2}`
//         }).then((response)=>{
//             console.log(response);
//             if(response.data.success){
//                 dispatch({
//                     type : 'CHANGE_TEST_MODAL_STATE',
//                     payload1 : true,
//                     payload2 : d2,
//                     payload3 : 'Завершить тест',
//                     payload4 : response.data.data[0],
                    
//                 })
//             }
//             else{
//                 return Alert('warning','Предупреждение!',response.data.message);
//             }
//         }).catch((error)=>{
//             return Alert('error','Ошибка!','Ошибка сервера');
//         })
//     }
//     else{
//         dispatch({
//             type : 'CHANGE_TEST_MODAL_STATE',
//             payload1 : d1,
//             payload2 : d2,
//             payload3 : d3,
//             payload4: {
//                 chapterid: null,
//                 materialid:null,
//                 startDate:null,
//                 complationDate:null,
//                 startTest:null,
//                 endTest:null,
//                 result:null
//             }
//         })
//     }
// }

export const ChangeTestConfirmDirty = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_TEST_FORM_CONFIRMDIRTY',
       payload : d
    })
}

export const ChangeTestSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_TEST_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeTestTableData = (materialId)=> dispatch =>{
    dispatch({
        type : 'CHANGE_TEST_TABLE_LOADING_STATUS',
        payload1 : true,
        payload2 : []
    })
    SecureGet({
        url:  `${apis.GET_ALL_TEST}/${materialId}` 
    }).then((response)=>{
        console.log(response);
        if(response.data.success){
            dispatch({
                type : 'CHANGE_TEST_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data[0]
            })
        }
        else{
            Alert('error','Ошибка!',response.data.message);
            dispatch({
                type : 'CHANGE_TEST_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
      }).catch((error)=>{
        Alert('error','Ошибка!','Ошибка сервера');
        dispatch({
            type : 'CHANGE_TEST_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })
}

// export const ChangeAnswersModalState = (d1,d2,d3)=> dispatch =>{
//     if(d3==='Сохранить'){
//         SecureGet({
//             url : `${apis.GET_SINGLE_ANSWER_DETAILS}/${d2}`
//         }).then((response)=>{
//             console.log(response);
//             if(response.data.success){
//                 dispatch({
//                     type : 'CHANGE_ANSWER_MODAL_STATE',
//                     payload1 : true,
//                     payload2 : d2,
//                     payload3 : 'Save',
//                     payload4 : response.data.data[0],
                    
//                 })
//             }
//             else{
//                 return Alert('warning','Предупреждение!',response.data.message);
//             }
//         }).catch((error)=>{
//             return Alert('error','Ошибка!','Ошибка сервера');
//         })
//     }
//     else{
//         dispatch({
//             type : 'CHANGE_ANSWER_MODAL_STATE',
//             payload1 : d1,
//             payload2 : d2,
//             payload3 : d3,
//             payload4: {
//                 materialid:null,
//             }
//         })
//     }
// }

export const ChangeAnswersConfirmDirty = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_ANSWER_FORM_CONFIRMDIRTY',
       payload : d
    })
}

export const ChangeAnswersSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_ANSWER_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeAnswersTableData = (materialId)=> dispatch =>{
    dispatch({
        type : 'CHANGE_ANSWER_TABLE_LOADING_STATUS',
        payload1 : true,
        payload2 : []
    })
    SecureGet({
        url:  `${apis.GET_ALL_ANSWERS}/${materialId}`
    }).then((response)=>{
        if(response.data.success){
            dispatch({
                type : 'CHANGE_ANSWER_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Ошибка11!',response.data.message);
            console.log(response.data.message);
            dispatch({
                type : 'CHANGE_ANSWER_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
      }).catch((error)=>{
        Alert('error','Ошибка22!','Ошибка сервера');
        dispatch({
            type : 'CHANGE_ANSWER_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })
}


