import apis from '../services/Apis';
import Alert from '../components/common/alert';
import { SecurePost, SecureGet } from '../services/axiosCall';

// export const ChangeQuestionModalState = (d1)=> dispatch =>{
//         dispatch({
//             type : 'CHANGE_QUESTION_MODAL_STATE',
//             payload1 : d1,
//         })
//     }
    

    export const ChangeQuestionModalState = (d1,d2,d3)=> dispatch =>{
        if(d3==='Сохранить'){
            SecureGet({
                url : `${apis.FETCH_SINGLE_QUESTION}/${d2}`
            }).then((response)=>{
                console.log(response);
                if(response.data.success){
                    dispatch({
                        type : 'CHANGE_QUESTION_MODAL_STATE',
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
                type : 'CHANGE_QUESTION_MODAL_STATE',
                payload1 : d1,
                payload2 : d2,
                payload3 : d3,
                payload4: {
                    body: null,
                    quesimg : null,
                    material:null,
                    answer1 : null,
                    trueans1 : false,
                    answer2 : null,
                    trueans2 : false,
                    answer3 : null,
                    trueans3 : false,
                    answer4 : null,
                    trueans4 : false,
                    answer5 : null,
                    trueans5 : false,
                }
            })
        }
    }

export const ChangeQuestionConfirmDirty = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_QUESTION_FORM_CONFIRMDIRTY',
       payload : d
    })
}


export const ChangeQuestionSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_QUESTION_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeQuestionTableData = (materialId)=> dispatch =>{
    dispatch({
       type : 'CHANGE_QUESTION_TABLE_LOADING_STATUS',
       payload1 : true,
       payload2:[]
    });
    SecurePost({
        url : `${apis.GET_ALL_QUESTIONS}/${materialId}`,
        data:{
            //chapter : d,
            material : materialId,
        }
    // SecureGet({
    //     url:  `${apis.GET_ALL_QUESTIONS}/${materialId}`
    }).then((response)=>{
        console.log(response);
        if(response.data.success){
            dispatch({
                type : 'CHANGE_QUESTION_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Ошибкаsd!',response.data.message);
            dispatch({
                type : 'CHANGE_QUESTION_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
    }).catch((error)=>{
        Alert('error','Ошибка!','Ошибка сервера');
        dispatch({
            type : 'CHANGE_QUESTION_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })

}

// export const ChangeSelectedChapter = (d)=> dispatch =>{
//     dispatch({
//        type : 'CHANGE_SELECTED_CHAPTER',
//        payload : d
//     })
// }

// export const ChangeSelectedMaterials = (d)=> dispatch =>{
//     dispatch({
//        type : 'CHANGE_SELECTED_MATERIAL',
//        payload : d
//     })
// }

export const ChangeQuestionFormData = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_QUESTION_FORM_DATA',
       payload : d
    })
}

// export const AddFifthOptionInQuestion = ()=> dispatch =>{
//     dispatch({
//        type : 'ADD_FIFTH_OPTION'
//     })
// }





// export const ChangeTestDetailsModalState = (d1,d2)=> dispatch =>{
//     dispatch({
//        type : 'CHANGE_TEST_DETAILS_MODAL_STATE',
//        payload1 : d1,
//        payload2 : d2
//     })
// }

// export const NewTestModalState = (d1,d2)=> dispatch =>{
//     dispatch({
//        type : 'NEW_TEST_MODAL_STATE',
//        payload1 : d1,
//        payload2 : d2
//     })
// }

// export const ChangeTestSearchText = (d)=> dispatch =>{
//     dispatch({
//        type : 'CHANGE_TEST_SEARCH_TEXT',
//        payload : d
//     })
// }

// export const ChangeTestTableData = ()=> dispatch =>{
//     dispatch({
//         type : 'CHANGE_TEST_TABLE_LOADING_STATUS',
//         payload1 : true,
//         payload2:[]
//     });
//     SecurePost({
//         url : `${apis.GET_ALL_TESTS}`,
//     }).then((response)=>{
//         console.log(response.data);
//         if(response.data.success){
//             dispatch({
//                 type : 'CHANGE_TEST_TABLE_LOADING_STATUS',
//                 payload1 : false,
//                 payload2 : response.data.data
//             })
//         }
//         else{
//             Alert('error','Ошибка!',response.data.message);
//             dispatch({
//                 type : 'CHANGE_TEST_TABLE_LOADING_STATUS',
//                 payload1 : false,
//                 payload2 : []
//             })
//     }
//     }).catch((error)=>{
//         console.log(error);
//         Alert('error','Ошибка!','Ошибка сервера');
//         dispatch({
//             type : 'CHANGE_TEST_TABLE_LOADING_STATUS',
//             payload1 : false,
//             payload2 : []
//         })
//     })
// }

// export const updateQuestiosnActiveTest = (d)=>{
//     return{
//         type:'CHANGE_CURRENT_ACTIVE_TEST_QUESTION',
//         payload:d
//     }
// }


// export const ChangeOptionModalState = (d1,d2,d3)=> dispatch =>{
//     if(d3==='Сохранить'){
//         SecureGet({
//             url : `${apis.GET_SINGLE_OPTION_DETAILS}/${d2}`
//         }).then((response)=>{
//             console.log(response);
//             if(response.data.success){
//                 dispatch({
//                     type : 'CHANGE_OPTION_MODAL_STATE',
//                     payload1 : true,
//                     payload2 : d2,
//                     payload3 : 'Сохранить',
//                     payload4: response.data.data[0]
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
//             type : 'CHANGE_OPTION_MODAL_STATE',
//             payload1 : d1,
//             payload2 : d2,
//             payload3 : d3,
//             payload4: {
//                 optbody : null,
//                 isAnswer : false,
//             }
//         })
//     }
// }

// export const ChangeOptionConfirmDirty = (d)=> dispatch =>{
//     dispatch({
//        type : 'CHANGE_OPTION_FORM_CONFIRMDIRTY',
//        payload : d
//     })
// }

// export const ChangeOptionSearchText = (d)=> dispatch =>{
//     dispatch({
//        type : 'CHANGE_OPTION_SEARCH_TEXT',
//        payload : d
//     })
// }

// export const ChangeOptionTableData = (questionId)=> dispatch =>{
//     dispatch({
//         type : 'CHANGE_OPTION_TABLE_LOADING_STATUS',
//         payload1 : true,
//         payload2 : []
//     })
//     SecureGet({
//         url:  `${apis.GET_ALL_OPTION}/${questionId}`
//     }).then((response)=>{
//         console.log(response);

//         if(response.data.success){
//             dispatch({
//                 type : 'CHANGE_OPTION_TABLE_LOADING_STATUS',
//                 payload1 : false,
//                 payload2 : response.data.data
//             })
//         }
//         else{
//             Alert('error','Ошибка!' ,response.data.message);
//             dispatch({
//                 type : 'CHANGE_OPTION_TABLE_LOADING_STATUS',
//                 payload1 : false,
//                 payload2 : []
//             })
//         }
//       }).catch((error)=>{
//         Alert('error','Ошибка!','Ошибка сервера');
//         dispatch({
//             type : 'CHANGE_OPTION_TABLE_LOADING_STATUS',
//             payload1 : false,
//             payload2 : []
//         })
//     })
// }