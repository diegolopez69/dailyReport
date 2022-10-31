import url_base from "../../../config/url_base";
export const postComputer =( name )=>{
    const Computer= {
        Nombre:name
    }
    return new Promise(async(resolve, reject) =>{{
        const {data} = await url_base.post('/computer', Computer, { 'headers': { 'x-access-token': localStorage.getItem('token') } } );
        resolve(data);
        }
    })
}