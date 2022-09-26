import url_base from "../../config/url_base";
export const deleteUser =(  idUser  )=>{
    return new Promise(async(resolve, reject) =>{{
        const data = await url_base.delete(`/user/${idUser}`, { data: { answer: idUser } }, { 'headers': { 'x-access-token': localStorage.getItem('user') } } );
        resolve(data);
        }
    })
}
