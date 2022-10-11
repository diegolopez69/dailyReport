import url_base from "../../config/url_base";
export const putChromebook =(  idChromebook, sn, number, wardrobe )=>{
    return new Promise(async(resolve, reject) =>{{
        const chromebook={
            No_chromebook: number,
            No_sn: sn,
            No_armario: wardrobe
        }
        const data = await url_base.put(`/chromebook/${idChromebook}`,chromebook, { 'headers': { 'x-access-token': localStorage.getItem('token') } } );
        resolve(data);
        }
    })
}
