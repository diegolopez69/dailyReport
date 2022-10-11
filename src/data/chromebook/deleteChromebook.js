import url_base from "../../config/url_base";

export const deleteChromebook =(  idChrome  )=>{
    return new Promise(async(resolve, reject) =>{{
        const data = await url_base.delete(`/chromebook/${idChrome}`,{ 'headers': { 'x-access-token': localStorage.getItem('token') } } );
            resolve(data);
        }
    })
}
