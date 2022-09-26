
import url_base from "../../config/url_base";
export const postUser =( data )=>{
    return new Promise(async(resolve, reject) =>{{
        const {dataResolve} = await url_base.post('/auth/signup', data, { 'headers': { 'x-access-token': localStorage.getItem('user') } } );
        resolve(dataResolve);
        }
    })
}