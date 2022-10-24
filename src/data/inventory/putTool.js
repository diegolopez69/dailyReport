import url_base from "../../config/url_base";
export const putTool =(  idTool, type, name )=>{
    return new Promise(async(resolve, reject) =>{{
        const Tool={
            Tipo: type,
            Nombre: name
         }
        const {data} = await url_base.put(`/tool/${idTool}`,Tool, { 'headers': { 'x-access-token': localStorage.getItem('token') } } );
        resolve(data);
        }
    })
}
