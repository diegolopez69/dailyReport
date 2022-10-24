
import url_base from "../../config/url_base";
export const postTool =( type, name )=>{
    const Tool= {
        Tipo:type,
        Nombre:name
    }
    return new Promise(async(resolve, reject) =>{{
        const {data} = await url_base.post('/tool', Tool, { 'headers': { 'x-access-token': localStorage.getItem('token') } } );
        resolve(data);
        }
    })
}