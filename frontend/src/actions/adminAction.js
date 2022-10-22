import apis from '../services/Apis';
import Alert from '../components/common/alert';
import { SecureGet } from '../services/axiosCall';


export const ChangeTrainerModalState = (d1,d2,d3)=> dispatch =>{
    if(d3==='Сохранить'){
        SecureGet({
            url : `${apis.GET_SINGLE_TRAINER_DETAILS}/${d2}`
        }).then((response)=>{
            console.log(response);
            if(response.data.success){
                dispatch({
                    type : 'CHANGE_TRAINER_MODAL_STATE',
                    payload1 : true,
                    payload2 : d2,
                    payload3 : 'Сохранить',
                    payload4: {
                        ...response.data.data[0],
                        contact :response.data.data[0].contact.slice(2),
                        prefix:response.data.data[0].contact.slice(0,2),
                    }
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
            type : 'CHANGE_TRAINER_MODAL_STATE',
            payload1 : d1,
            payload2 : d2,
            payload3 : d3,
            payload4: {
                name : null,
                emailid:null,
                contact :null,
                prefix:null,
                password:null,
                confirmpassword : null
            }
        })
    }
}

export const ChangeTrainerConfirmDirty = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_TRAINER_FORM_CONFIRMDIRTY',
       payload : d
    })
}

export const ChangeTrainerSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_TRAINER_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeTrainerTableData = ()=> dispatch =>{
    dispatch({
        type : 'CHANGE_TRAINER_TABLE_LOADING_STATUS',
        payload1 : true,
        payload2 : []
    })
    SecureGet({
        url:  `${apis.GET_ALL_TRAINER}`
    }).then((response)=>{
        console.log(response);
        if(response.data.success){
            dispatch({
                type : 'CHANGE_TRAINER_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Ошибка!',response.data.message);
            dispatch({
                type : 'CHANGE_TRAINER_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
      }).catch((error)=>{
        Alert('error','Ошибка!','Ошибка сервера');
        dispatch({
            type : 'CHANGE_TRAINER_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })
}


export const ChangeCustomerModalState = (d1,d2,d3)=> dispatch =>{
    if(d3==='Сохранить'){
        SecureGet({
            url : `${apis.GET_SINGLE_CUSTOMER_DETAILS}/${d2}`
        }).then((response)=>{
            console.log(response);
            if(response.data.success){
                dispatch({
                    type : 'CHANGE_CUSTOMER_MODAL_STATE',
                    payload1 : true,
                    payload2 : d2,
                    payload3 : 'Сохранить',
                    payload4 : response.data.data[0]
                        
                    
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
            type : 'CHANGE_CUSTOMER_MODAL_STATE',
            payload1 : d1,
            payload2 : d2,
            payload3 : d3,
            payload4: {
                name : null,
                emailid: null,
                avatar: null,
                company: null,
                division: null
            }
        })
    }
}

export const ChangeCustomerConfirmDirty = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_CUSTOMER_FORM_CONFIRMDIRTY',
       payload : d
    })
}

export const ChangeCustomerSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_CUSTOMER_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeCustomerTableData = ()=> dispatch =>{
    dispatch({
        type : 'CHANGE_CUSTOMER_TABLE_LOADING_STATUS',
        payload1 : true,
        payload2 : []
    })
    SecureGet({
        url:  `${apis.GET_ALL_CUSTOMER}`
    }).then((response)=>{
        console.log(response);

        if(response.data.success){
            dispatch({
                type : 'CHANGE_CUSTOMER_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Ошибка!' ,response.data.message);
            dispatch({
                type : 'CHANGE_CUSTOMER_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
      }).catch((error)=>{
        Alert('error','Ошибка!','Ошибка сервера');
        dispatch({
            type : 'CHANGE_CUSTOMER_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })
}


export const ChangeCompanyModalState = (d1,d2,d3)=> dispatch =>{
    if(d3==='Сохранить'){
        SecureGet({
            url : `${apis.GET_SINGLE_COMPANY_DETAILS}/${d2}`
        }).then((response)=>{
            console.log(response);
            if(response.data.success){
                dispatch({
                    type : 'CHANGE_COMPANY_MODAL_STATE',
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
            type : 'CHANGE_COMPANY_MODAL_STATE',
            payload1 : d1,
            payload2 : d2,
            payload3 : d3,
            payload4: {
                name : null,
                logo : null,
                descr : null,
                licFromDate : null,
                licToDate : null,
                numOfLic : null,
                numOfLicAcc : null,
                contact : null
            }
        })
    }
}

export const ChangeCompanyConfirmDirty = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_COMPANY_FORM_CONFIRMDIRTY',
       payload : d
    })
}

export const ChangeCompanySearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_COMPANY_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeCompanyTableData = ()=> dispatch =>{
    dispatch({
        type : 'CHANGE_COMPANY_TABLE_LOADING_STATUS',
        payload1 : true,
        payload2 : []
    })
    SecureGet({
        url:  `${apis.GET_ALL_COMPANY}`
    }).then((response)=>{
        console.log(response);
        if(response.data.success){
            dispatch({
                type : 'CHANGE_COMPANY_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Ошибка!',response.data.message);
            dispatch({
                type : 'CHANGE_COMPANY_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
      }).catch((error)=>{
        Alert('error','Ошибка!','Ошибка сервера');
        dispatch({
            type : 'CHANGE_COMPANY_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })
}

export const ChangeSelectedCompany = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_SELECTED_COMPANY',
       payload : d
    })
}


export const ChangeDivisionModalState = (d1,d2,d3)=> dispatch =>{
    if(d3==='Сохранить'){
        SecureGet({
            url : `${apis.GET_SINGLE_DIVISION_DETAILS}/${d2}`
        }).then((response)=>{
            console.log(response);
            if(response.data.success){
                dispatch({
                    type : 'CHANGE_DIVISION_MODAL_STATE',
                    payload1 : true,
                    payload2 : d2,
                    payload3 : 'Сохранить',
                    payload4: response.data.data[0]
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
            type : 'CHANGE_DIVISION_MODAL_STATE',
            payload1 : d1,
            payload2 : d2,
            payload3 : d3,
            payload4: {
                name : null,
                description:null,
            }
        })
    }
}

export const ChangeDivisionConfirmDirty = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_DIVISION_FORM_CONFIRMDIRTY',
       payload : d
    })
}

export const ChangeDivisionSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_DIVISION_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeSelectedDivisions = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_SELECTED_DIVISION',
       payload : d
    })
}

export const ChangeDivisionTableData = (d)=> dispatch =>{
    dispatch({
        type : 'CHANGE_DIVISION_TABLE_LOADING_STATUS',
        payload1 : true,
        payload2 : []
    })
    SecureGet({
        url:  `${apis.GET_ALL_DIVISION}`
    }).then((response)=>{
        console.log(response);

        if(response.data.success){
            dispatch({
                type : 'CHANGE_DIVISION_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Ошибка!' ,response.data.message);
            dispatch({
                type : 'CHANGE_DIVISION_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
      }).catch((error)=>{
        Alert('error','Ошибка!','Ошибка сервера');
        dispatch({
            type : 'CHANGE_DIVISION_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })
}


// export const ChangeSubjectModalState = (d1,d2,d3)=> dispatch =>{
//     if(d3==='Сохранить'){
//         SecureGet({
//             url : `${apis.GET_SINGLE_SUBJECT_DETAILS}/${d2}`
//         }).then((response)=>{
//             if(response.data.success){
//                 dispatch({
//                     type : 'CHANGE_SUBJECT_MODAL_STATE',
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
//             type : 'CHANGE_SUBJECT_MODAL_STATE',
//             payload1 : d1,
//             payload2 : d2,
//             payload3 : d3,
//             payload4: {
//                 topic : null
//             }
//         })
//     }
// }


// export const ChangeSubjectConfirmDirty = (d)=> dispatch =>{
//     dispatch({
//        type : 'CHANGE_SUBJECT_FORM_CONFIRMDIRTY',
//        payload : d
//     })
// }


// export const ChangeSubjectSearchText = (d)=> dispatch =>{
//     dispatch({
//        type : 'CHANGE_SUBJECT_SEARCH_TEXT',
//        payload : d
//     })
// }

// export const ChangeSubjectTableData = (d)=> dispatch =>{
//     console.log('fetchng subjects');
//     dispatch({
//        type : 'CHANGE_SUBJECT_TABLE_LOADING_STATUS',
//        payload1 : true,
//        payload2 :[]
//     })
//     SecureGet({
//         url:  `${apis.GET_ALL_SUBJECTS}`
//     }).then((response)=>{
//         console.log(response);
//         if(response.data.success){
//             dispatch({
//                 type : 'CHANGE_SUBJECT_TABLE_LOADING_STATUS',
//                 payload1 : false,
//                 payload2 : response.data.data
//             })
//         }
//         else{
//             Alert('error','Ошибка!',response.data.message);
//             dispatch({
//                 type : 'CHANGE_SUBJECT_TABLE_LOADING_STATUS',
//                 payload1 : false,
//                 payload2 : []
//             })
//         }
//       }).catch((error)=>{
//         Alert('error','Ошибка!','Ошибка сервера');
//         dispatch({
//             type : 'CHANGE_SUBJECT_TABLE_LOADING_STATUS',
//             payload1 : false,
//             payload2 : []
//         })
//     })

// }


