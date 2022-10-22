const initialState = {
    TrainermodalOpened : false,
    TrainerconfirmDirty: false,
    Trainermode : 'Регистрация',
    trainerId : null,
    TrainersearchText : '',
    trainerTableLoadingStatus:false,
    trainerEditFormLoadingStatus:false,
    trainerTableData:[],
    trainerdetails:{},

    CustomermodalOpened : false,
    CustomerconfirmDirty: false,
    Customermode : 'Регистрация',
    customerId : null,
    CustomersearchText : '',
    customerTableLoadingStatus:false,
    customerEditFormLoadingStatus:false,
    customerTableData:[],
    customerdetails:{},

    CompanymodalOpened : false,
    CompanyconfirmDirty: false,
    Companymode : 'Регистрация',
    companyId : null,
    CompanysearchText : '',
    companyTableLoadingStatus:false,
    companyEditFormLoadingStatus:false,
    companyTableData:[],
    companydetails:{},
    selectedCompany: [],

    DivisionmodalOpened : false,
    DivisionconfirmDirty: false,
    Divisionmode : 'Регистрация',
    divisionId : null,
    DivisionsearchText : '',
    divisionTableLoadingStatus:false,
    divisionEditFormLoadingStatus:false,
    divisionTableData:[],
    selectedDivisions:[],
    
    divisiondetails:{},
}

export default (state = initialState, action )=>{
    switch(action.type){
        case 'CHANGE_TRAINER_MODAL_STATE':
            return {
                ...state,
                TrainermodalOpened : action.payload1,
                trainerId : action.payload2,
                Trainermode : action.payload3,
                trainerdetails : action.payload4
            }
        
        case 'CHANGE_TRAINER_FORM_CONFIRMDIRTY':
            return {
                ...state,
                TrainerconfirmDirty : action.payload
            }
        
        case 'CHANGE_TRAINER_SEARCH_TEXT':
            return {
                ...state,
                TrainersearchText : action.payload
            }

        case 'CHANGE_TRAINER_TABLE_LOADING_STATUS':
            return {
                ...state,
                trainerTableLoadingStatus : action.payload1,
                trainerTableData : action.payload2,
            }

        case 'CHANGE_CUSTOMER_MODAL_STATE':
            return {
                ...state,
                CustomermodalOpened : action.payload1,
                customerId : action.payload2,
                Customermode : action.payload3,
                customerdetails : action.payload4
            }
            
        case 'CHANGE_CUSTOMER_FORM_CONFIRMDIRTY':
            return {
                ...state,
                CustomerconfirmDirty : action.payload
            }
        
        case 'CHANGE_CUSTOMER_SEARCH_TEXT':
            return {
                ...state,
                CustomersearchText : action.payload
            }

        case 'CHANGE_CUSTOMER_TABLE_LOADING_STATUS':
            return {
                ...state,
                customerTableLoadingStatus : action.payload1,
                customerTableData : action.payload2,
            }  
            
        case 'CHANGE_DIVISION_MODAL_STATE':
            return {
                ...state,
                DivisionmodalOpened : action.payload1,
                divisionId : action.payload2,
                Divisionmode : action.payload3,
                divisiondetails : action.payload4
            }
           
        case 'CHANGE_SELECTED_DIVISION':
            return {
                ...state,
                selectedDivisions : action.payload
            }

        case 'CHANGE_DIVISION_FORM_CONFIRMDIRTY':
            return {
                ...state,
                DivisionconfirmDirty : action.payload
            }

        case 'CHANGE_DIVISION_SEARCH_TEXT':
            return {
                ...state,
                DivisionsearchText : action.payload
            }
        
        case 'CHANGE_DIVISION_TABLE_LOADING_STATUS':
            return {
                ...state,
                divisionTableLoadingStatus : action.payload1,
                divisionTableData : action.payload2,
            }  
            
            case 'CHANGE_COMPANY_MODAL_STATE':
                return {
                    ...state,
                    CompanymodalOpened : action.payload1,
                    companyId : action.payload2,
                    Companymode : action.payload3,
                    companydetails : action.payload4
    
                }

            case 'CHANGE_COMPANY_FORM_CONFIRMDIRTY':
                return {
                    ...state,
                    CompanyconfirmDirty : action.payload
                }


            case 'CHANGE_COMPANY_SEARCH_TEXT':
                return {
                    ...state,
                    CompanysearchText : action.payload
                }

            case 'CHANGE_COMPANY_TABLE_LOADING_STATUS':
                return {
                    ...state,
                    companyTableLoadingStatus : action.payload1,
                    companyTableData : action.payload2,
                }  
            
            case 'CHANGE_SELECTED_COMPANY':
                return {
                    ...state,
                    selectedCompany : action.payload
                }

        case 'CHANGE_SUBJECT_MODAL_STATE':
            return {
                ...state,
                SubjectmodalOpened : action.payload1,
                SubjectId : action.payload2,
                Subjectmode : action.payload3,
                subjectDetails : action.payload4
            }
        case 'CHANGE_SUBJECT_FORM_CONFIRMDIRTY':
            return {
                ...state,
                SubjectconfirmDirty : action.payload
            }
        case 'CHANGE_SUBJECT_SEARCH_TEXT':
                return {
                    ...state,
                    SubjectsearchText : action.payload
                }
        case 'CHANGE_SUBJECT_TABLE_LOADING_STATUS':
                return {
                    ...state,
                    SubjectTableLoading : action.payload1,
                    subjectTableData :action.payload2
                }
        default:
            return state;
    }
}