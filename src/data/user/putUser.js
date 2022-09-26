import url_base from "../../config/url_base";
export const putUser =(  idUser, username, email  )=>{
    return new Promise(async(resolve, reject) =>{{
        const user={
            username:username,
            email:email
        }
        const data = await url_base.put(`/user/${idUser}`,user, { data: { answer: idUser } }, { 'headers': { 'x-access-token': localStorage.getItem('user') } } );
        resolve(data);
        }
    })
}
