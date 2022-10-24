// api/tool
import url_base from '../../config/url_base.js';

export const getTools =()=>{
    return new Promise(async(resolve, reject) =>{{
        const {data} = await url_base.get('/tool', { 'headers': { 'x-access-token': localStorage.getItem('token') } } );
        resolve(data);
        }
    })
}