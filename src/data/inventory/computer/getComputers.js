import url_base from "../../../config/url_base";

export const getComputers =()=>{
    return new Promise(async(resolve, reject) =>{{
        const {data} = await url_base.get('/computer', { 'headers': { 'x-access-token': localStorage.getItem('token') } } );
        resolve(data);
        }
    })
}