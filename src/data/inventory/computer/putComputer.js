import url_base from "../../../config/url_base";
export const putComputer =(  idComputer, name)=>{
    return new Promise(async(resolve, reject) =>{{
        const Computer={
            Nombre: name
         }
        const {data} = await url_base.put(`/computer/${idComputer}`,Computer, { 'headers': { 'x-access-token': localStorage.getItem('token') } } );
        resolve(data);
        }
    })
}
