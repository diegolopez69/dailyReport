import url_base from "../../config/url_base";
export const putDescriptionChromebook =(  idChromebook, description, estado  )=>{
    return new Promise(async(resolve, reject) =>{{
        const chromebook={
            Estado : estado,
            Descripcion :description
            
        }
        const {data} = await url_base.put(`/chromebook/${idChromebook}`,chromebook, { 'headers': { 'x-access-token': localStorage.getItem('token') } } );
        resolve(data);
        }
    })
}
