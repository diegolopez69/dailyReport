import axios from 'axios'

export const postLogin = async ({ apiAccess, data }) => {
    const { page_api_path } = apiAccess
    const { username, password } = data

    console.log(page_api_path);
    console.log(data);
    
    return await axios
        .post(`${page_api_path}/api/auth/signin`, {
            username,
            password,
        })
        .then(({ data }) => {
            return data
        })
        .catch(({ response }) => {
            throw response
        })
}
