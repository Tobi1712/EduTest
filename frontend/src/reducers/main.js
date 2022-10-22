const initialState = {
    language:['ru', 'kz']
}

export default (state = initialState, action )=>{
    switch(action.type){
        case 'CHANGE_LANG':
            return {
                ...state,
                language:action.payload
            }

        default:
            return state;
    }
}