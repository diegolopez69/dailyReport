import url_base from "../../../config/url_base";

export const deleteComputer =(  idComputer )=>{
    return new Promise(async(resolve, reject) =>{{
        const {data}= await url_base.delete(`/computer/${idComputer}`,{ 'headers': { 'x-access-token': localStorage.getItem('token') } } );
            resolve(data);
        }
    })
}
