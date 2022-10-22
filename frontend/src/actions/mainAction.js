import apis from '../services/Apis';

export const changeLang = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_LANG',
       payload : d
    })
}