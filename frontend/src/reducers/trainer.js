const initialState = {
    NewQuestionmodalOpened : false,
    QuestionmodalOpened : false,
    AllQuestionconfirmDirty: false,
    QuestionsearchText : '',
    QuestionTableLoading : false, 
    QuestionTableData : [],
    questionId : null,
    Questionmode : "Создать вопрос",
    questiondetails : {},
    //selectedSubjects:[],
    // selectedChapter:[],
    // selectedMaterials:[],
    QuestionFormData:{},
    // fifthoptioAddButtonVisible:true,
    TestTableLoading:false,
    TestTableData:[],
    DataActiveTestDetails : {
        testDetailsId : null,
        testquestions :[]
    },
    NewTestmodalOpened : false,
    Createtestmode : 'Создать',

    OptionmodalOpened : false,
    optionId : null,
    Optionmode : 'Создать',
    optiondetails : {},
    OptionconfirmDirty: false,
    OptionsearchText : '',
    OptionTableLoading : false, 
    OptionTableData : [],

}


export default (state = initialState, action )=>{
    switch(action.type){
        // case 'CHANGE_QUESTION_MODAL_STATE':
        //     return {
        //         ...state,
        //         NewQuestionmodalOpened : action.payload1,
        //     }
        case 'CHANGE_QUESTION_MODAL_STATE':
            return {
                ...state,
                QuestionmodalOpened : action.payload1,
                questionId : action.payload2,
                Questionmode : action.payload3,
                questioneditdetails : action.payload4
            }

        case 'CHANGE_QUESTION_FORM_CONFIRMDIRTY':
            return {
                ...state,
                AllQuestionconfirmDirty : action.payload
            }
        case 'CHANGE_QUESTION_SEARCH_TEXT':
            return {
                ...state,
                QuestionsearchText : action.payload
            }
        case 'CHANGE_QUESTION_TABLE_LOADING_STATUS':
            return {
                ...state,
                QuestionTableLoading : action.payload1,
                QuestionTableData : action.payload2
            }


        case 'CHANGE_QUESTION_FORM_DATA':
            return{
                ...state,
                QuestionFormData : action.payload
            }
        case 'CHANGE_TEST_DETAILS_MODAL_STATE':
            return {
                ...state,
                TestDetailsmodalOpened : action.payload1,
                DataActiveTestDetails :{
                    ...state.DataActiveTestDetails,
                    testDetailsId : action.payload2
                }
            }

        case 'NEW_TEST_MODAL_STATE':
            return{
                ...state,
                NewTestmodalOpened : action.payload1,
                Createtestmode : action.payload2
            }

        case 'CHANGE_TEST_SEARCH_TEXT':
            return {
                ...state,
                TestsearchText : action.payload
            }
        case 'CHANGE_TEST_TABLE_LOADING_STATUS':
            return {
                ...state,
                TestTableLoading : action.payload1,
                TestTableData :action.payload2
            }
        case 'CHANGE_CURRENT_ACTIVE_TEST_QUESTION':
            return{
                ...state,
                DataActiveTestDetails:{
                    ...state.DataActiveTestDetails,
                    testquestions:action.payload
                }
            }

                    
            case 'CHANGE_OPTION_MODAL_STATE':
                return {
                    ...state,
                    OptionmodalOpened : action.payload1,
                    optionId : action.payload2,
                    Optionmode : action.payload3,
                    optiondetails : action.payload4
                }
    
            case 'CHANGE_OPTION_FORM_CONFIRMDIRTY':
                return {
                    ...state,
                    OptionconfirmDirty : action.payload
                }
    
            case 'CHANGE_OPTION_SEARCH_TEXT':
                return {
                    ...state,
                    OptionsearchText : action.payload
                }
            
            case 'CHANGE_OPTION_TABLE_LOADING_STATUS':
                return {
                    ...state,
                    optionTableLoadingStatus : action.payload1,
                    optionTableData : action.payload2,
                }  
        default:
            return state;
    }
}