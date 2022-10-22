const initialState = {
    ChaptermodalOpened : false,
    ChapterconfirmDirty: false,
    Chaptermode : 'Добавить',
    chapterId : null,
    ChaptersearchText : '',
    chapterTableLoadingStatus:false,
    chapterEditFormLoadingStatus:false,
    chapterTableData:[],
    chapterdetails:{},
    
    MaterialmodalOpened : false,
    MaterialconfirmDirty: false,
    Materialmode : 'Добавить',
    materialId : null,
    MaterialsearchText : '',
    selectedMaterials:[],
    materialTableLoadingStatus:false,
    materialEditFormLoadingStatus:false,
    materialTableData:[],
    materialdetails:{},

    SlideconfirmDirty: false,
    Slidemode : 'Добавить',
    slideId : null,
    SlidesearchText : '',
    selectedSlides:[],
    slideTableLoadingStatus:false,
    slideEditFormLoadingStatus:false,
    slideTableData:[],
    slidedetails:{},
    // slideData:[],

    TestmodalOpened : false,
    TestconfirmDirty: false,
    Testmode : 'Завершить тест',
    testId : null,
    TestsearchText : '',
    testTableLoadingStatus:false,
    testEditFormLoadingStatus:false,
    testTableData:[],
    testdetails:{},

    AnswermodalOpened : false,
    AnswerconfirmDirty: false,
    Answermode : 'Добавить',
    answerId : null,
    AnswersearchText : '',
    answerTableLoadingStatus:false,
    answerEditFormLoadingStatus:false,
    AnswerTableData:[],
    answerdetails:{},

}

export default (state = initialState, action )=>{
    switch(action.type){
            case 'CHANGE_CHAPTER_MODAL_STATE':
                return {
                    ...state,
                    ChaptermodalOpened : action.payload1,
                    chapterId : action.payload2,
                    Chaptermode : action.payload3,
                    chapterdetails : action.payload4
    
                }

            case 'CHANGE_CHAPTER_FORM_CONFIRMDIRTY':
                return {
                    ...state,
                    ChapterconfirmDirty : action.payload
                }

            case 'CHANGE_CHAPTER_SEARCH_TEXT':
                return {
                    ...state,
                    ChaptersearchText : action.payload
                }


            case 'CHANGE_CHAPTER_TABLE_LOADING_STATUS':
                return {
                    ...state,
                    chapterTableLoadingStatus : action.payload1,
                    chapterTableData : action.payload2,
                }  
            
            case 'CHANGE_MATERIAL_MODAL_STATE':
                return {
                    ...state,
                    MaterialmodalOpened : action.payload1,
                    materialId : action.payload2,
                    Materialmode : action.payload3,
                    materialdetails : action.payload4
                }

            case 'CHANGE_MATERIAL_FORM_CONFIRMDIRTY':
                return {
                    ...state,
                    MaterialconfirmDirty : action.payload
                }
                
            case 'CHANGE_MATERIAL_SEARCH_TEXT':
                return {
                    ...state,
                    MaterialsearchText : action.payload
                }
                
            case 'CHANGE_MATERIAL_TABLE_LOADING_STATUS':
                return {
                    ...state,
                    materialTableLoadingStatus : action.payload1,
                    materialTableData : action.payload2,
                } 


            case 'CHANGE_SLIDE_MODAL_STATE':
                return {
                    ...state,
                    SlidemodalOpened : action.payload1,
                    slideId : action.payload2,
                    Slidemode : action.payload3,
                    slidedetails : action.payload4
                }
    
            case 'CHANGE_SLIDE_FORM_CONFIRMDIRTY':
                return {
                    ...state,
                    SlideconfirmDirty : action.payload
                }
                    
            case 'CHANGE_SLIDE_SEARCH_TEXT':
                return {
                    ...state,
                    SlidesearchText : action.payload
                }
                    
            case 'CHANGE_SLIDE_TABLE_LOADING_STATUS':
                return {
                    ...state,
                    slideTableLoadingStatus : action.payload1,
                    slideTableData : action.payload2,
                } 
            
            case 'CHANGE_TEST_MODAL_STATE':
                return {
                    ...state,
                    TestmodalOpened : action.payload1,
                    testId : action.payload2,
                    Testmode : action.payload3,
                    testdetails : action.payload4
                }
    
            case 'CHANGE_TEST_FORM_CONFIRMDIRTY':
                return {
                    ...state,
                    TestconfirmDirty : action.payload
                }
    
            case 'CHANGE_TEST_SEARCH_TEXT':
                return {
                    ...state,
                    TestsearchText : action.payload
                }
    
            case 'CHANGE_TEST_TABLE_LOADING_STATUS':
                return {
                    ...state,
                    testTableLoadingStatus : action.payload1,
                    testTableData : action.payload2,
                }  

            
            case 'CHANGE_ANSWER_MODAL_STATE':
                return {
                    ...state,
                    AnswermodalOpened : action.payload1,
                    answerId : action.payload2,
                    Answermode : action.payload3,
                    answerdetails : action.payload4
                }
        
            case 'CHANGE_ANSWER_FORM_CONFIRMDIRTY':
                return {
                    ...state,
                    AnswerconfirmDirty : action.payload
                }
        
            case 'CHANGE_ANSWER_SEARCH_TEXT':
                return {
                    ...state,
                    AnswersearchText : action.payload
                }
        
            case 'CHANGE_ANSWER_TABLE_LOADING_STATUS':
                return {
                    ...state,
                    answerTableLoadingStatus : action.payload1,
                    AnswerTableData : action.payload2,
                }  


        default:
            return state;
    }
}