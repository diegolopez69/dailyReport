import url_base from '../../config/url_base.js';

export const getUsers =()=>{
    return new Promise(async(resolve, reject) =>{{
        const {data} = await url_base.get('/auth/signup', { 'headers': { 'x-access-token': localStorage.getItem('user') } } );
        resolve(data);
        }
    })
}

