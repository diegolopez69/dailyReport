import url_base from '../../config/url_base.js';

export const getChromebooks =()=>{
    return new Promise(async(resolve, reject) =>{{
        const {data} = await url_base.get('/chromebook', { 'headers': { 'x-access-token': localStorage.getItem('token') } } );
        resolve(data);
        }
    })
}