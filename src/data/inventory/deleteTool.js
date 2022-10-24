import url_base from "../../config/url_base";

export const deleteTool =(  idTool )=>{
    return new Promise(async(resolve, reject) =>{{
        const {data}= await url_base.delete(`/tool/${idTool}`,{ 'headers': { 'x-access-token': localStorage.getItem('token') } } );
            resolve(data);
            reject(data)
        }
    })
}
